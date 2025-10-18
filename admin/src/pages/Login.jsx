import { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext.jsx';

function Login() {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {setAToken, backendUrl} = useContext(AdminContext);
    const {setDToken} = useContext(DoctorContext);

    const handleSubmit = async function (e) {
        e.preventDefault();

        try{
            if(state === 'Admin') {

                const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password});
                if(data.success){
                    localStorage.setItem('atoken', data.token);
                    setAToken(data.token);
                } else {
                    toast.error(data.message)
                }
            } else {

                const {data} = await axios.post(`${backendUrl}/api/doctor/login`, { email, password })
                if(data.success){
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

    return(
        <form onSubmit={handleSubmit} className=' d-flex justify-content-center min-vh-100'>
            <div className=' d-flex flex-column gap-2 m-auto p-5 pb-0 rounded-3 shadow-lg'>
                <h4 className=' fw-semibold fs-5 text-center m-auto  '><span className='text-primary'>{state}</span> Login</h4>
                <div className=' mt-2'>
                    <p className='mb-0'>Email:</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded p-2' type="email" required/>
                </div>
                <div className=' mt-2'>
                    <p className='mb-0'>Password:</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded p-2' type="password" required/>
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