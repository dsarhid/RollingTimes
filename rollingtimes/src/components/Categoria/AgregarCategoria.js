import React, { useState } from "react";
import { Alert, Form, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { validarNombreCategoria } from "../Validaciones";

const AgregarCategoria = (props) => {
  const [nombreCategoria, setNombreCategoria] = useState("");
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const URL = process.env.REACT_APP_URL_CATEGORIA;

  const handleSudmit = async (e) => {
    e.preventDefault();

    const validacionCategoriaResult = validarNombreCategoria(nombreCategoria);

    if (validacionCategoriaResult.esValido) {
      setError(false);
      try {
        const categoriaNueva = {
          nombre: nombreCategoria.trim(),
        };

        const respuesta = await fetch(URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(categoriaNueva),
        });

        const informacion = await respuesta.json();

        if (respuesta.status === 201) {
          Swal.fire(
            "Categoria Creada",
            "La categoria se agrego con exito",
            "success"
          );

          props.consultarCategorias();
          props.history.push("/categorias");
        } else if (respuesta.status === 500) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: informacion.mensaje,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ha ocurrido un error al crear la categoria",
        });
      }
    } else {
      setError(true);
      setMensajeError(validacionCategoriaResult.mensaje);
    }
  };

  const retornarListadoCategorias = () => {
    props.history.push("/categorias");
  };

  return (
    <div className="bg3">
      <Container>
        <Form className="py-5" onSubmit={handleSudmit}>
          <h1 className="text-center my-5 categoria-titulo">
            Agregar nueva Categoria
          </h1>
          <Form.Group>
            <Form.Label className="categoria-texto">
              Nombre de Categoria*
            </Form.Label>
            <div className="col-noticias">
              <input
                className="effect-input input-text"
                type="text"
                onChange={(e) => {
                  setNombreCategoria(e.target.value);
                }}
                maxLength="35"
              ></input>
              <span className="focus-border"></span>
            </div>
          </Form.Group>
          {error ? <Alert variant="warning">{mensajeError}</Alert> : null}
          <div className="d-flex justify-content-end">
            <button
                  className="mt-5 px-4 mr-3 background-black button-send-close"
                  type="button"
                  onClick={() => retornarListadoCategorias()}
                >
                  Cancelar
                </button>
                <button
                  className="mt-5 px-4 mr-3 background-orange button-send-close"
                  type="submit"
                >
                  Guardar
                </button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(AgregarCategoria);
