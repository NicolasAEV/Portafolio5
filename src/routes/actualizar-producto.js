import { Router } from 'express';
const router = Router()
import { readFile, writeFile } from 'fs';

router.post("/actualizar/:id", (req, res) => {
  const {id} = req.params
  let {
     nombre,
    precio,
    stock,
    imagen,
    descripcion,
    categoria
  } = req.body;
  console.log(id)
  //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
  readFile("product.json", "utf8", (error, data) => {
 if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
 //asignamos los datos del archuivo JSON los paraciamos y le asignamos a una variable
 let objetoPro = JSON.parse(data);
 //filtramos todos los objetos quie no tengan el id del producto y guardamos en una variable
 let objetoEncontrado = objetoPro.productos.find(producto => producto.id == id);
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

export default router;
