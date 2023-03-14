let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || [];

//function 
const main = () => {
    cargarCarrito()
    cargarPrecio()
}

const cargarCarrito = () => {
    let contenedor = document.querySelector('.carrito')
    let template = '';
    if (carritoStorage.length > 0) {
        carritoStorage.forEach(productos => {
            console.log(productos)
            template += `
                <div class="grid grid-cols-5 mb-1">
                   <div class="">
                       <img src="${productos.imagen}"
                           class="object-cover rounded-l-lg h-40" alt="">
                   </div>
                   <div class="flex flex-col ">
                       <h3 class="text-xl font-semibold text-center">${productos.nombre}</h3>
                       <p class="text-center">categoria : ${productos.categoria}</p>
                       <a href="#" onclick="eliminarCarrito('${productos.id}')" class="font-semibold hover:text-red-400 text-center">eliminar</a>
                   </div>
                   <div class="flex flex-col content-center">
                       <h3 class="text-center">cantidad </h3>
                       <div class="flex justify-between mx-10"> 
                       <a href="#"class="text-center text-xl font-bold hover:text-green-500"  max="${productos.stock}" onclick="sumar('${productos.id}')">+ </a>
                       <p class="text-center " max="${productos.stock}"  min="0"> ${productos.cantidad}</p>
                       <a href="#"class="text-center text-xl font-bold hover:text-red-500" onclick="restar('${productos.id}')" min="0" max="${productos.stock}">- </a>
                       </div>

                   </div>
                   <div class="flex flex-col">
                       <h3 class="text-center">precio </h3>
                       <p class="text-center">${productos.precio}</p>
                   </div>
                   <div class="flex flex-col">
                       <h3 class="text-center">total por producto </h3>
                       <p class="text-center">$ ${productos.precio * productos.cantidad}</p>
                   </div>
               
               </div>`
        });
        contenedor.innerHTML = template
    } else {
        contenedor.innerHTML = template = `  
        <div">
            <h3 class="text-center">Carrito vacio</h3>
        </div>`
    }

}
const cargarPrecio = () => {
    let compra = document.querySelector('.comprar')
    let templatee = '';
    if (carritoStorage.length > 0) {
        let totalCompra = carritoStorage.reduce(
            (accumulator, currentValue) => accumulator + (currentValue.cantidad * currentValue.precio), 0
        );
        let cantidadTotal = carritoStorage.reduce(
            (accumulator, currentValue) =>(accumulator += currentValue.cantidad),0
        );
            templatee = `
         
                <h3 class="text-3xl font-semibold text-center text-white mt-2">detalle compra</h3>
            <div class="grid grid-cols-3 mt-10 p-2 ">
                <p class=" font-semibold text-white col-span-2">cantidad de productos : </p>
                <p class="text-center font-semibold text-white">${cantidadTotal}</p>
            </div>
            <div class="grid grid-cols-3 mt-3 p-2 ">
                <p class=" font-semibold text-white col-span-2">total a comprar : </p>
                <p class="text-center font-semibold text-white">$${totalCompra}</p>
            </div>
    
            <div class="grid grid-cols-1 p-5">
                <a href="#" onclick="comprar()" class="w-full py-3 bg-green-400 hover:bg-green-500 rounded text-white text-center text-xl">Comprar</a>
            </div>
         `
          
        compra.innerHTML = templatee
    } else {
        compra.innerHTML = templatee = `  
        <div">
            <h3 class="text-center text-white">debes realizar una compra</h3>
        </div>`
    }

}
//modificar cantiadad
const restar = (id) => {
    carritoStorage.forEach(product => {
        if (product.id == id) {
            if (product.cantidad > 1) {
                product.cantidad -= 1;
            } else {
                carritoStorage = carritoStorage.filter((juego) => juego.id != id);
            }
            localStorage.setItem('carrito', JSON.stringify(carritoStorage));
            cargarCarrito();
            cargarPrecio();
        }
    })
}
const sumar = (id) => {

    carritoStorage.forEach(product => {
        if (product.id == id) {
            if (product.cantidad >= 1) {
                product.cantidad += 1;
            }
            localStorage.setItem('carrito', JSON.stringify(carritoStorage));
            cargarCarrito()
            cargarPrecio()
        }
    })
}


const eliminarCarrito = (id) => {
    carritoStorage.forEach((product) => {
        if (product.id == id) {
            carritoStorage = carritoStorage.filter((juego) => juego.id != id);
            localStorage.setItem('carrito', JSON.stringify(carritoStorage));
            cargarCarrito()
            cargarPrecio()
        }
    });
}
const comprar = () =>{
    let productos = JSON.parse(localStorage.getItem("carrito")) || [];
 
    if(productos.length> 0){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        fetch("http://localhost:3000/api/ventas", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(productos)
        })
        .then(response => response.json())
        .then(data => {
            if(data.code == 500 || data.code == 400){
                alert(data.message , 'aca')
            }else{
                alert("compra realizada con exito")
                localStorage.setItem("carrito", "[]");
                location.reload();
            }
        })
        .catch(error => {
            console.log(error)
            alert("error al cargar los productos")
        })
    }else {
        alert("lo siento por el momento no tienes productos que comprar")
    }
}
const actualizarStock = () =>{

}
main();