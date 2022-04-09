import Suscripcion from "../models/suscripcion";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import CONFIG from "../config"

const loginCtrl = {};

loginCtrl.nuevaLogin = (req, res) => {
  try {
    let email= req.body.email;
    let password= req.body.password;
    Suscripcion.findOne({email})
        .then(user => {
            if(!user) return res.status(404).send({mensaje: 'El usuario no existe'});
            bcryptjs.compare(password,user.password)
                .then(match => {
                        if(match){
                            const payload = {
                                email: user.email,
                                nombre: user.nombre,
                                token: user.token,
                                role: user.role
                            }
                            jwt.sign(payload,CONFIG.SECRET_TOKEN,function(error,token){
                                if(error){
                                    res.status(500).send({error});
                                }else{
                                    if(payload.role == 'admin'){
                                        const token = jwt.sign({id: user._id, email:user.email, role:user.role}, CONFIG.SECRET_TOKEN, {
                                            expiresIn: 60 * 60
                                        });
                                        res.status(200).send(token)
                                    }else{
                                        const token = jwt.sign({id: user._id, email:user.email, role:user.role}, CONFIG.SECRET_TOKEN, {
                                            expiresIn: 60 * 60
                                        });
                                        res.status(201).send(token)
                                    }
                                }
                            })
                        }else{
                            res.status(401).send({mensaje: 'Password incorrecta', token: null});
                        } 
                }).catch(error =>{
                    console.log(error);
                    res.status(500).send({error})
                });
        }).catch(error =>{
            console.log(error);
            res.status(500).send({error})
        });

  } catch (error) {
    res.status(404).json({
      mensaje: "No se pudo obtener el arreglo de login",
    });
  }
};

export default loginCtrl;
