import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function RelatedDoctors ({docId, speciality}){
    const {doctors} = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData = doctors.filter((doc)=> doc.speciality === speciality && doc._id !== docId)
            setRelDoc(doctorsData)
        }
    }, [doctors, docId, speciality])
    return(
      <div className="d-flex flex-column justify-content-center align-items-center  my-5">
          <h3>Related Doctors</h3>
          <p className="mb-4">Simply browse through our extensive list of trusted doctors.</p>
          <div className="container mb-4">
              <div className="row gap-4 d-flex justify-content-center">
                  {relDoc.slice(0, 4).map((item, index) => (
                    <div key={index} className="col-lg-auto" onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0, 0)}} role="button">
                      <div className="border rounded text-center h-100 shadow-sm">
                        <img src={item.image} alt={item.name} className="w-100 rounded-top" style={{ backgroundColor: "#3396D3", height: "250px", objectFit: "cover" }}/>
                        <div className="d-flex flex-column text-start p-2">
                          <p className={`${item.available ? 'text-success' : 'teaxt-danger'} mb-0`}>
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
          <button onClick={()=>{navigate('/doctors'); scrollTo(0, 0)}} className="btn bg-primary text-light px-5 py-2">More</button>
      </div>
    );
}

export default RelatedDoctors;