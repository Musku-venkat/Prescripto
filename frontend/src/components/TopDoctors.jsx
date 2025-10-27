import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Spinner from './Spinner';

function TopDoctors (){
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)

    return(
      <div className="d-flex flex-column justify-content-center align-items-center  mb-5">
          <h3>Top Doctors to Book</h3>
          <p className="mb-4">Simply browse through our extensive list of trusted doctors.</p>
          <div className="conatiner-fluid mb-2">
              <div className="row gap-4 d-flex justify-content-center mb-4">
                  {
                    doctors.length > 0 ? (
                      doctors.slice(0, 8).map((item, index) => (
                        <div key={index} className="col-lg-auto" onClick={()=>{navigate(`/appointment/${item._id}`), scrollTo(0, 0)}} role="button">
                          <div className="border rounded text-center h-100 shadow-sm">
                            <img src={item.image} alt={item.name} className="w-100 rounded-top" style={{ backgroundColor: "#3396D3", height: "250px", objectFit: "cover" }}/>
                            <div className="d-flex flex-column text-start p-2">
                              <p className={`${item.available ? 'text-success' : 'text-danger'} mb-0`}><small>{item.available ? '• Available' : '• Not Available'}</small></p>
                              <p className="mb-0"><b>{item.name}</b></p>
                              <p className="mb-0">{item.speciality}</p>
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
          <button onClick={()=>{navigate('/doctors'); scrollTo(0, 0)}} className="px-4 btn btn-primary">More</button>
      </div>
    );
}

export default TopDoctors;