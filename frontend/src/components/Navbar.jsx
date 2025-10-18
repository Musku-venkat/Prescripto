import { NavLink, useNavigate } from "react-router-dom";
import {assets} from '../assets/assets_frontend/assets';
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

function Navbar (){
    const navigate = useNavigate()
    const [showMenu, setShowMenu] = useState(false)
    const {token, setToken, userData} = useContext(AppContext)

    const logout = function (){
        localStorage.removeItem('token')
        navigate('/')
        setToken(false)
    }

    return(
        <>
            <div className="container d-flex align-items-center justify-content-between py-3 mb-3 border-bottom position-sticky top-0 bg-white" style={{zIndex:'1'}}>
                <NavLink to={'/'} className="text-black"><img src={assets.logo} alt="" width='80%' /></NavLink>
                <ul className="navbar-nav d-none d-lg-flex flex-row gap-5">
                    <NavLink to='/'>
                        <li>Home</li>
                    </NavLink>
                    <NavLink to='/doctors'>
                        <li>All Doctors</li>
                    </NavLink>
                    <NavLink to='/about'>
                        <li>About</li>
                    </NavLink>
                    <NavLink to='/contact'>
                        <li>Contact</li>
                    </NavLink>
                </ul>
                <div className="d-flex align-items-center justify-content-center">
                    {
                        token && userData
                        ? <div className="dropdown d-flex align-items-center justify-content-center gap-2">
                            <img src={userData.image} alt="" className="rounded-5 dropdown-toggle" role="button" data-bs-toggle="dropdown" style={{width:'60px', height:'60px', borderRadius:'50%', backgroundSize:'cover'}}/>
                            <ul className="dropdown-menu top-50">
                                <li><NavLink to='/my-profile' className="dropdown-item">My Profile</NavLink></li>
                                <li><NavLink to='/my-appointments' className="dropdown-item">My Appointments</NavLink></li>
                                <li><NavLink to='/' onClick={logout} className="dropdown-item bg-white text-black">Logout</NavLink></li>
                            </ul>
                          </div>
                        : <button onClick={()=>navigate('/login')} className="btn btn-dark rounded-5 px-4 py-2 border-light" style={{backgroundColor:'#3396D3', color:'white'}}><small>Create Account</small></button>
                    }
                    <img className="d-lg-none d-block" onClick={()=>setShowMenu(true)} src={assets.menu_icon} alt="" />
                </div>
            </div>
        </>
    );
}

export default Navbar;