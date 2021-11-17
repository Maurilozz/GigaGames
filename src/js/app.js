document.addEventListener('DOMContentLoaded', function () {
    iniciarScript()
});

function iniciarScript() {
    try {
        mostrarCatalogo();
        navegacionFija();
        cargarEventListeners();
        
    } catch (error) {
        console.log(error);
    }
}

async function mostrarCatalogo() {
    try {
        const resultado = await fetch('./productos.json')
        const db = await resultado.json();

        const { juegos } = db;
        // Generar HTML 
        juegos.forEach(juego => {
            const { imagen, nombre, precio, id } = juego;

            // ==> GENERAR NOMBRE DEL JUEGO <==
            const nombreJuego = document.createElement('P');
            nombreJuego.textContent = nombre;
            nombreJuego.classList.add('nombre-juego', 'centrar-texto');

            // ==> GENERAR PRECIO DEL JUEGO <==
            const precioJuego = document.createElement('P');
            precioJuego.textContent = `$${precio}`;
            precioJuego.classList.add('precio-juego', 'centrar-texto');

            // ==> GENERAR IMAGEN DEL JUEGO <==
            const imagenJuego = document.createElement('IMG')
            imagenJuego.src = imagen;
            imagenJuego.classList.add('imagen-juego');

            // ==> GENERAR BOTON AGREGAR CARRITO <==
            const botonAgregarCarrito = document.createElement('A');
            botonAgregarCarrito.href = '#';
            botonAgregarCarrito.classList.add('u-full-width', 'button-primary', 'button', 'input', 'agregar-carrito');
            botonAgregarCarrito.dataset.Id = id;
            botonAgregarCarrito.textContent = 'Agregar al Carrito';

            // ==> GENERAR CONTENEDOR <==
            const contenedorProducto = document.createElement('DIV');
            contenedorProducto.classList.add('producto');

            const contenedorInfo = document.createElement('DIV');
            contenedorInfo.classList.add('producto-info');

            // ==> AGREGAR CONTENIDO <==
            contenedorProducto.appendChild(imagenJuego);
            contenedorInfo.appendChild(nombreJuego);
            contenedorInfo.appendChild(precioJuego);
            contenedorInfo.appendChild(botonAgregarCarrito);
            contenedorProducto.appendChild(contenedorInfo);

            // ==> INSERTAR EN EL DOM <==
            const contenedor = document.querySelector('.productos');
            contenedor.appendChild(contenedorProducto);

        });

    } catch (error) {
        console.log(error)
    }
}

function navegacionFija() {
    const barra = document.querySelector('.header')

    // SELECCIONAR LOGO
    const logo = document.querySelector('.logotipo');

    // Registrar el intersection observer
    const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
            barra.classList.remove('fijo')
            logo.src = 'build/img/logotipo.png';
        } else {
            barra.classList.add('fijo')
            logo.src = 'build/img/isotipo.png';
        }
    });

    // Elemento a observar
    observer.observe(document.querySelector('.swiper'))

}

//$ ==> AGREGAR A CARRITO <==
// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

// Listeners
function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade el curso al carrito
function agregarCurso(e) {
    e.preventDefault();
    // Delegation para agregar-carrito
    if (e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('.nombre-juego').textContent,
        precio: curso.querySelector('.precio-juego').textContent,
        id: curso.querySelector('a').getAttribute('data--id'),
        cantidad: 1
    }


    if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        })
        articulosCarrito = [...cursos];
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito)



    // console.log(articulosCarrito)
    carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar-curso')) {
        // e.target.parentElement.parentElement.remove();
        const cursoId = e.target.getAttribute('data-id')

        // Eliminar del arreglo del carrito
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
    }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
        contenedorCarrito.appendChild(row);
    });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // forma lenta
    contenedorCarrito.innerHTML = '';


    // forma rapida (recomendada)
    // while (contenedorCarrito.firstChild) {
    //     contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    // }
}


//$ ==> MENU HAMBURGUESA <==
const nav = document.querySelector('#hamburger button');
const menu = document.querySelector('#menu');

nav.addEventListener('click', () => {
    nav.classList.toggle('open'); // toggle añade una clase si no esta y la elimina si la esta
    menu.classList.toggle('active');
    document.body.classList.toggle('opacity');
});
