'use strict';

var es           = require( 'event-stream' );
var del          = require( 'del' );
var browserSync  = require( 'browser-sync' ).create();
var reload       = browserSync.reload;

var postcss      = require( 'gulp-postcss' );
var autoprefixer = require( 'autoprefixer' );
var mqpacker     = require( 'css-mqpacker' );
var csswring     = require( 'csswring' );

var gulp         = require( 'gulp' );
var aigis        = require( 'gulp-aigis' );
var concat       = require( 'gulp-concat' );
var consolidate  = require( 'gulp-consolidate' );
var iconfont     = require( 'gulp-iconfont' );
var plumber      = require( 'gulp-plumber' );
var rename       = require( 'gulp-rename' );
var sass         = require( 'gulp-sass' );
var sourcemaps   = require( 'gulp-sourcemaps' );
var uglify       = require( 'gulp-uglify' );
var watch        = require( 'gulp-watch' );
var awspublish   = require( 'gulp-awspublish' );

// var runSequence  = require( 'run-sequence' ).use( gulp );


gulp.task( 'browser-sync', function () {

  browserSync.init({
    server: {
      baseDir: './',
      directory: true
    }
  } );

} );


gulp.task('clean', function () {
  return del('./build/');
});


gulp.task( 'copy-font', function () {

  return gulp.src( [
          './src/assets2/font/zero-width.woff'
         ] )
         .pipe( gulp.dest( './build/assets2/font/' ) );

} );

gulp.task( 'copy-img', function () {

  return gulp.src( [
          './src/assets2/img/*/**'
         ] )
         .pipe( gulp.dest( './build/assets2/img/' ) );

} );

gulp.task( 'copy-static', function () {

  return gulp.src( [
          './static/*/**',
         ] )
         .pipe( gulp.dest( './build/' ) );

} );

gulp.task( 'js', function () {

  return gulp.src( [
          './src/assets2/js/vendor/EventDispatcher.js',
          './src/assets2/js/vendor/prism.js',
          './src/assets2/js/prism.extend.js',
          './src/assets2/js/CG2.js',
          './src/assets2/js/CG2-pageHeader.js',
          './src/assets2/js/CG2-drawer.js',
          './src/assets2/js/CG2-compactNav.js',
          './src/assets2/js/CG2-tab.js',
          './src/assets2/js/CG2-articleSeriesNav.js',
          './src/assets2/js/CG2-livecode.js',
          './src/assets2/js/CG2-forms.js',
          './src/assets2/js/old-jade-click-to-play.js',
          './src/assets2/js/old-jade-prism.js'
         ] )
         .pipe( plumber() )
         .pipe( sourcemaps.init() )
         .pipe( concat( 'codegrid-ui.js' ) )
         .pipe( gulp.dest( './build/assets2/js/' ) )
         .pipe( uglify() )
         .pipe( rename( { extname: '.min.js' } ) )
         .pipe( sourcemaps.write('.') )
         .pipe( gulp.dest( './build/assets2/js/' ) );

} );


gulp.task( 'css', function () {

  return gulp.src( [
          './src/assets2/scss/codegrid-ui.scss',
          './src/assets2/scss/codegrid-ui-core.scss',
          './src/assets2/scss/codegrid-ui-www.scss',
          ] )
         .pipe( plumber() )
         .pipe( sourcemaps.init() )
         .pipe( sass() )
         .pipe( postcss( [ autoprefixer( { supports: false } ) ] ) )
         .pipe( gulp.dest( './build/assets2/css/' ) )
         .pipe( postcss( [
           mqpacker(),
           csswring(),
           ] ) )
         .pipe( rename( { extname: '.min.css' } ) )
         .pipe( sourcemaps.write('.') )
         .pipe( gulp.dest( './build/assets2/css/' ) );

} );


gulp.task( 'iconfont', function () {

  var fontName = 'codegrid-icon';

  return gulp.src( [ './src/assets2/font/codegrid-icon/*.svg' ] )
  .pipe( iconfont( {
    fontName: fontName,
    formats: ['woff', 'woff2'],
    appendCodepoints: true
  } ) )
  .on( 'glyphs', function( glyphs, options ) {

    gulp.src( [
      './src/assets2/font/codegrid-icon/_icon.scss',
      './src/assets2/font/codegrid-icon/_icon-utils.scss',
    ] )
    .pipe( consolidate( 'underscore', {
      glyphs: glyphs,
      fontName: fontName,
      fontPath: '../font/',
      prefix: 'CG2-icon'
    } ) )
    .pipe( gulp.dest( './src/assets2/scss/' ) );

  } )
  .pipe( gulp.dest( './build/assets2/font/' ) );

} );


gulp.task( 'numfont', function () {

  var fontName = 'codegrid-num';

  return gulp.src( [ './src/assets2/font/codegrid-num/*.svg' ] )
  .pipe( iconfont( {
    fontName: fontName,
    formats: ['woff', 'woff2'],
    fontHeight: 256,
    descent: 24
  } ) )
  .pipe( gulp.dest( './build/assets2/font/' ) );

} );


gulp.task( 'guide', function () {

  return gulp.src( './aigis_config.yml' )
         .pipe( aigis() )
         .pipe( gulp.dest( '' ) );

} );


// gulp.task( 'watch', function () {
//
//   // watch( [ './**/*.html' ], function () {
//   //   runSequence( browserSync.reload );
//   // } );
//
//   watch( [ './src/assets2/js/*.js' ], function () {
//     runSequence( 'js', browserSync.reload );
//   } );
//
//   watch( [ './src/assets2/scss/*.scss' ], function () {
//     runSequence( 'css', browserSync.reload );
//   } );
//
//   // watch( [ './src/assets2/font/codegrid-icon/*.svg' ], function () {
//   //   runSequence( 'iconfont', 'css', browserSync.reload );
//   // } );
//
// } );

// gulp.task( 'default', function ( callback ) {
//
//   runSequence( 'browser-sync', 'iconfont', [ 'numfont', 'copy-font', 'copy-img', 'copy-static', 'js', 'css' ], 'watch', callback );
//
// } );
//
// gulp.task( 'build', function ( callback ) {
//
//   runSequence( 'clean', 'iconfont', [ 'numfont', 'copy-font', 'copy-img', 'copy-static', 'js', 'css' ], 'guide', callback );
//
// } );


gulp.task('default', gulp.series(
  // todo: serve
  'iconfont',
  gulp.parallel(
    'numfont',
    'copy-font',
    'copy-img',
    'copy-static',
    'js',
    'css'
  )
  // todo: watch
));


gulp.task('build', gulp.series(
  'clean',
  'iconfont',
  gulp.parallel(
    'numfont',
    'copy-font',
    'copy-img',
    'copy-static',
    'js',
    'css'
  ),
  'guide'
));



gulp.task( 'deploy', function () {

  var publisher = awspublish.create( {
    "params": {
      "Bucket": "ui.codegrid.net"
    },
    "endpoint": "s3-ap-northeast-1.amazonaws.com"
  } );

  gulp.src( './build/**/*' )
    .pipe( publisher.publish() )
    .pipe( publisher.sync() )
    .pipe( awspublish.reporter() );

} );
