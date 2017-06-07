/**
 * Created by LiuQiang on 2017/4/9.
 */
// 引入 gulp
var gulp = require('gulp');

// 引入组件

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src(['js/controller.js','js/Controller/*.js'])
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('min'))
        // .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('min'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('scripts');

    // 监听文件变化
    gulp.watch('js/*.js', function(){
        gulp.run('scripts');
    });
});