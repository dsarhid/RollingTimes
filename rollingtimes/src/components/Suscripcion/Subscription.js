import React from "react";
import Card from "./Card";
import "./Subscription.css";
import { Container, Row } from "react-bootstrap";
import diarioDigital from "../../assets/diarioDigital.jpg";
import diarioDigital2 from "../../assets/diarioDigital2.jpg";
import diarioDigital3 from "../../assets/diarioDigital3.jpg";

const Subscription = () => {
  return (
    <div className="bg5">
      <Container className="p-0">
        <div className="px-3">
        <h2 className="text-center pt-5 pb-3 ">Informate de la actualidad</h2>
        <h4 className="text-center text-secondary">
          No te quedes desinformado del dia a dia
        </h4>
        </div>
        <Row className="d-flex h-100 py-5 mx-3">
          <div className="col-sm-12 col-md-6 col-lg-4 mb-5">
            <Card
              title="Básico"
              precio="Sin Costo"
              texto=""
              reference={diarioDigital}
            ></Card>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4 mb-5">
            <Card
              title="Estandar"
              precio="Precio: $150"
              texto={<li>Guardar noticias</li>}
              reference={diarioDigital2}
            ></Card>
          </div>
          <div className="d-block d-md-block d-lg-none col-md-3"></div>
          
          <div className="col-sm-12 col-md-6 col-lg-4 mb-3">
              <Card
                title="Premium"
                tex
                precio="Precio: $250"
                texto={<li>Guardar noticias + Tarjeta fisica</li>}
                reference={diarioDigital3}
              ></Card>
            </div>
        </Row>
      </Container>
    </div>
  );
};

export default Subscription;
