const express=require("express")
const { registerUser, authUser, getUserProfile, updateUserProfile } = require("../controller/user.Controller")
const { protect } = require("../middleware/authMiddleware")
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',authUser)
router.get('/user/:userid',protect,getUserProfile)
router.put('/user/update/:userid',protect,updateUserProfile)

module.exports=router 