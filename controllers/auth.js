const express = require('express')
const Users = require('../schema/user')
const Homeworks = require('../schema/homeworks')
const { response } = require('express')
// const multer  = require("multer");
const multer = require('multer');
// const upload = multer({dest:"uploads"});
const fileUpload = require('express-fileupload');
const objectId = require("mongodb").ObjectId;

const { findOneAndUpdate } = require('../schema/user');
const storage = multer.memoryStorage();
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});


const urlencodedParser = express.urlencoded({extended: false})
const app = express()
app.use(fileUpload());
app.use(express.json());
// const upload = multer({dest:"uploads"});

let authuser = '';
module.exports.registration = async function (request, response) {

    try{
   
       const user = new Users({
        name: request.body.Login,
        age: request.body.pass,
        role: 'user',
        icon: '/uploads/anonymous.png'

       })
      
        const users = await Users.findOne({name: request.body.Login})
        // console.log(users);
        if (users){
            console.log('такой пользователь есть')
            response.render('class.hbs', {
                Visible: true,
                message: 'Такой пользователь уже существует'
            })
        } else {
            const collection = user.save().then(() => console.log('пользователь сохранен'))
            response.render('class.hbs', {
                Visible: true,
                message: 'Пользователь сохранен'
            })
        }

        // console.log(request.body)

  
        

        
    }
    catch(err){
        console.log(err);
        response.sendStatus(500);
    }  

   
}
module.exports.login =  async function (request, response) {
    // console.log(request.body)
    try{
  
        const users = await Users.findOne({name: request.body.Login, age: request.body.pass})
        console.log('user is ', users)
        if (users) {
            
            console.log('User role:', users.role);

            if (users.role === "mainadmin") {
                // response.render("adminpanel.hbs", {
                //     iconNotHave: true,
                //     message: users.name
                // });
                authuser = users._id
                response.redirect(`/role/adminpanel/check/${authuser}`)
                

                console.log('dasdasd')
            }
            else if (users.role === 'admin') {
                response.redirect("/add/homeworkadmin" );

            }if (users.role === 'user'){
                response.redirect('/add/homework')
            }
        } else {
            response.render('classi.hbs', {
                message: 'Неверный логин или пароль'
             })
        }
        // console.log('login');

        

        
    }
    catch(err){
        console.log(err);
        response.sendStatus(500);
    }  
}

