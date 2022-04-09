import React from "react";
import { Table } from "react-bootstrap";

const Cotizacion = (props) => {

  return (
    <Table bordered hover size="sm" className="bg5 text-center m-0">
      <thead>
        <tr className="d-flex ">
          {props.dolar.compra ? (
            <th className="d-flex justify-content-center flex-fill bd-highlight pt-1 align-items-center">
              <div className="d-flex">
                <h5 className="color2 mr-1 mb-0">Dolar:</h5> 
                <p className="color4 mr-2 mb-0"> Compra </p> 
                {props.dolar.compra}
                </div>
              <div className="d-flex">
                <p className="color4 px-2 mb-0">  Venta</p>
                 {props.dolar.venta}
                 </div>
            </th>
          ) : null}
          {props.euro.compra ? (
            <th className="d-flex justify-content-center flex-fill bd-highlight pt-0 align-items-center">
              <div className="d-flex">
                <h5 className="color2 mr-1 mb-0 ">Euro:</h5> 
                <p className="color4 mr-2 mb-0  "> Compra </p>
                 {props.euro.compra}
                 </div>
              <div className="d-flex">
                <p className="color4 px-2 mb-0  ">  Venta</p>
                 {props.euro.venta}
                 </div>
            </th>
          ) : null}
          {props.real.compra ? (
            <th className="d-flex justify-content-center flex-fill bd-highlight pt-0 align-items-center">
              <div className="d-flex">
                <h5 className="color2 mr-1 mb-0">Real:</h5>
                 <p className="color4 mr-2 mb-0"> Compra </p> 
                 {props.real.compra}
                 </div>
              <div className="d-flex">
                <p className="color4 px-2 mb-0">  Venta</p>
                 {props.real.venta}
                 </div>
            </th>
          ) : null}
        </tr>
      </thead>
    </Table>
  );
};

export default Cotizacion;
