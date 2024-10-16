const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model.js')
const Floor=require('../Models/floor.Model.js')
const Department=require('../Models/department.Model.js')
//create department
//post private admin
const createDepartment=asyncHandler(async(req,res)=>{
    const { name, head, address, floor, phone } = req.body; // Destructure the fields from request body
    const { userid } = req.params; // Get user ID from route params

    // Validate user (optional)
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    // Validate required fields
    if (!name || !head || !address || !floor || !phone) {
        res.status(400);
        throw new Error('All fields are required');
    }
    const existedFloor=await Floor.findById(floor)
    if(!existedFloor)
    {
        res.status(404)
        throw new Error("floor not found");
        
    }
    const department=await Department.create({
        name,
        head,
        address,
        floor,
        phone
    })
res.status(200).json(department)
})
//get department detail
//get private admin
const getDepartmentDetail=asyncHandler(async(req,res)=>{
const {id,userid}=req.params
const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const department=await Department.findById(id)
if(!department)
{
    res.status(404)
    throw new Error("department not found");
    
}
res.status(200).json({
    _id:department._id,
    name:department.name,
    head:department.head,
    address:department.address,
    floor:department.floor,
    phone:department.phone
})

})
//update department 
//put private admin
const updateDepartment=asyncHandler(async(req,res)=>{
const {id,userid}=req.params
const {name,head,address,floor,phone}=req.body
const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
const department=await Department.findById(id)
if(!department)
{
    res.status(404)
    throw new Error("department not found");
    
}
if(name) department.name=name
if(head) department.head=head
if(address) department.address=address
if(floor) department.floor=floor
if(phone) department.phone=phone

const updatedDepartment=await Department.findByIdAndUpdate(id,req.body,{new:true})
res.status(200).json(updatedDepartment)

})
// delete department
//delete private admin
const deleteDepartment=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const department=await Department.findById(id)
    if(!department)
    {
        res.status(404)
        throw new Error("department not found");
        
    }
    await Department.deleteOne({_id:id})
    res.status(200).json({
        message:"department to this deleted"
    })
})
//get department list
//get private admin
const getDepartmentList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const departments=await Department.find().populate('floor','name building')
    if(!departments || departments.length===0)
    {
        res.status(404)
        throw new Error("departments not found");
        
    }
    res.status(200).json(departments)
})

module.exports={createDepartment,getDepartmentDetail,updateDepartment,deleteDepartment,getDepartmentList}