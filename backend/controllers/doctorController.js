const doctorModel = require('../models/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const appointmentModel = require('../models/appointmentModel');

const changeAvailablity = async function (req, res) {
    try {

        const docId = req.docId

        const docData = await doctorModel.findById(docId)

        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })

        res.json({success:true, message: 'Availability Changed'})

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

const doctorList = async function (req, res) {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({success:true, doctors})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: error.message})
    }
}

// API for doctor login
const loginDoctor = async function (req, res) {
    try{

        const { email, password } = req.body

        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false, message: 'Invalid Credentials'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if( !isMatch ) {
            return res.json({success:false, message: 'Invalid Credentials'})
        }
        
        const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET, { expiresIn: '1d'})
        res.json({success:true, message:'Login successfull', token})

    } catch(error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async function (req, res) {
    try {

        const docId = req.docId
        const appointments = await appointmentModel.find({docId})

        res.json({success:true, appointments})

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

// API to mark appointment completed for doctor panel
const appointmentCompleted = async function (req, res) {
    try{

        const { appointmentId } = req.body
        const docId = req.docId

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted: true})
            return res.json({success: true, message: 'Appointment Completed'})

        } else {
            return res.json({success:false, message:'Mark Failed'})
        }

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async function (req, res) {
    try{

        const { appointmentId } = req.body
        const docId = req.docId

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData && appointmentData.docId === docId){

            await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled: true})
            return res.json({success: true, message: 'Appointment Cancelled'})

        } else {
            return res.json({success:false, message:'Canellation Failed'})
        }

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async function (req, res) {
    try {

        const docId = req.docId

        const appointments = await appointmentModel.find({docId})

        let earnings = 0

        appointments.map((item, index)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item, index)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({success:true, dashData})

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

// API to get doctor profile  for doctor panel
const doctorProfile = async function (req, res) {
    try{

        const docId = req.docId
        
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({success:true, profileData})

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

// API to update doctor profile data  from doctor panel
const updateDoctorProfile = async function (req, res) {
    try{

        const { fees, address, available} = req.body
        const docId = req.docId

        await doctorModel.findByIdAndUpdate(docId, {fees, address, available})

        res.json({success:true, message:'Profile Updated'})

    } catch (error) {
        console.error(error);
        res.json({success:false, message: error.message})
    }
}

module.exports = { changeAvailablity, doctorList, loginDoctor, appointmentsDoctor, appointmentCompleted, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile }