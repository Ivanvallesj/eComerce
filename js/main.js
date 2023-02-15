

productos = [];

fetch('./js/productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos);
    })



const contenedorProd = document.querySelector('#contenedorProduct')
const btnsCategorias = document.querySelectorAll('.btn-categoria')
const txtTituloPrincipal = document.querySelector('#titulo-principal')
const contadorCarrito = document.querySelector('#contador')
let btnAgregar = document.querySelector('.btn-producto-agregar')


function cargarProductos(productosElegidos) {

    contenedorProd.innerHTML = "";

    productosElegidos.forEach(producto => {
        
        const div = document.createElement("div");
        div.classList.add("productos")
        div.innerHTML = `
            <img class="producto-img" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalle">
                <h3 class="producto-titulo"> ${producto.titulo} </h3>
                <p class="producto-precio"> $${producto.precio} </p>
                <button class="btn-producto-agregar" id="${producto.id}"> Agregar </button>
            </div>
        `;

        contenedorProd.append(div)
    });

    actualizarBtnAgregar()
}


btnsCategorias.forEach( boton =>{
    boton.addEventListener( 'click', (e) =>{
        btnsCategorias.forEach(boton => boton.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        if(e.currentTarget.id != "todos"){
            const porductosCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            txtTituloPrincipal.innerText = porductosCategoria.categoria.nombre;

            const porductosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(porductosBoton);
        }else{
            txtTituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos)
        }
    })

})

function actualizarBtnAgregar(){
    btnAgregar = document.querySelectorAll('.btn-producto-agregar')

    btnAgregar.forEach(boton => {
        boton.addEventListener('click', agregarAlCarrito);

    })
}

let productosEnCarrito;

let productosEnCarritoLs = localStorage.getItem('productos-En-Carrito');

if(productosEnCarritoLs){
    productosEnCarrito = JSON.parse(productosEnCarritoLs);
    actualizarContador()
}else{
    productosEnCarrito = []
}

function agregarAlCarrito(e){

    Toastify({
        text: "Agregado",
        duration: 500,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right,#67c7c1 ,#142933)",
          borderRadius: '2rem',
          boxShadow: '0 0 0 100vmax rgb(0, 0, 0, 0.25)', 
          textTransform: 'uppercase',
          fontSize:'.8rem'
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();


    const idBoton = e.currentTarget.id
    
    const productoAgregado = productos.find(producto => producto.id === idBoton)
    
    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)
        productosEnCarrito[index].cantidad++

    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarContador();
    
    
    localStorage.setItem('productos-En-Carrito', JSON.stringify(productosEnCarrito));
}

function actualizarContador(){
    let nuevoContador = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    contadorCarrito.innerText = nuevoContador;
}






