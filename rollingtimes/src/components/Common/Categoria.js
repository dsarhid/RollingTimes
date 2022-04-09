import React, { Fragment } from "react";
import { useState } from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const Categoria = (props) => {
  const [tabCategoria, setTabCategoria] = useState('');

  const toggleTab = (index) => {
    setTabCategoria(index);
  }

  return (
    <Fragment>
      <Nav
        defaultActiveKey="/"
        className="bg5 pt-2 d-flex justify-content-center"
        id="nav"
      >
        <Nav.Item>
          <Nav.Link className="link color1 bg5" href="/">
           <FontAwesomeIcon icon={faHome} className=""></FontAwesomeIcon> Home 
          </Nav.Link>
        </Nav.Item>

        {props.categorias.map((categoria) => (
          <Nav.Item key={categoria._id}>
            <Nav.Link className="link color1 bg5" eventKey={categoria._id} onClick={() => toggleTab(categoria.nombre)} href={`/cat/${tabCategoria}`}>
              <p className={decodeURIComponent(window.location.href).includes(`cat/${categoria.nombre}`)? 'mb-0 color2' : 'mb-0'}>{categoria.nombre}</p>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
     
    </Fragment>
  );
};

export default Categoria;
