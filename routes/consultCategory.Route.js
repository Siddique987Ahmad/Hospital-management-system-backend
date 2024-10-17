const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createConsultCategory, getConsultCategoryDetail, updateConsultCategory, deleteConsultCategory, getConsultCategoryList } = require('../controller/consultCategory.Controller')
const router=express.Router()

router.post('/createconsultcategory/:userid',protect,admin,createConsultCategory)
router.get('/getconsultcategorydetail/:id/:userid',protect,admin,getConsultCategoryDetail)
router.put('/updateconsultcategory/:id/:userid',protect,admin,updateConsultCategory)
router.delete('/deleteconsultcategory/:id/:userid',protect,admin,deleteConsultCategory)
router.get('/getconsultcategorylist/:userid',protect,admin,getConsultCategoryList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})


module.exports=router 