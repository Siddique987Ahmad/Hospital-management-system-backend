const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createVaccineAppointment, getVaccineAppointmentDetail, updateVaccineAppointment, deleteVaccineAppointment, getVaccineappointmentList } = require('../controller/vaccineAppointment.Controller')
const router=express.Router()

router.post('/createvaccineappointment/:userid',protect,admin,createVaccineAppointment)
router.get('/getvaccineappointmentdetail/:id/:userid',protect,admin,getVaccineAppointmentDetail)
router.put('/updatevaccineappointment/:id/:userid',protect,admin,updateVaccineAppointment)
router.delete('/deletevaccineappointment/:id/:userid',protect,admin,deleteVaccineAppointment)
router.get('/getvaccineappointmentlist/:userid',protect,admin,getVaccineappointmentList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})


module.exports=router 