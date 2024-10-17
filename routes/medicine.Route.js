const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createMedicine, getMedicineDetail, updateMedicine, deleteMedicine, getMedicineList } = require('../controller/medicine.Controller')
const router=express.Router()

router.post('/createmedicine/:userid',protect,admin,createMedicine)
router.get('/getmedicinedetail/:id/:userid',protect,admin,getMedicineDetail)
router.put('/updatemedicine/:id/:userid',protect,admin,updateMedicine)
router.delete('/deletemedicine/:id/:userid',protect,admin,deleteMedicine)
router.get('/getmedicinelist/:userid',protect,admin,getMedicineList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})


module.exports=router 