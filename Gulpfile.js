'use strict';
var gulp = require('gulp');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var KarmaServer = require('karma').Server;
var browserSync = require('browser-sync').create();

// The paths to our app files
var paths = {
  src: {
    scripts: ['client/app/**/*.js'],
    html: ['client/app/**/*.html', 'client/index.html'],
    styles: ['client/styles/style.css']
  },
  compiled: {
    scripts: ['compiled/app/**/*.js'],
    html: ['compiled/app/**/*.html', 'compiled/index.html'],
    styles: ['compiled/styles/style.css']
  },
  test: ['specs/**/*.js'],
  server: 'server/server.js'
};

/***************************************
 *                ES5
 ***************************************/

// Start our node server using nodemon
gulp.task('serve', function () {
  nodemon({
    script: paths.server,
    ignore: 'node_modules/**/*.js'
  });
});

// Any changes made to your client side code will
// automagically refresh your page with the new changes
gulp.task('start', ['serve'], function () {
  browserSync.init({
    notify: true,
    injectChanges: true,
    files: paths.src.scripts.concat(paths.src.html, paths.src.style),
    proxy: 'localhost:8000'
  });
});

// Run our karma tests
gulp.task('karma', function (done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

// Use ES5 by default
gulp.task('default', ['start']);

/***************************************
 *                ES6
 ***************************************/

// Remove previously transpiled code
gulp.task('clean', function() {
  return gulp.src(paths.compiled.scripts)
  .pipe(clean({read: false}));
});

// Transpile our client scripts 
gulp.task('babel', ['clean'], function() {
  return gulp.src('client/**/*')
    .pipe(babel({
      presets: ['es2015'],
      only: paths.src.scripts
    }))
    .pipe(gulp.dest('compiled'));
});

// Start a babel-node server using nodemon
gulp.task('serve:es6', ['babel'], function () {
  nodemon({
    exec: 'babel-node --presets es2015',
    script: paths.server,
    ignore: 'node_modules/**/*.js'
  });
});

// Any changes made to your client side code will still
// automagically refresh your page with the new changes,
// after transpiling again with babel
gulp.task('start:es6', ['serve:es6'], function () {
  browserSync.init({
    notify: true,
    injectChanges: true,
    files: paths.compiled.scripts.concat(paths.compiled.html, paths.compiled.style),
    proxy: 'localhost:8000'
  });

  gulp.watch(paths.scripts, ['babel']);
});

// Tests can be written in ES6 too!
gulp.task('karma:es6', function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    preprocessors: {
      [paths.src.scripts]: ['babel'],
      [paths.test]: ['babel']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015'],
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath;
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    }
  }, done).start();
});
