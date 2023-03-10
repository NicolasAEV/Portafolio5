// navbar responsive active button 
const btnNavbar = document.querySelector('#btnnavbar');
const menu = document.querySelector('#navbar-sticky');
btnNavbar.addEventListener('click',()=>{
    menu.classList.toggle('hidden')
})
