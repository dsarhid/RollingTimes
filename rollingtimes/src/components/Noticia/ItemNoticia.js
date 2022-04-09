import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencilAlt, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ItemNoticia = (props) => {
  let token=""

  const eliminarNoticia = (id) => {
    Swal.fire({
      title: "Estas seguro de eliminar esta noticia?",
      text: "No podras recuperar la noticia eliminada",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const URLNOT = `${process.env.REACT_APP_URL_NOTICIA}/${id}`;
          const respuesta = await fetch(URLNOT, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token,
            },
          });
          if (respuesta.status === 200) {
            Swal.fire(
              "Noticia eliminada",
              "La noticia se elimino correctamente",
              "success"
            );

            props.consultarNoticias();
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al eliminar la noticia",
          });
        }
      }
    });
  };

  const destacarNot = async (id) => {
    Swal.fire({
      title: "Confirmacion",
      text: !props.noticia.destacar ? "Estas seguro de destacar esta noticia?" : "Quitar de destacados?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: !props.noticia.destacar ? "Destacar" : "Quitar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const modificarNoticia = {
            destacar: !props.noticia.destacar,
          }

          const URLNOT = `${process.env.REACT_APP_URL_NOTICIA}/destacar/${id}`;
          const respuesta = await fetch(URLNOT, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(modificarNoticia),
          });
          if (respuesta.status === 200) {
            Swal.fire(
              "La noticia se edito correctamente",
              !props.noticia.destacar ? "Noticia Destacada" : "Se elminino de destacados",
              "success"
            );

            props.consultarNoticias();
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ha ocurrido un error al editar la noticia",
          });
        }
      }
    });
  }

  return (
    <tr>
      <td>{props.noticia.titulo}</td>
      <td>{props.noticia.categoria}</td>
      <td className="d-flex justify-content-center">
        <Button variant="link" className="destacarBtn">
          <FontAwesomeIcon
            className="color2"
            id="destacarBoton"
            icon={props.noticia.destacar ? faStar : farStar}
            onClick={() => destacarNot(props.noticia._id)}
          ></FontAwesomeIcon>
        </Button>
        <Link
          className="btn mr-1 text-light btn-editar-categoria"
          to={`/noticia/${props.noticia._id}`}
        >
          <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
        </Link>
      </td>
      <td>
        <div className="d-flex justify-content-center">
          <Link
            className="btn btn-warning text-light mr-2"
            to={`/noticias/editar/${props.noticia._id}`}
          >
            <FontAwesomeIcon className="" icon={faPencilAlt}></FontAwesomeIcon>
          </Link>
          <Button
            variant="danger"
            onClick={() => eliminarNoticia(props.noticia._id)}
          >
            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default ItemNoticia;
