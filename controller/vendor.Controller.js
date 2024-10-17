const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model.js')
const Vendor=require('../Models/vendor.Model.js')
//create vendor
//post private admin
const createVendor=asyncHandler(async(req,res)=>{
const {userid}=req.params
const {name,address,email,number}=req.body
const user=await User.findById(userid)
if(!user)
{
    res.status(404)
    throw new Error("user not found");
    
}
if(!name || !address || !email || !number)
{
    res.status(404)
    throw new Error("fields required");
}

const vendor=await Vendor.create({
    user:userid,
    name,
    address,
    email,
    number
})
if(!vendor)
{
    res.status(404)
    throw new Error("vendor not found");
    
}
res.status(200).json(vendor)


})
//get vendor detail
//get private admin
const getVendorDetail=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
    }
    const vendor=await Vendor.findById(id)
    if(!vendor)
    {
        res.status(404)
        throw new Error("vendor not found");
        
    }
    res.status(200).json(vendor)
})
//update vendor
//put private admin
const updateVendor=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    //const {name,address,email,number}=req.body
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const vendor=await Vendor.findById(id)
    
    if(!vendor)
    {
        res.status(404)
        throw new Error("vendor not found");
        
    }
    const updatedVendor=await Vendor.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedVendor)
    {
        res.status(404)
        throw new Error("updated vendor not found");
        
    }
    res.status(200).json(updatedVendor)

})
//delete vendor
//delete private admin
const deleteVendor=asyncHandler(async(req,res)=>{
    const {id,userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    // const vendor=await Vendor.findById(id)
    // if(!vendor)
    // {
    //     res.status(404)
    //     throw new Error("vendor not found");
        
    // }
    const deletedVendor=await Vendor.findByIdAndDelete(id)

    if(!deletedVendor)
    {
        res.status(404)
        throw new Error("deleted vendor not found");
        
    }

    res.status(200).json(deletedVendor)

})
//get vendor list
//get private admin
const getVendorList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }

    const vendorDetail=await Vendor.find({})
    if(!vendorDetail)
    {
        res.status(404)
        throw new Error("vendors not found");
        
    }
    res.status(200).json(vendorDetail)

})

module.exports={createVendor,getVendorDetail,updateVendor,deleteVendor,getVendorList} 