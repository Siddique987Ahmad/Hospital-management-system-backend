const mongoose=require("mongoose")
//const {objectId}=mongoose.Schema

const testResultSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    testName:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'TestCategory'
    },
    result:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    paid:{
        type:String,
        default:"un-paid",
        enum:["paid","un-paid"]
    }
},{
    timestamps:true
})

module.exports=mongoose.model("TestResult",testResultSchema)