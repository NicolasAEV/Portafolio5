import { Router } from 'express';
const router = Router();
import { readFile } from 'fs';

import {getProducts , getProductForID} from '../utils/products.js';
import {getVentas , getventasID} from '../utils/ventas.js';
// let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];


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
router.get("/detalle/:id", (req, res) => {
  let {id} = req.params
  let productos =  getProducts()
  productos = productos.productos.splice(0 , 6)
  let producto = {producto : getProductForID(id)};
  // let productos = getProductForID();
  res.render('detalle', {
    tittle: "detalle producto",
    producto : producto,
    productos :productos
  })
})
//carrito
router.get("/carrito", (req, res) => {
  res.render('cart', {
    tittle: "carrito"
  })
})
//ventas
router.get("/ventas", (req, res) => {
  let ventas = getVentas();
  res.render('ventas', {
    tittle: "registro ventas",
    ventas : ventas.venta
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


export default router;
