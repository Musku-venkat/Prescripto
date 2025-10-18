import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

function Sidebar () {
    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

    return(
        <div className="border-end" style={{position:'sticky', top:'82px'}}>
            {
                aToken && <ul className="d-flex flex-md-column">
                    <NavLink to={'/admin-dashboard'} className={({isActive})=>`d-flex align-items-center py-3 text-decoration-none text-secondary mt-2 ${isActive ? ' border-end bg-light border-primary' : ''}`}>
                        <img src={assets.home_icon} alt="" className=" me-3" title="Admin Dashboard" />
                        <p className="mb-0 d-md-block d-none">Dashboard</p>
                    </NavLink>
                    <NavLink to={'/all-appointments'} className={({isActive})=>`d-flex align-items-center py-3 text-decoration-none text-secondary mt-2 ${isActive ? ' border-end bg-light border-primary' : ''}`}>
                        <img src={assets.appointment_icon} alt="" className=" me-3" title="All Appointments"/>
                        <p className="mb-0 d-md-block d-none">Appointments</p>
                    </NavLink>
                    <NavLink to={'/add-doctor'} className={({isActive})=>`d-flex align-items-center py-3 text-decoration-none text-secondary mt-2 ${isActive ? ' border-end bg-light border-primary' : ''}`}>
                        <img src={assets.add_icon} alt="" className=" me-3" title="Add Doctors"/>
                        <p className="mb-0 d-md-block d-none">Add Doctor</p>
                    </NavLink>
                    <NavLink to={'/doctor-list'} className={({isActive})=>`d-flex align-items-center py-3 text-decoration-none text-secondary mt-2 ${isActive ? ' border-end bg-light border-primary' : ''}`}>
                        <img src={assets.people_icon} alt="" className=" me-3" title="Doctor List" />
                        <p className="mb-0 d-md-block d-none">Doctors List</p>
                    </NavLink>
                </ul>
            }
            {
                dToken && <ul  className="d-flex flex-md-column">
                    <NavLink to={'/doctor-dashboard'} className={({isActive})=>`d-flex align-items-center py-3 text-decoration-none text-secondary mt-2 ${isActive ? ' border-end bg-light border-primary' : ''}`}>
                        <img src={assets.home_icon} alt="" className=" me-3" title="Doctor Dashboard" />
                        <p className="mb-0 d-md-block d-none">Dashboard</p>
                    </NavLink>
                    <NavLink to={'/doctor-appointments'} className={({isActive})=>`d-flex align-items-center py-3 text-decoration-none text-secondary mt-2 ${isActive ? ' border-end bg-light border-primary' : ''}`}>
                        <img src={assets.appointment_icon} alt="" className=" me-3" title="Doctor Appointments"/>
                        <p className="mb-0 d-md-block d-none">Appointments</p>
                    </NavLink>
                    <NavLink to={'/doctor-profile'} className={({isActive})=>`d-flex align-items-center py-3 text-decoration-none text-secondary mt-2 ${isActive ? ' border-end bg-light border-primary' : ''}`}>
                        <img src={assets.people_icon} alt="" className=" me-3" title="Doctor Profile" />
                        <p className="mb-0 d-md-block d-none">Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    );
}

export default Sidebar;