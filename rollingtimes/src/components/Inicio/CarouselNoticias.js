import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./carouselNoticias.css";
import Moment from 'moment';

const CarouselNoticias = (props) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  
  const formatearFecha = (fecha) => {
    Moment.locale('es');
    let fechaFormateada = Moment(fecha).format('LLLL');
    return fechaFormateada;
  }

  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {props.noticias.map((noticia, index) => {
          return (
            <Carousel.Item key={index} className="noticiaContainer">
              <img
                className="d-block w-100 slider-responsive"
                src={noticia.imagen}
                alt={"slide" + index}
              />
              <Link to={'/noticia/' + noticia._id} style={{textDecoration: 'none'}}>
                <Carousel.Caption
                  id="noticiaCaption"
                  style={{ cursor: "pointer" }}
                >
                  <div id="noticiaInfo">
                    <p className="noticiaInfo px-3">{noticia.categoria}&nbsp;</p>
                    <p className="noticiaInfo px-3">&nbsp;{formatearFecha(noticia.fecha)}</p>
                  </div>
                 <div className="titulo-carousel">
                   <p className="px-4 m-0">{noticia.titulo}</p>
                  </div> 
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};
export default CarouselNoticias;
