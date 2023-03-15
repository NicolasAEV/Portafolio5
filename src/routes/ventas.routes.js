import { resolveObjectURL } from 'buffer';
import { Router } from 'express';
const router = Router();
import fs from 'fs';
import moment from 'moment';
import { v4 as uuid } from 'uuid'
import { getProductForID } from '../utils/products.js';

router.get("/api/ventas", (req, res) => {
  fs.readFile("ventas.json", "utf8", (error, data) => {
    if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
    let objetoPro = JSON.parse(data);
    res.status(200).json({ code: 200, data: objetoPro })
  })
}).post("/api/ventas", (req, res) => {
  let productos = req.body;
  let ventas = {
    id: uuid().slice(0, 6),
    fecha: moment().format('DD-MM-YYYY'),
    productos,
    total: 0
  }
  let productosTienda = JSON.parse(fs.readFileSync("product.json", "utf-8"));
  ventas.productos.forEach(producto => {
    let productoEncontrado = productosTienda.productos.find(element => element.id == producto.id)
    ventas.total += productoEncontrado.precio * producto.cantidad;
  })
  //leemos el archivo .json asignando el modo de lectura utf-8 para carracteres especiales
  fs.readFile("ventas.json", "utf8", (error, data) => {
    if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
    //asignamos los datos del archuivo JSON los paraciamos y le asignamos a una variable
    let objetoPro = JSON.parse(data);
    //insertamos a esa variable el nuevo producto con .PUSH
    objetoPro.venta.push(ventas);
    //actualizar stock

    //sobreescribimos los datos entro del archvio
    fs.writeFile("ventas.json", JSON.stringify(objetoPro, null, 4), "utf-8", (error) => {
      if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
      descontarProductos(ventas).then(respuesta => {
        console.log(respuesta)
      }).catch(error => {
        console.log("error: ", error)
      })
      res.status(200).json({ code: 200, data: objetoPro.venta })
    })
  })
 
})

//add product to cart
router.get("/api/carrito/:id", (req, res) => {
  try {
    let producto = getProductForID(req.params.id);
    producto.cantidad = 1;
    res.status(200).json({ code: 200, data: producto })
  } catch {
    res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
  }
})


const descontarProductos = (productosADescontar) => {
  return new Promise((resolve, reject) => {
    fs.readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD JSON." })
      data = JSON.parse(data);
      productosADescontar.productos.forEach(producto => {
        let productoDescontado = data.productos.find(element => element.id == producto.id)
        productoDescontado.stock = productoDescontado.stock - producto.cantidad;
      });
      //sobreescribimos los datos entro del archvio
      fs.writeFile("product.json", JSON.stringify(data, null, 4), "utf-8", (error) => {
        if (error) return res.status(500).send({ code: 500, message: "error al guardar el producto en el JSON" });
        resolve(data)
    
      })
    }).catch(error =>{
      reject(error)
    })
  })

}


export default router;