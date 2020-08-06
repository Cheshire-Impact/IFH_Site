const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const sass = require("gulp-sass");
const prefix = require('gulp-autoprefixer');
const data = require("gulp-data");
const imagemin = require('gulp-imagemin');
const prettier = require("gulp-prettier");
const plumber = require("gulp-plumber");
const browserSync = require("browser-sync");
const server = browserSync.create();
const bless = require('gulp-bless');


const paths = {
  styles: {
    src: 'src/scss/**/*.scss',
    dest: 'dist/css/'
  },
  html: {
    src: 'src/templates/**/*'
  },
  image: {
    src: 'src/images/**/*',
    dest: 'dist/images/'
  }
};


function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist/'
    }
  });
  done();
}


function nunjucks(done) {
  gulp.src("./src/templates/*.html")
    .pipe(plumber())
    .pipe(
      data(function () {
        return require("./src/data/global.json");
      })
    )
    .pipe(
      nunjucksRender({
        path: ["./src/templates/"],
      })
    )
    .pipe(gulp.dest("./dist/"));
  done();
}

function style(done) {
  gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass())
    .pipe(prefix({ "grid": "autoplace" }))
    .pipe(bless())
    .pipe(gulp.dest(paths.styles.dest));
  done();
}



function compress(done) {
  gulp.src(paths.image.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.image.dest));
  done();
}


function pretty(done) {
  gulp.src("./dist/*.html")
    .pipe(plumber())
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest("./dist/"));
  done();
}



const watch = () => gulp.watch([paths.styles.src, paths.html.src], gulp.series(nunjucks, style, reload));

const dev = gulp.series(nunjucks, style, serve, watch);
const deploy = gulp.series(pretty, compress);
exports.default = dev;
exports.deploy = deploy;