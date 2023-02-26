const express=require('express');
const route=express.Router();
const controller=require('../controller/AdminController');

route.get('/admin/login',controller.login)
route.post('/admin/login/create',controller.login_create)
route.get('/admin/register',controller.register)
route.post('/admin/register/create',controller.register_create)
route.get('/admin/dashboard',controller.adminAuth,controller.dashboard)
route.get('/logout',controller.logout)





module.exports=route;