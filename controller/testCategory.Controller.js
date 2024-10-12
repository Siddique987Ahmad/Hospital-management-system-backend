const testCategory=require('../Models/testCategory.Model')
const asyncHandler=require('express-async-handler')
//post create test
//private /admin
const createTestCategory=asyncHandler(async(req,res)=>{
    const {testName,minValue,maxValue,cost,description}=req.body

    if(!testName || !minValue || !maxValue || !cost || !description)
    {
        res.status(400)
        throw new Error("fields required");
        
    }

    const createdTest=await testCategory.create({
        testName,
        minValue,
        maxValue,
        cost,
        description
    })
    // if (createdTest) {
    //     res.json({
    //         id:createdTest.id,
    //         testName:createdTest.testName,
    //         minValue:createdTest.minValue,
    //         maxValue:createdTest.maxValue,
    //         cost:createdTest.cost,
    //         description:createdTest.description
    //     })
        
    // }
    // else
    // {
    //     res.status(400)
    //     throw new Error("Not created invalid");
        
    // }

res.status(200).json(createdTest)



})
// const testCategoryById=asyncHandler(async(req,res,next,id)=>{
//     await testCategory.findById(id).exec((err,category)=>{
//         if (err || !category) {
//             return res.status(400).json({
//                 error: ' Test Category does not exist'
//             });
//         }
//         req.category=category
//         next()
//     })
// })


//get gettestcategorybyid
const testCategoryById = asyncHandler(async (req, res, next, id) => {
    console.log(`Fetching category with ID: ${id}`);  // Debug log
    try {
        const category = await testCategory.findById(id);
        if (!category) {
            return res.status(400).json({
                error: 'Test Category does not exist',
            });
        }
        req.category = category;
        next();
    } catch (err) {
        console.error(`Error fetching category: ${err}`);  // Debug log
        return res.status(400).json({
            error: 'Error fetching Test Category',
        });
    }
});

const updateTestCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const updateCategory=await testCategory.findByIdAndUpdate(id,req.body,{new:true})
    if(!updateCategory)
    {
        res.status(400)
        throw new Error("invalid data");
        
    }
    res.status(200).json(updateCategory)

})
const deleteTestCategory=asyncHandler(async(req,res)=>{
    const {id}=req.params
    const deletedTestCategory=await testCategory.findByIdAndDelete(id)
    if(!deletedTestCategory)
    {
        res.status(400)
        throw new Error("invalid data");
        
    }
    res.status(200).json(deletedTestCategory)
})
const listOfTestCategory=asyncHandler(async(req,res)=>{
    const list=await testCategory.find()
    res.status(200).json(list)
})
module.exports={
    createTestCategory,testCategoryById,updateTestCategory,deleteTestCategory,listOfTestCategory
} 