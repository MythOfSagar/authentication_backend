const jwt = require('jsonwebtoken')

const auth=(req,res,next)=>{

    const token=req.headers.authorization
    if(token){
        var decoded = jwt.verify(token, 'avt')
        if(decoded){
            
            console.log(req.body.username,decoded.foo)
            next()
        }
        else{
            res.send("LOGIN FIRST")
        }
    }
    else{
        res.send("LOGIN FIRST")
    }
    


}

module.exports=auth