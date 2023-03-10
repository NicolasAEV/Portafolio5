import { Router } from 'express';
const router = Router()
import { readFile } from 'fs';

import {getProducts , getProductForID} from '../utils/products.js'
//ruta inicio
router.get("/", (req, res) => {
  let productos = getProducts();
  res.render('index', {
    tittle: 'inicio',
    productos : productos.productos
  });
})
//mostrar productos
router.get("/products", (req, res) => {
  
  let productos = getProducts();
  res.render('products', {
    tittle: "productos",
    productos : productos.productos

  })
})
//detalle producto
router.get("/products/:id", (req, res) => {
  let productos = getProductForID();
  res.render('details-products', {
    tittle: "detalle producto",
    productos : productos
  })
})
//carrito
router.get("/carrito", (req, res) => {
  res.render('cart', {
    tittle: "carrito"
  })
})
//inventario
router.get("/inventario", (req, res) => {
  let productos = getProducts();
  res.render('inventory', {
    tittle: "inventario",
    productos : productos.productos

  })
})
//actualizar 
router.get("/actualizar/:id",(req,res)=>{
  let {id} = req.params
  let productos = {producto : getProductForID(id)};
  res.render('actualizar-producto', {
    tittle: "actualizar producto",
    productos : productos
  })
})
//ruta pagina sobre nosotros
router.get('/about-us', (req, res) => [
  res.render('about-us',{
    tittle : 'sobre nosotros'
  })
])
//ruta a pagina contacto
router.get('/contact', (req, res) => [
  res.render('contact',{
    tittle: "contacto"
  })
])
//ruta a pagina login
router.get('/login', (req, res) => {
  res.render('login', {
    layout: false,
    tittle : 'login & registro'
  })
})

//ruta error pagina o recurso no encontrado
router.get('*', (req, res) => {
  res.render('404')
})
export default router;
