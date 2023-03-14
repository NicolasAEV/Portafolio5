
let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

const addProduct = (id , stock) => {
    console.log(id)
    let url = "http://localhost:3000/api/carrito/" + id ; 
    console.log(url)
    fetch(url,{
        method: "GET"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.code == 400 || data.code == 500) {
                alert("Se ha generado el siguiente problema: " + data.message)
            } else {
                let buscarProducto = carritoStorage.find(producto => producto.id == id)
                if (buscarProducto) {
                    if (buscarProducto.cantidad >= stock) {
                        buscarProducto.cantidad = stock
                        alert("Usted alcanzó el stock máximo de productos: " + stock);
                        location.href = "http://localhost:3000/carrito";
                    } else {
                        buscarProducto.cantidad = buscarProducto.cantidad + 1
                        location.href = "http://localhost:3000/carrito"
                    }
                } else {
                    carritoStorage.push(data.data)
                   location.href = "http://localhost:3000/carrito"
                }
                alert("Producto agregado correctamente.")
                localStorage.setItem("carrito", JSON.stringify(carritoStorage))
            }
        }).catch(error => console.log(error))
}
