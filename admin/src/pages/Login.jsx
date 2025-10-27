import { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext.jsx';

function Login() {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState('');

    const {setAToken, backendUrl} = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext);

    const handleSubmit = async function (e) {
        e.preventDefault();

        try{
            if(state === 'Admin') {

                const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password});
                if(data.success){
                    toast.success(data.message || 'Login successful!')
                    localStorage.setItem('atoken', data.token);
                    setAToken(data.token);
                } else {
                    toast.error(data.message)
                }
            } else {

                const {data} = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })
                if(data.success){
                    toast.success(data.message || 'Login successful!')
                    localStorage.setItem('dtoken', data.token);
                    setDToken(data.token);
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    const handlePassword = function () {
        setShowPassword(!showPassword);
    }

    return(
        <form onSubmit={handleSubmit} className=' d-flex justify-content-center min-vh-100'>
            <div className=' d-flex flex-column gap-2 m-auto p-5 pb-0 rounded-3 shadow-lg'>
                <h4 className=' fw-semibold fs-5 text-center m-auto  '><span className='text-primary'>{state}</span> Login</h4>
                <div className=' mt-2'>
                    <p className='mb-0'>Email:</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='form-control' type="email" placeholder='Enter your email' required/>
                </div>
                <div className=' mt-2'>
                    <p className='mb-0'>Password:</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='form-control' type={showPassword ? 'text' : 'password'} placeholder='Password' required/>
                    <div>
                        <input type="checkbox" checked={showPassword} onChange={handlePassword}/>
                        <label className='ms-2 form-text'>Show password</label>
                    </div>
                </div>
                <button className='btn rounded my-2 fw-semibold bg-primary text-white p-2'>Login</button>
                {
                    state === 'Admin'
                    ? <p>Doctor Login? <span onClick={()=> setState('Doctor')} className='text-primary' role='button'> Click here</span></p>
                    : <p>Admin Login? <span onClick={()=> setState('Admin')} className='text-primary' role='button'> Click here</span></p>
                }
            </div>
        </form>
    );
}

export default Login;