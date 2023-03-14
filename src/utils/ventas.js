import  fs  from 'fs';
import moment from 'moment';
import {v4 as uuid} from 'uuid'

export  const getVentas = () =>{
    let data = fs.readFileSync("ventas.json", "utf8");
    return JSON.parse(data);
}
export const getventasID = (id) =>{
    let data = fs.readFileSync("ventas.json", "utf8");
    let producto = JSON.parse(data);
    let productoFiltradas = producto.productos.find(producto => producto.id == id);
    return productoFiltradas;
}


