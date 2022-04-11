import React, { Fragment } from 'react';


const CategoriasButton = (categorias) => {

    return (
        <Fragment>
            <option>{categorias.categoria.nombre}</option>
        </Fragment>
    );
};

export default CategoriasButton;