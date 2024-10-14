const express=require('express')
const { prescriptionById, createPrescription, getPrescriptionDetail, getPrescriptionUserDetail, updatePrescription, deletePrescription, getListOfPrescription, getTakeValues, getPaidValues } = require('../controller/prescription.Controller.js')
const { UserById } = require('../controller/user.Controller.js')
const { protect, admin } = require('../middleware/authMiddleware.js')
const router=express.Router()



router.post('/createprescription/:userid',protect,admin,createPrescription)
router.get('/getprescriptiondetail/:prescriptionid/:userid',protect,admin,getPrescriptionDetail)
router.get('/getprescriptionuserdetail/:prescriptionid/:userid',protect,admin,getPrescriptionUserDetail)
router.put('/updateprescription/:prescriptionid/:userid',protect,admin,updatePrescription)
router.delete('/deleteprescription/:prescriptionid',protect,admin,deletePrescription)
router.get('/getlistofprescription/:userid',protect,admin,getListOfPrescription)
router.get('/gettakevalues/:userid',protect,admin,getTakeValues)
router.get('/getpaidvalues/:userid',protect,admin,getPaidValues)

router.get('/prescription/:prescriptionid',(req,res)=>{
    res.json(req.prescription)

})
router.param('prescriptionid',prescriptionById)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})


module.exports=router 