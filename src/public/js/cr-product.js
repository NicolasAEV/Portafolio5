let formulario = document.querySelector('#formulario')
let nombre = document.querySelector('#nombre')
let precio = document.querySelector('#precio')
let stock = document.querySelector('#stock')
let imagen = document.querySelector('#imagen')
let categoria = document.querySelector('#categoria')
let descripcion = document.querySelector('#descripcion')


formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    let productoActualizado = {
        nombre:nombre.value,
        precio:precio.value,
        stock:stock.value,
        imagen : imagen.value,
        categoria:categoria.value,
        descripcion : descripcion.value
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   
      fetch("http://localhost:3000/api/inventario", {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify(productoActualizado)
        })
     .then(response => response.json())
     .then(data =>{
        if(data.code == 500 || data.code == 400){
            console.log(data.message)
        }else{
     
            location.reload();
        }
    })
    .catch(error => {
        console.log(error)
        alert("Algo ha salido mal al cargar los productos.")
    })

})


const eliminarProducto = (id) => {
    fetch("http://localhost:3000/api/inventario/"+id, {
        method: "DELETE",
    })
     .then(response => response.json())
     .then((data) => {
        if(data.code == 400 || data.code == 500 ){
            console.log(data.message)
        }
        else{
            location.reload();
        }
    })
    .catch(error => {
        console.log(error)
        alert("Algo ha salido mal al cargar los productos.")
    })
}