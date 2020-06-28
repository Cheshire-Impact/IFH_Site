const gulp = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");
const sass = require("gulp-sass");
const data = require("gulp-data");

gulp.task("default", function () {
  return gulp
    .src("src/templates/*.html")
    .pipe(
      data(function () {
        return require("./src/data/global.json");
      })
    )
    .pipe(
      nunjucksRender({
        path: ["src/templates/"], // String or Array
      })
    )
    .pipe(gulp.dest("dist"));
});

// Compile scss

function style() {
  // Locate scss file
  return (
    gulp
      .src("src/scss/**/*.scss")
      // Pass through scss compiler
      .pipe(sass())
      // Destination for compiled css
      .pipe(gulp.dest("dist/css/"))
  );
}
exports.style = style;


gulp.task("watch", function () {
  gulp.watch('src/**/*', gulp.series(['default']));
});