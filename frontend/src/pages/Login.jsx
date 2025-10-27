import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login (){
    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()

    const {backendUrl, token, setToken} = useContext(AppContext)

    const handlePassword = function () {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async function (e) {
        e.preventDefault()

        try {
            if(state === 'Sign Up'){
                const {data} = await axios.post(`${backendUrl}/api/user/register`, {name, email, password})
                if(data.success) {
                    toast.success(data.message || 'Account created successful!')
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                } else{
                    toast.error(data.message)
                }
            } else {
                const {data} = await axios.post(`${backendUrl}/api/user/login`, {email, password})
                if(data.success) {
                    toast.success(data.message || 'Login successful!')
                    localStorage.setItem('token', data.token)
                    setToken(data.token)
                } else{
                    toast.error(data.message)
                }
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if(token){
            navigate('/')
        }
    }, [token])
    
    return(
        <form className="d-flex justify-content-center my-5" onSubmit={handleSubmit}>
            <div className=" d-flex flex-column gap-2 p-5 rounded shadow-lg">
                <p className="fs-5"><b>{state === 'Sign Up' ? 'Create Account' : 'Login'}</b></p>
                <p className="mb-1">Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
                {
                    state === 'Sign Up' && <div className="w-100">
                        <p>Full Name:</p>
                        <input type="text" className=" form-control" onChange={(event)=>setName(event.target.value)} value={name} placeholder="Enter a full name..." required/>
                    </div>
                }
                <div className="w-100">
                    <p>Email:</p>
                    <input type="email" className=" form-control" onChange={(event)=>setEmail(event.target.value)} value={email} placeholder="Enter email address..." required/>
                </div>
                <div className="w-100 mb-2">
                    <p>Password:</p>
                    <input type={showPassword ? 'text' : 'password'} className="form-control" onChange={(event)=>setPassword(event.target.value)} value={password} placeholder="Enter a password..." required/>
                    <div>
                        <input type="checkbox" checked={showPassword} onChange={handlePassword}/>
                        <label className="ms-2 form-text">Show Password</label>
                    </div>
                </div>
                <button type="submit" className="btn px-4 py-2" style={{backgroundColor:'#3396D3', color:'white'}}>{state === 'Sign Up' ? 'Create Account' : 'Login'}</button>
                <div className="my-2">
                    {
                        state === 'Sign Up'
                        ? <p>Already have an account? <Link onClick={()=>setState('Login')}>Login here</Link></p>
                        : <p>Create an new account? <Link onClick={()=>setState('Sign Up')}>Sign up</Link></p>
                    }
                </div>
            </div>
        </form>
    );
}

export default Login;