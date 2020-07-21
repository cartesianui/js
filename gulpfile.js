var gulp = require("gulp");
var concat = require("gulp-concat");
var gulpSequence = require("gulp-sequence");
var uglify = require("gulp-uglify");
var minify = require("gulp-minify");
var order = require("gulp-order");
var jshint = require("gulp-jshint");

gulp.task("build", build);

function build(done) {
  gulp
    .src("src/scripts/*.js")
    .pipe(jshint())
    .pipe(
      order([
        // Scripts
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
        // Libs
        "src/libs/freeze-ui/freeze-ui.js",
        "src/extensions/axis.freeze-ui.js",
        // Extensions
        "src/extensions/axis.sweet-alert.js",
      ])
    )
    .pipe(concat("axis.min.js"))
    .pipe(gulp.dest("./"));

  if (done) done();
}

gulp.task("compress", compress);

function compress(done) {
  gulp
    .src(["./axis.js"])
    .pipe(minify())
    .pipe(gulp.dest("./"));

  if (done) done();
}
