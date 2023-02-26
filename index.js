const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const app = express();
const userauth=require('./middleware/userAuth') 

const adminauth=require('./middleware/adminAuth') 
app.use(express.urlencoded({ extended: true }))

app.use(flash())
app.use(cookieparser())
app.use(session({
    cookie: { maxAge: 60000 },
    secret: "Souvik",
    resave: false,
    saveUninitialized: false,
}))

app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(userauth.authjwt)
app.use(adminauth.authjwt)

const UserRoute = require('./route/UserRoute')
app.use(UserRoute)

const AdminRoute = require('./route/AdminRoute');
app.use(AdminRoute)

const port = 8500;
const dbLink = "mongodb+srv://souvikdb:cSgmsmo8GCvTW05X@cluster0.bsndvpo.mongodb.net/Auth_log";
mongoose.connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    app.listen(port, () => {
        console.log(`Server Running http://localhost:${port}`);
        console.log('Database Connected.....');
    })
}).catch(err => {
    console.log(err);
})