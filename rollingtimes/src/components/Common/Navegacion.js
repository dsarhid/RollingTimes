import React, { Fragment, useRef } from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import LogoNav from "./img/LogoNav.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import logoSm from "./img/logoSm.png";
import Categoria from "./Categoria.js";
import Cotizacion from "./Cotizacion";
import Login from "../Login/Login";
import { withRouter } from "react-router-dom";
import Climate from "./Climate";


const Navegacion = (props) => {
  const textInput = useRef("");

  const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 992 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 991 });
    return isMobile ? children : null;
  };

  const home = () => {
    props.history.push("/");
  };

  function buscarNoticias() {
    props.history.push(`/buscar/${textInput.current.value}`);
  }
  
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      buscarNoticias();
    }
  }

  return (
    <Fragment>
      <Desktop>
        <div
          className="d-flex row justify-content-center sticky-top m-0"
          id="navDesk">
          <div className="" id="navDesk">
            <Navbar collapseOnSelect expand="lg" className="bg5">
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <img
                className="mr-3 logo-icono-mano"
                src={logoSm}
                alt="logo"
                onClick={() => home()}
              />
              <Form inline className="m-0">
                <div className="col-login my-0 w-75 mr-2">
                <input ref={textInput} placeholder="Buscar..." onKeyPress={handleKeyPress} className="effect-textArea input-text  input-textArea border border-buscador"/>
                  <span className="focus-border"><i></i></span>
                </div>
                <Button variant="outline-dark" onClick={buscarNoticias}>
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </Button>
              </Form>
              <Climate clima={props.clima} />
              <Nav className="ml-auto">
                <Login />
              </Nav>
            </Navbar>
            
            <div id="navExpand">
              <Cotizacion
                dolar={props.dolar}
                euro={props.euro}
                real={props.real}
              />
            <Categoria 
              categorias={props.categorias}
              noticias={props.noticias}/>        
            </div>
            </div>
        </div>
      </Desktop>

      <Mobile>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg=""
          className="d-flex row justify-content-center bg5 stiky-top p-0 m-0"
        >
          <div className="text-center">
            <img src={LogoNav} alt="logo" className="w-75 p-2" onClick={() => home()}/>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav" className="">
              <div className="text-center">
                <Form className="d-flex pt-3 w-100 px-3">
                  <div className="col-login my-0 mr-2">
                    <input
                    ref={textInput}
                      className="effect-textArea input-text  input-textArea border"
                      type="text"
                      placeholder=" Buscar..."
                      onKeyPress={handleKeyPress}
                      
                    />
                    <span className="focus-border"><i></i></span>
                  </div>
                  <Button variant="outline-dark" onClick={buscarNoticias}>
                    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                  </Button>
                </Form>
              </div>
              <hr/>
              <Nav className="ml-5 mr-5 dark">
                {props.categorias.map((categoria) => (
                  <Nav.Link key={categoria._id} href={`/cat/${categoria.nombre}`}><p className="color4 link my-0">{categoria.nombre}</p></Nav.Link>
                ))}
              </Nav>
              <Nav>
                <div className="d-flex row justify-content-center mx-0 mb-2">
                  <Login />
                </div>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </Mobile>
    </Fragment>
  );
};

export default withRouter(Navegacion);
