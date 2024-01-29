const express = require('express');

const urlencodedParser = express.urlencoded({extended: false})

const Rauth = require('../controllers/roles')


const roleRouter = express.Router()
roleRouter.get("/adminpanel/check/:id", Rauth.checkrole)
roleRouter.get('/adminpanel/user/:id', Rauth.setrole)
roleRouter.get('/adminpanel/deleteuser/:id', Rauth.deleterole)
roleRouter.get('/adminpanel/admin/:id', Rauth.delrole)
roleRouter.get('/adminpanel/deleteadmin/:id', Rauth.deladmin)
roleRouter.get('/adminpanel/:id', Rauth.delhome)
module.exports = roleRouter

