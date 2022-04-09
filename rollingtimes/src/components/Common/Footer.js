import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logoSm from "./img/logoSm.png";
import { FaPhone } from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <hr className="my-0 bg4"/>
      <section className="bg5 d-flex row justify-content-center m-0 p-0 text-center">
        <div className="col-sm-12 col-md-6 col-lg-4 my-3 p-0 mx-0 text-center align-self-center">
          <div>
            <Link to="/" >
              <img 
                src={logoSm} 
                alt="logo" 
                className="w-75 p-0"/>
            </Link>
            <br/>
            <div className="mt-2">
            <Link to="/*"
              className="link mx-2 my-3 color1"
              style={{ fontSize: "30px" }}>
              <FontAwesomeIcon icon={faFacebook} />
            </Link>
            <Link to="/*"
              className="link mx-2 my-3 color1"
              style={{ fontSize: "35px" }}>
              <FontAwesomeIcon icon={faInstagram} />
            </Link>
            <Link to="/*"
              className="link mx-2 my-3 color1"
              style={{ fontSize: "30px" }}>
              <FontAwesomeIcon icon={faTwitter} />
            </Link>
            <Link to="/*"
              className="link mx-2 my-3 color1"
              style={{ fontSize: "30px" }}>
              <FontAwesomeIcon icon={faYoutube} />
            </Link>
          </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 p-0 m-0">
          <Link id="link-footer1" className="mx-1 outline-dark" to={"/about"}>
            <h4 className="m-0 color2">Sobre Nosotros</h4>
          </Link>
          <div className="px-2">
            <p className="mb-4">
              Somos una pequeña empresa argentina dedicada al diario digital en
              estos tiempos de pandemia, lo que es fundamental poder mantener a
              todos los argentinos informados del dia a dia.
            </p>
          </div>
        </div>
        <div className=" col-sm-12 col-md-6 col-lg-4 p-0 m-0">
          <Link id="link-footer2" className=" mx-1 outline-dark" to={"/contacto"}>
            <h4 className=" pb-1 color2 pt-0">Contacto</h4>
          </Link>
          <div>
            <strong>
              <MdLocationOn className="mb-1 mr-2 color4" />
              Gral. Paz 547 - San Miguel de Tucumán
            </strong>
          </div>
          <div className="my-3">
            <strong>
              <FaPhone className="mb-1 mr-2 color4" />
              +54 9 (381) - 3242 445
            </strong>
          </div>
          <div>
            <strong>
              <MdEmail className="mb-1 mr-2 color4" />
              rollingnews-contacto@gmail.com
            </strong>
          </div>
        </div>
      </section>
      <div className="text-center bg5 m-0 pt-2 ">
        <p className="pb-3 m-0 color4">&copy; Todos los derechos reservados</p>
      </div>
    </div>
  );
};

export default Footer;
