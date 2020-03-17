import gulp from 'gulp'
import gulpSequence from 'gulp-sequence'

//首先清空,然后编译css和编译模板,再执行脚本,这个数组,就是browser server一定在最后,而server更要最后
gulp.task('build', gulpSequence('clean','css','pages','scripts',['browser','server']))