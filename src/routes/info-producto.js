const express = require('express');
const router = express.Router()
const fs = require('fs');

router.get('/buscarproducto/:id',(req,res)=>{
    let id = req.params.id;
    fs.readFile("product.json", "utf8", (err, data) => {
        if(err) return res.status(500).send({code: 500, message: "No se pudo leer la información de productos."})
        let objetoPro = JSON.parse(data);
        let productoBuscado = objetoPro.productos.filter(producto => producto.id == id);
        res.render('actualizar-producto',{
          producto : productoBuscado,
          tittle:'actualizar producto'});
    })
  }) 
module.exports = router;
