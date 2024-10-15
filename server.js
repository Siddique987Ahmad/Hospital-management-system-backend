const express=require("express")
const dotenv=require('dotenv').config()
const cors=require('cors')
const dbConnection=require('./db/dbConnection')

const app=express()
dbConnection()
const port=process.env.PORT || 5000

// app.get("/",(req,res)=>{
//     res.send("hello")
// })
//import Routes
const userRoute=require('./routes/user.Route.js')
const testCategoryRoute=require('./routes/testCategory.Route.js')
const testResultRoute=require('./routes/testResult.Route.js')
const treatmentRoute=require('./routes/treatment.Route.js')
const prescriptionRoute=require('./routes/prescription.Route.js')
const patientDetailRoute=require('./routes/patientDetail.Route.js')
//middleware
app.use(express.json())
app.use(cors())
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(err.status || 500).json({ error: err.message });
});

//Routes middleware
app.use('/api',userRoute)
app.use('/api',testCategoryRoute)
app.use('/api',testResultRoute)
app.use('/api',treatmentRoute)
app.use('/api',prescriptionRoute)
app.use('/api',patientDetailRoute)
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
