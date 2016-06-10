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

let workers = {}
if(cluster.isMaster){
  // 主进程分支
  cluster.on('death',function(worker){
    // 当一个工作进程结束时，重启工作进程
    delete workers[worker.pid]
    worker = cluster.fork()
    workers[worker.pid] = worker
  });
  // 初始时开启与CPU内核数量相同的工作进程
  for(let i = 0;i < numCpus;i++){
    let worker = cluster.fork()
    workers[worker.pid] = worker
  }
} else {
  // 工作进程分支，启动server
  let www = require('./www')
  www.httpServer.listen(config.port,() => {
    console.info(`http server started at the port ${config.port}`)
  })
  www.httpsServer.listen(config.sslPort,() => {
    console.info(`https server started at the port ${config.sslPort}`)
  })
}

// 主进程被终止时，关闭所有工作进程
process.on('SIGTERM',function(){
  for(let pid in workers){
    process.kill(pid)
  }
  process.exit(0)
})
