const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/PR_9API')
mongoose.connect(`mongodb+srv://Raj:uq5rMhO1FfkLkOU3@cluster0.fvudrsz.mongodb.net/demoAPI`);

const db = mongoose.connection;

db.on('connected',(err)=>{
    if(err){
        console.log(`DB Not connected`);
        return false;
    }
    console.log(`DB CONNECTED`);
})

