const mongoose =  require('mongoose')
const vaccineSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "Subcutaneous",
            enum: ["Intramuscular", "Intravenous", "Subcutaneous"] // enum means string objects
        },
        description: {
            type: String,
            required: true,

        },
        medicine: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Medicine',
        },
        effects: {
            type: String,
            required: true,

        }
    },{
        timestamps:true
    }
)
module.exports = mongoose.model('Vaccine', vaccineSchema);