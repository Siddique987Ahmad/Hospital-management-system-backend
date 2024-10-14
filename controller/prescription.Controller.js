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
const createPrescription = asyncHandler(async (req, res) => {});
//get prescription detail
//get private admin
const getPrescriptionDetail = asyncHandler(async (req, res) => {});
//get prescription user detail
//get private admin
const getPrescriptionUserDetail = asyncHandler(async (req, res) => {});
//update prescription
//put private admin
const updatePrescription = asyncHandler(async (req, res) => {});
//delete prescription
//delete private admin
const deletePrescription = asyncHandler(async (req, res) => {});
//get list of prescription
//get private admin
const getListOfPrescription=asyncHandler(async(req,res)=>{})
//get take values
//get private admin
const getTakeValues=asyncHandler(async(req,res)=>{})
//get paid values
//get private admin
const getPaidValues=asyncHandler(async(req,res)=>{})
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
