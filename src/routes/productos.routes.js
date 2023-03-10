import { Router } from 'express';
const router = Router()
import { readFile } from 'fs';

router.get("/api/products", (req, res) => {
    readFile("product.json", "utf8", (error, data) => {
      if (error) return res.status(500).send({ code: 500, message: "Algo salió al leer la BD." })
      let objetoPro = JSON.parse(data);
        res.status(200).json({code : 200 , data : objetoPro})
    })
  })

export default router;