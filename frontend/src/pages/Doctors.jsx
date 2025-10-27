import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Spinner from "../components/Spinner";

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

    const specialities = [
        "General physician",
        "Gynecologist",
        "Dermatologist",
        "Pediatricians",
        "Neurologist",
        "Gastroenterologist",
    ];

    useEffect(()=>{
        appfilter()
    }, [doctors, speciality])

    return(
        <div className="my-4">
            <p className="text-secondary">Browse through the doctors specialist.</p>
            <div className="d-flex flex-sm-row flex-column align-items-start gap-4 mt-4">
                <div className="d-flex flex-column gap-2">
                    {
                        specialities.map((type)=>(
                            <button key={type} 
                                onClick={()=> speciality === type ? navigate('/doctors') : navigate(`/doctors/${type}`)} 
                                className={`px-5 ${speciality === type ? 'btn btn-dark py-2' : 'border-black'}`}>
                                {type}
                            </button>
                        ))
                    }
                </div>
                <div className=" container">
                    <div className="row mb-4 d-flex gap-4">
                        {   
                            filterDoc.length > 0 ? (
                                filterDoc.map((item, index)=>(
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
                                ))
                            ) : (
                                // <p className="text-muted">No doctors available.</p>
                                <Spinner/>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Doctors;