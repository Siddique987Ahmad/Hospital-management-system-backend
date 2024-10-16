const mongoose=require('mongoose')

const buildingSchema=mongoose.Schema({
    name: {
            type: String,
            required: true

        },
        code: {
            type: String,
            required: true,

        },
        description: {
            type: String,
            required: true
        }
},{timestamps:true})


module.exports=mongoose.model('Building',buildingSchema) 