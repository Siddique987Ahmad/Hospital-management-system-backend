const express=require('express')
const { protect, admin } = require('../middleware/authMiddleware.js')
const { UserById } = require('../controller/user.Controller.js')
const { createFloor, getFloorDetail, updateFloor, deleteFloorDetail } = require('../controller/floor.Controller.js')
const router=express.Router()

router.post('/createfloor/:userid',protect,admin,createFloor)
router.get('/getfloordetail/:id/:userid',protect,admin,getFloorDetail)
router.put('/updatefloor/:id/:userid',protect,admin,updateFloor)
router.delete('/deletefloordetail/:id/:userid',protect,admin,deleteFloorDetail)
router.get('/getfloorList/:userid',protect,admin)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})

module.exports=router 