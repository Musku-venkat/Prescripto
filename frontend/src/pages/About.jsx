import { assets } from "../assets/assets_frontend/assets";

function About (){
    return(
        <div className="my-5">
            <div className="text-center text-secondary mb-4">
                <p className=" fw-semibold">ABOUT <span className="text-dark">US</span></p>
            </div>
            <div className="d-flex flex-column flex-md-row gap-4">
                <div>
                    <img className="w-100 h-100" src={assets.about_image} alt=""/>
                </div>
                <div className=" d-flex flex-column justify-content-center gap-2 w-100">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo consequatur molestiae voluptate omnis fuga, obcaecati, quaerat voluptatem qui incidunt officia perferendis porro maiores ex! Consequatur deleniti earum quod iusto error. doloribus magni voluptatum. Perferendis expedita quod laudantium iusto. Magnam, autem.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod tempore architecto, expedita voluptate assumenda illum eaque praesentium animi explicabo iure mollitia nobis laborum officia quasi voluptas odio dolorum facilis doloribus? 
                    Quod, itaque perferendis sapiente libero minima cumque dignissimos ut, expedita tempora ratione accusamus blanditiis delectus vitae nemo quos possimus neque, doloribus magni voluptatum. Perferendis expedita quod laudantium iusto. Magnam, autem.</p>
                    <b>Our Vision</b>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt eligendi id animi, molestias accusantium magni alias veritatis nobis, tempore sint fugiat mollitia delectus assumenda quae. Facere odit ipsam voluptas dolor.</p>
                </div>
            </div>

            <div className="mt-5">
                <p className="fw-semibold">WHY <span className="text-secondary">CHOOSE US</span></p>
            </div>

            <div className="d-flex flex-column flex-sm-row border">
                <div className="border p-5">
                    <b>Efficiency:</b>
                    <p>Streamlined appointment schduling that fits into your busy lifestyle.</p>
                </div>
                <div className="border p-5">
                    <b>Convenience:</b>
                    <p>Access to a network of trusted healthcare professionals in your area.</p>
                </div>
                <div className="border p-5">
                    <b>Personalization:</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>
            </div>
        </div>
    );
}

export default About;