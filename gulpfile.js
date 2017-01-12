var gulp = require('gulp');
var less = require('gulp-less');
var runSequence = require('run-sequence');

gulp.task('less', function() {
    return gulp.src('src/less/**.less')
    .pipe(less())
    .pipe(gulp.dest('www/css'))
});
gulp.task('copy-files', function() {
    return gulp.src([
    'src/components/**',
    'src/index.html',
    'src/manifest.json',
    'src/js/**',
    'src/res/**'
    ],
    {base: 'src'})
    .pipe(gulp.dest('www'))
});
gulp.task('default', function(callback) {
    runSequence(
    'less',
    'copy-files',
    function (error) {
    if (error) {
        console.log(error.message);
    } else {
        console.log('RELEASE FINISHED SUCCESSFULLY');
        }
        callback(error);
    });
});
