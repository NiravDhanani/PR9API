const express = require('express')
const route = express.Router()
const multer = require('multer')
const passport = require('passport')

const IndexPageController = require('../controller/indexpageController')
const LoginController = require('../controller/loginController')

// multer code 
const fileUpload = multer({storage : multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,'profiles')
    },
    filename : (req,file,cb)=>{
        let img = Date.now() + file.originalname;
        cb(null,img);
    }
}
)}).single('image')

// index page routes  
route.get('/',LoginController.loginPage)
route.get('/admin',passport.checkUser,IndexPageController.AdminIndexPage)
route.get('/signup',LoginController.signupPage);
route.post('/registerUser',fileUpload,LoginController.registerUser);
route.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),LoginController.loginUser);
route.get('/logout',passport.checkUser,LoginController.logout)

route.get('/forgotpassword',LoginController.forgotpassword)
route.post('/UserEmailCheck',LoginController.UserEmailCheck)
route.get('/otp',LoginController.otp)
route.post('/userOtp',LoginController.userOtp)
route.get('/newpassword',LoginController.newpassword)
route.post('/createnewpassword',LoginController.createnewpassword)


// profile page  
route.get('/profile',passport.checkUser,LoginController.profile);
route.get('/edit',passport.checkUser,LoginController.edit);
route.post('/updateprofile',passport.checkUser,LoginController.updateprofile);
route.post('/updateprofileimg',fileUpload,LoginController.updateprofileimg);
route.get('/changepassword',passport.checkUser,LoginController.changepassword);
route.post('/changeloginPassword',passport.checkUser,LoginController.changeloginPassword);




module.exports = route;