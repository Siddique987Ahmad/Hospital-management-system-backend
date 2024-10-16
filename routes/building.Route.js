const express=require('express')
const { protect, admin } = require('../middleware/authMiddleware.js')
const { createBuilding, updateBuilding, getBuildingDetail,deleteBuildingDetail } = require('../controller/building.Controller.js')
const { UserById } = require('../controller/user.Controller.js')
const router=express.Router()

router.post('/createbuilding/:userid',protect,admin,createBuilding)
router.get('/getbuildingdetail/:id/:userid',protect,admin,getBuildingDetail)
router.put('/updatebuilding/:id/:userid',protect,admin,updateBuilding)
router.delete('/deletebuildingdetail/:id/:userid',protect,admin,deleteBuildingDetail)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})

module.exports=router 