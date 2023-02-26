const user = require('../model/User')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const dashboard = (req, res) => {
    if (req.user) {
        user.find({}, function (err, userdetail) {
            if (!err) {
                res.render('Dashboard', {
                    data: req.user,
                    details: userdetail
                })
            } else {
                console.log(err);
            }
        })
    }

}



const register = (req, res) => {
    res.render('Register', {
        data: req.user,
        message: req.flash('message'),
        alert: req.flash('alert')
    })
}

const register_create = (req, res) => {
    user({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    }).save((err, data) => {
        if (!err) {
            req.flash("message", "User added sucessfully")
            req.flash("alert", "alert-success")
            console.log("User added SuccessFully");
            res.redirect('/login')
        } else {
            console.log("User Not Added");
        }
    })
}


const login = (req, res) => {
    loginData = {}
    loginData.email = (req.cookies.email) ? req.cookies.email : undefined
    loginData.password = (req.cookies.password) ? req.cookies.password : undefined
    res.render('Login', {
        data: loginData,
        data: req.user,
        message: req.flash('message'),
        alert: req.flash('alert')
    })
}

const login_create = (req, res) => {
    user.findOne({
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
                res.cookie("userToken", token)
                if (req.body.rememberme) {
                    res.cookie('email', req.body.email)
                    res.cookie('password', req.body.password)
                }
                console.log(data)
                req.flash("message", "User added sucessfully")
                req.flash("alert", "alert-primary")
                res.redirect('/dashboard')
            } else {
                req.flash('message', "Invalide Password");
                req.flash("alert", "alert-danger")
                res.redirect('/login')
            }
        } else {
            req.flash('message', "Invalide Email");
            req.flash("alert", "alert-danger")
            res.redirect('/login')
        }
    })
}
userAuth = (req, res, next) => {
    if (req.user) {
        console.log("aaa", req.user);
        next();
    } else {
        console.log("bb", req.user);
        message: req.flash('message', "Login First...")
        alert: req.flash("alert", "alert-danger")
        res.redirect('/login')
    }
}

const logout = (req, res) => {
    res.clearCookie("userToken");
    res.redirect("/login")
}


module.exports = {
    register, login, register_create, login_create, userAuth, dashboard, logout
}