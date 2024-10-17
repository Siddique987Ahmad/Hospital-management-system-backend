const mongoose =  require('mongoose')
const vaccineAppointmentSchema = mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'PatientDetail',
        },
        nurse: {
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        vaccine: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Vaccine',
        },
        date: {
            type: String,
            required: true
        },
        time_in: {
            type: String
        },
        taken: {
            type: String,
            default: "Yes",
            enum: ["Yes", "No"] // enum means string objects
        },
        day: {
            type: String,
            default: "Morning",
            enum: ["Evening", "Morning"]
        },
        room: {
            type: String,
            required: true,

        },
        remarks: {
            type: String,
            required: true,

        }
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model('VaccineAppointment', vaccineAppointmentSchema);