const asyncHandler = require("express-async-handler");
const User = require("../Models/user.Model.js");
const Specialization = require("../Models/specialization.Model.js");
//create specialization
//post private admin
const createSpecialization = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  const { name, description } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const specialization = await Specialization.create({
    name,
    description,
  });
  if (!specialization) {
    res.status(404);
    throw new Error("specialization not found");
  }
  res.status(200).json(specialization);
});

//get specialize detail
// get private admin
const getSpecializationDetail = asyncHandler(async (req, res) => {
  const { id, userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const specialization = await Specialization.findById(id);
  if (!specialization) {
    res.status(404);
    throw new Error("specialization not found");
  }
  res.status(200).json({
    _id: specialization._id,
    name: specialization.name,
    description: specialization.description,
  });
});
//update specialize
//put private admin
const updateSpecialization = asyncHandler(async (req, res) => {
  const { id, userid } = req.params;
  const { name, description } = req.body;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const specialization = await Specialization.findById(id);
  if (!specialization) {
    res.status(404);
    throw new Error("specialization not found");
  }
  if (name) specialization.name = name;
  if (description) specialization.description = description;

  const updatedSpecialization = await Specialization.findByIdAndUpdate(
    id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedSpecialization);
});
//delete specialization
//delete private admin
const deleteSpecialization = asyncHandler(async (req, res) => {
  const { id, userid } = req.params;
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const specialization = await Specialization.findById(id);
  if (!specialization) {
    res.status(404);
    throw new Error("specialization not found");
  }
  const deletedSpecialization = await Specialization.deleteOne({ _id: id });
  res.status(200).json(deletedSpecialization);
});
//get list of specialization
//get private admin
const getSpecializationList = asyncHandler(async (req, res) => {
    const { userid } = req.params;

    // Validate the user exists
    const user = await User.findById(userid);
    if (!user) {
        res.status(404);
        throw new Error("User not found");
    }
    const specialization=await Specialization.find({})
    if(!specialization || specialization.length===0)
    {
        res.status(404)
        throw new Error("not found specialization");
        
    }
    res.status(200).json(specialization)
});

module.exports = {
  createSpecialization,
  getSpecializationDetail,
  updateSpecialization,
  deleteSpecialization,
  getSpecializationList
};
