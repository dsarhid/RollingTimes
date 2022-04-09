import React from "react";
import AboutUsCard from "./AboutUsCard";
import "./AboutUs.css";
import SIL from "../../assets/SIL.jpg";
import BENJA from "../../assets/BENJA.jpeg";
import DAVID from "../../assets/DAVID.jpg";
import TULIO from "../../assets/TULIO.jpeg";
import ABOUT from "../../assets/about-us2.png"

const AboutUs = () => {
  return (
    <div className="text-center bg5">
        <div>
        <h1 className="py-4"><img src={ABOUT} alt="about-us" className="w-100"></img></h1>
        </div>
        <div className="d-flex justify-content-center">
          <div className="row p-0 m-0">
            
            <div className="my-3 px-0 mx-0 col-sm-12 col-md-6 col-lg-3 px-5">
              <AboutUsCard
                image={SIL}
                title="Sil Medina"
                text1="Developer"
                text2='Customer Cure Representative and QA trainee at Rollingcode "Se un punto de referencia de calidad" '
                width={"220px"}
              />
            </div>
            <div className="my-3 px-0 mx-0 col-sm-12 col-md-6 col-lg-3 px-5">
              <AboutUsCard
                image={TULIO}
                title="Tulio Moya"
                text1="Developer"
                text2="Junior developer FullStack and economy student"
                width={"220px"}
              />
            </div>
            <div className="my-3 px-0 mx-0 col-sm-12 col-md-6 col-lg-3 px-5">
              <AboutUsCard
                image={DAVID}
                title="David Sarhid"
                text1="Developer"
                text2="Junior developer FullStack and systems engineering student"
                width={"220px"}
              />
            </div>
            <div className="my-3 px-0 mx-0 col-sm-12 col-md-6 col-lg-3 px-5">
              <AboutUsCard
                image={BENJA}
                title="Benjamín Dracnizarek"
                text1="Developer"
                text2='Junior developer FullStack and freelancer to music'
                width={"220px"}
              />
            </div>
          </div>
        </div>
    </div>
  );
};

export default AboutUs;
