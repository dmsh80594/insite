// Load plugins
var gulp = require('gulp'),
pug = require('gulp-pug'),
stylus = require('gulp-stylus'),
watch = require('gulp-watch'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('autoprefixer-stylus'),
rename = require("gulp-rename"),
cssmin = require('gulp-clean-css'),
plumber = require('gulp-plumber'),
uglify = require('gulp-uglify'),
connect = require('gulp-connect'),
locals = require('./locals.json'),
cwebp = require('gulp-cwebp');

//start localhost
gulp.task('connect', function () {
    var new_port = 3001;
    tcpPortUsed.check(new_port, '127.0.0.1')
    .then(function(inUse) {
      if (inUse) {
        new_port = 3011;
      }
      connect.server({
          root: '',
          port: new_port,
          livereload: true
      });
    }, function(err) {
      console.error(err.message);
    });
});

//start localhost
gulp.task('connect', function () {
  connect.server({
    root: '',
    port: 3005,
    livereload: true
  });
});

//path
var path_file = {
  build: {
    pug: './',
    stylus: './css/',
    js: './js/',
  },
  src: {
    pug: './src/*.pug',
    stylus: './src/css/style.styl',
    js: './src/js/app.js',
  },
  watch: {
    pug: './src/**/*.pug',
    stylus: './src/**/*.styl',
    js: './src/**/*.js',
    cwebp: '/assets/img/*.{jpg,png}',
  }
};

gulp.task('stylus:build', function () {
  return gulp.src(path_file.src.stylus)
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sourcemaps.init())
    .pipe(stylus({
      'include css': true,
      'use': [autoprefixer({ browsers: ['last 5 versions'] })],
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path_file.build.stylus))
    .pipe(connect.reload());
});

gulp.task('pug:build', function () {
  return gulp.src(path_file.src.pug)
    .pipe( pug() )
    .pipe(gulp.dest(path_file.build.pug))
    .pipe(connect.reload());
});

gulp.task('js:build', function () {
  return gulp.src(path_file.src.js)
    //.pipe( uglify(): True )
    .pipe(gulp.dest(path_file.build.js))
    .pipe(connect.reload());
});

gulp.task('build', [
  'stylus:build',
  'pug:build',
  'js:build'
]);

gulp.task('watch', function(){
  watch([path_file.watch.stylus], function(event, cb) {
    gulp.start('stylus:build');
  });
  watch([path_file.watch.pug], function(event, cb) {
    gulp.start('pug:build');
  });
  watch([path_file.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch(['/assets/img/*'], function (event, cb) {
    gulp.start('cwebp');
  });
});

gulp.task('cwebp', function(){
  gulp.src('/assets/img/*.{jpg,png}')
    .pipe(cwebp())
    .pipe(gulp.dest('/assets/img_webp/'))
});

gulp.task('default', ['connect','build', 'watch']);
