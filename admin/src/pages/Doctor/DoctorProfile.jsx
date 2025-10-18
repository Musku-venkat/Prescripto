import { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext"
import { toast } from "react-toastify";
import axios from "axios";

function DoctorProfile () {
    const {dToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext)
    const {currency} = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async function () {
        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                available: profileData.available
            }

            const {data} = await axios.post(`${backendUrl}/api/doctor/update-profile`, updateData, {headers:{dToken}})

            if(data.success){
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message)
        }
    }
    
    useEffect(()=>{
        if(dToken){
            getProfileData()
        }
    }, [dToken])
    return profileData && (
        <div>
            <div className=" d-flex flex-column gap-2 m-4">
                <div>
                    <img className="bg-primary rounded-2" src={profileData.image} alt="" />
                </div>
                <div className="flex-grow-1 rounded-2 py-2">
                    {/* {Doctor Info} */}
                    <p className=" mb-1 fw-medium fs-5">{profileData.name}</p>
                    <div className="d-flex align-items-center gap-2 text-secondary">
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <small className="border border-secondary rounded-5 px-2 fw-lighter">{profileData.experience}</small>
                    </div>
                    {/* {About Doctor} */}
                    <div>
                        <p className="d-flex align-items-center gap-2 fw-medium mb-0">About:</p>
                        <p className="mb-1 text-secondary">{profileData.about}</p>
                    </div>
                    <p className="fw-medium">Appointment fees: <span className="text-secondary">{currency}{isEdit ? <input type="number" onChange={(e)=>setProfileData((prev)=>({...prev, fees:e.target.value}))} value={profileData.fees}/> : profileData.fees}</span></p>
                    <div className=" d-flex gap-2 py=2">
                        <p className="fw-medium">Address: </p>
                        <p>
                            {isEdit ? <input type="text" onChange={(e)=>setProfileData((prev)=>({...prev, address:{...prev.address, line1:e.target.value}}))} value={profileData.address.line1}/> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type="text" onChange={(e)=>setProfileData((prev)=>({...prev, address:{...prev.address, line2:e.target.value}}))} value={profileData.address.line2}/> : profileData.address.line2}
                        </p>
                    </div>
                    <div>
                        <input onChange={()=> isEdit &&  setProfileData((prev)=>({...prev, available: !prev.available}))} type="checkbox" className=" me-2" checked={profileData.available}/>
                        <label htmlFor="">Available</label>
                    </div>
                    {
                        isEdit
                        ? <button onClick={updateProfile} className="px-4 btn btn-success rounded-5 mt-2">Save</button>
                        : <button onClick={()=>setIsEdit(true)} className="px-4 py-2 btn btn-primary rounded-5 mt-2">Edit</button>
                    }
                    
                </div>
            </div>
        </div>
    );
}

export default DoctorProfile;