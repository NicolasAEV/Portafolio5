import { Router } from 'express';
const router = Router()
import { readFile } from 'fs';

router.get('/buscarproducto/:id',(req,res)=>{
    let id = req.params.id;
    readFile("product.json", "utf8", (err, data) => {
        if(err) return res.status(500).send({code: 500, message: "No se pudo leer la información de productos."})
        let objetoPro = JSON.parse(data);
        let productoBuscado = objetoPro.productos.filter(producto => producto.id == id);
        res.render('actualizar-producto',{
          producto : productoBuscado,
          tittle:'actualizar producto'});
    })
  }) 
export default router;
