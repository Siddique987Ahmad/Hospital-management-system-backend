const mongoose=require('mongoose')

const patientDetailSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    lastName:{
        type:String,
        required:true
    },
    idNumber:{
        type:Number,
        required:true
    },
    regDate:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    birthDate:{
        type:String,
        required:true
    },
    residence:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    guardian:{
        type:String,
        required:true
    },
    relation:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:"Male",
        enum:["Male","Female"],
        required:true
    },
    statusPatient:{
        type:String,
        default:"Cured",
        enum:["Cured","Under Treatment"],
        required:true
    },
    patientType:{
        type:String,
        default:"In Patient",
        enum:["In Patient","Out Treatment"],
        required:true

    }
},{
    timestamps:true
})

module.exports=mongoose.model("PatientDetail",patientDetailSchema)