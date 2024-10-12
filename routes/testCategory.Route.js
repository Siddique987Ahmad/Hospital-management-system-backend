const express=require("express")
const { protect, admin } = require("../middleware/authMiddleware")
const { createTestCategory, testCategoryById, updateTestCategory, deleteTestCategory, listOfTestCategory } = require("../controller/testCategory.Controller")
const { UserById } = require("../controller/user.Controller.js")
const router=express.Router()

router.post("/testcategory/create/:userId",protect,admin,createTestCategory)


router.param('categoryTestId',testCategoryById)
router.get('/testCategory/:categoryTestId', (req, res) => {
    // Respond with the category that was found and stored in req.category by the middleware
    res.json(req.category);
});
router.param('userid',UserById)
// Route that uses the loaded user information
router.get('/testcategory/:userid', (req, res) => {
    // You can now access the user in req.user
    console.log("Route hit for user ID:", req.params.userid);
    res.status(200).json({
        message: 'User information found',
        user: req.user,
    });
});

router.put('/testcategory/update/:id',protect,admin,updateTestCategory)
router.delete('/testcategory/delete/:id',protect,admin,deleteTestCategory)
router.get('/testcategory/list/:id',listOfTestCategory)
module.exports=router
