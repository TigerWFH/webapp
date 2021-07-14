const gulp = require('gulp')
var compiler = require('google-closure-compiler')
gulp.task('go', function() {
    return gulp.src('./index.js')
    .pipe(compiler({
        compiler_level: 'advanced',
        warning_level: 'VERBOSE',
        output_wrapper: '(function(){\n%output%\n}).call(this)',
        js_output_file: 'mirror.advanced.min.js',
        create_source_map: true
    }))
    .pipe(gulp.dest('.'))
})