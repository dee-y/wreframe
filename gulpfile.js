/* 
 * Build Javascript for Prod
 */


var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var jsFiles = ['modules/main.js','modules/**/*.js'],
    jsDest = 'lib/js/';
   

gulp.task('default', function () {
    return gulp.src(jsFiles)
            .pipe(concat('app.js'))
            .pipe(gulp.dest(jsDest))
            .pipe(rename('app.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(jsDest));
});