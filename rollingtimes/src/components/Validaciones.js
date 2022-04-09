const validarNombre = (nombre) => {
  const expresion = /^[a-zA-ZÀ-ÿ\s]/;
  if (nombre.trim() !== "" && expresion.test(nombre)) {
    return true;
  } else {
    return false;
  }
};
const validarApellido = (apellido) => {
  const expresion = /^[a-zA-ZÀ-ÿ\s]/;
  if (apellido.trim() !== "" && expresion.test(apellido)) {
    return true;
  } else {
    return false;
  }
};
const validarDireccion = (direccion) => {
  const expresion = /^[a-zA-Z0-9À-ÿ\s]/;
  if (direccion.trim() !== "" && expresion.test(direccion)) {
    return true;
  } else {
    return false;
  }
};
const validarLocalidad = (localidad) => {
  const expresion = /^[a-zA-ZÀ-ÿ\s]/;
  if (localidad.trim() !== "" && expresion.test(localidad)) {
    return true;
  } else {
    return false;
  }
};
const validarPostal = (postal) => {
  const expresion = /^[0-9]/;
  if (postal.trim() !== "" && expresion.test(postal) && postal.length === 4) {
    return true;
  } else {
    return false;
  }
};
const validarEmail = (email) => {
  const expresion = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (email !== "" && expresion.test(email)) {
    return true;
  } else {
    return false;
  }
};
const validarPassword = (password) =>{
  if(password !== "" && password.length>=4){
    return true;
  }else{
    return false;
  }
}
const validarTelefono = (telefono) => {
  const expresion = /^[0-9]/;
  if (telefono !== "" && expresion.test(telefono)) {
    return true;
  } else {
    return false;
  }
};
const validarTextArea = (textArea) => {
  const expresion = /^[a-zA-ZÀ-ÿ\s]{10,250}/;
  if (textArea !== "" && expresion.test(textArea)) {
    return true;
  } else {
    return false;
  }
};
const validarConsulta = (tipoConsulta) => {
  if (tipoConsulta !== "") {
    return true;
  } else {
    return false;
  }
};

const validarCategoria = (categoria) => {
  if (categoria === "seleccione una opcion") {
    return false;
  } else {
    return true;
  }
};

const validarAutor = (autor) => {
  if (autor === "") {
    return false;
  } else {
    return true;
  }
};

const validarNombreCategoria = (nombreCategoria) => {
  if (nombreCategoria.trim() === '') {
    return { esValido: false, mensaje: 'Debe ingresar un nombre de categoria' }
  }
  
  if (nombreCategoria.trim().length > 35) {
    return { esValido: false, mensaje: 'Debe ingresar una categoria de menos de 30 caracteres' }
  }

  if (nombreCategoria.trim().length < 3) {
    return { esValido: false, mensaje: 'Debe ingresar una categoria de por lo menos tres caracteres' }
  }

  let expresion = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;
  if (!expresion.test(nombreCategoria)) {
    return { esValido: false, mensaje: 'Debe ingresar caracteres validos para el nombre de categoria' }
  }

  return {esValido:true , mensaje:'Nombre valido'}  
}

const validarUrlImagen = (urlImagen) => {
  const expresion = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
  if (urlImagen !== "" && expresion.test(urlImagen)) {
    return true;
  } else {
    return false;
  }
};
const validarTitulo = (titulo) => {
  const expresion = /^[a-zA-Z0-9À-ÿ\s]{7,150}/;  
  if (titulo.trim() !== "" && expresion.test(titulo)) {
    return true;
  } else {
    return false;
  }
};
const validarSubtitulo = (subtitulo) => {
  const expresion = /^[a-zA-Z0-9À-ÿ\s]{10,90}/; 
  if (subtitulo.trim() !== "" && expresion.test(subtitulo)) {
    return true;
  } else {
    return false;
  }
};
const validarCuerpo = (cuerpo) => {
  const expresion = /^[a-zA-Z0-9À-ÿ\s]/; //{90,600}
  if (cuerpo.trim() !== "" && expresion.test(cuerpo)) {
    return true;
  } else {
    return false;
  }
};

export {
  validarNombre,
  validarApellido,
  validarDireccion,
  validarLocalidad,
  validarPostal,
  validarTelefono,
  validarEmail,
  validarTextArea,
  validarConsulta,
  validarNombreCategoria,
  validarUrlImagen,
  validarTitulo,
  validarSubtitulo,
  validarCuerpo,
  validarPassword,
  validarCategoria,
  validarAutor
};
