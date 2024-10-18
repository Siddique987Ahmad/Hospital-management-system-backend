const express=require("express")
const dotenv=require('dotenv').config()
const cors=require('cors')
const path=require('path')
const fs=require('fs')
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
const uploadRoute=require('./routes/upload.Route.js')
const buildingRoute=require('./routes/building.Route.js')
const floorRoute=require('./routes/floor.Route.js')
const departmentRoute=require('./routes/department.Route.js')
const specializationRoute=require('./routes/specialization.Route.js')
const designationRoute=require('./routes/designation.Route.js')
const doctorDetailRoute=require('./routes/doctordetail.Route.js')
const vendorRoute=require('./routes/vendor.Route.js')
const expenseRoute=require('./routes/expense.Route.js')
const medicineRoute=require('./routes/medicine.Route.js')
const vaccineRoute=require('./routes/vaccine.Route')
const vaccineAppointmentRoute=require('./routes/vaccineAppointment.Route.js')
const consultCategoryRoute=require('./routes/consultCategory.Route')
const consultationRoute=require('./routes/consultation.Route.js')
const uploadExcelRoute=require('./routes/uploadexcel.Route.js')
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
app.use('/upload',uploadRoute)
app.use('/api',buildingRoute)
app.use('/api',floorRoute)
app.use('/api',departmentRoute)
app.use('/api',specializationRoute)
app.use('/api',designationRoute)
app.use('/api',doctorDetailRoute)
app.use('/api',vendorRoute)
app.use('/api',expenseRoute)
app.use('/api',medicineRoute)
app.use('/api',vaccineRoute)
app.use('/api',vaccineAppointmentRoute)
app.use('/api',consultCategoryRoute)
app.use('/api',consultationRoute)
app.use('/uploadfile',uploadExcelRoute)
//upload
const uploadDir = path.join(__dirname, 'uploads');

// Check if the "uploads" directory exists, if not, create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    //console.log('Uploads folder created!');
}
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
