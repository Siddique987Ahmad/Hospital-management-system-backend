const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createDoctorDetail, getDoctorDetail, updateDoctorDetail, deleteDoctorDetail, getDoctorDetailList } = require('../controller/doctordetail.Controller')
const router=express.Router()

router.post('/createdoctordetail/:userid',protect,admin,createDoctorDetail)
router.get('/getdoctordetail/:id/:userid',protect,admin,getDoctorDetail)
router.put('/updatedoctordetail/:id/:userid',protect,admin,updateDoctorDetail)
router.delete('/deletedoctordetail/:id/:userid',protect,admin,deleteDoctorDetail)
router.get('/getdoctordetaillist/:userid',protect,admin,getDoctorDetailList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})
module.exports=router 