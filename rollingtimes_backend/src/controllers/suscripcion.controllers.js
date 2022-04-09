import Suscripcion from "../models/suscripcion";
import jwt from "jsonwebtoken"
import CONFIG from "../config"
const suscripcionCtrl = {};

suscripcionCtrl.nuevaSuscripcion = async (req, res) => {
  console.log(req.body);

  try {
    const suscripcionNueva = new Suscripcion({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      localidad: req.body.localidad,
      direccion: req.body.direccion,
      email: req.body.email,
      password: req.body.password,
      telefono: req.body.telefono,
      postal: req.body.postal,
    });

    await suscripcionNueva.save();

    const token = jwt.sign({id: suscripcionNueva._id}, CONFIG.SECRET_TOKEN,{
      expiresIn: 60 * 60
    })

    res.status(201).json({
      mensaje: "Suscripcion agregada correctamente",token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al agregar la nueva suscripcion",
    });
  }
};

suscripcionCtrl.listarSuscripcion = async (req, res) => {

  try {

     const arregloSuscripcion = await Suscripcion.find();
     res.status(200).json(arregloSuscripcion);
   } catch (error) {
     console.log(error);
     res.status(404).json({
       mensaje: "No se obtuvo lista",
     });
   }
};

suscripcionCtrl.eliminarSuscripcion = async (req, res) => {
  try {
    console.log(req.params.id);
    await Suscripcion.findByIdAndDelete(req.params.id);
    res.status(200).json({ mensaje: "Se ha desuscripto correctamente" });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      mensaje: "No se pudo eliminar la suscripcion porque no se encontro",
    });
  }
};

export default suscripcionCtrl;
