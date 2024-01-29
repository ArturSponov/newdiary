const Users = require('../schema/user')
const Homeworks = require('../schema/homeworks')
const { ObjectId } = require('mongodb')

let currentuser = '';
// module.exports.roles = async function(request, response){
// try {
//     // await mongoClient.connect();
//     // const db = mongoClient.db("Users");
//     // const usercollection = db.collection("users");
//     // const homecollection = db.collection("homeworks");
//     const homeworks = await Homeworks.find({})
//     const usersall = await Users.find({role: 'user'})
//     const admins = await Users.find({role: 'admin'})

//     const userId = []   

//     }catch (error) {
//     console.error(error);
//     response.status(500).send('Что-то пошло не так!');
//     }

// }   
// проверка иконки
module.exports.checkrole = async function (request, response) {
    // const UserId = request.params.id
    try {
        const id = request.params.id
        currentuser = id;
    const homeworks = await Homeworks.find({})
    const usersall = await Users.find({role: 'user'})
    const admins = await Users.find({role: 'admin'})
    // const mongoose = require('mongoose');
// ...
// if (!mongoose.Types.ObjectId.isValid(id)) {
//     console.error('Invalid ObjectId format');
//     // Обработка ошибки, например, рендеринг страницы с сообщением об ошибке
//     return response.render('error.hbs', { message: 'Invalid ObjectId format' });
// }
const result = await Users.findOne({ _id: currentuser });
const admin = id
let usersallid = []
// ...

    const userId = []   

    if (homeworks && usersall && admins) {
        homeworks.forEach(obj => {

            userId.push(obj._id.toString());
            // console.log(obj._id.toString());
            
        })
        usersall.forEach(obj => {
            usersallid.push(obj._id.toString());
        })
    };
    
    if (result) {
        if (result.icon == 'none'){
            response.render('adminpanel.hbs', {
                iconNotHave: true,
                inputs: admin,
                message: result.name,
                objects:  homeworks, 
                name: homeworks, 
                id: userId, 
                users: usersall,
                usersid: usersallid, 
                admins: admins,
                result: result,
                userid: id

            })
            
    } else if (result.icon != 'none') {
        response.render('adminpanel.hbs', {
            iconNotHave: false,
            iconHave: true,
            message: result.name,
            objects:  homeworks, 
            name: homeworks, 
            id: userId, 
            users: usersall, 
            admins: admins,
            result: result,
            userid: id
        })
    }}  
    }
    
    catch (error) {
        console.error(error);
        response.status(500).send('Что-то пошло не так!');
    }}
module.exports.setrole = async function (req, res) {
        // try {
        const userId = req.params.id;
    //      console.log(userId)
    //     await mongoClient.connect();
    //     const db = mongoClient.db("Users");
    //     const collection = db.collection("users");
    //     const { ObjectId } = require('mongodb');

        // const result = await Users.findOneAndUpdate({ _id: userId },{ $set: { role: 'admin' } });

    //     if (result) {
    //         res.redirect('/products/adminpanel');
    //     } else {
    //         res.status(404).send('Пользователь не найден');
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Ошибка сервера');
    // }
    const user = await Users.findOneAndUpdate({ _id: userId }, { $set: { role: 'admin' } });
if (user) {
    // Пользователь найден
    console.log('изменено');
    res.redirect(`/role/adminpanel/check/${currentuser}`)
} else {
    // Пользователь не найден
    console.log('Пользователь не найден');
    res.status(404).send('Пользователь не найден');
    return;
}
}
module.exports.deleterole = async function (req, res) {
     // await mongoClient.connect();
    // const db = mongoClient.db("Users");
    // const collection = db.collection("homeworks"); 
    const id = req.params.id
    // получаем одного пользователя по id
    const result = await Users.findOneAndDelete({_id: id})
    // const user = await User.findById(id);
    // if(user) res.send(user);
    // else res.sendStatus(404);
    console.log(result)
    console.log(id)
    if (result) {
        res.redirect(`/role/adminpanel/check/${currentuser}`)
    }
}
module.exports.delrole = async function (req,res) {
    const userId = req.params.id;
    //      console.log(userId)
        // await mongoClient.connect();
        // const db = mongoClient.db("Users");
        // const collection = db.collection("users");
        // const { ObjectId } = require('mongodb');
    //     const result = await collection.findOneAndUpdate({ _id: userId },{ $set: { role: 'admin' } });

    //     if (result) {
    //         res.redirect('/products/adminpanel');
    //     } else {
    //         res.status(404).send('Пользователь не найден');
    //     }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).send('Ошибка сервера');
    // }
    const user = await Users.findOneAndUpdate({ _id: userId }, { $set: { role: 'user' } });
if (user) {
    // Пользователь найден
    console.log('изменено');
    res.redirect(`/role/adminpanel/check/${currentuser}`)
} else {
    // Пользователь не найден
    console.log('Пользователь не найден');
    res.status(404).send('Пользователь не найден');
    return;
}
}
module.exports.deladmin = async function (req,res) {
    const id =req.params.id;
    // получаем одного пользователя по id
    const result = await Users.findOneAndDelete({_id: id})
    // const user = await User.findById(id);
    // if(user) res.send(user);
    // else res.sendStatus(404);
    console.log(result)
    console.log(id)
    if (result) {
        res.redirect(`/role/adminpanel/check/${currentuser}`)
}}
module.exports.delhome = async function (req, res) {
    let id = req.params.id
    let ids = req.params.ids
    const result = await Homeworks.findOneAndDelete({_id: id})
    if (result) {
        res.redirect(`/role/adminpanel/check/${currentuser}`)
    }
}