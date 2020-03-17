import gulp from 'gulp'; //使用gulp构建
import gulpif from 'gulp-if'; //if 判断
import concat from 'gulp-concat'; //处理文件拼接
import webpack from 'webpack'; //打包
import gulpWebpack from 'webpack-stream' //文件流
import named from 'vinyl-named'; //文件重命名作标记
import livereload from 'gulp-livereload'; //热更新
import plumber from 'gulp-plumber'; //处理文件信息流
import rename from 'gulp-rename'; //文件重命名
import gulify from 'gulp-uglify' //处理js压缩
import {log, colors} from 'gulp-util'
import args from './util/args'; //引入配置好的命令

gulp.task('scripts', ()=>{
    return gulp.src(['app/js/index.js'])
    .pipe(plumber({
        errorHandler:function(){   
            //catch error handler
        }
    }))
    .pipe(named())  //重命名
    .pipe(gulpWebpack({
        //使用webpack打包的模块
        module:{
            loaders:[{   //如果遇到babel这个js,就需要用这个loader来处理
                test:/\.js$/,
                loader:'babel'
            }]
        }
    }),null, (err, status) =>{
        //处理错误
        log(`Finished '${colors.cyan('script')}'`, status.toString({
            chunks:false
        }))
    })
    .pipe(gulp.dest('server/public/js'))  //编译完存放的路径,因为server需要拿到最新的js才能在服务中跑起来
    .pipe(rename({
        basename:'cp',
        extname:'.min.js'
    }))  //备份编译好的这份文件
    .pipe(uglify({compress:{properties:false}, output:{'quote_keys':true}}))  //配置压缩
    .pipe(gulp.dest('server/public/js')) //backup压缩,再重新存储
    .pipe(gulpif(args.watch, livereload()))  //使用gulp if来判断,如果命令行中有watch这个参数,就执行热更新
})