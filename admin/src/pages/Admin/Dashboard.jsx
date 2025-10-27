import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import {assets} from '../../assets/assets';
import { AppContext } from "../../context/AppContext";
import Spinner from '../../components/Spinner';

function Dashboard () {
    const {aToken, dashData, getDashData, cancelAppointment} = useContext(AdminContext)
    const {slotDateFormat} = useContext(AppContext)
    useEffect(()=>{
        if(aToken){
            getDashData()
        }
    }, [aToken])
    return dashData && (
        <div className="m-2">
            <div className=" d-flex flex-wrap gap-5 m-4">
                <div className=" d-flex align-items-center gap-2 bg-white p-2 px-4 rounded-4 shadow">
                    <img src={assets.doctor_icon} alt="" />
                    <div>
                        <p className="mb-1 fw-bold">{dashData.doctors}</p>
                        <p className="mb-0 fw-semibold text-secondary">Doctors</p>
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
            <div className="bg-white shadow rounded-4 py-4">
                <div className=" d-flex align-items-center gap-3 px-4 py-2 rounded-top">
                    <img src={assets.list_icon} alt="" />
                    <p className="mb-1 fw-semibold">Latest Booking</p>
                </div>
                <div className="pb-2 borde-top">
                    {
                        dashData.latestAppointments.length > 0 ? (
                            dashData.latestAppointments.map((item, index)=>(
                                <div className=" d-flex align-items-center gap-4 px-4" key={index}>
                                    <img src={item.docData.image} alt="" className="mb-4" style={{width:'80px', height:'80px', backgroundSize:'contain'}} />
                                    <div className=" flex-grow-1">
                                        <p className=" text-secondary fw-medium">{item.docData.name}</p>
                                        <p className=" text-secondary">{slotDateFormat(item.slotDate)}</p>
                                    </div>
                                    <div>
                                        {
                                            item.cancelled
                                                ?<button className=" btn btn-outline-danger" disabled>Cancelled</button>
                                                : item.isCompleted
                                                    ? <button className="btn btn-outline-success" disabled>Completed</button>
                                                    : <button onClick={()=>cancelAppointment(item._id)} className=" btn-close"></button>
                                        }
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Spinner/>
                        )
                    }   
                </div>
            </div>
        </div>
    );
}

export default Dashboard;