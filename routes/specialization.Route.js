const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createSpecialization, getSpecializationDetail, updateSpecialization, deleteSpecialization, getSpecializationList } = require('../controller/specialization.Controller.js')
const router=express.Router()

router.post('/createspecialization/:userid',protect,admin,createSpecialization)
router.get('/getspecializationdetail/:id/:userid',protect,admin,getSpecializationDetail)
router.put('/updatespecialization/:id/:userid',protect,admin,updateSpecialization)
router.delete('/deletespecialization/:id/:userid',protect,admin,deleteSpecialization)
router.get('/getspecializationlist/:userid',protect,admin,getSpecializationList)

router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})
module.exports=router 