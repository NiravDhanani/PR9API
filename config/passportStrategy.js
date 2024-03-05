const passport = require('passport')
const passportLocal = require('passport-local').Strategy
const LoginModel = require('../model/RegisterData')
const bcrypt = require('bcrypt')

passport.use(new passportLocal({
    usernameField : 'email',
}, async(email,password,done)=>{
    try{
        let user = await LoginModel.findOne({email:email});
        if(!user){
            console.log(`email is wrong`);
            return done(null,false)
        }
        let match = await bcrypt.compare(password,user.password);
        if(!match){
            console.log(`password wrong`);
            return done(null,false)
        }
        return done(null,user)
    } catch (err){
        console.log(err);
        return false
    }
}))

passport.serializeUser((user,done)=>{
    return done(null,user.id)
})

passport.deserializeUser(async(id,done)=>{
    let user = await LoginModel.findById(id);
    return done(null,user);
})

passport.checkUser = (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/');
    } catch (err){
        console.log(err);
        return false
    }
}

passport.setuser = (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            res.locals.users = req.user
        }
        return next();
    }  catch (err){
        console.log(err);
        return false
    }
}
module.exports = passport