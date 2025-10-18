import { assets } from "../assets/assets_frontend/assets";

function Header (){
    return(
        <>  
            <div className="d-flex flex-row flex-wrap flex-md-nowrap align-items-center justify-content-center rounded px-5 mb-5 text-light" style={{backgroundColor:'#3396D3'}}>
                {/* {Left Side} */}
                <div className="d-flex flex-column align-items-start justify-content-center gap-4 py-5 m-auto">
                    <h1 className="fw-bold fs-1">
                        Book Appointment <br /> With Trusted Doctors
                    </h1>
                    <div>
                        <img src={assets.group_profiles} alt="" width='15%' className="mb-2"/>
                        <p>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                    </div>
                    <a className='bg-light rounded-5 px-4 py-2' href="#speciality" style={{backgroundColor:'#3396D3'}}>
                        Book appointment ➜
                    </a>
                </div>
                {/* {Right Side} */}
                <div>
                    <img src={assets.header_img} alt="" width='100%'/>
                </div>
            </div>
        </>
    );
}

export default Header;