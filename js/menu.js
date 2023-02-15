

const openMenu = document.querySelector('#open-menu')
const closeMenu = document.querySelector('#close-menu')
const aside = document.querySelector('aside')


openMenu.addEventListener('click', () =>{
    aside.classList.add('aside-visible');
})

closeMenu.addEventListener('click', () =>{
    aside.classList.remove('aside-visible');
})

/* LLamo a  btnsCategorias que se encuentra en main.js eto se puede
hacer xq se encuentra declarado arriba del menu.js en el index*/
btnsCategorias.forEach(boton => boton.addEventListener('click', ()=>{
    aside.classList.remove('aside-visible');
}))

