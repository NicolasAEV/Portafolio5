const express = require('express');
const router = express.Router()
const fs = require('fs');

router.get("/products", (req, res) => {
    fs.readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
      let objetoPro = JSON.parse(data);
      res.render('products', {
        productos: objetoPro.productos,
        tittle: "productos"
      });
    })
  })

module.exports = router;