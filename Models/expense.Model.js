const mongoose =  require('mongoose')
const expenseSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Department',
        },
        amount: {
            type: Number,
            required: true,
            default: 0.0,
        },
        description: {
            type: String,
            required: true
        },
        fromDate: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        paid: {
            type: String,
            default: "Un-paid",
            enum: ["Un-paid", "Paid"]
        },
    },{
        timestamps:true
    }
)
module.exports = mongoose.model('Expense', expenseSchema);