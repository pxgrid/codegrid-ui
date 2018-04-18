'use strict';

const es = require('event-stream');
const del = require('del');
const browserSync = require('browser-sync').create();

const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const csswring = require('csswring');

const gulp = require('gulp');
const aigis = require('gulp-aigis');
const concat = require('gulp-concat');
const consolidate = require('gulp-consolidate');
const iconfont = require('gulp-iconfont');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const awspublish = require('gulp-awspublish');

gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './',
      directory: true,
    },
    files: ['build'],
    notify: false,
    open: false,
  });
});

gulp.task('clean', function() {
  return del('./build/');
});

x;
gulp.task('copy-font', function() {
  return gulp
    .src(['./src/assets2/font/zero-width.woff'])
    .pipe(gulp.dest('./build/assets2/font/'));
});

gulp.task('copy-img', function() {
  return gulp
    .src(['./src/assets2/img/*/**'])
    .pipe(gulp.dest('./build/assets2/img/'));
});

gulp.task('copy-static', function() {
  return gulp.src(['./static/*/**']).pipe(gulp.dest('./build/'));
});

gulp.task('js', function() {
  return gulp
    .src([
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
      './src/assets2/js/old-jade-prism.js',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(concat('codegrid-ui.js'))
    .pipe(gulp.dest('./build/assets2/js/'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/assets2/js/'));
});

gulp.task('css', function() {
  return gulp
    .src([
      './src/assets2/scss/codegrid-ui.scss',
      './src/assets2/scss/codegrid-ui-core.scss',
      './src/assets2/scss/codegrid-ui-www.scss',
    ])
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer({ supports: false })]))
    .pipe(gulp.dest('./build/assets2/css/'))
    .pipe(postcss([mqpacker(), csswring()]))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/assets2/css/'));
});

gulp.task('iconfont', function() {
  const fontName = 'codegrid-icon';

  return gulp
    .src(['./src/assets2/font/codegrid-icon/*.svg'])
    .pipe(
      iconfont({
        fontName: fontName,
        formats: ['woff', 'woff2'],
        appendCodepoints: true,
      })
    )
    .on('glyphs', function(glyphs, options) {
      gulp
        .src([
          './src/assets2/font/codegrid-icon/_icon.scss',
          './src/assets2/font/codegrid-icon/_icon-utils.scss',
        ])
        .pipe(
          consolidate('underscore', {
            glyphs: glyphs,
            fontName: fontName,
            fontPath: '../font/',
            prefix: 'CG2-icon',
          })
        )
        .pipe(gulp.dest('./src/assets2/scss/'));
    })
    .pipe(gulp.dest('./build/assets2/font/'));
});

gulp.task('numfont', function() {
  const fontName = 'codegrid-num';

  return gulp
    .src(['./src/assets2/font/codegrid-num/*.svg'])
    .pipe(
      iconfont({
        fontName: fontName,
        formats: ['woff', 'woff2'],
        fontHeight: 256,
        descent: 24,
      })
    )
    .pipe(gulp.dest('./build/assets2/font/'));
});

gulp.task('guide', function() {
  return gulp.src('./aigis_config.yml').pipe(aigis());
});

// todo: スタイルガイドのHTMLの変更を検知して更新するタスク
// todo: アイコンフォント用SVGファイルの変更を検知するタスク（要るかな）

gulp.task('watch:css', function() {
  return gulp.watch('./src/assets2/scss/**/*.scss', gulp.series('css'));
});

gulp.task('watch:js', function() {
  return gulp.watch('./src/assets2/js/**/*.js', gulp.series('js'));
});

gulp.task('watch', gulp.parallel('watch:css', 'watch:js'));

gulp.task(
  'default',
  gulp.series(
    'iconfont',
    gulp.parallel(
      'numfont',
      'copy-font',
      'copy-img',
      'copy-static',
      'js',
      'css'
    ),
    gulp.parallel('watch', 'serve')
  )
);

gulp.task(
  'build',
  gulp.series(
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
  )
);

gulp.task('deploy', function() {
  const publisher = awspublish.create({
    params: {
      Bucket: 'ui.codegrid.net',
    },
    endpoint: 's3-ap-northeast-1.amazonaws.com',
  });

  gulp
    .src('./build/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter());
});
