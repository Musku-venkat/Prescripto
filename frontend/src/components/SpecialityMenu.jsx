import { Link, useNavigate } from "react-router-dom";
import { specialityData } from "../assets/assets_frontend/assets";

function SpecialityMenu (){
    return(
        <>
            <div id="speciality" className="d-flex flex-column align-items-center justify-content-center gap-2 mb-5">
                <h3>Find by Speciality</h3>
                <p className="text-center w-50 w-md-100 mb-4">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                <div className="d-flex justify-content-center align-items-center">
                    {specialityData.map((item, index)=>(
                        <Link key={index} to={`/doctors/${item.speciality}`} onClick={()=>scrollTo(0, 0)} className="d-flex flex-column justify-content-center align-items-center text-black">
                            <img src={item.image} alt="" width='60%'/>
                            <p className="mt-2">{item.speciality}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

export default SpecialityMenu;