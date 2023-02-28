import { Router } from 'express';
const router = Router()
import { readFile, writeFile } from 'fs';

router.get("/carrito/:id", (req, res) => {
    //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
  
  readFile("ventas.json", "utf8", (error, data) => {
    if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
    let ventas = JSON.parse(data);
    //obetenmos los datos y los guardamos en una variable para ser enviados a la pagina
    res.render('cart', {
      productos: objetoPro.productos,
      tittle: "carrito"
    });
  })
  })
  //crear producto
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
    readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
      //asignamos los datos del archuivo JSON los paraciamos y le asignamos a una variable
      let objetoPro = JSON.parse(data);
      //insertamos a esa variable el nuevo producto con .PUSH
      objetoPro.productos.push(nuevoProducto);
      //sobreescribimos los datos entro del archvio
      writeFile("product.json", JSON.stringify(objetoPro, null, 4), "utf-8", (error) => {
        if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
        res.render('inventory', {
          productos: objetoPro.productos,
          tittle: "inventario"
        });
      })
    })
  })
  //actualizar producto
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
  readFile("product.json", "utf8", (error, data) => {
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
   writeFile("product.json", JSON.stringify(objetoPro, null, 4), "utf-8", (error) => {
     if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
     res.render('inventory', {
       productos: objetoPro.productos,
       tittle: "inventario"
     });
   })
  })
  })
  //eliminar producto
  .get("/inventario/:id", (req, res) => {
     let idProducto =  req.params.id;
       //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
    readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
      //asignamos los datos del archuivo JSON los paraciamos y le asignamos a una variable
      let objetoPro = JSON.parse(data);
      //filtramos todos los objetos quie no tengan el id del producto y guardamos en una variable
      objetoPro.productos = objetoPro.productos.filter(producto => producto.id != idProducto);
      //sobreescribimos los datos entro del archvio
      writeFile("product.json", JSON.stringify(objetoPro, null, 4), "utf-8", (error) => {
        if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
        res.render('inventory', {
          productos: objetoPro.productos,
          tittle: "inventario"
        });
      })
    })
  })

export default router;
