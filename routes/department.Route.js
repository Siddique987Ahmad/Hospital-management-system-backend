const express=require('express')
const { UserById } = require('../controller/user.Controller.js')
const { protect, admin } = require('../middleware/authMiddleware.js')
const { createDepartment, getDepartmentDetail, updateDepartment, deleteDepartment, getDepartmentList } = require('../controller/department.Controller.js')
const router=express.Router()

router.post('/createdepartment/:userid',protect,admin,createDepartment)
router.get('/getdepartmentdetail/:id/:userid',protect,admin,getDepartmentDetail)
router.put('/updatedepartment/:id/:userid',protect,admin,updateDepartment)
router.delete('/deletedepartment/:id/:userid',protect,admin,deleteDepartment)
router.get('/getdepartmentlist/:userid',protect,admin,getDepartmentList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})


module.exports=router