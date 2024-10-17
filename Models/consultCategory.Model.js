const mongoose =  require('mongoose')
const consultCategorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,

        },
        cost: {
            type: Number,
            required: true,
            default: 0.0,
        }
    },{
        timestamps:true
    }
)
module.exports = mongoose.model('ConsultCategory', consultCategorySchema);