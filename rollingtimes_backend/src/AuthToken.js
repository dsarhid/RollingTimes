import jwt from 'jsonwebtoken';
import CONFIG from './config';

module.exports = function(req,res,next){
    if(req.path != '/api/login' && req.path != '/api/login/' && req.path != '/api/categoria' && req.path != '/api/noticia' && req.path != '/api/noticia/:id'){
        console.log(req.path);
        
        if(req.headers.authorization){
            console.log("Se recibe token?");
            let token = req.headers.authorization.split(' ')[1]
            console.log(token);
            jwt.verify(token,CONFIG.SECRET_TOKEN, function(error, decoded){
                console.log("22222");c
                if(error) return res.status(403).send({mensaje: 'No tiene los permisos para acceder',error});
                console.log("llego aqui?");
                if(req.method != 'GET'){
                    console.log("verifico que sea admin");
                    if(decoded.role == 'admin') next();
                    else res.status(403).send({mensaje: 'No tiene los permisos para acceder',error});
                }else{
                    next();
                }
            })
        }else if(req.path.length > 30){
            
                next();
        }else res.status(403).send({mensaje: 'No tiene los permisos para acceder.'})
    }else next();
}