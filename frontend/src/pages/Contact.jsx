import { assets } from '../assets/assets_frontend/assets'

function Contact (){
    return(
        <div className="my-5">
            <div className="text-center text-secondary mb-4">
                <p className="fw-semibold">CONTACT <span className="text-dark">US</span></p>
            </div>

            <div className='d-flex flex-column flex-md-row align-items-center gap-4'>
                <div className='text-end'>
                    <img className='w-75 h-100' src={assets.contact_image} alt=""/>
                </div>
                <div className=' d-flex flex-column align-items-start gap-4 text-secondary w-75'>
                    <p className=' fw-semibold'>OUR OFFICE</p>
                    <p>54709 Willms Station <br /> Suite 350, Washington, USA</p>
                    <p>Tel: (123) 444-5678 <br /> Email: example@gmail.com</p>
                    <p className=' fw-semibold'>CAREERS AT PRESCRIPTO</p>
                    <p>Learn more about our teams and job openings.</p>
                    <button className='btn border-2 border-black rounded-0 px-4 py-2'>Explore Jobs</button>
                </div>
            </div>
        </div>
    );
}

export default Contact;