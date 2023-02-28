import { Router } from 'express';
const router = Router()
import { readFile } from 'fs';

router.get("/products", (req, res) => {
    readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
      let objetoPro = JSON.parse(data);
      res.render('products', {
        productos: objetoPro.productos,
        tittle: "productos"
      });
    })
  })

export default router;