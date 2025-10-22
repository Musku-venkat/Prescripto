import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

function DoctorDashboard () {
    const {dToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment} = useContext(DoctorContext)
    const {currency, slotDateFormat} = useContext(AppContext)

    useEffect(()=>{
        if(dToken){
            getDashData()
        }
    }, [dToken])
    return dashData && (
        <div className="m-2">
            <div className=" d-flex flex-wrap gap-5 m-4">
                <div className=" d-flex align-items-center gap-2 bg-white p-2 px-4 rounded-4 shadow">
                    <img src={assets.earning_icon} alt="" />
                    <div>
                        <p className="mb-1 fw-bold">{currency}{dashData.earnings}</p>
                        <p className="mb-0 fw-semibold text-secondary">Earnings</p>
                    </div>
                </div>
                <div className=" d-flex align-items-center gap-2 bg-white p-2 px-4 rounded-4 shadow">
                    <img src={assets.appointments_icon} alt="" />
                    <div>
                        <p className="mb-0 fw-bold">{dashData.appointments}</p>
                        <p className="mb-0 fw-semibold text-secondary">Appointments</p>
                    </div>
                </div>
                <div className=" d-flex align-items-center gap-2 bg-white p-2 px-4 rounded-4 shadow">
                    <img src={assets.patients_icon} alt="" />
                    <div>
                        <p className="mb-0 fw-bold">{dashData.patients}</p>
                        <p className="mb-0 fw-semibold text-secondary">Patients</p>
                    </div>
                </div>
            </div>
            <div className="bg-white shadow-lg py-2">
                <div className=" d-flex align-items-center gap-3 px-4 py-2 rounded-top">
                    <img src={assets.list_icon} alt="" />
                    <p className="mb-0 fw-semibold">Latest Booking</p>
                </div>
                <div className="pt-4 borde-top">
                    {
                        dashData.latestAppointments.map((item, index)=>(
                            <div className=" d-flex align-items-center gap-4 px-4 py-2" key={index}>
                                <img className="mb-3" src={item.userData.image} alt=""  style={{width:'80px', height:'80px', borderRadius:'50%', backgroundSize:'cover'}} />
                                <div className=" flex-grow-1">
                                    <p className=" text-secondary fw-medium">{item.userData.name}</p>
                                    <p className=" text-secondary">{slotDateFormat(item.slotDate)}</p>
                                </div>
                                {
                                    item.cancelled
                                    ? <button className="btn btn-outline-danger" disabled>Cancelled</button>
                                    : item.isCompleted
                                        ? <button className="btn btn-outline-success" disabled>Completed</button>
                                        : <div>
                                            <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" role="button"/>
                                            <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" role="button"/>
                                        </div>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default DoctorDashboard;