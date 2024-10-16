const mongoose =  require('mongoose')
const floorSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            
        },
        floorCode: {
            type: String,
            required: true,

        },
        building: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Building',
        },
    },{
        timestamps:true
    }
)





module.exports = mongoose.model('Floor', floorSchema);