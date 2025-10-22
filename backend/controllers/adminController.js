const validator = require('validator');
const bcrypt = require('bcrypt');
const cloudinary  = require('cloudinary');
const doctorModel = require('../models/doctorModel');
const jwt = require('jsonwebtoken');
const appointmentModel = require('../models/appointmentModel');
const userModel = require('../models/userModel');

// API for adding doctors
const addDoctor = async function (req, res) {
    try {

        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file

        if ( !name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ) {
            return res.json({success:false, message:'Missing Details'});
        }

        // validate email formate
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:'Please enter a valid email'});
        }

        // validate strong password
        if (password.length < 8) {
            return res.json({success:false, message:'Please enter a strong password'});
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { 
            resource_type:"image", 
            width: 400, 
            height: 400,
            crop: "fill" 
        })
        const imageUrl = imageUpload.secure_url


        const doctorData = {
            name,
            email,
            password: hashedPassword,
            image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message: "Doctor Added"})
    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}


// API for admin login
const loginAdmin = async function (req, res) {
    try {
        
        const {email, password} = req.body

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign({email}, process.env.JWT_SECRET, { expiresIn : '1d'})
            return res.json({success:true, message:'Login successfull', token})

        } else {
            return res.json({success:false, message: 'Invalid Credentials'})
        }
    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}

// API to get all doctors list for admin panel
const allDoctors = async function (req, res) {
    try {

        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})

    } catch (error) {
        console.error(error)
        res.json({success:false, message:error.message})
    }
}

// API to get all appointment list
const appointmentsAdmin = async function (req, res) {
    try{

        const appointments = await appointmentModel.find({})

        res.json({success:true, appointments})

    } catch (error) {
        console.error(error)
        res.json({success:false, message:error.message})
    }
}

// API for appointment cancellation
const appointmentCancel = async function (req, res) {
    try{

        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})

        const {docId, slotDate, sloteTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter((e)=> e !== sloteTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: 'Appointment Cancelled'})

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

// API to get dashboard data for admin panel
const adminDashboard = async function (req, res) {
    try{

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({success:true, dashData})

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

module.exports = { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard }