import React, { useEffect, useState } from "react";
import { Container, ListGroup, Card } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import Moment from "moment";
import "moment/locale/es";
import Spinner from "../Common/Spinner";

const CategoriaListadoNoticias = () => {
  const nombreCategoria = useParams().nombreCategoria;
  const [cargando, setCargando] = useState(false);
  const [noticias, setNoticias] = useState([]);
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    consultarNoticias();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const consultarNoticias = async () => {
    try {
      setCargando(true);
      const URL =
        process.env.REACT_APP_URL_NOTICIA + "/categoria/" + nombreCategoria;
      const respuesta = await fetch(URL);
      if (respuesta.status === 200) {
        const resp = await respuesta.json();
        setNoticias(resp);
        setCargando(false);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al consultar las noticias",
      });
      setCargando(false);
    }
  };

  const formatearFecha = (fecha) => {
    Moment.locale("es");
    let fechaFormateada = Moment(fecha).format("LLLL");
    return fechaFormateada;
  };

  const retornarListadoCategorias = () => {
    history.push("/categorias");
  };

  return (
    <div className="bg3">
      <Container>
        <h1 className="text-center py-5 categoria-titulo">
          Noticias de: <span className="color4">{nombreCategoria}</span>
        </h1>

        {!noticias.length && !cargando && (
          <div className="container d-flex flex-column my-5 align-items-center">
            <span>Sin noticias</span>
          </div>
        )}
        {cargando && (
          <div className="container d-flex flex-column my-5 align-items-center">
            <Spinner></Spinner>
            <span>Cargando...</span>
          </div>
        )}
        {!cargando && (
          <ListGroup className="my-5">
            {noticias.map((noticia) => (
              <Card key={noticia._id}>
                <Card.Body className="row">
                  <div className="col-sm-12 col-md-4 my-3">
                    <img src={noticia.imagen} className="img img-fluid" alt="img-notice"></img>
                  </div>
                  <div>
                    <Card.Title className="categoria-subtitulo">
                      <strong>{noticia.titulo}</strong>
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted categoria-subtitulo">
                      {formatearFecha(noticia.fecha)}
                    </Card.Subtitle>
                    <Card.Text as='div'>
                      <h6 className="categoria-texto">{noticia.subtitulo}</h6>
                      <footer className="blockquote-footer">
                        Autor <cite title="Source Title">{noticia.autor}</cite>
                      </footer>
                    </Card.Text>
                    <div id="notfoundlinks">
                      <Card.Link href={`/noticia/${noticia._id}`}>
                        Ir a la noticia
                      </Card.Link>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </ListGroup>
        )}
        <div className="d-flex justify-content-lg-end">
          <button
            className="my-5 mr-2 background-black button-send-close"
            type="button"
            onClick={() => retornarListadoCategorias()}
          >
            Volver
          </button>
        </div>
      </Container>
    </div>
  );
};

export default CategoriaListadoNoticias;
