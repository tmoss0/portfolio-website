// Gulp code to minify files
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const { src, series, parallel, dest, watch } = require('gulp');

const jsPath = 'src/scripts/*.js';
const cssPath = 'src/styles/*.css';

// Migrates HTML files 
function copyHtml() {
    return src('src/*.html').pipe(gulp.dest('dist'));
}

// Compresses image files
function imgTask() {
    return src('src/images/*').pipe(imagemin()).pipe(gulp.dest('dist/images'));
}

// Minifies and maps the JS files
function jsTask() {
    return src(jsPath)
        .pipe(sourcemaps.init())
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/js'));
}

// Minifies and maps the CSS files 
function cssTask() {
    return src(cssPath)
        .pipe(sourcemaps.init())
        .pipe(concat('main.css'))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/styles'));
}

// Watches and runs on updates
function watchTask() {
    watch([cssPath, jsPath], { interval: 1000 }, parallel(cssTask, jsTask));
}

exports.cssTask = cssTask;
exports.jsTask = jsTask;
exports.imgTask = imgTask;
exports.copyHtml = copyHtml;
exports.default = series(parallel(copyHtml, imgTask, jsTask, cssTask), watchTask);