const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createConsultation, getConsultationDetail, updateConsultation, deleteConsultation, getConsultationList } = require('../controller/consultation.Controller')
const router=express.Router()

router.post('/createconsultation/:userid',protect,admin,createConsultation)
router.get('/getconsultationdetail/:id/:userid',protect,admin,getConsultationDetail)
router.put('/updateconsultation/:id/:userid',protect,admin,updateConsultation)
router.delete('/deleteconsultation/:id/:userid',protect,admin,deleteConsultation)
router.get('/getconsultationlist/:userid',protect,admin,getConsultationList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})


module.exports=router 