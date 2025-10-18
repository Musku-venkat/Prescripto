import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Doctors (){
    const {speciality} = useParams()
    const [filterDoc, setFilterDoc] = useState([])
    const {doctors} = useContext(AppContext)
    const navigate = useNavigate()

    const appfilter = function (){
        if(speciality){
            setFilterDoc(doctors.filter((doc)=> doc.speciality === speciality))
        } else{
            setFilterDoc(doctors)
        }
    }

    useEffect(()=>{
        appfilter()
    }, [doctors, speciality])

    return(
        <div className="my-4">
            <p className="text-secondary">Browse through the doctors specialist.</p>
            <div className="d-flex flex-sm-row flex-column align-items-start gap-4 mt-4">
                <div className="d-flex flex-column gap-2">
                    <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className="border border-secondary rounded py-2 px-5" role="button">General physician</p>
                    <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className="border border-secondary rounded py-2 px-5" role="button">Gynecologist</p>
                    <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className="border border-secondary rounded py-2 px-5" role="button">Dermatologist</p>
                    <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className="border border-secondary rounded py-2 px-5" role="button">Pediatricians</p>
                    <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className="border border-secondary rounded py-2 px-5" role="button">Neurologist</p>
                    <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className="border border-secondary rounded py-2 px-5" role="button">Gastroenterologist</p>
                </div>
                <div className=" container">
                    <div className="row mb-4 d-flex gap-4">
                        {filterDoc.map((item, index)=>(
                            <div key={index} className="col-sm-auto" onClick={()=>navigate(`/appointment/${item._id}`)} role="button">
                                <div className="border rounded text-center h-100 shadow-sm">
                                  <img src={item.image} alt={item.name} className="w-100 rounded-top" style={{ backgroundColor: "#3396D3", height: "250px", objectFit: "cover" }}/>
                                  <div className="d-flex flex-column text-start p-2">
                                    <p className={`${item.available ? 'text-success' : 'text-danger'} mb-0`}>
                                        <small>{item.available ? '• Available' : '• Not Available'}</small>
                                    </p>
                                    <p className="mb-0"><b>{item.name}</b></p>
                                    <p className="mb-0">{item.speciality}</p>
                                  </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Doctors;