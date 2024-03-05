const mongoose = require('mongoose')

const Userdata = mongoose.Schema({
    name : {
        type:String,
        require : true,
    },
    email : {
        type:String,
        require : true,
    },
    password : {
        type:String,
        require : true,
    },
    image:{
        type:String,
        require : true,
    },
    address : {
        type:String,
        require : true,
    },
    contact : {
        type:String,
        require : true,
    },
    qualification : {
        type:String,
        require : true,
    },
    role : {
        type:String,
        require : true,
    }
})

const registerData =  mongoose.model('RegisterData',Userdata)

module.exports = registerData;