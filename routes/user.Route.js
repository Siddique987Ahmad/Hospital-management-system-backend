const express=require("express")
const { registerUser, authUser, getUserProfile, updateUserProfile, deleteUser, UserById, updateUser, getAllUsers, registerUsers } = require("../controller/user.Controller")
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
router.param('/userid',UserById)
router.get('/user/:userid', (req, res) => {
    res.status(200).json(req.user);  // Use the user that is attached to req by middleware
});

module.exports=router 