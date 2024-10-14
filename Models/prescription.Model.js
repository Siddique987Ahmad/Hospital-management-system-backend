const mongoose=require('mongoose')

const prescriptionSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    treatment:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Treatment'
    },
    medicine:{
        type:String,
        required:true
    },
    time:{
        type:Number,
        required:true
    },
    days:{
        type:Number,
        required:true
    },
    take:{
        type:String,
        default:'Morning',
        enum:['Morning','Midday','Evening']
    },
    test:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'TestResult'
    },
    paid:{
        type:String,
        default:"Paid",
        enum:['Paid','Un-paid']
    },
    history:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports=mongoose.model("Prescription",prescriptionSchema) 