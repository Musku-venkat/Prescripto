import { assets } from "../assets/assets_frontend/assets";

function Footer (){
    return(
        <div className="my-5">
            <div className=" d-flex gap-5 text-top rounded my-4 p-5 w-100" style={{backgroundColor:'#ddedf2ff'}}>
                {/* {Left Side} */}
                <div className=" d-flex flex-column gap-2 flex-grow text-start">
                    <img className="mb-2 w-25" src={assets.logo} alt="Logo" />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem officia fugiat, aliquid itaque dignissimos est ab. Molestias maxime et dolore voluptatibus odio distinctio soluta, vitae, similique ducimus tempora dignissimos culpa.</p>
                </div>
                {/* {Middle side} */}
                <div className=" d-flex flex-column gap-2 text-start">
                    <h5>COMPANY</h5>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                {/* {Right Side} */}
                <div className="d-flex flex-column gap-2 text-start">
                    <h5>GET IN TOUCH</h5>
                    <ul>
                        <li>+1-123-456-7890</li>
                        <li>example@gmail.com</li>
                    </ul>
                </div>
            </div>
            {/* {Copyrights Text} */}
            <div className="text-center">
                <p><small>Copyright 2025@ Prescripto - All Rights Reserved.</small></p>
            </div>
        </div>
    );
}

export default Footer;