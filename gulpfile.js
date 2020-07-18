var gulp = require("gulp");
var concat = require("gulp-concat");
var gulpSequence = require("gulp-sequence");
var uglify = require("gulp-uglify");
var order = require("gulp-order");
var jshint = require("gulp-jshint");

gulp.task("build", build);

function build(done) {
  gulp
    .src("modules/*.js")
    .pipe(jshint())
    .pipe(
      order([
        "modules/axis.path.js",
        "modules/axis.multi-tenancy.js",
        "modules/axis.localization.js",
        "modules/axis.auth.js",
        "modules/axis.features.js",
        "modules/axis.settings.js",
        "modules/axis.notifications.js",
        "modules/axis.log.js",
        "modules/axis.message.js",
        "modules/axis.ui.js",
        "modules/axis.event.js",
        "modules/axis.utils.js",
        "modules/axis.timing.js",
        "modules/axis.clock.js",
        "modules/axis.security.js",
      ])
    )
    .pipe(concat("axis.js"))
    .pipe(gulp.dest("./"));

  if (done) done();
}