module.exports.homework =  async function (req, res) {
    // await mongoClient.connect();
    // const db = mongoClient.db("Users");
    const id = await Users.findOne({_id: req.params.id});
    const userids = id._id
    const collection = await Homeworks.find({});
    // const result = Homeworks
        const uniqueNames = [];
        const uniqueObjects = [];
        const userId = []   

       console.log('да')
        // Homeworks.forEach(obj => {
  
        //     userId.push(obj._id.toString());
        //     // console.log(obj._id.toString());
            
        // });
        // userId.push(Homeworks._id.toString());
        //  // Проверьте, есть ли данные в коллекции
        
        if (id) {
            if (id.role === 'admin' || id.role === 'mainadmin'){
                res.render("homework.hbs", { 
                objects:  collection, 
                name: collection,
                userFind: true,
                userUndefined: false,
                message: id.name,
                result: id.icon,
                userid: userids,
                userName: id.name
            });
            } else if (id.role === 'user') {
                res.render("homeworknoadmin.hbs", { 
                    objects:  collection, 
                    name: collection,
                    userFind: true,
                    userUndefined: false,
                    message: id.name,
                    result: id.icon,
                    userid: userids,
                    userName: id.name
                });
            }
            
        }
         else {
            res.render("homeworknoadmin.hbs", { 
                objects:  collection, 
                name: collection,
                userUndefined: true,

            });
        }

}
module.exports.homeworks =  async function (req, res) {
    // await mongoClient.connect();
    // const db = mongoClient.db("Users");
    const collection = await Homeworks.find({});
    // const result = Homeworks
        const uniqueNames = [];
        const uniqueObjects = [];
        const userId = []   

       console.log('sdasd')
        // Homeworks.forEach(obj => {
  
        //     userId.push(obj._id.toString());
        //     // console.log(obj._id.toString());
            
        // });
        // userId.push(Homeworks._id.toString());
        //  // Проверьте, есть ли данные в коллекции
        
        res.render('homeworknoadmin.hbs', {objects: collection})

}
module.exports.addhomework = async function (req, res) {
    try {
        // await mongoClient.connect();
        // const db = mongoClient.db("Users");
        const cont = req.params.id
        const id = await Users.findOne({_id: cont})
        const collection = db.collection("homeworks");
        const result = await Homeworks.find({});
        const uniqueNames = [];
        const uniqueObjects = [];
        const userId = []   
        console.log('привет')
       

            // userId.push(obj._id);
            // console.log(obj._id.toString());
            

         // Проверьте, есть ли данные в коллекции
        
        if (id) {
            res.render("addhomework.hbs", { 
                objects:  result, 
                name: result, 
                id: userId,
                userFind: true,
                userUndefined: false,
                message: id.name,
                result: id.icon,
                userid: cont,
                userName: id.name
            });
        } else  {
            console.log('ошибка')
        }
        // console.log('asdasd')
        // console.log(userId)
        // console.log(result)
      
    } catch (err) {
        console.error('Ошибка при получении данных из MongoDB:', err);
    console.log(err); // Добавьте эту строку для вывода конкретной ошибки
    res.status(500).send('Ошибка сервера');
}}
module.exports.homeadmin = async function (req, res) {
    try {
        // await mongoClient.connect();
        // const db = mongoClient.db("Users");
        // const collection = db.collection("homeworks");
        const result = await Homeworks.find({});
        const uniqueNames = [];
        const uniqueObjects = [];
        const userId = []   

       

  
            userId.push(result._id);
            // console.log(obj._id.toString());
         // Проверьте, есть ли данные в коллекции
        res.render("homework.hbs", { objects:  result, name: result, id: userId });
        // console.log('asdasd')
        // console.log(userId)
        // console.log(result)
      
    } catch (err) {
        console.error('Ошибка при получении данных из MongoDB:', err);
    console.log(err); // Добавьте эту строку для вывода конкретной ошибки
    res.status(500).send('Ошибка сервера');
    } 
}
module.exports.delhomeadmin = async function (req, res) {
    let id = req.params.id
    const result = await Homeworks.findOneAndDelete({_id: id})
    // const user = await User.findById(id);
    // if(user) res.send(user);
    // else res.sendStatus(404);
    console.log(result)
    console.log(id)
    console.log('dftyu')
    if (result) {
        res.redirect('/add/homeworkadmin')
    }
}
module.exports.addhomework = async function (req, res) {

    const homework = new Homeworks({
        name: req.body.Login,
        age: req.body.pass,

       })
    if (req.body.Login) {
        homework.save().then(() => { console.log('Saved')})
        res.redirect('/add/homeworkadmin')


    }
  
}
module.exports.user = async function (req, res) {
        // let id = new objectId(req.params.id)
        
        console.log(req.params.id)

    try {
        let id = req.params.id

        const result = await Users.findOne({_id: id})
        console.log(result)
        console.log(result.icon)
        // console.log(result.icon)
        if (result) {
            if (result.role == 'mainadmin') {
                res.render('user.hbs', {
                    imageNotHave: true,
                    imageHave: false,
                    havenick: true,
                    message: result.name,
                    userid: id,
                    user: false,
                    admin: false,
                    mainadmin: true,
                    image: result.icon
                }) 
            } else if (result.role == 'admin') {
               res.render('user.hbs', {
                imageNotHave: true,
                imageHave: false,
                havenick: true,
                message: result.name,
                userid: id,
                user: false,
                admin: true,
                mainadmin: false,
                image: result.icon
            }) 
            } else {
                res.render('user.hbs', {
                    imageNotHave: true,
                    imageHave: false,
                    havenick: true,
                    message: result.name,
                    userid: id,
                    user: true,
                    admin: false,
                    mainadmin: false,
                    image: result.icon
                }) 
            }
                
            
    
            
        }
    }
    catch (err) {
        console.log(err)
    }
}
module.exports.changenick = async function (req,res) {
    let id = req.params.id;
    let novnick = req.body.nicknm;
    // Ваш код обновления ника в базе данных
    let povtor = await Users.findOne({name: novnick})
    
    if (povtor) {
        let result = await Users.findOne({_id: id})
        if (result.role == 'mainadmin') {
            res.render('user.hbs', {
            imageNotHave: true,
            povtor: true,
            imageHave: false,
            havenick: true,
            message: result.name,
            userid: id,
            image: result.icon,
            user: false,
            admin: false,
            mainadmin: true,
            // Добавьте другие необходимые параметры для рендеринга
          });
        } else if (result.role == 'admin') {
            res.render('user.hbs', {
                imageNotHave: true,
                povtor: true,
                imageHave: false,
                havenick: true,
                message: result.name,
                userid: id,
                image: result.icon,
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
                message: result.name,
                userid: id,
                image: result.icon,
                user: true,
                admin: false,
                mainadmin: false,
                // Добавьте другие необходимые параметры для рендеринга
              });
        }
        
    } else if (!povtor) {
        let result = await Users.findOneAndUpdate({_id: id}, {$set: {name: novnick}})
        let user = await Users.findOne({_id: id})
    console.log('Ник успешно обновлен в базе данных');
    if (result) {
        if (user.role == 'mainadmin') {
            res.render('user.hbs', {
            imageNotHave: true,
            povtor: true,
            imageHave: false,
            havenick: true,
            message: result.name,
            userid: id,
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
                message: result.name,
                userid: id,
                image: result.icon,
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
                message: result.name,
                userid: id,
                image: result.icon,
                user: true,
                admin: false,
                mainadmin: false,
                // Добавьте другие необходимые параметры для рендеринга
              });
        }
    }
    }
    
    
    
        // if (result){
        //     let user = await Users.findOne({_id: id})
        //     if (result && user) {
        //         res.render('user.hbs', {
        //             imageNotHave: true,
        //             imageHave: false,
        //             havenick: true,
        //             message: user.name,
        //             userid: id,
        //             image: user.icon
        //         })
        //     }
        // }
        

}
// module.exports.upload = async function (req, res) {
    
// }