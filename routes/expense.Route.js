const express=require('express')
const { UserById } = require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware')
const { createExpense, getExpenseDetail, updateExpense, deleteExpense, getExpenseList } = require('../controller/expense.Controller')
const router=express.Router()

router.post('/createexpense/:userid',protect,admin,createExpense)
router.get('/getexpensedetail/:id/:userid',protect,admin,getExpenseDetail)
router.put('/updateexpense/:id/:userid',protect,admin,updateExpense)
router.delete('/deleteexpense/:id/:userid',protect,admin,deleteExpense)
router.get('/getexpenselist/:userid',protect,admin,getExpenseList)
router.param('userid',UserById)
router.get('/user/:userid',(req,res)=>{
    res.status(200).json(req.user)
})

module.exports=router