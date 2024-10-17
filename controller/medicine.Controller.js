const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model')
const Vendor=require('../Models/vendor.Model')
const Medicine=require('../Models/medicine.Model')
//create medicine
//post private admin
const createMedicine=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    const {
        name,
        genericName,
        batchNo,
        barCode,
        description,
        quantity,
        unitWeight,
        type,
        manDate,
        expDate,
        cost,
        retailCost,
        effects,
        vendor
    } = req.body;

    // Validate that the user exists
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
const vendorid=await Vendor.findById(vendor)
if (!vendorid) {
    res.status(404);
    throw new Error("vendor not found");
}
    // Create the new medicine entry
    const medicine = await Medicine.create({
        user:userid,
        name,
        genericName,
        batchNo,
        barCode,
        description,
        quantity,
        unitWeight,
        type,
        manDate,
        expDate,
        cost,
        retailCost,
        effects,
        vendor
    });
if(!medicine)
{
    res.status(404)
    throw new Error("not found medicine");
    
}
    

    res.status(201).json(medicine);
})
//get medicine detail
//get private admin
const getMedicineDetail=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
const medicine=await Medicine.findById(id)
if(!medicine)
{
    res.status(404)
    throw new Error("medicine not found");
    
}
//const expenseDetail=await Expense.findById(id,req.body,{new:true})
res.status(200).json(medicine)
})
//update medicine
//update private admin
const updateMedicine=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
        {
            res.status(404)
            throw new Error("user not found");
        }
        const medicine=await Medicine.findById(id)
        if(!medicine)
        {
            res.status(404)
            throw new Error("medicine not found");
            
        }
        const updatedMedicine=await Medicine.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedMedicine)
            {
                res.status(404)
                throw new Error("updated medicine not found");
                
            }
            res.status(200).json(updatedMedicine)
    
})
//delete medicine
//delete private admin
const deleteMedicine=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const deletedMedicine=await Medicine.findByIdAndDelete(id)

    if(!deletedMedicine)
    {
        res.status(404)
        throw new Error("deleted expense not found");
        
    }

    res.status(200).json(deletedMedicine)

})
//get medicine list
// get private admin
const getMedicineList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }

    const medicineDetail=await Medicine.find({})
    if(!medicineDetail)
    {
        res.status(404)
        throw new Error("medicines not found");
        
    }
    res.status(200).json(medicineDetail)

})
module.exports={createMedicine,getMedicineDetail,updateMedicine,deleteMedicine,getMedicineList} 