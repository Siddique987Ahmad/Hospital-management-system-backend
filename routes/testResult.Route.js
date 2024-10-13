const express=require('express')
const router=express.Router()
const {testById,createTest}=require('../controller/testResult.Controller.js')
const {UserById}=require('../controller/user.Controller')
const { protect, admin } = require('../middleware/authMiddleware.js')


router.post('/createtest/:userid',protect,admin,createTest)
router.get('/testresult/:testId',(req,res)=>{
    res.json(req.result)
})
router.param('testId',testById)
router.param('userid',UserById)
router.get('/user/:userid', (req, res) => {
    res.status(200).json(req.user);  // Use the user that is attached to req by middleware
});
module.exports=router 