const modal = document.querySelector('.modal');
const showModal = document.querySelectorAll('.show-modal');
const closemodal = document.querySelector('.close-modal');

showModal.forEach((btn)=>{
    console.log(btn)
    btn.addEventListener('click',(e)=>{
        modal.classList.remove('hidden')
    })
})

 closemodal.addEventListener('click',(e)=>{
    modal.classList.add('hidden')
})