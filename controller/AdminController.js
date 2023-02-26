const admin = require('../model/Admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const dashboard = (req, res) => {
    if (req.admin) {
        admin.find({}, function (err, admindetail) {
            if (!err) {
                res.render('./admin/Dashboard', {
                    data: req.admin,
                    details: admindetail,
                })
            } else {
                console.log(err);
            }
        })
    }

}



const register = (req, res) => {
    res.render('./admin/Register', {
        data: req.admin,
        message: req.flash('message'),
        alert: req.flash('alert')
    })
}

const register_create = (req, res) => {
    admin({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, data) => {
        if (!err) {
            req.flash("message", "admin added sucessfully")
            req.flash("alert", "alert-success")
            console.log("admin added SuccessFully");
            res.redirect('/admin/login')
        } else {
            console.log("admin Not Added");
        }
    })
}


const login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('./admin/Login', {
        data: loginData,
        data: req.admin,
        message: req.flash('message'),
        alert: req.flash('alert')
    })
}

const login_create = (req, res) => {
    admin.findOne({
        email: req.body.email
    }, (err, data) => {
        if (data) {
            console.log(data);
            const haspassword = data.password;
            if (bcrypt.compareSync(req.body.password, haspassword)) {
                const token = jwt.sign({
                    id: data._id,
                    name: data.name
                }, "souvik12345@678", { expiresIn: '5s' })
                res.cookie("adminToken", token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data)
                req.flash("message", "admin added sucessfully")
                req.flash("alert", "alert-primary")
                res.redirect('/admin/dashboard')
            } else {
                req.flash('message', "Invalide Password");
                req.flash("alert", "alert-danger")
                console.log("Invalid Password");
                res.redirect('/admin/login')
            }
        } else {
            req.flash('message', "Invalide Email");
            req.flash("alert", "alert-danger")
            console.log("Invalid Email");
            res.redirect('/admin/login')
        }
    })

}
adminAuth = (req, res, next) => {
    if (req.admin) {
        console.log("aaa", req.admin);
        next();
    } else {
        console.log("bb", req.admin);
        message: req.flash('message', "Login First...")
        alert: req.flash("alert", "alert-danger")
        res.redirect('/admin/login')
    }
}

const logout = (req, res) => {
    res.clearCookie("adminToken");
    message: req.flash('message', "Admin Logout Successfully")
    alert: req.flash("alert", "alert-primary")
    res.redirect("/admin/login")
}


module.exports = {
    register, login, register_create, login_create, adminAuth, dashboard, logout
}