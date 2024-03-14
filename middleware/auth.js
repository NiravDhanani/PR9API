const jwt = require('jsonwebtoken')

const verifyToken = async (req,res,next)=>{
    let token = req.headers.authorization;
    if(!token){
        return res.status(503).send({
            success : false,
            message : 'token not valid',
        })
    }
    let newToken = token.split(" ")[1];
    jwt.verify(newToken,"nd",(err,decode)=>{
        if(err){
            return res.status(503).send({
                success : false,
                message : 'token not valid',
            })
        }
        req.user = decode;
        return next();
    })
}
module.exports = {
    verifyToken
}