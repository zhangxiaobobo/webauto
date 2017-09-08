var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var pug = require('gulp-pug');
var data = require('gulp-data');
var htmlmin = require('gulp-htmlmin');
var path = require('path');

const babel = require('gulp-babel');
// babel-preset-es2015
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-minify-css');

var imagemin = require('gulp-imagemin');

//pug编译成html
gulp.task('views', () => {
  return gulp.src('./src/views/*.pug')
    .pipe(data(function (file) {
      var jsonpath = './src/views/data/' + path.basename(file.path, '.pug') + '.json';
      delete require.cache[require.resolve(jsonpath)];
      return require(jsonpath)
    }))
    .pipe(pug({
      pretty: true
    }))
    .pipe(htmlmin({
      collapseWhitespace: false,
      collapseBooleanAttributes: true,
      removeComments: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('dist'))
    .pipe(reload({ stream: true }));
});

//js的编译和压缩
gulp.task('scripts', () => {
  return gulp.src('src/js/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/js/'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/minjs/'))
    .pipe(reload({ stream: true }));
});

//编译sass 读取 编译 输出到新文件夹中
gulp.task('scss', () => {
  //public里面的css编译、合并、压缩、输出
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24', // Firefox 24 is the latest ESR
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6'
      ],
      cascade: true, //是否美化属性值 默认：true 像这样：
      remove: true //是否去掉不必要的前缀 默认：true 
    }))
    .pipe(csscomb())
    .pipe(gulp.dest('dist/css/'))
    .pipe(cssmin())
    .pipe(gulp.dest('dist/mincss/'))
    .pipe(reload({ stream: true }));
});

//img 压缩和输出
gulp.task('img', () => {
  return gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img/'))
    .pipe(reload({ stream: true }));

});

/**
 * 这里静态服务器 + 监听 scss/pug/js 文件
 */
gulp.task('server', ['views', 'scripts', 'scss', 'img'], () => {
  browserSync.init({
    server: 'dist'
    // port: 3000 //默认打开localhost:3000
  });

  //监听 scss/pug/js 文件
  gulp.watch('src/views/**/*.pug', ['views']);
  gulp.watch('src/views/data/*.json', ['views']);
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/scss/**/*.scss', ['scss']);
  gulp.watch('src/img/**/*.{jpg,png,gif}', ['img']);
});


//默认行为,直接调用服务器
gulp.task('default', function () {
  gulp.run('server');
});
