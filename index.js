const express = require('express')
const port = 8000
const app = express();
const db = require('./config/db')
const path = require('path')
const passport = require('passport')
const passportLocal = require('./config/passportStrategy')
const session = require('express-session')
const cookie = require("cookie-parser");
const flash = require('connect-flash')


app.set('view engine','ejs')

app.use(cookie());
app.use(session({
    name : 'xyz',
    secret : '123',
    saveUninitialized : true,
    resave : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24
    }
}))

app.use(flash())
app.use(function(req,res,next){
    res.locals.massage = req.flash()
    return next();
})

app.use('/public',express.static(path.join(__dirname,'public')))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/profiles',express.static(path.join(__dirname,'profiles')))
app.use(express.urlencoded({extended : true}))

app.use(passport.initialize());
app.use(passport.session())
app.use(passport.setuser);



app.use((req, res, next) => {
    res.locals.currentUser = req.user; 
    next();
});


app.use('/',require('./routes/categoryroutes'));
app.use('/',require('./routes/subcatroute'));
app.use('/',require('./routes/Exsubcategoryroute'));
app.use('/',require('./routes/routes'))
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false   
    }
    console.log(`server start on ${port}`);
})