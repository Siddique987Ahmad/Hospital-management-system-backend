const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createDesignation, getDesignationDetail, updateDesignation, deleteDesignation, getDesignationList } = require('../controller/designation.Controller.js')
const router=express.Router()

router.post('/createdesignation/:userid',protect,admin,createDesignation)
router.get('/getdesignationdetail/:id/:userid',protect,admin,getDesignationDetail)
router.put('/updatedesignation/:id/:userid',protect,admin,updateDesignation)
router.delete('/deletedesignation/:id/:userid',protect,admin,deleteDesignation)
router.get('/getdesignationlist/:userid',protect,admin,getDesignationList)

router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})
module.exports=router 