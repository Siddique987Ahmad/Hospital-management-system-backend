const mongoose = require("mongoose");

const specializationSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },{
        timestamps:true
    }
)



module.exports = mongoose.model('Specialization', specializationSchema)