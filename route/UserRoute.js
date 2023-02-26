const express=require('express');
const { verify } = require('jsonwebtoken');
const route=express.Router();
const controller=require('../controller/UserController');
const Verify=require('../middleware/verifySignup')


route.get('/',controller.register)
route.post('/register/create',[Verify.CheckDuplicate],controller.register_create)
route.get('/login',controller.login)
route.post('/login/create',controller.login_create)
route.get('/dashboard',controller.userAuth,controller.dashboard)
route.get('/logout',controller.logout)



module.exports=route;