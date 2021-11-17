document.addEventListener('DOMContentLoaded', () => iniciarapp());

function iniciarapp() {
    try {
        mostrarSeccion()
        cambiarSeccion()
    } catch {
        
    }
}

const datos = { // objeto almacenara los valores escritos por el usuario
    email: '',  // importante ( tendra que ser el nombre de la propiedad igual al del id )
    contrasena: ''
}
const registroDatos = {
    rnombre: '',
    remail: '',
    rcontrasena: '',
    repetir_contrasena: ''
}

//$ ==> VARIABLES <==
const formulario = document.querySelector('.formulario');
const formulario2 = document.querySelector('.formulario2');

// INICIO DE SESION
const email = document.querySelector('#email');
const contrasena = document.querySelector('#contrasena');

// REGISTRO
const rnombre = document.querySelector('#rnombre');
const remail = document.querySelector('#remail');
const rcontrasena = document.querySelector('#rcontrasena');
const repetirContrasena = document.querySelector('#repetir_contrasena');

let pagina = 1;

//$ ==> EVENTOS <==

try {
    // INICIO DE SESION
    email.addEventListener('input', leerTexto);
    contrasena.addEventListener('input', leerTexto);

    // REGISTRO
    rnombre.addEventListener('input', leerTexto);
    remail.addEventListener('input', leerTexto);
    rcontrasena.addEventListener('input', leerTexto);
    repetirContrasena.addEventListener('input', leerTexto);

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();


        // validar formulario 
        const { email, contrasena } = datos;
        if (email === '' || contrasena === '') {
            mostrarAlerta(formulario, 'Todos los campos son obligatorios', true)
            return; // corta la ejecucion si se cumple la condicion
        }
        // Validador de cuenta
        if (email === 'admin@gmail.com' && contrasena === 'admin') {
            ingresarCuenta();
            return;
        }
        else {
            mostrarAlerta(formulario, 'El correo o contraseña son incorrectos', true);
        }

    });

    formulario2.addEventListener('submit', (evento) => {
        evento.preventDefault();


        // validar formulario 
        const { remail, rcontrasena, rnombre, repetir_contrasena } = registroDatos;
        if (remail === '' || rcontrasena === '' || repetir_contrasena === '' || rnombre === '') {
            mostrarAlerta(formulario2, 'Todos los campos son obligatorios', true)
            return; // corta la ejecucion si se cumple la condicion
        }
        if (repetir_contrasena !== rcontrasena) {
            mostrarAlerta(formulario2, 'La contraseña no coincide', true)
            return
        }
        // Enviar formulario
        mostrarAlerta(formulario2, 'Usuario Creado correctamente');
        console.log('Enviando formulario');
    });

    function leerTexto(e) {
        // console.log(e.target.value); // ver el valor del evento 
        datos[e.target.id] = e.target.value; // Agregara el valor del campo al objeto "datos"
        registroDatos[e.target.id] = e.target.value;
    }
} catch(error) {
    console.log(error);
}

function mostrarAlerta(form, mensaje, error = null) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('existe')
    const errorExiste = document.querySelector('.existe');
    if (!errorExiste) {
        if (error) {
            alerta.classList.add('error');
        } else {
            alerta.classList.add('correcto');
        }
        form.appendChild(alerta);
        // Desaparece despues de 5 segundos
        setTimeout(() => {
            alerta.remove()
        }, 5000);
    }
}

//$ ==> SECCIONES <==
function mostrarSeccion() {
    // Eliminar mostrar-seccion de la seccion anterior
    const seccionAnterior = document.querySelector('.mostrar-seccion');
    if (seccionAnterior) {
        seccionAnterior.classList.remove('mostrar-seccion');
    }

    const seccionActual = document.querySelector(`#paso-${pagina}`);
    seccionActual.classList.add('mostrar-seccion');

    // Eliminar la clase de acual en el tab anterior
    const tabAnterior = document.querySelector('.tabs .actual');
    if (tabAnterior) {
        tabAnterior.classList.remove('actual')
    }

    // resalta el tab actual 
    const tab = document.querySelector(`[data-paso="${pagina}"]`);
    tab.classList.add('actual');
}

function cambiarSeccion() {
    const enlaces = document.querySelectorAll('.tabs button');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', e => {
            e.preventDefault()

            pagina = parseInt(e.target.dataset.paso);

            // Eliminar la seccion anterior
            mostrarSeccion()
        });
    });
}

// Paginación
function siguientePagina() {
    const siguientePagina = document.querySelector('#siguiente');
    siguientePagina.addEventListener('click', () => {
        pagina++;
        // console.log(pagina)
    })
}
function anteriorPagina() {
    const anteriorPagina = document.querySelector('#anterior');
    anteriorPagina.addEventListener('click', () => {
        pagina--;
        // console.log(pagina)
    })
}

function ingresarCuenta () {
    location.href = 'micuenta.html'
}