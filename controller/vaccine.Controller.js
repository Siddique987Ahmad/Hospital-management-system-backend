const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model')
const Medicine=require('../Models/medicine.Model')
const Vaccine=require('../Models/vaccine.Model')
//create vaccine
//post private admin
const createVaccine=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    const { name, type, description, medicine, effects } = req.body;
    // Validate that the user exists
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
const medicineid=await Medicine.findById(medicine)
if (!medicineid) {
    res.status(404);
    throw new Error("medicine not found");
}
    // Create the new medicine entry
    const vaccine = await Vaccine.create({
        user:userid,
        name,
        type,
        description,
        medicine,
        effects,
    });
if(!vaccine)
{
    res.status(404)
    throw new Error("not found vaccine");   
}
 res.status(201).json(vaccine);
})
//get vaccine detail
//get private admin
const getVaccineDetail=asyncHandler(async(req,res)=>{
    const {userid,id}=req.params
    const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
}
const vaccine=await Vaccine.findById(id)
if(!vaccine)
{
    res.status(404)
    throw new Error("vaccine not found");
    
}
//const expenseDetail=await Expense.findById(id,req.body,{new:true})
res.status(200).json(vaccine)
})
//update vaccine
//update private admin
const updateVaccine=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
        {
            res.status(404)
            throw new Error("user not found");
        }
        const vaccine=await Vaccine.findById(id)
        if(!vaccine)
        {
            res.status(404)
            throw new Error("vaccine not found");
            
        }
        const updatedVaccine=await Vaccine.findByIdAndUpdate(id,req.body,{new:true})
        if(!updatedVaccine)
            {
                res.status(404)
                throw new Error("updated vaccine not found");
                
            }
            res.status(200).json(updatedVaccine)
    
})
//delete vaccine
//delete private admin
const deleteVaccine=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const deletedVaccine=await Vaccine.findByIdAndDelete(id)

    if(!deletedVaccine)
    {
        res.status(404)
        throw new Error("deleted vaccine not found");
        
    }

    res.status(200).json(deletedVaccine)

})
//get vaccine list
// get private admin
const getVaccineList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }

    const vaccineDetail=await Vaccine.find({})
    if(!vaccineDetail)
    {
        res.status(404)
        throw new Error("vaccines not found");
        
    }
    res.status(200).json(vaccineDetail)

})
module.exports={createVaccine,getVaccineDetail,updateVaccine,deleteVaccine,getVaccineList} 