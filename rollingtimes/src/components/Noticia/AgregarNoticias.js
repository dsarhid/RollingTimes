import React, { useState, useEffect } from "react";
import { Alert, Form, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import Spinner from "../Common/Spinner";
import {
  validarTitulo,
  validarSubtitulo,
  validarCuerpo,
  validarCategoria,
  validarAutor,
} from "../Validaciones";

const Noticias = (props) => {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const destacar = false;

  useEffect(() => {
    window.scrollTo(0, 0);
    setCategoria("seleccione una opcion");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      validarTitulo(titulo) &&
      validarSubtitulo(subtitulo) &&
      validarCuerpo(texto) &&
      validarCategoria(categoria) &&
      validarAutor(autor)
    ) {
      setError(false);

      const noticia = {
        titulo,
        subtitulo,
        texto,
        imagen,
        categoria,
        autor,
        destacar,
      };

      if (!imagen) {
        noticia.imagen = "https://i.ibb.co/WxWh5PB/imagen-no-disponible.jpg";
      }

      try {
        const configuracion = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noticia),
        };

        const respuesta = await fetch(
          "http://localhost:4001/api/noticia/",
          configuracion
        );
        const informacion = await respuesta.json();

        if (respuesta.status === 201) {
          Swal.fire(
            "Noticia creada",
            "La noticia se agrego correctamente",
            "success"
          );
          props.consultarNoticias();
          props.history.push("/noticias");
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
          text: "Ha ocurrido un error al guardar la noticia",
        });
        console.log(error);
      }
    } else {
      setError(true);
      if (validarTitulo(titulo) === false) {
        setError(true);
        console.log("pase por titulo");

        setMensajeError(
          "Titulo no es valido. Titulo debe tener un minimo de 7 letras y un maximo de 50"
        );
        return;
      }

      if (validarSubtitulo(subtitulo) === false) {
        setError(true);
        console.log("pase por subtitulo");
        setMensajeError(
          "Subtitulo no es  valido. Subtitulo debe tener un minimo de 10 letras y un maximo de 90"
        );
        return;
      }

      if (validarCuerpo(texto) === false) {
        console.log("pase por texto");
        setError(true);
        setMensajeError("El cuerpo del texto no valido");
        return;
      }

      if (validarCategoria(categoria) === false) {
        setError(true);
        setMensajeError("Debe seleccionar una categoria");
        return;
      }

      if (validarAutor(autor) === false) {
        setError(true);
        setMensajeError("Debe ingresar un autor");
        return;
      }
    }
  };

  const retornarListadoNoticias = () => {
    props.history.push("/noticias");
  };

  return (
    <div className="bg3">
      <Container>
        <h1 className="text-center py-2">Agregar Noticia</h1>
        <hr className="bg4" />

        {props.cargandoCategorias && (
          <div className="container d-flex flex-column my-5 align-items-center">
            <Spinner></Spinner>
            <span>Cargando...</span>
          </div>
        )}
        {!props.cargandoCategorias && (
          <Form className="my-5" onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Label>Titulo de Noticia *</Form.Label>
              <div className="col-login">
                <input
                  className="effect-input input-text"
                  type="text"
                  placeholder="Ingrese un titulo"
                  onChange={(e) => setTitulo(e.target.value)}
                  maxLength="80"
                ></input>
                <span className="focus-border"></span>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Descripcion breve (copete o subtitulo) *</Form.Label>
              <div className="col-login">
                <input
                  className="effect-input input-text"
                  type="text"
                  placeholder="Ingrese una descripcion breve"
                  onChange={(e) => setSubtitulo(e.target.value)}
                  maxLength="80"
                ></input>
                <span className="focus-border"></span>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Texto de la noticia *</Form.Label>
              <div className="col-login">
                <textarea
                  className="effect-textArea input-text input-textArea"
                  as="textarea"
                  placeholder="Ingrese una descripcion detallada"
                  style={{ height: "200px" }}
                  onChange={(e) => setTexto(e.target.value)}
                ></textarea>
                <span className="focus-border">
                  <i></i>
                </span>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Imagen</Form.Label>
              <div className="col-login">
                <input
                  className="effect-input input-text"
                  type="text"
                  placeholder="Agregar URL"
                  onChange={(e) => setImagen(e.target.value)}
                ></input>
                <span className="focus-border"></span>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Categoria *</Form.Label>
              <div className="col-login">
                <Form.Control
                  className="input-email"
                  as="select"
                  id="input-select2"
                  onChange={(e) => setCategoria(e.target.value)}
                  value={categoria}
                >
                  {props.categorias.map((cat, idx) => (
                    <option key={idx} value={cat.nombre}>
                      {cat.nombre}
                    </option>
                  ))}
                  <option disabled value={"seleccione una opcion"} key={-1}>
                    Seleccione una opcion
                  </option>
                </Form.Control>
                <span className="focus-border"></span>
              </div>
            </Form.Group>

            <Form.Group>
              <Form.Label>Autor *</Form.Label>
              <div className="col-noticias">
                <input
                  className="effect-input input-text"
                  type="text"
                  placeholder="Nombre del autor"
                  onChange={(e) => setAutor(e.target.value)}
                  maxLength="30"
                ></input>
                <span className="focus-border"></span>
              </div>
            </Form.Group>

            {error === true ? (
              <Alert variant="warning">{mensajeError}</Alert>
            ) : null}

            <div className="d-flex justify-content-end">
              <button
                className="my-5 mr-2 px-4 background-black button-send-close"
                type="button"
                onClick={() => retornarListadoNoticias()}
              >
                Cancelar
              </button>
              <button
                className="my-5 px-4 background-orange button-send-close"
                type="submit"
              >
                Guardar
              </button>
            </div>
          </Form>
        )}
      </Container>
    </div>
  );
};
export default withRouter(Noticias);
