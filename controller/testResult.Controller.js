const asyncHandler=require('express-async-handler')
const TestResult=require('../Models/test.Model.js')
const User=require('../Models/user.Model.js')
const TestCategory=require('../Models/testCategory.Model.js')
const { testCategoryById } = require('./testCategory.Controller.js')
const testById=asyncHandler(async(req,res,next,id)=>{
    try {
        const result=await TestResult.findById(id)
        if(!result)
        {
           return res.status(400).json({
                error:"test result not exist"
            })
        }
        req.result=result
        next()

    } catch (error) {
        console.error(`Error fetching category: ${err}`);  // Debug log
        return res.status(400).json({
            error: 'Error fetching Test Category',
        });
    }
})
const createTest = asyncHandler(async (req, res) => {
    const {testName,result,description,paid}=req.body
    const {userid}=req.params

    // Validate the input fields
    if(!testName || !result || !description)
    {
        res.status(400)
        throw new Error("All fields are requires")
    }

    // Check if the user exists
    const user=await User.findById(userid)
    if (!user) {
        res.status(404)
        throw new Error("user not found");
        
    }

    // Check if the test category exists
    const testedCategory=await TestCategory.findById(testName)
    if (!testedCategory) {
        res.status(404)
        throw new Error("Test category not found");
        
    }

    // Create the test result
    const testedResults=await TestResult.create({
        user:userid,
        testName:testedCategory._id,
        result,
        description,
        paid:paid || 'un-paid'
    })


    if(testedResults)
    {
        res.status(201).json(testedResults)
    }
    else{
        res.status(400)
        throw new Error("test result creation failed");
        
    }
});


module.exports={testById,createTest} 




