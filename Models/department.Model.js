const mongoose =  require('mongoose')
const departmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        head: {
            type: String,
            required: true,

        },
        address: {
            type: String,
            required: true
        },
        floor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Floor',
        },
        phone: {
            type:String,
            required: true
        }
    },
    {
        timestamps:true
    }
)
module.exports = mongoose.model('Department', departmentSchema);