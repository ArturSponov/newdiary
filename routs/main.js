
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
const Mauth = require('../controllers/main')


const mainRouter = express.Router()
mainRouter.get('/', urlencodedParser, function(req, res){
    res.render('main.hbs', {
        userUndefined: true
    })
})
mainRouter.get('/:id', urlencodedParser , Mauth.getuser)
mainRouter.get("/newspaper", function(req, res) {
    res.render("newspaper.hbs", {
        userUndefined: true
    })
})
mainRouter.get('/newspaper/:id', urlencodedParser, Mauth.getusernews)
mainRouter.get("/galery", function(req, res) {

    res.render("galery.hbs", {
        userUndefined: true
    })
})
mainRouter.get('/galery/:id', urlencodedParser, Mauth.getusergalery)

module.exports = mainRouter