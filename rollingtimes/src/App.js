import { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navegacion from "./components/Common/Navegacion";
import Footer from "./components/Common/Footer";
import Inicio from "./components/Inicio/Inicio";
import ListarCategorias from "./components/Categoria/ListarCategorias";
import EditarCategoria from "./components/Categoria/EditarCategoria";
import AgregarCategoria from "./components/Categoria/AgregarCategoria";
import Subscription from "./components/Suscripcion/Subscription";
import Error404 from "./components/Error404";
import Contact from "./components/Contacto/Contact";
import AgregarNoticias from "./components/Noticia/AgregarNoticias";
import ListarNoticias from "./components/Noticia/ListarNoticias";
import EditarNoticia from "./components/Noticia/EditarNoticia";
import AboutUs from "./components/AcercaDe/AboutUs";
import DetalleNoticia from "./components/Noticia/DetalleNoticia";
import CategoriaListadoNoticias from "./components/Categoria/CategoriaListadoNoticias";
import BuscarNoticias from "./components/Noticia/BuscarNoticias";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Tabs from "./components/Common/Tabs";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [categorias, setCategorias] = useState([]);
  const [cargandoCategorias, setCargandoCategorias] = useState(false);
  const [noticias, setNoticias] = useState([]);
  const [cargandoNoticias, setCargandoNoticias] = useState(false);
  const [dolar, setDolar] = useState({});
  const [euro, setEuro] = useState({});
  const [real, setReal] = useState({});
  const [clima, setClima] = useState({});
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    consultarCategorias();
    consultarNoticias();
    consultarDolar();
    consultarEuro();
    consultarReal();
    ejecutarClima();
  }, []);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      const jwt = localStorage.getItem("jwt");
      const flag = jwt !== null ? true : false;
      userHasAuthenticated(flag);
    } catch (e) {
      alert(e);
    }
  }

  const ejecutarClima = async () => {
    const ciudad = "san miguel de tucuman";
    const getCiudad = ciudad.replace(/ /g, "%20").toLowerCase();
    const URL_Clima = `http://api.openweathermap.org/data/2.5/weather?q=${getCiudad}&appid=70bea3ec52e1948d8099a3d90fe8f150&units=metric`;
    const respuesta = await fetch(URL_Clima);
    const data = await respuesta.json();
    setClima(data);
  };

  const consultarDolar = async () => {
    try {
      const url = process.env.REACT_APP_URL_DOLAR;

      const respuesta = await fetch(url);
      const cotizacionDolar = await respuesta.json();

      setDolar(JSON.parse(cotizacionDolar));
    } catch (error) {
      console.log(error);
    }
  };

  const consultarEuro = async () => {
    try {
      const url = process.env.REACT_APP_URL_EURO;

      const respuesta = await fetch(url);
      const cotizacionEuro = await respuesta.json();

      setEuro(JSON.parse(cotizacionEuro));
    } catch (error) {
      console.log(error);
    }
  };

  const consultarReal = async () => {
    try {
      const url = process.env.REACT_APP_URL_REAL;

      const respuesta = await fetch(url);
      const cotizacionReal = await respuesta.json();

      setReal(JSON.parse(cotizacionReal));
    } catch (error) {
      console.log(error);
    }
  };

  const consultarCategorias = async () => {
    try {
      setCargandoCategorias(true);
      const url = process.env.REACT_APP_URL_CATEGORIA;
      const respuesta = await fetch(url);
      const informacion = await respuesta.json();
      if (respuesta.status === 200) {
        setCargandoCategorias(false);
        setCategorias(informacion);
      }
    } catch (error) {
      setCargandoCategorias(false);
      console.log(error);
    }
  };

  const consultarNoticias = async () => {
    try {
      setCargandoNoticias(true);
      const urln = process.env.REACT_APP_URL_NOTICIA;
      const resp = await fetch(urln);
      const data = await resp.json();
      if (resp.status === 200) {
        setCargandoNoticias(false);
        setNoticias(data);
      }
    } catch (error) {
      setCargandoNoticias(false);
      console.log(error);
    }
  };

  return (
    <Router>
      <Navegacion
        dolar={dolar}
        euro={euro}
        real={real}
        categorias={categorias}
        clima={clima}
      />

      <Switch>
        <Route exact path="/">
          <Inicio noticias={noticias} cargando={cargandoNoticias} />
        </Route>

        <Route exact path="/suscripcion">
          <Subscription />
        </Route>

        <Route exact path="/contacto">
          <Contact />
        </Route>

        <Route exact path="/about">
          <AboutUs />
        </Route>

        <Route exact path="/noticia/:id">
          <DetalleNoticia noticias={noticias} />
        </Route>

        <Route exact path="/buscar/:terminoBusqueda">
          <BuscarNoticias />
        </Route>

        <Route exact path="/detallenoticia">
          <DetalleNoticia />
        </Route>

        <AuthenticatedRoute
          exact path="/categorias"
          component={ListarCategorias}
          appProps={
            { 
              isAuthenticated, 
              categorias: categorias, 
              consultarCategorias: consultarCategorias, 
              cargando: cargandoCategorias
            }}
        />

        <AuthenticatedRoute
          exact path="/categorias/editar/:id"
          component={EditarCategoria}
          appProps={
            { 
              isAuthenticated, 
              consultarCategorias: consultarCategorias
            }}
        />

        <AuthenticatedRoute
          exact path="/categorias/nuevo"
          component={AgregarCategoria}
          appProps={
            { 
              isAuthenticated, 
              consultarCategorias: consultarCategorias
            }}
        />

        <AuthenticatedRoute
          exact path="/categorias/listado-noticias/:nombreCategoria"
          component={CategoriaListadoNoticias}
          appProps={
            { 
              isAuthenticated
            }}
        />
        
        <AuthenticatedRoute
          exact path="/noticias"
          component={ListarNoticias}
          appProps={
            { 
              isAuthenticated, 
              noticias: noticias, 
              categorias: categorias, 
              consultarNoticias: consultarNoticias, 
              cargando: cargandoNoticias, 
              cargandoCategorias:cargandoCategorias 
            }}
        />

        <AuthenticatedRoute
         exact path="/noticias/editar/:id"
          component={EditarNoticia}
          appProps={
            { 
              isAuthenticated,
              categorias: categorias, 
              cargandoCategorias: cargandoCategorias,
              consultarNoticias: consultarNoticias
            }}
        />

        <AuthenticatedRoute
          exact path="/noticias/agregar"
          component={AgregarNoticias}
          appProps={
            { 
              isAuthenticated,
              categorias: categorias, 
              consultarNoticias: consultarNoticias
            }}
        />

        <Route exact path="/cat/:nombreCategoria">
          <Tabs key={categorias._id}/>
        </Route>

        <Route path="*">
          <Error404 />
        </Route>
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
