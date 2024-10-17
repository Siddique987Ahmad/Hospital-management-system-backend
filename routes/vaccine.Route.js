const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createVaccine, getVaccineDetail, updateVaccine, deleteVaccine, getVaccineList } = require('../controller/vaccine.Controller')
const router=express.Router()

router.post('/createvaccine/:userid',protect,admin,createVaccine)
router.get('/getvaccinedetail/:id/:userid',protect,admin,getVaccineDetail)
router.put('/updatevaccine/:id/:userid',protect,admin,updateVaccine)
router.delete('/deletevaccine/:id/:userid',protect,admin,deleteVaccine)
router.get('/getvaccinelist/:userid',protect,admin,getVaccineList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})


module.exports=router 