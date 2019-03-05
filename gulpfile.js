var gulp = require('gulp'),
    pug = require('gulp-pug'),
    scss = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', function(){
  return gulp.src("app/**/*/*.scss")
    .pipe(sourcemaps.init())
    .pipe(scss())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 10', 'ie 11'], { cascade: true }))
    .pipe(cssnano())
    .pipe(sourcemaps.write(""))
    .pipe(gulp.dest("build/"))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
  return gulp.src("app/js/*.js")
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('img', function() {
  return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    })))
    .pipe(gulp.dest('build/img'));
});

gulp.task('clear', function (callback) {
  return cache.clearAll();
})

gulp.task('pugModules', function(){
  return gulp.src('app/module/**/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/module'))
});

gulp.task('pug', function(){
  return gulp.src('app/index.pug')
    .pipe(pug())
    .pipe(gulp.dest('build'))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'build'
    },
    notify: false
  });
});

gulp.task('watch', ['img', 'scss', 'scripts', 'browser-sync'], function() {
  gulp.watch('app/**/*.scss', ['scss']);
  gulp.watch('app/**/*.js', browserSync.reload);
  gulp.watch('app/**/*.pug', ['pug', 'pugModules']);
  gulp.watch('build/**/*.html', browserSync.reload);
});

gulp.task('start', ['pug', 'pugModules', 'watch']);
