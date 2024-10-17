const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model.js')
const Department=require('../Models/department.Model.js')
const Expense=require('../Models/expense.Model.js')
//create expense
//post private admin
const createExpense=asyncHandler(async(req,res)=>{
const {userid}=req.params
const {name,department,amount,description,fromDate,to,paid}=req.body
const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
if (!name || !department || !amount || !description || !fromDate || !to || !paid) {
    res.status(404)
    throw new Error("fields required");
    
}
const expense=await Expense.create({
    user:userid,
    name,
    department,
    amount,
    description,
    fromDate,
    to,
    paid
})

if(!expense)
{
    res.status(404)
    throw new Error("expense data not created");
    
}
res.status(200).json(expense)
})
//get expense detail
//get private admin
const getExpenseDetail=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
const expense=await Expense.findById(id)
if(!expense)
{
    res.status(404)
    throw new Error("expense not found");
    
}
//const expenseDetail=await Expense.findById(id,req.body,{new:true})
res.status(200).json(expense)
})
//update expense
//update private admin
const updateExpense=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
        {
            res.status(404)
            throw new Error("user not found");
        }
        const expense=await Expense.findById(id)
        if(!expense)
        {
            res.status(404)
            throw new Error("expense not found");
            
        }
        const updatedExpense=await Expense.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedExpense)
            {
                res.status(404)
                throw new Error("updated expense not found");
                
            }
            res.status(200).json(updatedExpense)
    
})
//delete expense
//delete private admin
const deleteExpense=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const deletedExpense=await Expense.findByIdAndDelete(id)

    if(!deletedExpense)
    {
        res.status(404)
        throw new Error("deleted expense not found");
        
    }

    res.status(200).json(deletedExpense)

})
//get expense list
//get private admin
const getExpenseList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }

    const expenseDetail=await Expense.find({})
    if(!expenseDetail)
    {
        res.status(404)
        throw new Error("expenses not found");
        
    }
    res.status(200).json(expenseDetail)

})
module.exports={createExpense,getExpenseDetail,updateExpense,deleteExpense,getExpenseList} 