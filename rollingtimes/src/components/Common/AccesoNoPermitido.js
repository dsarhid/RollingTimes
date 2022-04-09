import React from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { faHome, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import imagenError from "../../assets/gandalf.png";

const AccesoNoPermitido = () => {
    return (
        <Container className="text-center pt-lg-5 pb-lg-5">
          <Image src={imagenError} roundedCircle width={300} alt="Error 403" />
          <h1 className="text-center mt-lg-4 mb-lg-4 categoria-titulo">Acceso no permitido</h1>
          <h5 className="text-center categoria-subtitulo ">Disculpa, esta pagina no esta disponible para usuarios no logueados</h5>
          <h6 className="text-center mb-lg-4 categoria-texto">
            Error de acceso: la direccion ingresada requiere estar logueado
          </h6>
          <div id="notfoundlinks">
            <Link className="text-center" to={`/contacto`} id="contacto404">
              <FontAwesomeIcon icon={faEnvelopeOpenText}></FontAwesomeIcon> Reportar
              enlace
            </Link>{" "}
            |{" "}
            <Link className="text-center" to={`/`}>
              <FontAwesomeIcon icon={faHome}></FontAwesomeIcon> Ir al Inicio
            </Link>
          </div>
        </Container>
      );
};

export default AccesoNoPermitido;