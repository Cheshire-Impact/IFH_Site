const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const sass = require("gulp-sass");
const prefix = require('gulp-autoprefixer');
const data = require("gulp-data");
const prettier = require("gulp-prettier");
const browserSync = require("browser-sync");
const server = browserSync.create();


const paths = {
  styles: {
    src: 'src/scss/*.scss',
    dest: 'dist/css/'
  },
  html: {
    src: 'src/templates/**/*'
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
    .pipe(sass())
    .pipe(prefix())
    .pipe(gulp.dest(paths.styles.dest))
  done();
}


// function pretty(done) {
//   gulp.src("./dist/*.html")
//     .pipe(prettier({ singleQuote: true }))
//     .pipe(gulp.dest("./dist/"));
//   done();
// }

// function styleWatch() {
//   gulp.watch("./src/scss/*.scss", style);
// }


const watch = () => gulp.watch([paths.styles.src, paths.html.src], gulp.series(nunjucks, style, reload));

const dev = gulp.series(nunjucks, style, serve, watch);
exports.default = dev;



// gulp.task("default", gulp.series(nunjucks, pretty, style));
// gulp.task("watch", styleWatch);
// gulp.task("serve", serve);

// const build = gulp.series(nunjucks, pretty, styles);

// exports.default = build;