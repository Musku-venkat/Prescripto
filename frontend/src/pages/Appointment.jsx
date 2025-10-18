import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets_frontend/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import { toast } from "react-toastify";
import axios from "axios";

function Appointment (){
    const {docId} = useParams()
    const {doctors, currencySymbol, backendUrl, token, getDoctorsData} = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    const navigate = useNavigate()
    const [docInfo, setDocInfo] = useState(null)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')

    const fetchDocInfo = async function () {
        const docInfo = doctors.find((doc)=> doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSlots = async function () {
        if (!docInfo || !docInfo.slots_booked) return;
        setDocSlots([])

        // getting current date
        let today = new Date()

        for(let i = 0; i < 7; i++){
            // getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate()+i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate()+i)
            endTime.setHours(21,0,0,0)

            // setting hours
            if(today.getDate() === currentDate.getDate()){
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

                let day = currentDate.getDate()
                let month = currentDate.getMonth()+1
                let year = currentDate.getFullYear()

                const slotDate = `${day}_${month}_${year}`
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if(isSlotAvailable){
                    // add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots((prev)=> ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async function () {
        if(!token){
            toast.warn('Login to book appointment')
            return navigate('/login')
        }

        try {
            
            const date = docSlots[slotIndex][0].datetime

            let day = date.getDate()
            let month = date.getMonth()+1
            let year = date.getFullYear()

            const slotDate = day + '_' + month + '_' + year

            const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, {docId, slotDate, slotTime}, {headers:{token}})

            if(data.success){
                toast.success(data.message)
                getDoctorsData()
                navigate('/my-appointments')
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchDocInfo()
    }, [doctors, docId])

    useEffect(()=>{
        if(docInfo){
            getAvailableSlots()
        }
    }, [docInfo])

    // useEffect(()=>{
    //     console.log(docSlots)
    // }, [docInfo])

    return docInfo && (
        <div className="my-5">
            {/* {Doctor Details} */}
            <div className="d-flex flex-column flex-sm-row align-items-center gap-4 mb-5">
                <div>
                    <img className="rounded-3 w-100 h-100" src={docInfo.image} alt="" style={{backgroundColor: '#3396D3', objectFit: 'cover', maxHeight: '350px'}} />
                </div>

                <div className=" d-flex flex-column border border-3 rounded-3 p-4 w-100 h-100">
                    {/* {DocInfo, Details, name, etc...} */}
                    <p className=" d-flex gap-2 my-2 fw-bold">
                        <b>{docInfo.name}</b>
                        <img src={assets.verified_icon} alt=""/>
                    </p>
                    <div className=" d-flex gap-2 mb-2">
                        <p className=" text-secondary">{docInfo.degree} - {docInfo.speciality}</p>
                        <p className="border rounded-5 px-2">
                            <small>{docInfo.experience}</small>
                        </p>
                    </div>
                    {/* {About doctor} */}
                    <div className="mb-2">
                        <p className="d-flex gap-2 mb-1 fw-semibold">About  <img src={assets.info_icon} alt="" /></p>
                        <p>{docInfo.about}</p>
                    </div>
                    <p className=" fw-semibold">Appointment fee : <span>{currencySymbol}{docInfo.fees}</span></p>
                </div>
            </div>

            {/* {Booking Slots} */}
            <div className="text-center">
                <h5 className="mb-4">Booking slots</h5>
                <div className="d-flex justify-content-center gap-5 text-center w-100 my-5 flex-wrap">
                    {
                        docSlots.length && docSlots.map((item, index)=>(
                            <div key={index} onClick={()=>setSlotIndex(index)} className={`d-flex flex-column border p-3 text-center rounded-5 fw-medium ${slotIndex === index ? 'bg-primary text-light' : 'border-secondary'}`} role="button">
                                <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                                <p>{item[0] && item[0].datetime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>

                <div className="d-flex gap-5 overflow-x-auto my-4">
                    {
                        docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index)=>(
                            <p key={index} onClick={()=>setSlotTime(item.time)} className={` fw-lighter p-2 rounded-5 border w-auto ${item.time === slotTime ? 'bg-primary text-light' : ' border-secondary'}`} role="button">
                                {item.time}
                            </p>
                        ))
                    }
                </div>
                <button onClick={bookAppointment} className="btn px-4 py-2 btn btn-primary rounded-3">Book an appointment</button>
            </div>

            <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>

        </div>
    );
}

export default Appointment;