import React, { useState, useEffect } from "react";
import { Container, Form, Col, Card } from "react-bootstrap";
import {
  validarNombre,
  validarEmail,
  validarTextArea,
  validarConsulta,
} from "../Validaciones";
import Iframe from "react-iframe";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import LogoSm from "../Common/img/logoSm.png";
import { Link } from "react-router-dom";
import { FaPhone, FaQuestionCircle } from "react-icons/fa"
import { MdEmail, MdLocationOn } from "react-icons/md"
import "./Contact.css";

const Contact = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [textArea, setTextArea] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sendMail = (e) => {
    emailjs
      .sendForm(
        "service_75i9wjj",
        "template_55r1v1h",
        e.target,
        "user_Y41fnJgv1nj4ow0DJZfmZ"
      )
      .then(
        (result) => {
          console.log(result.text);
          Swal.fire(
            "Bien hecho!",
            "El mensaje se envio correctamente!",
            "success"
          );
        },
        (error) => {
          console.log(error.text);
          mensajeError();
        }
      );
  };

  const mensajeError = () => {
    Swal.fire(
      "Error!",
      "Algun campo esta incompleto o escribo erroneamente!",
      "error"
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validarNombre(nombre) &&
      validarEmail(email) &&
      validarTextArea(textArea) &&
      validarConsulta(tipoConsulta)
    ) {
      sendMail(e);
      e.target.reset();
    } else {
      mensajeError();
    }
  };

  return (
    <div className="bg3">
    <Container className="py-5">
      <Form.Row className="d-flex row justify-content-center">
        <h2 className="text-center mb-3 color2">¿Como contactarnos?</h2>
        <Iframe
          url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4233.6870551495285!2d-65.2094817776788!3d-26.837017462470826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses-419!2sar!4v1622330168946!5m2!1ses-419!2sar"
          width="900"
          height="300"
          className="mb-5 mt-3 border border-dark"
          allowfullscreen=""
          loading="lazy"
        ></Iframe>
      </Form.Row>
      <Form.Row>
        <Col className="mx-2">
          <h2 className="text-center color2 mb-4">Mensajes y consultas</h2>
          <p>Complete el formulario para enviar su consulta y/o sugerencia.</p>
          <p className="mb-4">
            ( <span className="text-danger">*</span> ) CAMPOS OBLIGATORIOS
          </p>

          <Form className="mt-3" onSubmit={handleSubmit}>
            <Form.Group>
              <div className="col-login">
                <input
                  className="effect-contact input-text pb-2"
                  name="nombre"
                  type="text"
                  placeholder="* Nombre Completo"
                  onChange={(e) => setNombre(e.target.value)}
                  minLength={4}
                  maxLength={30}
                  required
                />
                <span className="focus-border"></span>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="col-login">
                <input
                  className="effect-contact input-email pb-2"
                  name="email"
                  type="email"
                  placeholder="* Email"
                  onChange={(e) => setEmail(e.target.value)}
                  minLength={10}
                  maxLength={40}
                  required
                />
                <span className="focus-border"></span>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="col-login mt-3">
                <Form.Control
                  className="input-email"
                  id="input-select"
                  name="tipoConsulta"
                  as="select"
                  onChange={(e) => setTipoConsulta(e.target.value)}
                  required
                >
                  <option>* Seleccione una categoria</option>
                  <option>Sugerencias a la web</option>
                  <option>Noticias errónea</option>
                  <option>Problemas tecnicos con la web</option>
                  <option>Funcionalidades de la web</option>
                  <option>Información erronea</option>
                  <option>Otros</option>
                </Form.Control>
                <span className="focus-border"></span>
              </div>
            </Form.Group>
            <Form.Group>
              <div className="col-login">
                <textarea
                  className="effect-textArea input-text  input-textArea"
                  name="textArea"
                  as="textarea"
                  type="text"
                  placeholder=" * Escriba su consulta (Entre 10 a 300 caracteres)"
                  onChange={(e) => setTextArea(e.target.value)}
                  minLength={10}
                  maxLength={300}
                  rows={6}
                  required
                />
                <span className="focus-border"><i></i></span>
              </div>
              <p>Muchas gracias por su consulta y/o sugerencia, le contestaremos a la brevedad.</p>
            </Form.Group>
            <div className="text-center">
            <button type="submit" className="w-50 my-4 button-send-close background-orange text-center mr-4">
              Enviar
            </button>
            </div>
          </Form>
        </Col>
        <Col>
          <article>
            <div className="d-flex row justify-content-center mx-1 mt-5">
              <Card border="dark" style={{ width: "23rem" }}>
                <Card.Header className="text-center p-1">
                  {" "}
                  <img src={LogoSm} alt="Logo" />{" "}
                </Card.Header>
                <Card.Body>
                  <h4 className="color2">Casa Central</h4>
                  <div className="pb-3">
                    <strong><MdLocationOn className="mb-1 mr-2"/>Gral. Paz 547 - San Miguel de Tucumán</strong>
                  </div>
                  <h4 className="color2">Telefono de contacto</h4>
                  <div className="pb-3">
                    <small>Enviá tu denuncia a nuestra linea exclusiva</small>
                    <p className="my-1">
                      <strong><FaPhone className="mb-1 mr-2"/>+54 9 (381) - 3242 445</strong>
                    </p>
                    <small>
                      La información será evaluada y en caso de publicarse se
                      protegerá tu identidad
                    </small>
                  </div>
                  <h4 className="color2">Correo de contacto</h4>
                  <div className="pb-3">
                    <p>Para publicitar en la web:</p>
                    <p>
                      <strong><MdEmail className="mb-1 mr-2"/>rollingnews-contacto@gmail.com</strong>
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div>
              <h6 className="text-center my-4">
                También te sugerimos visitar
                <Link className="mx-1 outline-dark" to={`/error404`}>
                  Preguntas Frecuentes <FaQuestionCircle className="mb-1 mr-2"/>
                </Link>
              </h6>
              <span></span>
            </div>
          </article>
        </Col>
      </Form.Row>
    </Container>
    </div>
  );
};
export default Contact;
