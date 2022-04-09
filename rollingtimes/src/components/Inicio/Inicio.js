import React, { useState, useEffect } from "react";
import CarouselNoticias from "./CarouselNoticias";
import BoardNoticias from "./BoardNoticias";
import Publicidad from "./Publicidad";
import "./inicio.css";
import Spinner from "../Common/Spinner";

const Inicio = (props) => {
  const [noticiasDestacadas, setNoticiasDestacadas] = useState([]);

  useEffect(() => {
    buscarDestacadas();
  }, [props.noticias]); // eslint-disable-line react-hooks/exhaustive-deps
  
  const buscarDestacadas = () => {
    const data = [];
    for (let i in props.noticias) {
      const notasDestacadas = props.noticias[i].destacar;
      if (notasDestacadas === true) {
         data.push(props.noticias[i]) ;
      }
    }
    setNoticiasDestacadas([...data])
  }

  return (
    <div id='InicioContainer'>
      {!props.cargando && (
        <CarouselNoticias noticias={noticiasDestacadas} />
      )}      

      {!props.noticias.length && !props.cargando && (
        <div  className='container d-flex flex-column my-5 align-items-center'>
        <span>Sin Noticias</span>
      </div>
      )}

      {props.cargando && (
        <div  className='container d-flex flex-column my-5 align-items-center'>
          <Spinner></Spinner>
          <span>Cargando...</span>
        </div>
      )}

      {!props.cargando && (
        <BoardNoticias noticias={props.noticias.slice(0, 3)} />
      )}

      <Publicidad publicidad={3} />

      {!props.cargando && (
        <BoardNoticias noticias={props.noticias.slice(3)} />
      )}

    </div>
  );
};

export default Inicio;
