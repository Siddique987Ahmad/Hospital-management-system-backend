const express=require('express')
const { patientDetailById, createPatientDetail, getPatientDetail, updatePatientDetail, deletePatientDetail, getPatientDetailList, getStatusValues, getPatientTypeValues, getGenderValues } = require('../controller/patientDetail.Controller.js')
const { UserById } = require('../controller/user.Controller.js')
const { protect, admin } = require('../middleware/authMiddleware.js')
const router=express.Router()


router.post('/createpatientdetail/:userid',protect,admin,createPatientDetail)
router.get('/getpatientdetail/:patientid/:userid',protect,admin,getPatientDetail)
router.put('/updatepatientdetail/:patientid/:userid',protect,admin,updatePatientDetail)
router.delete('/deletepatientdetail/:patientid',protect,admin,deletePatientDetail)
router.get('/getpatientdetaillist/:userid',protect,admin,getPatientDetailList)
router.get('/getstatusvalues/:userid',protect,admin,getStatusValues)
router.get('/getpatienttypevalues/:userid',protect,admin,getPatientTypeValues)
router.get('/getgendervalues/:userid',protect,admin,getGenderValues)

router.get('/patientdetail/:patientid',(req,res)=>{
    res.json(req.patient)
})

router.param('patientid',patientDetailById)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})
module.exports=router 