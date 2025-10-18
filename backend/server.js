const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/mongodb')
const { adminRouter } = require('./routes/adminRoute')
const connectCloudinary = require('./config/cloudinary')
const doctorRouter = require('./routes/doctorRoute')
const userRouter = require('./routes/userRoute')

// app config
const app = express()
const port = process.env.PORT || 8000
dotenv.config()
connectDB()
connectCloudinary()

// middleware's
app.use(express.json())
app.use(cors())

//api endpoint's
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.listen(port, ()=>{
    console.log('Server Started', port)
})