const express=require("express")
const { registerUser, authUser, getUserProfile, updateUserProfile, deleteUser, getUserById, updateUser, getAllUsers, registerUsers } = require("../controller/user.Controller")
const { protect, admin } = require("../middleware/authMiddleware")
const router=express.Router()

router.post('/register',registerUser)
router.post('/login',authUser)
router.get('/user/:userid',protect,getUserProfile)
router.put('/user/update/:userid',protect,updateUserProfile)
router.delete('/user/delete/:userid',protect,admin,deleteUser)
router.put('/user/update/:id/:userId', protect, admin, updateUser);
router.get('/user/getusers',protect,admin,getAllUsers)
router.post('/user/registeruser/:userid',protect,admin,registerUsers)
//router.param('/userid',getUserById)
module.exports=router 