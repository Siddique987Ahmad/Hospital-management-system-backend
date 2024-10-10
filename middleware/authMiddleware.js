const User=require('../Models/user.Model')
const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')

const protect=asyncHandler(async(req,res,next)=>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {

            token=req.headers.authorization.split(" ")[1]
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            req.user=await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error("User not authorize");
            
        }
    }
    if(!token)
    {
        res.status(401)
        throw new Error("no token here");
        
    }
})

const admin=asyncHandler(async(req,res,next)=>{
    if(req.user && req.user.role===0)
    {
        next()
    }
    else{
        res.status(401)
        throw new Error("not authorized to admin");
        
    }
})

module.exports={protect,admin} 