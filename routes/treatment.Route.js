const express=require('express')
const { treatmentById, createTreatment, getTreatmentDetail, updateTreatment, deleteTreatment, getTreatmentList } = require('../controller/treatment.Controller.js')
const { UserById } = require('../controller/user.Controller.js')
const { protect, admin } = require('../middleware/authMiddleware.js')
const router=express.Router()

router.post('/createtreatment/:userid',protect,admin,createTreatment)
router.get('/gettreatmentdetail/:treatmentid/:userid',protect,admin,getTreatmentDetail)
router.put('/updatetreatment/:treatmentid',protect,admin,updateTreatment)
router.delete('/deletetreatment/:treatmentid',protect,admin,deleteTreatment)
router.get('/gettreatmentlist/:userid',protect,admin,getTreatmentList)
router.get('/treatment/:treatmentid',(req,res)=>{
    res.json(req.treatment)
})
router.param('treatmentid',treatmentById)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})

module.exports=router 
