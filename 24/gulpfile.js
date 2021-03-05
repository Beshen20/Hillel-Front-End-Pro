'use strict'

import gulp from 'gulp'
import sass from 'gulp-sass'
import plumber from 'gulp-plumber'
import autoprefixer from 'gulp-autoprefixer'
import browserSync from 'browser-sync'
import htmlmin from 'gulp-htmlmin'
import uglify from 'gulp-uglify-es'
import rename from 'gulp-rename'
import concat from 'gulp-concat'

const path = {
  dist: {
    index: 'dist/',
    style: 'dist/css/',
    scripts: 'dist/javascript/',
  },
  src: {
    index: 'src/index.html',
    styleMain: 'src/style/main.{scss,sass,css}',
    styleVendor: [
      'src/style/*.{scss,sass,css}',
      '!src/style/main.{scss,sass,css}',
    ],
    scripts: [
      'src/scripts/!(app)*.js',
      'src/scripts/app.js'
    ]
  },
  srcWatch: {
    index: 'src/index.html',
    styleMain: 'src/style/main.{scss,sass,css}',
    styleVendor: [
      'src/style/*.{scss,sass,css}',
      '!src/style/main.{scss,sass,css}',
    ],
    scripts: 'src/scripts/*.js'
  },
}

const buildFunctions = {
  index: (done) => {
    gulp
      .src(path.src.index)
      .pipe(plumber())
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest(path.dist.index))

    done()
  },
  style: (done) => {
    gulp
      .src(path.src.styleMain)
      .pipe(plumber())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer({ cascade: true }))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest(path.dist.style))
    gulp
      .src(path.src.styleVendor)
      .pipe(plumber())
      .pipe(sass({ outputStyle: 'compressed' }))
      .pipe(autoprefixer({ cascade: true }))
      .pipe(rename('vendor.min.css'))
      .pipe(gulp.dest(path.dist.style))

    done()
  },
  scripts: (done) => {
    gulp
      .src(path.src.scripts)
      .pipe(plumber())
      .pipe(concat('app.min.js'))
      .pipe(uglify.default())
      .pipe(gulp.dest(path.dist.scripts))

    done()
  },
}

const devFunctions = {
  index: (done) => {
    gulp
      .src(path.src.index)
      .pipe(plumber())
      .pipe(gulp.dest(path.dist.index))
      .pipe(browserSync.reload({ stream: true }))

    done()
  },
  styleMain: (done) => {
    gulp
      .src(path.src.styleMain)
      .pipe(plumber())
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(autoprefixer({ cascade: true }))
      .pipe(rename('main.min.css'))
      .pipe(gulp.dest(path.dist.style))
      .pipe(browserSync.reload({ stream: true }))

    done()
  },
  styleVendor: (done) => {
    gulp
      .src(path.src.styleVendor)
      .pipe(plumber())
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(autoprefixer({ cascade: true }))
      .pipe(rename('vendor.min.css'))
      .pipe(gulp.dest(path.dist.style))
      .pipe(browserSync.reload({ stream: true }))

    done()
  },
  scripts: (done) => {
    gulp
      .src(path.src.scripts)
      .pipe(plumber())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest(path.dist.scripts))
      .pipe(browserSync.reload({ stream: true }))

    done()
  },
  initialize: () => {
    gulp.series(
      devFunctions.index,
      devFunctions.styleMain,
      devFunctions.styleVendor,
      devFunctions.scripts
    )

    browserSync.init({
      server: path.dist.index,
      notify: false,
      online: true,
    })

    gulp.watch(path.srcWatch.index, devFunctions.index)
    gulp.watch(path.srcWatch.styleMain, devFunctions.styleMain)
    gulp.watch(path.srcWatch.styleVendor, devFunctions.styleVendor)
    gulp.watch(path.srcWatch.scripts, devFunctions.scripts)
  },
}

export default devFunctions.initialize
export const build = gulp.series(
  buildFunctions.index,
  buildFunctions.style,
  buildFunctions.scripts
)
