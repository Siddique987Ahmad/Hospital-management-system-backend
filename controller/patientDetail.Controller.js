const asyncHandler = require("express-async-handler");
const User = require("../Models/user.Model.js");
const PatientDetail = require("../Models/patientDetail.Model.js");

const patientDetailById = asyncHandler(async (req, res, next, id) => {
  try {
    const patient = await PatientDetail.findById(id);
    if (!patient) {
      return res.status(400).json({
        error: "patient id not found",
      });
    }
    req.patient = patient;
    next();
  } catch (error) {
    console.log("server error", error);
  }
});
//create patient detail
//post private admin
const createPatientDetail = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  const {
    lastName,
    idNumber,
    regDate,
    address,
    phoneNumber,
    birthDate,
    residence,
    email,
    guardian,
    relation,
    gender,
    statusPatient,
    patientType,
  } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const patient = await PatientDetail.create({
    user: userid,
    lastName,
    idNumber,
    regDate,
    address,
    phoneNumber,
    birthDate,
    residence,
    email,
    guardian,
    relation,
    gender,
    statusPatient,
    patientType,
  });
  if (patient) {
    res.status(200).json({
      _id: patient._id,
      user: patient.userid,
      lastName: patient.lastName,
      idNumber: patient.idNumber,
      regDate: patient.regDate,
      address: patient.address,
      phoneNumber: patient.phoneNumber,
      birthDate: patient.birthDate,
      residence: patient.residence,
      email: patient.email,
      guardian: patient.guardian,
      relation: patient.relation,
      gender: patient.gender,
      statusPatient: patient.statusPatient,
      patientType: patient.patientType,
    });
  } else {
    res.status(404);
    throw new Error("patient detail not created");
  }
});
//Get patient detail
// get private admin
const getPatientDetail = asyncHandler(async (req, res) => {
  const { patientid, userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const patient = await PatientDetail.findOne({
    _id: patientid,
    user: userid,
  }).populate("user", "name email");
  if (!patient) {
    res.status(404);
    throw new Error("patient not found");
  }
  res.status(200).json(patient);
});
//update patient detail
//put private admin
const updatePatientDetail = asyncHandler(async (req, res) => {
  const { patientid, userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const updatedPatientDetails = await PatientDetail.findByIdAndUpdate(
    patientid,
    req.body,
    { new: true }
  );
  if (!updatedPatientDetails) {
    res.status(404);
    throw new Error("updated patient not found");
  }
  res.status(200).json(updatedPatientDetails);
});
//delete patient detail
// delete private admin
const deletePatientDetail = asyncHandler(async (req, res) => {
  const { patientid } = req.params;
  const deletedPatient = await PatientDetail.findByIdAndDelete(patientid);
  if (!deletedPatient) {
    res.status(404);
    throw new Error(" patient not found");
  }
  res.status(200).json(deletedPatient);
});
//get patient detail list
//get private admin
const getPatientDetailList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const patientList=await PatientDetail.find({user:userid})
    .populate('user','name email')
    if(!patientList || patientList.length===0)
    {
        res.status(404)
        throw new Error("patient list not found");
        
    }
    res.status(200).json(patientList)
})
//get status values
//get private admin
const getStatusValues=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const statusValues=await PatientDetail.find({user:userid}).distinct('statusPatient')
    const patientTypeValues = await PatientDetail.find({ user: userid }).distinct('patientType');
    if(!statusValues || statusValues.length===0)
        {
            res.status(404)
            throw new Error("patient list not found");
            
        }
        res.status(200).json(statusValues)
})
//get patient type
//get private admin
const getPatientTypeValues=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const patientTypeValues = await PatientDetail.find({ user: userid }).distinct('patientType');
    if(!patientTypeValues || patientTypeValues.length===0)
        {
            res.status(404)
            throw new Error("patient list not found");
            
        }
        res.status(200).json(patientTypeValues)
})
//get gender value
//get private admin
const getGenderValues=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const user=await User.findById(userid)
    if(!user)
    {
        res.status(404)
        throw new Error("user not found");
        
    }
    const genderValues = await PatientDetail.find({ user: userid }).distinct('gender');
    if(!genderValues || genderValues.length===0)
        {
            res.status(404)
            throw new Error("patient list not found");
            
        }
        res.status(200).json(genderValues)
})

module.exports = {
  patientDetailById,
  createPatientDetail,
  getPatientDetail,
  updatePatientDetail,
  deletePatientDetail,
  getPatientDetailList,
  getStatusValues,
  getPatientTypeValues,
  getGenderValues
};
