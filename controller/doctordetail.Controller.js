const asyncHandler=require('express-async-handler')
const User=require('../Models/user.Model.js')
const DoctorDetail=require('../Models/doctorDetail.Model.js')
const Department=require('../Models/department.Model.js')
const Designation=require('../Models/designation.Model.js')
const Specialization=require('../Models/specialization.Model.js')
// create doctor detail
//post private admin
const createDoctorDetail=asyncHandler(async(req,res)=>{
    const { userid } = req.params;
    const {
        lastName,
        idNumber,
        regDate,
        address,
        cell,
        specialization,
        department,
        designation,
        residence,
        email,
        gender,
        duty,
        room,
        fee,
        time_in,
        time_out,
        days
    } = req.body;

    // Validate that the user exists
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Validate the required fields
    if (!idNumber || !regDate || !address || !specialization || !department || !designation || !duty || !room || !fee || !days) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    // Create the new doctor detail
    const doctorDetail = await DoctorDetail.create({
        user: userid,
        lastName,
        idNumber,
        regDate,
        address,
        cell,
        specialization,
        department,
        designation,
        residence,
        email,
        gender,
        duty,
        room,
        fee,
        time_in,
        time_out,
        days
    });
    if(!doctorDetail)
    {
        res.status(404)
        throw new Error("doctor detail not found");
        
    }
    res.status(200).json(doctorDetail)
})
//get doctor detail
//get private admin
const getDoctorDetail=asyncHandler(async(req,res)=>{
    const { id, userid } = req.params;
    const user = await User.findById(userid);
    if (!user) {
      res.status(404);
      throw new Error("user not found");
    }
    const doctorDetail = await DoctorDetail.findById(id);
    if (!doctorDetail) {
      res.status(404);
      throw new Error("doctor not found");
    }
    res.status(200).json({
        _id:doctorDetail._id,
        user:doctorDetail.userid,
        lastName:doctorDetail.lastName,
        idNumber:doctorDetail.idNumber,
        regDate:doctorDetail.regDate,
        address:doctorDetail.address,
        cell:doctorDetail.cell,
        specialization:doctorDetail.specialization,
        department:doctorDetail.department,
        designation:doctorDetail.designation,
        residence:doctorDetail.residence,
        email:doctorDetail.email,
        gender:doctorDetail.gender,
        duty:doctorDetail.duty,
        room:doctorDetail.room,
        fee:doctorDetail.fee,
        time_in:doctorDetail.time_in,
        time_out:doctorDetail.time_out,
        days:doctorDetail.days

    })
})
//update doctor detail
//put private admin
const updateDoctorDetail=asyncHandler(async(req,res)=>{
    const { id,userid } = req.params;
    const {
        lastName,
        idNumber,
        regDate,
        address,
        cell,
        specialization,
        department,
        designation,
        residence,
        email,
        gender,
        duty,
        room,
        fee,
        time_in,
        time_out,
        days
    } = req.body;

    // Validate that the user exists
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }

    // Validate the required fields
    // if (!idNumber || !regDate || !address || !specialization || !department || !designation || !duty || !room || !fee || !days) {
    //     res.status(400);
    //     throw new Error("Please provide all required fields");
    // }
    const doctorDetail = await DoctorDetail.findById(id);
  if (!doctorDetail) {
    res.status(404);
    throw new Error("doctor not found");
  }
  //if (idNumber) doctorDetail.idNumber = idNumber;
  const updatedDoctorDetail=await DoctorDetail.findByIdAndUpdate(id,req.body,{new:true})
  if(!updatedDoctorDetail)
  {
    res.status(404)
    throw new Error("not found");
    
  }
  res.status(200).json(updatedDoctorDetail)
})
//delete doctor detail
//delete private admin
const deleteDoctorDetail=asyncHandler(async(req,res)=>{
    const { id, userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const doctorDetail = await DoctorDetail.findById(id);
  if (!doctorDetail) {
    res.status(404);
    throw new Error("doctor not found");
  }
  const deletedDoctorDetail = await DoctorDetail.deleteOne({ _id: id });
  res.status(200).json(deletedDoctorDetail);

})
//get doctor details list
//get private admin
const getDoctorDetailList=asyncHandler(async(req,res)=>{
    const { userid } = req.params;

    // Validate the user exists
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const doctorDetail=await DoctorDetail.find({})
    if(!doctorDetail || doctorDetail.length===0)
    {
        res.status(404)
        throw new Error("not found doctors");
        
    }
    res.status(200).json(doctorDetail)
})
module.exports={createDoctorDetail,getDoctorDetail,updateDoctorDetail,deleteDoctorDetail,getDoctorDetailList}