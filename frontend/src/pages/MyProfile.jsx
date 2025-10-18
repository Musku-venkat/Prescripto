import { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets"
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

function MyProfile (){
    const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState(false)

    const updateUserProfileData = async function () {
        try {

            const formData = new FormData()

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, { headers: { token, }})

            if(data.success){
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    return userData && (
        <div className="w-100 d-flex flex-column gap-2 my-4">
            {
                isEdit 
                ? <label htmlFor="image">
                    <div className=" d-inline-block" role="button">
                        <img className=" rounded-2 opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" style={{width:'200px' , height:'200px', backgroundSize:'contain'}} />
                    </div>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
                </label>
                : <img className=" rounded" src={userData.image} alt="" width={'15%'} />
            }
            {
                isEdit 
                ? <input className="fs-3 fw-medium w-25" type="text" onChange={(e)=> setUserData((prev)=> ({...prev, name: e.target.value}))} value={userData.name}/>
                : <p className="fs-3 fw-medium my-2">{userData.name}</p>
            }
            <hr />
            <div className="mb-2">
                <p className="text-secondary mb-2">CONTACT INFORMATION</p>
                <div className="special-1">
                    <p>Email id:</p>
                    <p>{userData.email}</p>
                    <p>Phone:</p>
                    {
                        isEdit 
                            ? <input className="w-25" type="text" onChange={(e)=> setUserData((prev)=> ({...prev, phone: e.target.value}))} value={userData.phone}/>
                            : <p>{userData.phone}</p>
                    }
                    <p>Address:</p>
                    {
                        isEdit 
                            ? <p>
                                <input className="w-25 mb-2" type="text" onChange={(e)=> setUserData((prev)=> ({...prev, address: { ...prev.address, line1: e.target.value}}))} value={userData.address.line1}/>
                                <br />
                                <input className="w-25" type="text" onChange={(e)=> setUserData((prev)=> ({...prev, address: { ...prev.address, line2: e.target.value}}))} value={userData.address.line2}/>
                            </p>
                            : <p>
                                {userData.address.line1}
                                <br />
                                {userData.address.line2}
                            </p>
                    }
                </div>
            </div>
            <div>
                <p className="text-secondary mb-2">BASIC INFORMATION</p>
                <div className=" special-1">
                    <p>Gender:</p>
                    {
                        isEdit 
                            ? <select className="w-25" onChange={(e)=>setUserData((prev)=> ({...prev, gender:e.target.value}))} value={userData.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p>{userData.gender}</p>
                    }
                    <p>Birthday:</p>
                    {
                        isEdit 
                            ? <input className="w-25" type="date" onChange={(e)=>setUserData((prev)=> ({...prev, dob:e.target.value}))} value={userData.dob}/>
                            : <p>{userData.dob}</p>
                    }
                </div>
                <div className="p-4">
                    {
                        isEdit
                        ? <button onClick={updateUserProfileData} className="btn rounded-5 border-black px-4 py-2">Save information</button>
                        : <button onClick={()=>setIsEdit(true)}  className="btn rounded-5 border-black px-4 py-2">Edit</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default MyProfile;