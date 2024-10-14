const asyncHandler = require("express-async-handler");
const User = require("../Models/user.Model.js");
const Treatment = require("../Models/treatment.Model.js");
//get treatment id
const treatmentById = asyncHandler(async (req, res, next, id) => {
  try {
    const treatment = await Treatment.findById(id);

    if (!treatment) {
      return res.status(400).json({
        error: "not exist treatment id",
      });
    }
    req.treatment = treatment;
    next();
  } catch (error) {
    console.log("error", error);
  }
});
//create treatment
//post private admin
const createTreatment = asyncHandler(async (req, res) => {
  const { name, cost } = req.body;
  const { userid } = req.params;
  if (!name || !cost) {
    res.status(400);
    throw new Error("All fields required");
  }
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }
  const treatment = await Treatment.create({
    name,
    cost,
  });
  if (treatment) {
    res.status(201).json(treatment);
  } else {
    res.status(400);
    throw new Error("not create treatment");
  }
});
//get treatment detail
//get private admin
const getTreatmentDetail = asyncHandler(async (req, res) => {
  // console.log('req.params:', req.params);
  const { treatmentid, userid } = req.params;
  if (!treatmentid || !userid) {
    res.status(400);
    throw new Error("Invalid request: treatmentid or userid missing");
  }
  // console.log('User ID:', userid); // This should print the userid
  if (req.user.id !== userid) {
    res.status(401);
    throw new Error("not authorize user");
  }

  //console.log("treatmentid:",treatmentid)
  const treatment = await Treatment.findById(treatmentid);
  //.populate('user','name email')

  if (!treatment) {
    res.status(404);
    throw new Error("not found treatment details");
  }
  res.status(200).json(treatment);
});
//update treatment
//put private admin
const updateTreatment = asyncHandler(async (req, res) => {
  const { treatmentid } = req.params;
  const treatmentUpdate = await Treatment.findByIdAndUpdate(
    treatmentid,
    req.body,
    { new: true }
  );
  if (!treatmentUpdate) {
    res.status(404);
    throw new Error("not found");
  }
  res.status(200).json(treatmentUpdate);
});
//delete treatment
//delete private admin
const deleteTreatment = asyncHandler(async (req, res) => {
  const { treatmentid } = req.params;
  const treatment = await Treatment.findByIdAndDelete(treatmentid);
  if (!treatment) {
    res.status(404);
    throw new Error("not found");
  }
  res.status(200).json(treatment);
});
//get treatment list
//get private admin
const getTreatmentList=asyncHandler(async(req,res)=>{
    const {userid}=req.params
    const treatment=await Treatment.find({user:userid})
    .populate('user','name email')
    // if(!treatment || treatment.length===0)
    // {
    //     res.status(404)
    //     throw new Error("list not found");
        
    // }
    res.status(200).json(treatment)
})

module.exports = {
  treatmentById,
  createTreatment,
  getTreatmentDetail,
  updateTreatment,
  deleteTreatment,
  getTreatmentList
};
