const express = require('express');
const router = express.Router()
const { v4: uuid } = require('uuid');
const fs = require('fs');

router.get("/inventario", (req, res) => {
    fs.readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
      let objetoPro = JSON.parse(data);
      res.render('inventory', {
        productos: objetoPro.productos,
        tittle: "inventario"
      });
    })
  })
  .post("/inventario", (req, res) => {
    console.log(req.body)
    let {nombre,
      precio,
      stock,
      imagen,
      categoria,
      descripcion
    } = req.body;
    let nuevoProducto = {
      id: uuid().slice(0,6),
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
      console.log(data)
      let objetoPro = JSON.parse(data);
      objetoPro.productos.push(nuevoProducto);
      fs.writeFile("product.json",JSON.stringify(objetoPro,null,4),"utf-8", (error)=>{
        if(error) return res.status(500).send({code: 500, message: "error al guardar el producto en el JSON"});
        res.render('inventory', {
          productos: objetoPro.productos,
          tittle: "inventario"
      });
      })
    })
  })
  .put("/inventario",(req,res)=>{
  
  })
  .delete("/inventario:id",(req,res)=>{
  
  })
module.exports = router;