const mongoose =  require('mongoose')
const consultationSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'ConsultCategory',
        },
        description: {
            type: String,
            required: true
        },
        paid: {
            type: String,
            default: "Un-paid",
            enum: ["Un-paid", "Paid"]
        },
        approved: {
            type: Boolean,
            default: false
        },
        doc: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'DoctorDetail',
        }
    },{
        timestamps:true
    }
)
module.exports = mongoose.model('Consultation', consultationSchema);