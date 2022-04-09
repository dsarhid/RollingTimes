import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Container, ListGroup } from "react-bootstrap";
import ItemCategoria from "./ItemCategoria";
import Spinner from "../Common/Spinner";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListarCategorias = (props) => {
  const redirigirAgregarCategoria = () => {
    props.history.push("/categorias/nuevo");
  };

  return (
    <div className="bg3">
    <Container>
      <h1 className="text-center pt-3 categoria-titulo">Lista de Categorias</h1>
      <button
        className="mx-2 my-1 background-orange button-send-close"
        type="button"
        onClick={() => redirigirAgregarCategoria()}
      >
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> Agregar categoria
      </button>
      <hr className="bg4" />
      {!props.categorias.length && !props.cargando && (
        <div className='container d-flex flex-column my-5 align-items-center'>
        <span>Sin categorias</span>
      </div>
      )}

      {props.cargando && (
        <div  className='container d-flex flex-column my-5 align-items-center'>
          <Spinner></Spinner>
          <span>Cargando...</span>
        </div>
      )}

      {!props.cargando && (
        <ListGroup className="my-5">
          {props.categorias.map((cat) => (
            <ItemCategoria
              categoria={cat}
              key={cat._id}
              consultarCategorias={props.consultarCategorias}
            ></ItemCategoria>
          ))}
        </ListGroup>
      )}
    </Container>
    </div>
  );
};

export default withRouter(ListarCategorias);
