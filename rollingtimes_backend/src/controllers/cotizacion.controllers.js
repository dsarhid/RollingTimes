const fetch = require("node-fetch");
const cotizacionCtrl = {};

cotizacionCtrl.precioDolar = async (req, res) => {
  try {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api-dolar-argentina.herokuapp.com/api/dolaroficial", requestOptions)
        .then(
          response => response.text()
          )
        .then(
          result => res.status(200).json(result)
          )
        .catch(
          error => console.log('error', error)
          );

  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo obtener la cotizacion del dolar",
    });
    console.log(error);
  }
};

cotizacionCtrl.precioEuro = async (req, res) => {
  try {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api-dolar-argentina.herokuapp.com/api/euro/nacion", requestOptions)
        .then(
          response => response.text()
          )
        .then(
          result => res.status(200).json(result)
          )
        .catch(
          error => console.log('error', error)
          );
          
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo obtener la cotizacion del euro",
    });
    console.log(error);
  }
};

cotizacionCtrl.precioReal = async (req, res) => {
  try {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api-dolar-argentina.herokuapp.com/api/real/nacion", requestOptions)
        .then(
          response => response.text()
          )
        .then(
          result => res.status(200).json(result)
          )
        .catch(
          error => console.log('error', error)
          );
          
  } catch (error) {
    res.status(500).json({
      mensaje: "No se pudo obtener la cotizacion del real",
    });
    console.log(error);
  }
};


export default cotizacionCtrl;
