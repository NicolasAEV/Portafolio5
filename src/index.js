const express = require('express');
const app = express();

const router = express.Router()
//llamamos a la biblioteca fileSystem para poder acceder a archivos JSON etc.
const fs = require('fs');
//llamamos a la biblioteca path de mandera de poder unir archivos
const path = require('path');
//importamos la biblioteca uuid para poder crear el id con esta
const { v4: uuid } = require('uuid');
// obtenemos una funcion de exhbs
const { create } = require('express-handlebars')
const cors = require('cors');
const { stringify } = require('querystring');
// se establece el puerto a utilizar
const port = 3000;
//importamos las rutas
//rutas iniciales de la pagina
const routerIndex = require('./routes/index.js')
const routerProductos = require('./routes/products.js')
const routerSobreNosotros = require('./routes/about-us.js')
const routerContacto = require('./routes/contact.js')
//ruta de inicio de sesion y registro
const routerLogin = require('./routes/login.js')
//ruta de error
const error = require('./routes/404.js')
//ruta de crud
const routerInventario = require('./routes/inventory.js')
const routerActualizarPro = require('./routes/actualizar-producto.js')
const routerInfoPro = require('./routes/info-producto.js')

//en caso de utilizar envio entre servidores
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//union de archivos estaticos y rutas dinamicas
app.use(express.static(path.join(__dirname, 'public')));
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
//ruta error pagina no encontrada
app.use('/',error)

//asignamos la union de los archivo views
app.set("views", path.join(__dirname, "views/"));
//configuracion de motor hbs
const hbs = create({
  //se define la pagina principal la cual contendra todo
  defaultLayout: "main",
  //definimos y unimos los layouts y partials
  layoutsDir: path.join(app.get("views"), "layouts"),
  partialsDir: path.join(app.get("views"), "partials"),
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

