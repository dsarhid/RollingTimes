import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import path from 'path'
import './database'
import categoriaRoutes from './routes/categoria.routes'
import suscripcionRoutes from './routes/suscripcion.routes'
import loginRoutes from './routes/login.routes'
import AuthToken from './AuthToken'
import cotizacionRoutes from './routes/cotizacion.routes'
import noticiaRoutes from './routes/noticia.routes'

//configuraciones
const app = express();

app.set('port', process.env.PORT || 4001);

app.listen(app.get('port'), ()=>{
    console.log('Listening on port: ' + app.get('port'))
});

// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));  
app.use(express.static(path.join(__dirname, '../public')));
//app.use(AuthToken);    

// Rutas
app.use('/api/categoria', categoriaRoutes);
app.use('/api/suscripcion', suscripcionRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/cotizacion', cotizacionRoutes);
app.use('/api/noticia', noticiaRoutes);
