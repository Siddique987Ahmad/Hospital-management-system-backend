const asyncHandler = require("express-async-handler");
const Prescription = require("../Models/prescription.Model.js");
const User = require("../Models/user.Model.js");
const Treatment = require("../Models/treatment.Model.js");
const TestResult = require("../Models/test.Model.js");

const prescriptionById = asyncHandler(async (req, res, next, id) => {
  try {
    const prescription = await Prescription.findById(id);
    if (!prescription) {
      return res.status(400).json({
        error: "id not found",
      });
    }
    req.prescription = prescription;
    next();
  } catch (error) {
    console.log("error", error);
  }
});
//create prescription
//post private admin
const createPrescription = asyncHandler(async (req, res) => {

  const {userid}=req.params
  const {treatment,medicine,time,days,take,test,paid,history}=req.body

  const userExist=await User.findById(userid)
  if(!userExist)
  {
    res.status(404)
    throw new Error("user not found");
    
  }
  const treatmentExist=await Treatment.findById(treatment)
  if(!treatmentExist)
  {
    res.status(404)
    throw new Error("treatment not found");
  }
const testResults=await TestResult.findById(test)
if(!testResults)
  {
    res.status(404)
    throw new Error("test not found");
  }
  const prescription=await Prescription.create({
    user:userid,
    treatment,
    medicine,
    time,
    days,
    take,
    test,
    paid,
    history
  })
  if (prescription) {
    res.status(201).json({
      _id:prescription._id,
      user:prescription.userid,
      treatment:prescription.treatment,
      medicine:prescription.medicine,
      time:prescription.time,
      days:prescription.days,
      take:prescription.take,
      test:prescription.test,
      paid:prescription.paid,
      history:prescription.history
    })
  }
  else {
    res.status(400);
    throw new Error("Invalid prescription data");
}

});
//get prescription detail
//get private admin
const getPrescriptionDetail = asyncHandler(async (req, res) => {
  const {prescriptionid,userid}=req.params
  const user=await User.findById(userid)
  if(!user)
  {
    res.status(404)
    throw new Error("user not found");
    
  }

  const prescription=await Prescription.findOne({_id:prescriptionid,user:userid})
  .populate('user','name email')
  .populate('treatment','name cost')
  .populate('test','testName result description')

  if(!prescription)
  {
    res.status(404)
    throw new Error("prescription not found");
    
  }
  res.status(200).json(prescription)




});
//get prescription user detail
//get private admin
const getPrescriptionUserDetail = asyncHandler(async (req, res) => {
  const {prescriptionid,userid}=req.params
  const user=await User.findById(userid)
  if(!user)
  {
    res.status(404)
    throw new Error("user not found");
    
  }

  const prescription=await Prescription.findOne({_id:prescriptionid,user:userid})
  .populate('user','name email')
  .populate('treatment','name cost')
  .populate('test','testName result description')

  if(!prescription)
  {
    res.status(404)
    throw new Error("prescription not found");
    
  }
  res.status(200).json(prescription)


});
//update prescription
//put private admin
const updatePrescription = asyncHandler(async (req, res) => {
  const {prescriptionid,userid}=req.params
  const user=await User.findById(userid)
  if(!user)
  {
    res.status(404)
    throw new Error("user not found");
    
  }
const updateprescription=await Prescription.findByIdAndUpdate(prescriptionid,req.body,{new:true})
if(!updateprescription)
{
  res.status(404)
  throw new Error("prescription not found");
  
}
res.status(200).json(updateprescription)

});
//delete prescription
//delete private admin
const deletePrescription = asyncHandler(async (req, res) => {
  const {prescriptionid}=req.params
  const deletedPrescription=await Prescription.findByIdAndDelete(prescriptionid)
  if(!deletedPrescription)
  {
    res.status(404)
    throw new Error("prescription id not found or deleted");
    
  }
  res.status(200).json(deletedPrescription)
});
//get list of prescription
//get private admin
const getListOfPrescription=asyncHandler(async(req,res)=>{
  const {userid}=req.params
  const user=await User.findById(userid)
  if(!user)
  {
    res.status(404)
    throw new Error("not found user");
    
  }
  const prescription=await Prescription.find({user:userid})
  .populate('user','name email')
  .populate('treatment','name cost')
  .populate('test','testName result description')
  // if(!prescription)
  // {
  //   res.status(404)
  //   throw new Error("not found prescription");
    
  // }
  if (!prescription || prescription.length === 0) {
    res.status(404);
    throw new Error("No prescriptions found for this user");
}
  res.status(200).json(prescription)

})
//get take values
//get private admin
const getTakeValues=asyncHandler(async(req,res)=>{
  const {userid}=req.params
  const user=await User.findById(userid)
  if(!user)
  {
    res.status(404)
    throw new Error("user not found");
    
  }
  const takeValues=await Prescription.find({user:userid}).distinct('take')
  if (!takeValues || takeValues.length === 0) {
    res.status(404);
    throw new Error("No prescriptions found for this user");
}
res.status(200).json(takeValues)


})
//get paid values
//get private admin
const getPaidValues=asyncHandler(async(req,res)=>{
  const {userid}=req.params
  const user=await User.findById(userid)
  if(!user)
  {
    res.status(404)
    throw new Error("user not found");
    
  }
  const paidValues=await Prescription.find({user:userid}).distinct('paid')
  if (!paidValues || paidValues.length === 0) {
    res.status(404);
    throw new Error("No prescriptions found for this user");
}
res.status(200).json(paidValues)

})
module.exports = {
  prescriptionById,
  createPrescription,
  getPrescriptionDetail,
  getPrescriptionUserDetail,
  updatePrescription,
  deletePrescription,
  getListOfPrescription,
  getTakeValues,
  getPaidValues
};
