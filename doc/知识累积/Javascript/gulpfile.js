// https://www.gulpjs.com.cn/docs/getting-started/creating-tasks/
// 不在推荐gulp.task方式定义task，推荐直接在gulpfile中定义任务
const {
    series,
    parallel,
    src,
    dest
} = require('gulp')
const closureCompiler = require('google-closure-compiler').gulp()
const rename = require('gulp-rename')

// 文件拷贝
function copy() {
    // return src('./mock/index.js')
    // .pipe(new ggCompiler({
    //     // js: ['/file-one.js', '/file-two.js'],
    //     compilation_level: 'ADVANCED',
    //     js_output_file: 'out.js',
    //     debug: true
    // }))
    // .pipe(dest('mock/.'))
    return src('./mock/index.js')
    .pipe(rename({basename: 'target'}))
    .pipe(dest('./mock/gulp/'))
}
// 谷歌插件压缩js
function optimize() {
    return src('./mock/index.js')
    .pipe(closureCompiler({
        compilation_level: 'ADVANCED',
          warning_level: 'VERBOSE',
          language_in: 'ECMASCRIPT6_STRICT',
          language_out: 'ECMASCRIPT5_STRICT',
          output_wrapper: '(function(){\n%output%\n}).call(this)',
          js_output_file: 'output.min.js'
    }, {
        platform: ['native', 'java', 'javascript']
    }))
    .pipe(dest('./mock/gulp/'))
}

exports.copy = copy
exports.optimize = optimize