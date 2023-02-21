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

// se establece el puerto a utilizar
const port = 3000;
//en caso de utilizar envio entre servidores
const cors = require('cors');
const { stringify } = require('querystring');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//union de archivos estaticos y rutas dinamicas
app.use(express.static(path.join(__dirname, 'public')));
//inicio de rutas
router.get("/", (req, res) => {
    //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
  fs.readFile("product.json", "utf8", (error, data) => {
    if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
    let objetoPro = JSON.parse(data);
    //obetenmos los datos y los guardamos en una variable para ser enviados a la pagina
    res.render('index', {
      productos: objetoPro.productos,
      tittle: "inicio"
    });
  })
})
router.get("/products", (req, res) => {
    //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales

  fs.readFile("product.json", "utf8", (error, data) => {
    if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
    let objetoPro = JSON.parse(data);
    //obetenmos los datos y los guardamos en una variable para ser enviados a la pagina
    res.render('products', {
      productos: objetoPro.productos,
      tittle: "productos"
    });
  })
})

router.get("/inventario", (req, res) => {
    //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales

  fs.readFile("product.json", "utf8", (error, data) => {
    if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
    let objetoPro = JSON.parse(data);
    //obetenmos los datos y los guardamos en una variable para ser enviados a la pagina
    res.render('inventory', {
      productos: objetoPro.productos,
      tittle: "inventario"
    });
  })
})
  .post("/inventario", (req, res) => {
    //obtenemos todos los datos del form y destructuramos aquellos
    let { nombre,
      precio,
      stock,
      imagen,
      descripcion,
      categoria
    } = req.body;
    //los asignamos a una nueva variable 
    let nuevoProducto = {
      id: uuid().slice(0, 6),
      nombre,
      precio,
      stock,
      imagen,
      descripcion,
      categoria
    };
    //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
    fs.readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
      //asignamos los datos del archuivo JSON los paraciamos y le asignamos a una variable
      let objetoPro = JSON.parse(data);
      //insertamos a esa variable el nuevo producto con .PUSH
      objetoPro.productos.push(nuevoProducto);
      //sobreescribimos los datos entro del archvio
      fs.writeFile("product.json", JSON.stringify(objetoPro, null, 4), "utf-8", (error) => {
        if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
        res.render('inventory', {
          productos: objetoPro.productos,
          tittle: "inventario"
        });
      })
    })
  })
  .post("/inventario", (req, res) => {
    let {id,
       nombre,
      precio,
      stock,
      imagen,
      descripcion,
      categoria
    } = req.body;
    //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
 fs.readFile("product.json", "utf8", (error, data) => {
   if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
   //asignamos los datos del archuivo JSON los paraciamos y le asignamos a una variable
   let objetoPro = JSON.parse(data);
   //filtramos todos los objetos quie no tengan el id del producto y guardamos en una variable
   objetoEncontrado = objetoPro.productos.find(producto => producto.id == id);
   //actualizamos los valores de cada uno
   objetoEncontrado.nombre = nombre;
   objetoEncontrado.precio = precio;
   objetoEncontrado.stock = stock;
   objetoEncontrado.imagen = imagen;
   objetoEncontrado.descripcion = descripcion;
   objetoEncontrado.categoria = categoria;

   //sobreescribimos los datos entro del archvio
   fs.writeFile("product.json", JSON.stringify(objetoPro, null, 4), "utf-8", (error) => {
     if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
     res.render('inventory', {
       productos: objetoPro.productos,
       tittle: "inventario"
     });
   })
 })
  })
  .get("/inventario/:id", (req, res) => {
     let idProducto =  req.params.id;
       //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
    fs.readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
      //asignamos los datos del archuivo JSON los paraciamos y le asignamos a una variable
      let objetoPro = JSON.parse(data);
      //filtramos todos los objetos quie no tengan el id del producto y guardamos en una variable
      objetoPro.productos = objetoPro.productos.filter(producto => producto.id != idProducto);
      //sobreescribimos los datos entro del archvio
      fs.writeFile("product.json", JSON.stringify(objetoPro, null, 4), "utf-8", (error) => {
        if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
        res.render('inventory', {
          productos: objetoPro.productos,
          tittle: "inventario"
        });
      })
    })
  })
//ruta sobre nosotros
router.get('/about-us', (req, res) => [
  res.render('about-us')
])
//ruta sobre contatanos

router.get('/contact', (req, res) => [
  res.render('contact')
])
//ruta sobre login y registro

router.get('/login', (req, res) => {
  res.render('login')
})
//ruta sobre error 404 no encontrada

router.get('*', (req, res) => {
  res.render('404')
})
//fin de rutas

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
app.use('/', router)

//escuchamos el puerto en el cual se mantendra encendido el servidor
app.listen(port, () => {
  console.log(`puerto ${port}`)
})

