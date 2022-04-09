import React, { useEffect, useState, useRef } from "react";
import { Alert, Form, Container } from "react-bootstrap";
import { useParams, withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import { validarNombreCategoria } from "../Validaciones";

const EditarCategoria = (props) => {
  const id = useParams().id;
  const nombreCategoriaRef = useRef("");
  const [categoria, setCategoria] = useState({});
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const URL = process.env.REACT_APP_URL_CATEGORIA + "/" + id;
  let token = localStorage.getItem("jwt");

  useEffect(() => {
    consultarCategoria();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const consultarCategoria = async () => {
    try {
      const respuesta = await fetch(URL);
      if (respuesta.status === 200) {
        const resp = await respuesta.json();
        setCategoria(resp);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al consultar la categoria",
      });
    }
  };

  const handleSudmit = async (e) => {
    e.preventDefault();

    const validacionCategoriaResult = validarNombreCategoria(
      nombreCategoriaRef.current.value
    );

    if (validacionCategoriaResult.esValido) {
      setError(false);
      try {
        const categoriaModificada = {
          nombre: nombreCategoriaRef.current.value,
        };

        const respuesta = await fetch(URL, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(categoriaModificada),
        });

        const informacion = await respuesta.json();

        if (respuesta.status === 200) {
          Swal.fire(
            "Categoria Modificada",
            "La categoria se modifico con exito",
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
          text: "Ha ocurrido un error al guardar la categoria",
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
            Editar Categoria
          </h1>
          <Form.Group>
            <Form.Label className="categoria-texto">
              Nombre de Categoria*
            </Form.Label>
            <div className="col-noticias">
              <input
                className="effect-input input-text"
                type="text"
                maxLength="35"
                ref={nombreCategoriaRef}
                defaultValue={categoria.nombre}
              ></input>
              <span className="focus-border"></span>
            </div>
          </Form.Group>
          {error ? <Alert variant="warning">{mensajeError}</Alert> : null}
          <div className="d-flex justify-content-lg-end">
            <button
              className="my-5 mr-2 background-black button-send-close"
              type="button"
              onClick={() => retornarListadoCategorias()}
            >
              Cancelar
            </button>
            <button
              className="my-5 background-orange button-send-close"
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

export default withRouter(EditarCategoria);
