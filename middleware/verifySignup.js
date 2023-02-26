const usermodel=require('../model/User');

exports.CheckDuplicate=(req,res,next)=>{
    usermodel.findOne({
        email:req.body.email
    }).exec((err,email)=>{
        if (err) {
            console.log(err);
            return
        }
        if (email) {
            req.flash('message',"Email Already Exisist");
            req.flash("alert","alert-danger")
           return res.redirect('/')
        }

        const password=req.body.password
        const confirm=req.body.confirmpassword
        if (password !== confirm) {
            req.flash('message',"Password & Confirm Password are NOT Matched")
            req.flash("alert","alert-danger")
            return res.redirect('/')
        }
        next()
    })
}