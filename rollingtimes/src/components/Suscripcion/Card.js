import React, { useState } from "react";
import FormRegistro from "./FormRegistro";
import "./Subscription.css";

const Card = (props) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="col-sm-12 px-0">
      <div className="px-0 border border-dark tamaño-card">
        <div className="card-body text-center p-0">
          <img
            src={props.reference}
            alt="cardlogo"
            className="w-100"
            id="card-img"
          ></img>
        </div>
        <h4 className=" card-title pl-3 pt-3" id="h4-titulo">
          <span>Paquete: </span>
          {props.title}
        </h4>
        <h5 className=" pl-3 pt-2">{props.precio}</h5>
        <div className="cardBody p-2 mt-2">
          <div className="beneficios-card">
            <h5 className="color2">Beneficios</h5>
            <p className="card-text text-secondary"></p>
            <ul className="pl-3">
              <li>Acceso limitado online a RollingTimes</li>
              <li>Acceso a los comentarios</li>
              {props.texto}
            </ul>
          </div>

          <FormRegistro show={modalShow} onHide={() => setModalShow(false)} />
        </div>
        <div className="d-flex row justify-content-center align-items-end">
          <button
            className="button-send-close bg2 text-center "
            onClick={() => setModalShow(true)}
          >
            Suscribirme
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
