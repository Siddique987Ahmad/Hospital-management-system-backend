const mongoose =  require('mongoose')
const doctorDetailSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        lastName: {
            type: String
        },
        idNumber: {
            type: Number,
            required: true,

        },
        regDate: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        cell: {
            type: String
        },
        specialization: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Specialization',
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Department',
        },
        designation: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Designation',
        },
        residence: {
            type: String
        },
        email: {
            type: String
        },
        gender: {
            type: String,
            default: "Male",
            enum: ["Male", "Female"] // enum means string objects
        },
        duty: {
            type: String,
            default: "Morning",
            enum: ["Evening", "Morning"],
            required: true,
        },
        room: {
            type: String,
            required: true,

        },
        fee: {
            type: Number,
            required: true,

        },
        time_in: {
            type: String
        },
        time_out: {
            type: String
        },
        days: {
            type: String,
            default: "Monday",
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true,
        },
        
    },
    {
        timestamps:true
    }
)





module.exports = mongoose.model('DoctorDetail', doctorDetailSchema);