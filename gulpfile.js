const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('dart-sass')); // tranformar SCSS a CSS
const optimizarImagenes = require('gulp-imagemin');
const notificacion = require('gulp-notify');
const imageneswebp = require('gulp-webp');
const concat = require('gulp-concat');

const path = {
    imagenes: 'src/img/**/*', // * = selecciona a todos los archivos de la carpeta
    scss: 'src/scss/**/*.scss', // ** = todas las carpetas que esten dentro de la carpeta seleccionada
    js: 'src/js/**/*.js'
}

// utilidades
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

// Funcion que compila SASS
function css() {
    return src(path.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('./build/css'));
}
function javascript() {
    return src(path.js)
        .pipe(sourcemaps.init())
        .pipe(concat('bundle.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(rename( {suffix: '.min'} ))
        .pipe(dest('./build/js'));
}
function minImagenes() {
    return src(path.imagenes)
        .pipe(optimizarImagenes())
        .pipe(dest('./build/img'))
        .pipe(notificacion({ message: 'imagen optimizada' }));
}
function convertirwebp() {
    return src(path.imagenes)
    .pipe(imageneswebp())
        .pipe(dest('./build/img'))
        .pipe(notificacion({ message: 'imagen convertida a webp' }));
}
function compilarArchivo() {
    watch(path.scss, css); // guardara automaticamente todos los cambios de estas carpetas
    watch(path.js, javascript);
}


exports.css = css
exports.minImagenes = minImagenes
exports.compilarArchivo = compilarArchivo
exports.default = series(css, javascript, minImagenes, convertirwebp, compilarArchivo)