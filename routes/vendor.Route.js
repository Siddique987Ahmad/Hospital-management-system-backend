const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createVendor, getVendorDetail, updateVendor, deleteVendor, getVendorList } = require('../controller/vendor.Controller')
const router=express.Router()

router.post('/createvendor/:userid',protect,admin,createVendor)
router.get('/getvendordetail/:id/:userid',protect,admin,getVendorDetail)
router.put('/updatevendor/:id/:userid',protect,admin,updateVendor)
router.delete('/deletevendor/:id/:userid',protect,admin,deleteVendor)
router.get('/getvendorlist/:userid',protect,admin,getVendorList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})
module.exports=router 
