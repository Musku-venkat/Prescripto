import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";

function AllAppointments () {
    const {aToken, appointments, getAllAppointments, cancelAppointment} = useContext(AdminContext)
    const {currency, calculateAge, slotDateFormat} = useContext(AppContext) 

    useEffect(()=>{
        if(aToken){
            getAllAppointments()
        }
    }, [aToken])
    return(
        <div className="my-4 mx-2">
            <p>All Appointments</p>
            <table className=" table text-start align-middle w-100  shadow-lg">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Patient</th>
                        <th>Age</th>
                        <th>Date & Time</th>
                        <th>Doctor</th>
                        <th>Fees</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    appointments.map((item, index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>
                                <img className=" rounded-5 me-1" src={item.userData.image} alt="" style={{width:'50px', height:'50px', backgroundSize:'contain'}}/> <span>{item.userData.name}</span>
                            </td>
                            <td>{calculateAge(item.userData.dob)}</td>
                            <td>{slotDateFormat(item.slotDate)}, {item.slotTime}</td>
                            <td>
                                <img className=" rounded-5 bg-light me-1" src={item.docData.image} alt="" style={{width:'50px', height:'50px', backgroundSize:'contain'}}/> <span>{item.docData.name}</span>
                            </td>
                            <td>{currency}{item.amount}</td>
                            {
                                item.cancelled
                                ?<td><button className=" btn btn-outline-danger" disabled>Cancelled</button></td>
                                : item.isCompleted
                                    ? <td><button className="btn btn-outline-success" disabled>Completed</button></td>
                                    : <td>
                                        <button onClick={()=>cancelAppointment(item._id)} className=" btn-close"></button>
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

export default AllAppointments;