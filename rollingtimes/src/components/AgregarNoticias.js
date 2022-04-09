import React, { useState, useEffect } from "react";
import { Alert, Form, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import {
  validarTitulo,
  validarSubtitulo,
  validarCuerpo,
  validarCategoria,
  validarAutor
} from "./Validaciones";
import Spinner from "../components/Common/Spinner";

const Noticias = (props) => {
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [autor, setAutor] = useState("");
  let destacar = false;
  let publicar = false;
  const [error, setError] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  let token = localStorage.getItem("jwt");
  
  useEffect(() => {
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
        publicar,
      };
      if(token !== null){
        try {
          const configuracion = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
            body: JSON.stringify(noticia),
          };
          console.log(token);
  
          const respuesta = await fetch("http://localhost:4001/api/noticia", configuracion);
          const informacion = await respuesta.json();
  
          console.log(respuesta);
          if (respuesta.status === 201) {
            Swal.fire(
              "Noticia creada",
              "La noticia se agrego correctamente",
              "success"
            );
            props.consultarNoticias();
            props.history.push('/noticias');
          } else if (respuesta.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: informacion.mensaje,
            });
          }else{
            if(respuesta.status === 403){
              Swal.fire({
                icon: "error",
                title: "No tienes los permisos para realizar esta accion",
                text: informacion.mensaje,
              });
            }
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al guardar la noticia",
          });
          console.log(error);
        }
      }else{
        Swal.fire({
          icon: "error",
          title: "No tienes los permisos para realizar esta accion",
        });
      }
      
    } else {
      setError(true);
      if (validarTitulo(titulo) === false) {
        setError(true);
        console.log("pase por titulo");
        
        setMensajeError("Titulo no es valido. Titulo debe tener un minimo de 7 letras y un maximo de 50");
        return;
      }

      if (validarSubtitulo(subtitulo) === false) {
        setError(true);
        console.log("pase por subtitulo");
        setMensajeError("Subtitulo no es  valido. Subtitulo debe tener un minimo de 10 letras y un maximo de 90");
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
    };
  }

  const retornarListadoNoticias = () => {
    props.history.push("/noticias");
  }

  const formatYmd = (date) => date.toISOString().slice(0, 10);

  return (
    <Container>
      <h1 className="text-center my-2">Agregar Noticia</h1>
        <Link className='btn mx-2 my-1 background-orange text-light' to={`/noticias`}><FontAwesomeIcon icon={faList} className="pr-1"></FontAwesomeIcon>Lista de notas</Link>
      <hr />

      {props.cargandoCategorias && (
        <div  className='container d-flex flex-column my-5 align-items-center'>
          <Spinner></Spinner>
          <span>Cargando...</span>
        </div>
      )}
      {!props.cargandoCategorias && (
        <Form className="my-5" onSubmit={handleSubmit}>
        {/* titulo */}
        <Form.Group>
          <Form.Label>Titulo de Noticia *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese un titulo"
            onChange={(e) => setTitulo(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* subtitulo */}
        <Form.Group>
          <Form.Label>Descripcion breve (copete o subtitulo) *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese una descripcion breve"
            onChange={(e) => setSubtitulo(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* texto */}
        <Form.Group>
          <Form.Label>Texto de la noticia *</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Ingrese una descripcion detallada"
            style={{ height: '200px' }}
            onChange={(e) => setTexto(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* imagen */}
        <Form.Group>
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Agregar URL"
            onChange={(e) => setImagen(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* categoria */}
        <Form.Group>
          <Form.Label>Categoria *</Form.Label>
          <Form.Control
            as="select"
            name=""
            id=""
            onChange={(e) => setCategoria(e.target.value)}
            value={categoria}
          >
            {props.categorias.map((cat, idx) => (
              <option key={idx} value={cat.nombre}>{cat.nombre}</option>
            ))}
            <option disabled value={"seleccione una opcion"} key={-1}>Seleccione una opcion</option>
          </Form.Control>
        </Form.Group>

        {/* autor */}
        <Form.Group>
          <Form.Label>Autor *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre del autor"
            onChange={(e) => setAutor(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {error === true ? (
          <Alert variant="warning">{mensajeError}</Alert>
        ) : null}

        <div className="d-flex justify-content-lg-end">
          <button
            className="my-5 mr-2 background-black button-send-close"
            type="button"
            onClick={() => retornarListadoNoticias()}
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
      )}
    </Container>
  );
};
export default withRouter(Noticias);
