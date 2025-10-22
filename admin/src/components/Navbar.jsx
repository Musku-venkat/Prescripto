import { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate, Link } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { toast } from 'react-toastify'

function Navbar () {
    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)
    const navigate = useNavigate()

    const logout = function (){
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
        toast.success('Logout Successfull!')
    }

    return(
        <div className="d-flex justify-content-between align-items-center py-3 px-4 border-bottom bg-white position-sticky top-0" style={{zIndex:'1'}}>
            <div className=" d-flex align-items-center gap-2">
                <Link><img src={assets.admin_logo} alt="" role="button"/></Link>
                <small className="border border-secondary rounded-5 px-2 fw-semibold">{aToken ? 'Admin' : 'Doctor'}</small>
            </div>
            <button onClick={logout} className="bg-primary text-white rounded-5 px-5 py-2 fw"><small>Logout</small></button>
        </div>
    );
}

export default Navbar;