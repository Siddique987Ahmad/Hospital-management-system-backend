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
//middleware
app.use(express.json())
app.use(cors())
//Routes middleware
app.use('/api',userRoute)
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})
