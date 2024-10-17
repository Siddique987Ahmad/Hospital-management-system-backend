const mongoose =  require('mongoose')
const vendorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        address: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,

        },
        number: {
            type: Number,
            required: true
        }
    },{
        timestamps:true
    }
)





module.exports = mongoose.model('Vendor', vendorSchema);