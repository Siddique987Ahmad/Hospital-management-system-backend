const mongoose=require("mongoose")

const testCategorySchema=mongoose.Schema({
    testName:{
        type:String,
        required:true
    },
    minValue:{
        type:Number,
        required:true,
        default:0.0
    },
    maxValue:{
        type:Number,
        required:true,
        default:100.0
    },
    cost:{
        type:Number,
        required:true,
        default:0.0
    },
    description:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("TestCategory",testCategorySchema) 