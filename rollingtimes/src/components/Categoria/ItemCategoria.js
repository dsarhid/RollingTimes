import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ItemCategoria = (props) => {
  const eliminarCategoria = (id) => {
    Swal.fire({
      title: "Estas seguro de eliminar la Categoria?",
      text: "No podras recuperar la categoria eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const URL = `${process.env.REACT_APP_URL_CATEGORIA}/${id}`;
          const respuesta = await fetch(URL, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          });
          const informacion = await respuesta.json();

          if (respuesta.status === 200) {
            Swal.fire(
              "Categoria Eliminada",
              "La categoria se elimino correctamente",
              "success"
            );

            props.consultarCategorias();
          } else if (respuesta.status === 500) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: informacion.mensaje,
            });
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al eliminar la categoria",
          });
        }
      }
    });
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <p>{props.categoria.nombre}</p>
      <div>
        <Link
          className="btn btn-warning mr-1 text-light"
          to={`/categorias/editar/${props.categoria._id}`}
        >
          <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
        </Link>
        <Button
          className="btn btn-primary btn-eliminar-categoria mr-1"
          onClick={() => eliminarCategoria(props.categoria._id)}
        >
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
        </Button>  
        <Link
          className="btn mr-1 text-light btn-editar-categoria"
          to={`/categorias/listado-noticias/${props.categoria.nombre}`}
        >
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
        </Link>
      </div>
    </ListGroup.Item>
  );
};

export default ItemCategoria;
