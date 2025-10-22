import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function DoctorAppointments() {
    const {dToken, appointments, getAppointments, completeAppointment, cancelAppointment} = useContext(DoctorContext)
    const {calculateAge, slotDateFormat, currency} = useContext(AppContext)

    useEffect(()=>{
        if(dToken){
            getAppointments()
        }
    }, [dToken])
    return(
        <div className="my-4 mx-2">
            <p>All Appointments</p>
            <table className="table table-start align-middle shadow-lg">
                <thead className=" overflow-scroll">
                    <tr>
                        <th>S.No</th>
                        <th>Patient</th>
                        <th>Age</th>
                        <th>Date & Time</th>
                        <th>Doctors</th>
                        <th>Fees</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    appointments.reverse().map((item, index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>
                                <img className="me-2 " src={item.userData.image} alt="" style={{width:'70px', height:'70px', borderRadius:'50%', backgroundSize:'contain'}}/> <span>{item.userData.name}</span>
                            </td>
                            <td className=" text-secondary fs-6">{item.payment ? 'Online' : 'Cash'}</td>
                            <td>{calculateAge(item.userData.dob)}</td>
                            <td>{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                            <td>{currency} {item.amount}</td>
                            {
                                item.cancelled
                                ? <td><button className="btn btn-outline-danger" disabled>Cancelled</button></td>
                                : item.isCompleted
                                    ? <td><button className="btn btn-outline-success" disabled>Completed</button></td>
                                    : <td>
                                    <img onClick={()=>cancelAppointment(item._id)} src={assets.cancel_icon} alt="" role="button"/>
                                    <img onClick={()=>completeAppointment(item._id)} src={assets.tick_icon} alt="" role="button"/>
                                </td>
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default DoctorAppointments;