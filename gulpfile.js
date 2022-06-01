const gulp = require("gulp");
const { parallel } = gulp;
const ts = require("gulp-typescript");
const sass = require('gulp-sass')(require('sass'));

const tsProject = ts.createProject("tsconfig.json");

function buildTask(cb) {
    return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest("build/"));
};

function buildStyles() {
    return gulp.src('./sass/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/css'));
};

exports.buildTask = buildTask;
exports.buildStyles = buildStyles;
exports.default = parallel(buildTask, buildStyles)

exports.watchStyles = function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
};