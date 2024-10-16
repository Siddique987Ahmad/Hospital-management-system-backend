const asyncHandler = require("express-async-handler");
const User = require("../Models/user.Model.js");
const Designation=require('../Models/designation.Model.js')
//create designation
//post private admin
const createDesignation = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  const { name, description } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const designation = await Designation.create({
    name,
    description,
  });
  if (!designation) {
    res.status(404);
    throw new Error("designation not found");
  }
  res.status(200).json(designation);
});

//get designation detail
// get private admin
const getDesignationDetail = asyncHandler(async (req, res) => {
  const { id, userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const designation = await Designation.findById(id);
  if (!designation) {
    res.status(404);
    throw new Error("designation not found");
  }
  res.status(200).json({
    _id: designation._id,
    name: designation.name,
    description: designation.description,
  });
});
//update designation
//put private admin
const updateDesignation = asyncHandler(async (req, res) => {
  const { id, userid } = req.params;
  const { name, description } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const designation = await Designation.findById(id);
  if (!designation) {
    res.status(404);
    throw new Error("designation not found");
  }
  if (name) designation.name = name;
  if (description) designation.description = description;

  const updatedDesignation = await Designation.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedDesignation);
});
//delete designation
//delete private admin
const deleteDesignation = asyncHandler(async (req, res) => {
  const { id, userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const designation = await Designation.findById(id);
  if (!designation) {
    res.status(404);
    throw new Error("designation not found");
  }
  const deletedDesignation = await Designation.deleteOne({ _id: id });
  res.status(200).json(deletedDesignation);
});
//get list of designation
//get private admin
const getDesignationList = asyncHandler(async (req, res) => {
    const { userid } = req.params;

    // Validate the user exists
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const designation=await Designation.find({})
    if(!designation || designation.length===0)
    {
        res.status(404)
        throw new Error("not found designation");
        
    }
    res.status(200).json(designation)
});

module.exports = {
  createDesignation,
  getDesignationDetail,
  updateDesignation,
  deleteDesignation,
  getDesignationList
};
