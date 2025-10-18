import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor () {
    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('')
    const [fees, setFees] = useState('')
    const [speciality, setSpeciality] = useState('')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [about, setAbout] = useState('')

    const { backendUrl, aToken} = useContext(AdminContext)
    const handleSubmit = async function (e) {
        e.preventDefault();

        try{

            if(!docImg){
                return toast.error('Image Not Found')
            }

            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name) 
            formData.append('email', email)
            formData.append('password', password) 
            formData.append('experience', experience) 
            formData.append('fees', Number(fees)) 
            formData.append('about', about) 
            formData.append('speciality', speciality) 
            formData.append('degree', degree) 
            formData.append('address', JSON.stringify({line1: address1, line2: address2}))

            const {data} = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, { headers:{ "Content-Type": "multipart/form-data", aToken } })

            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.error(error);
        }
    }
    return(
        <form onSubmit={handleSubmit} className=" m-4">
            <p className=" mb-3 fw-semibold">Add Doctor</p>
            <div className=" bg-white px-4 py-4 rounded-2 shadow w-100">
                <div className=" d-flex align-items-center gap-4 mb-4 text-secondary">
                    <label htmlFor="doc-img">
                        <img className=" rounded-5" style={{ width: "100px", height: "100px", objectFit: "cover" }} src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="Upload" role="button" />
                    </label>
                    <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden/>
                    <p>Upload doctor <br /> picture</p>
                </div>
                <div className=" d-flex flex-column flex-lg-row gap-4 align-items-start text-secondary">
                    <div className=" w-100 d-flex flex-column gap-2">
                        <div className="mb-3">
                            <p className="mb-2">Doctor name:</p>
                            <input onChange={(e)=>setName(e.target.value)} value={name} type="name" className="form-control" placeholder="Name" required/>
                        </div>
                        <div className="mb-3">
                            <p className="mb-2">Doctor Email:</p>
                            <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" className="form-control" placeholder="Email" required/>
                        </div>
                        <div className="mb-3">
                            <p className="mb-2">Doctor Password:</p>
                            <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" className="form-control" placeholder="password" required/>
                        </div>
                        <div className="mb-3">
                            <p className="mb-2">Experience:</p>
                            <select onChange={(e)=>setExperience(e.target.value)} value={experience} name="experience" className=" form-control" required>
                                <option defaultValue={'select'}>Select</option>
                                <option value="1 Year">1 Year</option>
                                <option value="2 Year">2 Year</option>
                                <option value="3 Year">3 Year</option>
                                <option value="4 Year">4 Year</option>
                                <option value="5 Year">5 Year</option>
                                <option value="6 Year">6 Year</option>
                                <option value="7 Year">7 Year</option>
                                <option value="8 Year">8 Year</option>
                                <option value="9 Year">9 Year</option>
                                <option value="10 Year">10 Year</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <p className="mb-2">Fees:</p>
                            <input onChange={(e)=> setFees(e.target.value)} value={fees} type="number" className="form-control" placeholder="Fees" required/>
                        </div>
                    </div>
                    <div className=" w-100 d-flex flex-column gap-2">
                        <div className="mb-3">
                            <p className="mb-2">Speciality:</p>
                            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} name="speciality" className="form-control" required>
                                <option defaultValue={'select'}>Select</option>
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <p className="mb-2">Education:</p>
                            <input onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" className="form-control" placeholder="Education" required/>
                        </div>
                        <div className="mb-3">
                            <p className="mb-2">Address:</p>
                            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" className="form-control mb-2" placeholder="Address-1" required/>
                            <input onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" className="form-control" placeholder="Address-2" required/>
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <p className="mb-2">About Doctor:</p>
                    <textarea onChange={(e)=>setAbout(e.target.value)} value={about} type="text" className="form-control" placeholder="write about doctor" rows={5} required/>
                </div>
                <button className=" btn btn-primary px-5 py-2 rounded-5">Add doctor</button>
            </div>
        </form>
    );
}

export default AddDoctor;