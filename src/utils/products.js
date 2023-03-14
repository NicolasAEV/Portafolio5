import  fs  from 'fs';

export  const getProducts = () =>{
    let data = fs.readFileSync("product.json", "utf8");
    return JSON.parse(data);
}
export const getProductForID = (id) =>{
    let data = fs.readFileSync("product.json", "utf8");
    let producto = JSON.parse(data);
    let productoFiltradas = producto.productos.find(producto => producto.id == id);
    return productoFiltradas;
}


    // export default getProducts;