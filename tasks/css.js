import gulp from 'gulp'
import gulpif from 'gulp-if'
import livereload from 'gulp-livereload'
import args from './util/args'

gulp.task('css', ()=>{
    //gulp所有任务的创建都需要打开一个文件
    return gulp.src('app/**/*.css')   //改目录表示打开下所有目录的css文件
     .pipe(gulp.dest('server/public'))
    //  .pipe(gulpif(args.watch, livereload())) 
})