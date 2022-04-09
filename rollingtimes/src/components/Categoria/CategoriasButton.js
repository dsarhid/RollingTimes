import React, { Fragment } from 'react';


const CategoriasButton = (cat) => {

    return (
        <Fragment>
            <option>{cat.categoria.nombre}</option>
        </Fragment>
    );
};

export default CategoriasButton;