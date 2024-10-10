const User=require('../Models/user.Model')
const asyncHandler=require('express-async-handler')
const generateToken = require('../utils/generateToken.js')
//register user 
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password,role,about}=req.body

    if(!name || !email || !password || !role || !about)
    {
        res.status(403)
        throw new Error("Fields required");
        
    }
    const emailExisted=await User.findOne({email})
    console.log(emailExisted)
    if (emailExisted) {
        res.status(401)
        throw new Error("Email already existed");
        
    }

    const user=await User.create(
        {
            name,
            email,
            password,
            role,
            about
        }
    )
    if (user) {
        res.status(200).json({
            //_id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            about:user.about,
            token:generateToken(user.id)
            
        })

    }
    else
    {
        res.status(400)
        throw new Error("invalid user");
        
    }

})
//Authenticate user
const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        res.status(401)
        throw new Error("fields required");
        
    }
    const user=await User.findOne({email})
    if (user && (await user.matchPassword(password))) {
        res.json({
            name:user.name,
            email:user.email,
            role:user.role,
            about:user.about,
            token:generateToken(user.id)
        })
        
    }
    else{
        res.status(401)
        throw new Error("invalid email or password");
        
    }
})

////Get User Profile through id
const getUserProfile=asyncHandler(async(req,res)=>{
    // const {_id}=req.params
    // if(!_id)
    // {
    //     res.status(400)
    //     throw new Error("not here id");
        
    // }
    const user=await User.findById(req.user.id)
    if(user)
    {
        res.json({
            name:user.name,
            email:user.email,
            role:user.role,
            about:user.about
        })
    }
    else{
        res.status(401)
        throw new Error("invaild id");
        
    }
})
//Update user profile

const updateUserProfile=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.user.id)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const updatedUser=await User.findByIdAndUpdate(user.id,req.body,{new:true})
    if(!updatedUser)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    res.json({
        name:user.name,
        email:user.email,
        role:user.role,
        about:user.about,
        token:generateToken(user.id)
    })


})



module.exports={
    registerUser,
    authUser,
    getUserProfile,
    updateUserProfile
} 