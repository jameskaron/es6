import gulp from 'gulp'
import gulpif from 'gulp-if'
import liveserver from 'gulp-live-server'   //启动脚本作为服务器
import args from './util/args'

gulp.task('server', (cb)=>{   //回调
    if(!args.watch) return cb()   //非监听状态下,返回回调即可
    
    var server = liveserver.new(['--harmony','server/bin/www'])  //在当前命令行下执行harmony脚本, 执行server/bin/www脚本
    server.start()    //不只是启动服务,还需要刷新

    gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
        server.notify.apply(server,[file])   //通知服务器改变
    })

    //监听需要重启服务的文件
    gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
        server.start.bind(server)()
    })
})