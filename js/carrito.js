

let productosEnCarrito = localStorage.getItem('productos-En-Carrito')
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector('#carrito-vacio')
const contenedorProductos = document.querySelector('#carrito-productos')
const contenedorCarritoAcciones = document.querySelector('#carrito-acciones')
const contenedorCarritoComprado = document.querySelector('#carrito-comprado')
const btnVaciarCarrito = document.querySelector('#carrito-acciones-vaciar')
const btnComprarCarrito = document.querySelector('#carrito-acciones-comprar')
let btnsEliminar = document.querySelectorAll('.carrito-producto-eliminar')
const contenedorTotal = document.querySelector('#total')

function cargarPorductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){

        contenedorCarritoVacio.classList.add('disable')
        contenedorCarritoComprado.classList.add('disable')
        contenedorProductos.classList.remove('disable')
        contenedorCarritoAcciones.classList.remove('disable')
    
        contenedorProductos.innerHTML = "";
    
        productosEnCarrito.forEach(producto => {
            
            const div = document.createElement('div');
            div.classList.add('carrito-productos');
            div.innerHTML = `
                <div class="carrito-producto">
                <img class="carrito-prod-img" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-prod-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-prod-cantidad">
                    <p>Cantidad</p>
                    <small>${producto.cantidad}</small>
                </div>
                <div class="carrito-prod-precio">
                    <small>Precio</small>
                    <p>${producto.precio}</p>
                </div>
                <div class="carrito-prod-subtotal">
                    <small>Subtotal</small>
                    <p>${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash"></i>
                </button>
                </div>
            `;
    
            contenedorProductos.append(div);
        });
    
    
    }else{
        contenedorCarritoVacio.classList.remove('disable')
        contenedorCarritoComprado.classList.add('disable')
        contenedorProductos.classList.add('disable')
        contenedorCarritoAcciones.classList.add('disable')
    };
    actualizarBtnsEliminar();
    actualizarTotal();
}
cargarPorductosCarrito();


actualizarBtnsEliminar();

function actualizarBtnsEliminar(){
    btnsEliminar = document.querySelectorAll('.carrito-producto-eliminar')

    btnsEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarDelCarrito);

    })
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Producto Eliminado",
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

    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);

    productosEnCarrito.splice(index, 1);
    cargarPorductosCarrito();

    localStorage.setItem('productos-En-Carrito', JSON.stringify(productosEnCarrito))
}

btnVaciarCarrito.addEventListener('click', vaciarCarrito)
function vaciarCarrito(){
    Swal.fire({
        title: 'Esta seguro que decea vaciar el carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si !'
      }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem('productos-En-Carrito', JSON.stringify(productosEnCarrito));
            cargarPorductosCarrito();
        }
      })
}


function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    contenedorTotal.innerHTML = `$${totalCalculado}`
}

btnComprarCarrito.addEventListener('click', comprarCarrito)
function comprarCarrito(){

    productosEnCarrito.length = 0;
    localStorage.setItem('productos-En-Carrito', JSON.stringify(productosEnCarrito))

    contenedorCarritoVacio.classList.add('disable')
    contenedorCarritoComprado.classList.remove('disable')
    contenedorProductos.classList.add('disable')
    contenedorCarritoAcciones.classList.add('disable')
}
