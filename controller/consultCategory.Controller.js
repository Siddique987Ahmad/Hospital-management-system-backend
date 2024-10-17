const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model')
const ConsultCategory=require('../Models/consultCategory.Model')
//create consult category
//post private admin
const createConsultCategory=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    const { name,description,cost } = req.body;
  
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
    const consultCategory =await ConsultCategory.create({
      user:userid,
      name,
      description,
      cost
    });
if(!consultCategory)
    {
        res.status(404)
        throw new Error("consult category not found");
        
    }  
    res.status(201).json(consultCategory);
  
})
//get consult category detail
//get private admin
const getConsultCategoryDetail=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
const consultCategory=await ConsultCategory.findById(id)
if(!consultCategory)
{
    res.status(404)
    throw new Error("consult category not found");
    
}
//const expenseDetail=await Expense.findById(id,req.body,{new:true})
res.status(200).json(consultCategory)
})
//update consult category
//update private admin
const updateConsultCategory=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
        {
            res.status(404)
            throw new Error("user not found");
        }
        const consultCategory=await ConsultCategory.findById(id)
        if(!consultCategory)
        {
            res.status(404)
            throw new Error("consult category not found");
            
        }
        const updatedConsultCategory=await ConsultCategory.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedConsultCategory)
            {
                res.status(404)
                throw new Error("updated consult category not found");
                
            }
            res.status(200).json(updatedConsultCategory)
    
})
//delete consult category
//delete private admin
const deleteConsultCategory=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const deletedConsultCategory=await ConsultCategory.findByIdAndDelete(id)

    if(!deletedConsultCategory)
    {
        res.status(404)
        throw new Error("deleted consult category not found");
        
    }

    res.status(200).json(deletedConsultCategory)

})
//get consult category list
// get private admin
const getConsultCategoryList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }

    const consultCategoryDetail=await ConsultCategory.find({})
    if(!consultCategoryDetail)
    {
        res.status(404)
        throw new Error("consult category not found");
        
    }
    res.status(200).json(consultCategoryDetail)

})
module.exports={createConsultCategory,getConsultCategoryDetail,updateConsultCategory,deleteConsultCategory,getConsultCategoryList} 