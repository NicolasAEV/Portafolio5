import express, { Router, json, urlencoded } from 'express';
const app = express();

const router = Router()
//llamamos a la biblioteca fileSystem para poder acceder a archivos JSON etc.
import fs from 'fs';
//llamamos a la biblioteca path de mandera de poder unir archivos
import { join ,dirname} from 'path';
import { fileURLToPath } from 'url';


//importamos la biblioteca uuid para poder crear el id con esta
import { v4 as uuid } from 'uuid';
// obtenemos una funcion de exhbs
import { create } from 'express-handlebars';
import cors from 'cors';
import { stringify } from 'querystring';
// se establece el puerto a utilizar
const port = 3000;
//importamos las rutas
//rutas iniciales de la pagina
import routerIndex from './routes/index.js';
import routerProductos from './routes/products.js';
import routerSobreNosotros from './routes/about-us.js';
import routerContacto from './routes/contact.js';
//ruta de inicio de sesion y registro
import routerLogin from './routes/login.js';
//ruta de error
import error from './routes/404.js';
//ruta de crud
import routerInventario from './routes/inventory.js';
import routerActualizarPro from './routes/actualizar-producto.js';
import routerInfoPro from './routes/info-producto.js';
//ruta carrito
import routerCart from './routes/cart.js';
//en caso de utilizar envio entre servidores
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors())
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//union de archivos estaticos y rutas dinamicas
app.use(express.static(join(__dirname, 'public')));
//inicio de rutas
//ruta iniciales
app.use('/',routerIndex)
//ruta todos los productos
app.use('/',routerProductos)
//ruta sobre nosotros
app.use('/',routerSobreNosotros)
//ruta Contacto
app.use('/',routerContacto)
//ruta Login
app.use('/',routerLogin)
//ruta inventario
app.use('/',routerInventario)
//ruta Actualziar Producto
app.use('/',routerActualizarPro)
//ruta informacion sobre el producto a actualizar
app.use('/',routerInfoPro)
//ruta informacion carrito
app.use('/',routerCart)
//ruta error pagina no encontrada
app.use('/',error)

//asignamos la union de los archivo views
app.set("views", join(__dirname, "views/"));
//configuracion de motor hbs
const hbs = create({
  //se define la pagina principal la cual contendra todo
  defaultLayout: "main",
  //definimos y unimos los layouts y partials
  layoutsDir: join(app.get("views"), "layouts"),
  partialsDir: join(app.get("views"), "partials"),
  //definimos la extencion a utilizar
  extname: ".handlebars",
});
app.engine(".handlebars", hbs.engine);
app.set("view engine", ".handlebars");


//routes se crea el prefijo de las rutas /
// app.use('/', router)

//escuchamos el puerto en el cual se mantendra encendido el servidor
app.listen(port, () => {
  console.log(`puerto ${port}`)
})

