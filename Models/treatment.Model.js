const mongoose=require('mongoose')

const treatmentSchema=mongoose.Schema({
    user:{
type:mongoose.Schema.Types.ObjectId,
ref:'User'
    },
    name:{
        type:String,
        required:true
    },
    cost:{
        type:Number,
        required:true
    }

},{
    timestamps:true
})

module.exports=mongoose.model("Treatment",treatmentSchema) 