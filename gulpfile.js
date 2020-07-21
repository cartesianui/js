let gulp = require("gulp");
let concat = require("gulp-concat");
let gulpSequence = require("gulp-sequence");
let uglify = require("gulp-uglify");
let minify = require("gulp-minify");
let order = require("gulp-order");
let jshint = require("gulp-jshint");
let rename = require("gulp-rename");
let print = require("gulp-print").default;

gulp.task("print", (done) => {
  gulp.src("src/scripts/*.js").pipe(print((filepath) => `built: ${filepath}`));
  if (done) done();
});

gulp.task("build", build);

function build(done) {
  gulp
    .src("src/scripts/*.js")
    .pipe(jshint())
    .pipe(
      order(
        [
          // Libs
          "src/libs/freeze-ui/freeze-ui.js",
          // Scripts
          "src/scripts/axis.js",
          "src/scripts/axis.path.js",
          "src/scripts/axis.multi-tenancy.js",
          "src/scripts/axis.localization.js",
          "src/scripts/axis.auth.js",
          "src/scripts/axis.features.js",
          "src/scripts/axis.settings.js",
          "src/scripts/axis.notifications.js",
          "src/scripts/axis.log.js",
          "src/scripts/axis.message.js",
          "src/scripts/axis.ui.js",
          "src/scripts/axis.event.js",
          "src/scripts/axis.utils.js",
          "src/scripts/axis.timing.js",
          "src/scripts/axis.clock.js",
          "src/scripts/axis.security.js",
          // Extensions
          "src/extensions/axis.freeze-ui.js",
          "src/extensions/axis.sweet-alert.js",
          "src/extensions/abp.moment.js",
        ],
        { base: "./" }
      )
    )
    .pipe(concat("axis.js"))
    .pipe(gulp.dest("./"));

  if (done) done();
}

gulp.task("compress", compress);

function compress(done) {
  gulp
    .src(["./axis.js"])
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("."));

  if (done) done();
}
