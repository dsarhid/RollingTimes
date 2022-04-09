import React, { useState } from "react";
import { Container, Form, Col, Modal } from "react-bootstrap";
import {
  validarNombre,
  validarApellido,
  validarDireccion,
  validarLocalidad,
  validarPassword,
  validarPostal,
  validarTelefono,
  validarEmail,
} from "../Validaciones";
import Swal from "sweetalert2";

const FormRegistro = (props) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [localidad, setLocalidad] = useState("");
  const [direccion, setDireccion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [telefono, setTelefono] = useState();
  const [postal, setPostal] = useState();
  const [terminos, setTerminos] = useState(false);

  const onChangeTerminos = (e) => {
    setTerminos(e.target.checked);
  };

  const hideModal = () => {

    if (
      validarNombre(nombre) &&
      validarApellido(apellido) &&
      validarDireccion(direccion) &&
      validarLocalidad(localidad) &&
      validarEmail(email) &&
      validarTelefono(telefono) &&
      validarPostal(postal) &&
      validarPassword(password) &&
      validarPassword(password2) &&
      terminos
    ) {
      props.onHide();
    }
  };

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const comparePassword = () => {
      if(password === password2){
        return true;
      }
      else{
        console.log("password no coinciden");
        return false;
      }
    }


    if (
      validarNombre(nombre) &&
      validarApellido(apellido) &&
      validarDireccion(direccion) &&
      validarLocalidad(localidad) &&
      validarEmail(email) &&
      validarTelefono(telefono) &&
      validarPostal(postal) &&
      validarPassword(password) &&
      validarPassword(password2) &&
      comparePassword() &&
      terminos
    ) {
      try {
        const suscripcionNueva = {
          nombre,
          apellido,
          localidad,
          direccion,
          email,
          password,
          telefono,
          postal,
        };

        const respuesta = await fetch(
          "http://localhost:4001/api/suscripcion/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(suscripcionNueva),
          }
        );

        console.log(respuesta);

        if (respuesta.status === 201) {
          Swal.fire(
            "Bien hecho!",
            "La suscripcion se realizo correctamente!",
            "success"
          );
        } else {
          if (respuesta.status === 404) {
            Swal.fire(
              "Error",
              "Por algun motivo no se pudo suscribir correctamente.",
              "error"
            );
          } else {
            Swal.fire(
              "El email y/o telefono ya se encuentra registrado",
              "Intente suscribirse con otro correo electronico y/o telefono",
              "error"
            );
          }
        }
      } catch (error) {
        console.log("error catch");
        console.log(error);
        Swal.fire(
          "Error",
          "Por algun motivo no se pudo suscribir correctamente!",
          "error"
        );
      }
      e.target.reset();
      setNombre("");
      setApellido("");
      setLocalidad("");
      setDireccion("");
      setEmail("");
      setPassword("");
      setTelefono();
      setPostal();
      setTerminos(false);
    } else {
      console.log("error validacion");
      if(comparePassword()){
        Swal.fire("Error", "Algun campo no se completo como deberia!", "error");
      }else{
        Swal.fire("Error", "Las contraseñas no coinciden", "error");
      }
    }
  };

  return (
    <div>
      <Container>
        <Modal {...props} keyboard={false} size="lg">
          <Modal.Header className="p-0 d-block">
            
            <div className="text-center color2">
              <h3 className="login-title m-0">Suscripcion RollingTimes</h3>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group className="col-md-12 col-lg-6 mb-0">
                  <div>
                    <div className="col-login">
                      <input
                        className="effect-input input-text"
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        minLength={3}
                        maxLength={24}
                        required
                      />
                      <span className="focus-border"></span>
                    </div>
                  </div>
                </Form.Group>
                <Form.Group className="col-md-12 col-lg-6 mb-0">
                  <div className="col-login">
                    <input
                      className="effect-input input-text"
                      name="apellido"
                      type="text"
                      placeholder="Apellido"
                      onChange={(e) => setApellido(e.target.value)}
                      minLength={3}
                      maxLength={24}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group>
                    
                    <div className="col-login">
                    <input
                      className="effect-input input-text"
                      name="localidad"
                      type="text"
                      placeholder="Localidad"
                      onChange={(e) => setLocalidad(e.target.value)}
                      minLength={4}
                      maxLength={40}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                  </Form.Group>
                  <Form.Group>
                    
                    <div className="col-login">
                    <input
                      className="effect-input input-text"
                      name="direccion"
                      type="text"
                      placeholder="Dirección"
                      onChange={(e) => setDireccion(e.target.value)}
                      minLength={4}
                      maxLength={40}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                  </Form.Group>
                  <Form.Group>
                    
                    <div className="col-login">
                    <input
                      className="effect-input input-email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      minLength={10}
                      maxLength={40}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                  </Form.Group>
                  <Form.Group>
                    
                    <div className="col-login">
                    <input
                      className="effect-input input-password"
                      name="password"
                      type="password"
                      placeholder="Contraseña"
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={4}
                      maxLength={20}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                  </Form.Group>
                  <Form.Group>
                    
                    <div className="col-login">
                    <input
                      className="effect-input input-password"
                      name="password2"
                      type="password"
                      placeholder="Confirmar Contraseña"
                      onChange={(e) => setPassword2(e.target.value)}
                      minLength={4}
                      maxLength={20}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Form.Group className="col-md-12 col-lg-6 mb-0">
                    
                    <div className="col-login">
                    <input
                      className="effect-input input-text"
                      name="telefono"
                      type="number"
                      placeholder="Telefono"
                      onChange={(e) => setTelefono(e.target.value)}
                      minLength={7}
                      maxLength={14}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                  </Form.Group>
                  <Form.Group className="col-md-12 col-lg-6">
                    
                    <div className="col-login">
                    <input
                      className="effect-input input-text"
                      name="postal"
                      type="number"
                      placeholder="Postal"
                      onChange={(e) => setPostal(e.target.value)}
                      minLength={4}
                      maxLength={4}
                      required
                    />
                    <span className="focus-border"></span>
                  </div>
                  </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Check
                  name="terminos"
                  type="checkbox"
                  label="Acepto los terminos y condiciones"
                  onChange={onChangeTerminos}
                  required
                ></Form.Check>
              </Form.Group>
              <div className="text-center">
                <button
                  className="button-send-close bg2"
                  type="submit"
                  onClick={hideModal}
                >
                  Enviar
                </button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
};

export default FormRegistro;
