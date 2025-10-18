const validator = require('validator');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary');
const doctorModel = require('../models/doctorModel');
const appointmentModel = require('../models/appointmentModel');

// API to register user
const registerUser = async function (req, res) {
    try {

        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.json({success:false, message: 'Missing Details'})
        }

        if( !validator.isEmail(email) ){
            return res.json({success:false, message: 'Enter valid email'})
        }

        if( password.length < 8){
            return res.json({success:false, message: 'Enter strong password'})
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

        res.json({success:true, token})

    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}

// API to login user
const loginUser = async function (req, res) {
    try {

        const { email, password } = req.body

        const user = await userModel.findOne({email})

        if( !user ){
            return res.json({success:false, message: 'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if( !isMatch ) {
            return res.json({success:false, message: 'Invalid Credentials'})
        }

        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//API to get user profile data
const getProfile = async function (req, res) {
    try{

        const userId  = req.userId
        const userData = await userModel.findById(userId).select('-password')

        res.json({success:true, userData})

    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}

// API to update user profile
const updateProfile = async function (req, res) {
    try {

        const { name, phone, address, dob, gender } = req.body
        const userId = req.userId
        const imageFile = req.file

        if( !name || !phone || !dob || !gender ) {
            return res.json({success:false, message: 'Missing Details'})
        }

        let parsedAddress = {};
        if (address) {
            try {
                parsedAddress = JSON.parse(address);
            } catch (err) {
                parsedAddress = address; // fallback if already an object
            }
        }

        await userModel.findByIdAndUpdate(userId, {name, phone, address: parsedAddress, dob, gender})

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image", width: 400,  height: 400, crop: "fill" })
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId, {image: imageURL})
        }

        res.json({success:true, message: 'Profile Updated'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


// API to book appointment
const bookAppointment = async function (req, res) {
    try{

        const { docId, slotDate, slotTime} = req.body
        const userId = req.userId

        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success:false, message: 'Doctor not available'})
        }

        let slots_booked = docData.slots_booked || {}

        // checking for slot availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message: 'Doctor not available'})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')

        // delete docData.slots_booked

        const docInfo = docData.toObject();
        delete docInfo.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        // save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success:true, message:'Appointment Booked'})

    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}

const listAppointment = async function (req, res) {
    try{

        const userId = req.userId
        const appointments = await appointmentModel.find({userId})

        res.json({success:true, appointments})

    } catch (error) {
        console.error(error)
        res.json({success:false, message: error.message})
    }
}

// API to cancel appointment
const cancelAppointment = async function (req, res) {
    try{

        const { appointmentId } = req.body
        const userId = req.userId

        const appointmentData = await appointmentModel.findById(appointmentId)

        if(appointmentData.userId !== userId){
            res.json({success:false, message:"Unauthorized action"})
        }

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

module.exports = { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }