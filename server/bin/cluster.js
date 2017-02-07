/**
 * Created by consoles on 16-6-10.
 *
 * 集群模式支持
 */
'use strict'

const os = require('os')
const cluster = require('cluster')
const config = require('../config/config')

// CPU数量
const numCpus = os.cpus().length

const RETRY_LIMIT = 3

let workers = []
if(cluster.isMaster){
  // 主进程分支
  cluster.on('exit',function(worker){
    // 当一个工作进程结束时，重启工作进程
    var pos = worker.pos
    workers[pos].retry++
    var trycount = workers[pos].retry
    console.log(`worker-${pos} restart at times:${trycount}`)
    if (workers[pos].retry > RETRY_LIMIT) {
      console.error(`worker-${pos} restart failure due to after ${trycount} retry!`)
      return
    }
    worker = cluster.fork()
    worker.pos = pos
    workers[pos].worker = worker
  });
  // 初始时开启与CPU内核数量相同的工作进程，并绑定退出事件
  for(let i = 0;i < numCpus;i++){

    let worker = cluster.fork()
    worker.pos = i
    workers[i] = {'worker':worker,'retry':0,pid:worker.process.pid}
    // workers[i].worker.on('exit',function(code,signal){
    //   var pos = worker.pos
    //   var trycount = workers[pos].retry++
    //   console.log(`worker-${pos} restart at times:${trycount}`)
    //   if (workers[pos].retry === RETRY_LIMIT) {
    //     console.error(`worker-${pos} restart failure due to after ${trycount} retry!`)
    //     return
    //   } else {
    //     let worker = cluster.fork()
    //     worker.pos = pos
    //     workers[pos].worker = worker
    //   }
    // })
  }
} else {
  // 工作进程分支，启动server
  let www = require('./www')
  var pid = process.pid
  www.httpServer.listen(config.port,() => {
    console.info(`http server started at the port ${config.port},pid:${pid}`)
  })
  www.httpsServer.listen(config.sslPort,() => {
    console.info(`https server started at the port ${config.sslPort},pid:${pid}`)
  })
}

// 主进程被终止时，关闭所有工作进程
process.on('SIGTERM',function(){
  workers.forEach(function(item) {
    let worker = item.worker
    worker.destroy()
  })
  setTimeout(function(){
    workers = null
    process.exit(0)
  },2000)
})
