const mongoose=require('mongoose')

const treatmentSchema=mongoose.Schema({
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