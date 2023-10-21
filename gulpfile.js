let gulp = require("gulp");
let concat = require("gulp-concat");
let gulpSequence = require("gulp-sequence");
const runSequence = require("gulp4-run-sequence");
let uglify = require("gulp-uglify");
let minify = require("gulp-minify");
let order = require("gulp-order");
let jshint = require("gulp-jshint");
let rename = require("gulp-rename");
let print = require("gulp-print").default;

gulp.task("build", function (done) {
  runSequence("concat", "compress", done);
});

gulp.task("print", (done) => {
  gulp.src("src/scripts/*.js").pipe(print((filepath) => `built: ${filepath}`));
  if (done) done();
});

gulp.task("concat", concatTask);

function concatTask(done) {
  gulp
    .src("src/scripts/*.js")
    .pipe(jshint())
    .pipe(
      order(
        [
          // Libs
          "src/libs/freeze-ui/freeze-ui.js",
          // Scripts
          "src/scripts/cartesian.js",
          "src/scripts/cartesian.path.js",
          "src/scripts/cartesian.tenancy.js",
          "src/scripts/cartesian.localization.js",
          "src/scripts/cartesian.auth.js",
          "src/scripts/cartesian.features.js",
          "src/scripts/cartesian.settings.js",
          "src/scripts/cartesian.notifications.js",
          "src/scripts/cartesian.log.js",
          "src/scripts/cartesian.message.js",
          "src/scripts/cartesian.ui.js",
          "src/scripts/cartesian.event.js",
          "src/scripts/cartesian.utils.js",
          "src/scripts/cartesian.timing.js",
          "src/scripts/cartesian.clock.js",
          "src/scripts/cartesian.security.js",
        ],
        { base: "./" }
      )
    )
    .pipe(concat("cartesian.js"))
    .pipe(gulp.dest("./"));

  if (done) done();
}

gulp.task("compress", compressTask);

function compressTask(done) {
  gulp
    .src([
      "./cartesian.js",
      "./src/libs/freeze-ui/freeze-ui.js",
      "./src/extensions/*.js",
    ])
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("."));

  if (done) done();
}
