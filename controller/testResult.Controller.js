const asyncHandler = require("express-async-handler");
const TestResult = require("../Models/test.Model.js");
const User = require("../Models/user.Model.js");
const TestCategory = require("../Models/testCategory.Model.js");
const { testCategoryById } = require("./testCategory.Controller.js");
const testById = asyncHandler(async (req, res, next, id) => {
  try {
    const result = await TestResult.findById(id);
    if (!result) {
      return res.status(400).json({
        error: "test result not exist",
      });
    }
    req.result = result;
    next();
  } catch (error) {
    console.error(`Error fetching category: ${err}`); // Debug log
    return res.status(400).json({
      error: "Error fetching Test Category",
    });
  }
});
//create test
//post private admin
const createTest = asyncHandler(async (req, res) => {
  const { testName, result, description, paid } = req.body;
  const { userid } = req.params;

  // Validate the input fields
  if (!testName || !result || !description) {
    res.status(400);
    throw new Error("All fields are requires");
  }

  // Check if the user exists
  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  // Check if the test category exists
  const testedCategory = await TestCategory.findById(testName);
  if (!testedCategory) {
    res.status(404);
    throw new Error("Test category not found");
  }

  // Create the test result
  const testedResults = await TestResult.create({
    user: userid,
    testName: testedCategory._id,
    result,
    description,
    paid: paid || "un-paid",
  });

  if (testedResults) {
    res.status(201).json(testedResults);
  } else {
    res.status(400);
    throw new Error("test result creation failed");
  }
});
//gettestdetail
//get private admin

const getTestDetail = asyncHandler(async (req, res) => {
  const { testId, userid } = req.params;

  const testDetail = await TestResult.findOne({
    _id: testId,
    user: userid,
  })
    .populate("user", "name email")
    .populate("testName", "testName cost");
  if (!testDetail) {
    res.status(400);
    throw new Error("not found test detail");
  }
  res.status(200).json(testDetail);
});

//get user test detail
//get private admin

const getUserTestDetail = asyncHandler(async (req, res) => {
  const { testId, userid } = req.params;

  const testDetail = await TestResult.findOne({
    _id: testId,
    user: userid,
  })
    .populate("user", "name email")
    .populate("testName", "testName cost");
  if (!testDetail) {
    res.status(400);
    throw new Error("not found test detail");
  }
  res.status(200).json(testDetail);
});
//Update Test Result
//put private admin
const updateTestResult = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const updateResult = await TestResult.findByIdAndUpdate(testId, req.body, {
    new: true,
  });
  if (!updateResult) {
    res.status(404);
    throw new Error("Not found");
  }
  res.status(200).json(updateResult);
});
//Delete Test Result
//delete private admin
const deleteTestResult = asyncHandler(async (req, res) => {
  const { testId } = req.params;
  const deleteResult = await TestResult.findByIdAndDelete(testId);
  if (!deleteResult) {
    res.status(404);
    throw new Error("Result not deleted");
  }
  res.status(200).json(deleteResult);
});
//get test result list
//get private admin
const getTestResultList = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  const testResultList = await TestResult.find({user:userid})
  .populate('user','name email')
  .populate('testName','testName cost')
  .sort({ createdAt: -1 });  
  if (!testResultList || testResultList.length===0) {
    res.status(404);
    throw new Error("not found list");
  }
  res.status(200).json(testResultList);
});
//get test result paid values
// get private admin
const getTestResultPaidValues=asyncHandler(async(req,res)=>{
const {userid}=req.params
const getPaidValues=await TestResult.find({user:userid})
.select('paid')
if(!getPaidValues || getPaidValues.length===0)
{
    res.status(404)
    throw new Error("not retrive paid values");
    
}
res.status(200).json(getPaidValues)

})

module.exports = {
  testById,
  createTest,
  getTestDetail,
  getUserTestDetail,
  updateTestResult,
  deleteTestResult,
  getTestResultList,
  getTestResultPaidValues
};
