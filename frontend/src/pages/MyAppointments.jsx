import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import Spinner from '../components/Spinner';

function MyAppointments (){
    const {backendUrl, token, getDoctorsData} = useContext(AppContext)
    const [appointments, setAppointments] = useState([])
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const slotDateFormat = function (slotDate) {
        const dateArray = slotDate.split('_')
        return dateArray[0] + ' ' + months[Number(dateArray[1])] + ' ' + dateArray[2]
    }
    
    const getUserAppointments = async function () {
        try{

            const {data} = await axios.get(`${backendUrl}/api/user/appointments`, { headers : { token } })

            if(data.success){
                setAppointments(data.appointments.reverse())
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const cancelAppointment = async function ( appointmentId ) {
        try {

            const {data} = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, { headers : { token } })
            if(data.success){
                toast.success(data.message)
                getUserAppointments()
                getDoctorsData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(token){
            getUserAppointments()
        }
    }, [token])
    return(
        <div className="my-4">
            <p className="fw-medium border-bottom pb-2">My Appointments</p>
            <div className="my-4">
                {
                    appointments.length > 0 ? (
                        appointments.map((item, index)=>(
                            <div key={index} className="mb-4 ">
                                <div className="special-2 border p-2 rounded-2">
                                    <div className="bg-primary rounded-2">
                                        <img className="h-100" src={item.docData.image} alt="" width={'100%'} />
                                    </div>
                                    <div className=" d-flex flex-column justify-content-center h-100">
                                        <p className=" fw-semibold fs-5">{item.docData.name}</p>
                                        <p>{item.docData.speciality}</p>
                                        <p className="mt-2 fw-semibold">Address:</p>
                                        <p className="text-secondary">{item.docData.address.line1}</p>
                                        <p className="text-secondary">{item.docData.address.line2}</p>
                                        <p className="mt-2"><span className="fw-semibold">Date & Time: </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
                                    </div>
                                    <div className=" d-flex align-items-center">
                                        <div className="text-center me-4">
                                            {
                                                !item.cancelled && !item.isCompleted &&
                                                <button className="btn btn-outline-primary px-4 py-2 w-100 mb-4">Pay Online</button>
                                            }
                                            {
                                                !item.cancelled && !item.isCompleted &&
                                                <button onClick={()=>cancelAppointment(item._id)} className="btn btn-outline-danger px-4 py-2 w-100">Cancel appointment</button>
                                            }
                                            {
                                                item.cancelled && !item.isCompleted &&
                                                <button className=" btn btn-outline-danger px-4 py-2 w-100" disabled>Appointment cancelled</button>
                                            }
                                            {
                                                item.isCompleted && 
                                                <button className=" btn btn-outline-success px-4 py-2 text-success w-100" disabled>Completed</button>   
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Spinner/>
                    )
                }
            </div>
        </div>
    );
}

export default MyAppointments;