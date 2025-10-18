import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

function DoctorsList () {
    const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext)

    useEffect(()=>{
        if(aToken){
            getAllDoctors()
        }
    }, [aToken])

    return(
        <div className="m-4">
            <h6>All Doctors</h6>
            <div className="d-flex flex-wrap gap-2 pt-2">
                {
                    doctors.map((item, index)=>(
                        <div key={index} className="card " role="button" style={{width:'18rem'}}>
                            <img src={item.image} alt="" className=" card-img-top bg-light rounded-2"/>
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className=" card-text mb-0"><small>{item.speciality}</small></p>
                                <div className="d-flex align-items-center gap-2">
                                    <input onChange={()=> changeAvailability(item._id)} type="checkbox" checked={item.available} />
                                    <p className="mb-1">Available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default DoctorsList;