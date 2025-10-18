import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets_frontend/assets";

function Banner (){
    const navigate = useNavigate()

    return(
        <div className="d-flex justify-content-evenly align-items-center rounded px-5 text-light my-5" style={{backgroundColor:"#3396D3"}}>
            {/* {Left Side} */}
            <div className="d-flex flex-column align-items-start justify-content-center gap-4 py-5 m-auto">
                <div >
                    <h1 className=" fs-1 mb-4">Book Appointment</h1>
                    <h1 className="fs-1">with 100+ Trusted Doctors</h1>
                </div>
                <a onClick={()=>{navigate('/login'); scrollTo(0, 0)}} className=" bg-light rounded-5 px-4 py-2" style={{cursor: 'pointer'}}>Create account ➜</a>
            </div>
            {/* {Right Side} */}
            <div className=" text-end">
                <img className=" bottom-0 right-0" src={assets.appointment_img} alt="" width='60%'/>
            </div>
        </div>
    );
}

export default Banner;