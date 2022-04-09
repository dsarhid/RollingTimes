import React from "react";
import { Card, CardDeck, Container } from "react-bootstrap";
import Moment from "moment";

const BoardNoticias = (props) => {
  const formatearFecha = (fecha) => {
    Moment.locale("es");
    let fechaFormateada = Moment(fecha).format("LLLL");
    return fechaFormateada;
  };

  return (
    <Container className="pb-4 mt-4">
      <div className="row">
        <CardDeck>
          {props.noticias.map((noticia) => (
            <div key={noticia._id} className="col-md-4 mb-3">
              <Card >
                <Card.Img variant="top" src={noticia.imagen} />
                <Card.Body>
                  <Card.Title>{noticia.titulo}</Card.Title>
                  <div>
                    {noticia.subtitulo}
                    <div id="notfoundlinks" className="mt-3">
                      <Card.Link href={`/noticia/${noticia._id}`}>
                        Ir a la noticia
                      </Card.Link>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">
                    {formatearFecha(noticia.fecha)}
                  </small>
                </Card.Footer>
              </Card>
            </div>
          ))}
        </CardDeck>
      </div>
    </Container>
  );
};
export default BoardNoticias;