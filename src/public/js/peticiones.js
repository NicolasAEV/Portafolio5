let formulario = document.querySelector('#formulario')
let id = document.querySelector('#modalid')
let nombre = document.querySelector('#modalnombre')
let precio = document.querySelector('#modalprecio')
let stock = document.querySelector('#modalstock')
let imagen = document.querySelector('#modalimagen')
let categoria = document.querySelector('#modalcategoria')
let descripcion = document.querySelector('#modaldescripcion')


formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    let productoActualizado = {
        id : id.value,
        nombre:nombre.value,
        precio:precio.value,
        stock:stock.value,
        imagen : imagen.value,
        categoria:categoria.value,
        descripcion : descripcion.value
    }
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    fetch('http://localhost:3000/api/actualizar/')
     .then
    console.log(productoActualizado)
})