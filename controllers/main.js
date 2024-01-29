const express = require('express')
const Users = require('../schema/user')
const Homeworks = require('../schema/homeworks')
// const { response } = require('express')
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
module.exports.getuser = async function (req, res) {
    try {
    const id =  req.params.id;

    let cont = await Users.findOne({ _id: new objectId(id) });
    console.log(cont)
   

    if (cont) {
      
        res.render('main.hbs', {
            userFind: true,
            userUndefined: false,

            message: cont.name,
            result: cont.icon,
            userid: id,
            userName: cont.name

        })
    }
     else {
        res.render('main.hbs', {
            userUndefined: true,
            userFind: false
        })
    }
    }
    catch (err) {
        console.log(err)
    }
    // const id = new objectId(req.params.id);
    
}
module.exports.getusernews = async function (req, res) {
    try {
        console.log('ну как бы да')
        const id =  req.params.id;
    
        let cont = await Users.findOne({ _id: new objectId(id) });
        console.log(cont)
       
    
        if (cont) {
          
            res.render('newspaper.hbs', {
                userFind: true,
                userUndefined: false,
    
                message: cont.name,
                result: cont.icon,
                userid: id,
                userName: cont.name
    
            })
        }
         else {
            res.render('newspaper.hbs', {
                userUndefined: true,
                userFind: false
            })
        }
        }
        catch (err) {
            console.log(err)
        }
}
module.exports.getusergalery = async function(req,res) {
    try {
        console.log('ну как бы да')
        const id =  req.params.id;
    
        let cont = await Users.findOne({ _id: new objectId(id) });
        console.log(cont)
       
    
        if (cont) {
          
            res.render('galery.hbs', {
                userFind: true,
                userUndefined: false,
    
                message: cont.name,
                result: cont.icon,
                userid: id,
                userName: cont.name
    
            })
        }
         else {
            res.render('galery.hbs', {
                userUndefined: true,
                userFind: false
            })
        }
        }
        catch (err) {
            console.log(err)
        }
}