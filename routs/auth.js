
// const { Router } = require('express');

const Users = require('../schema/user')
 
const express = require('express');
const multer = require('multer');
// const upload = multer({dest:"uploads"});
const fileUpload = require('express-fileupload');


// const storage = multer.memoryStorage();
// const uploads = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5, // 5 MB
//     },
// });
const uploads = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const app = express()

app.use(express.json());

// const storage = multer.memoryStorage();
// const uploads = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5, // 5 MB
//     },
// });
const Rauth = require('../controllers/auth')


const authRouter = express.Router()


authRouter.post("/registration", urlencodedParser,  Rauth.registration)
authRouter.get("/login", function(request, response) {
    response.render('classi.hbs')
}) 
// authRouter.get("/homeworkadmin", function(request, response) {
//     response.render('homework.hbs')
// })
authRouter.get("/homeworkadmin", urlencodedParser, Rauth.homeadmin)
authRouter.get("/homeworkadmin/:id", urlencodedParser, Rauth.delhomeadmin)
authRouter.get("/addhomework", function(request, response) {
    response.render("addhomework.hbs")
})
// authRouter.post("/addhomework", urlencodedParser, Rauth.addhomeworks)

authRouter.post("/login", urlencodedParser,  Rauth.login)
// authRouter.post("/login", Rauth.login)
// authRouter.get("/login", function(req, res) {
//     res.render('classi.hbs')
// })
authRouter.get("/registration", function (req, res) {
    res.render('class.hbs')
})
authRouter.get('/homework', urlencodedParser, Rauth.homeworks)

authRouter.get('/homework/:id', urlencodedParser, Rauth.homework)
authRouter.get('/addhomework/:id', urlencodedParser, Rauth.addhomework)
authRouter.get('/user/:id', urlencodedParser, Rauth.user) 
authRouter.post('/changenick/:id', urlencodedParser, Rauth.changenick)
authRouter.post("/:id/upload", multer({storage:uploads}).single('filedata'), async function (req, res) {
    if (!req.file) {
        return res.status(400).send("Файл не был загружен.");
    }

    const userId = req.params.id;
    
    const filedata = req.file
    let fileName = filedata.filename || filedata.originalname;
    console.log(filedata)
    try {
        let result = await Users.findOneAndUpdate({_id: userId}, { $set: {icon: `/uploads/${fileName}`}})


        const user = await Users.findOne({ _id: userId });

        if (!result) {
            return res.status(400).send("Ошибка при обновлении пользователя.");
        }
        if (result) {
            console.log('Пользователю успешно записана картинка');

        } else {
            console.log('Ошибка')
        }

        if (user.role == 'mainadmin') {
            res.render('user.hbs', {
            imageNotHave: true,
            povtor: true,
            imageHave: false,
            havenick: true,
            message: result.name,
            userid: userId,
            image: result.icon,
            user: false,
            admin: false,
            mainadmin: true,
            // Добавьте другие необходимые параметры для рендеринга
          });
        } else if (user.role == 'admin') {
            res.render('user.hbs', {
                imageNotHave: true,
                povtor: true,
                imageHave: false,
                havenick: true,
                message: user.name,
                userid: userId,
                image: user.icon,
                user: false,
                admin: true,
                mainadmin: false,
                // Добавьте другие необходимые параметры для рендеринга
              });
        } else {
            res.render('user.hbs', {
                imageNotHave: true,
                povtor: true,
                imageHave: false,
                havenick: true,
                message: user.name,
                userid: userId,
                image: user.icon,
                user: true,
                admin: false,
                mainadmin: false,
                // Добавьте другие необходимые параметры для рендеринга
              });
        }
    } catch (error) {
        console.error("Ошибка при обработке запроса:", error);
        res.status(500).send("Внутренняя ошибка сервера");
    }
});
// authRouter.get('/newspaper/:id', urlencodedParser, Rauth.newspaper)











module.exports = authRouter


