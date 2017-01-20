# vue-shop

# 首页文章列表和商品列表交替出现

- 商品列表和文章列表交替出现
- 每个商品列表中包含6~10个商品项
- 每个文章列表中包含2~5个文章项目

目前有2个组件`Products`和`Articles`,这两个组件可以复用,分别传入不同的数据即可

商品列表和文章列表需要实现滚动加载

# Vue常见问题

[sf.gg](https://segmentfault.com/q/1010000005045187)

# 跨域问题

前端vue使用webpack,监听8888端口,使用了hotloader实现热更新;后端express提供restful api,监听本地3000端口.使用`vue resource`的时候出现了跨域问题,详见:[发送POST请求莫名其妙变成了OPTIONS](https://segmentfault.com/q/1010000005095024),
最终解决方案详见[Node js Express跨域问题](https://cnodejs.org/topic/51dccb43d44cbfa3042752c8)

vux自带组件中props使用驼峰命名,我们传入的属性应该使用中划线命名

# nginx读取图片返回403

同一静态资源文件目录static目录下有html,css和js以及图片,其他静态资源都可以访问,图片返回403,确定不是路径的问题,使用`ls -al`命令查看权限果断是图片的权限和其他文件不一样,使用`chmod +x *.jpg`完美解决.

# RESTFUL API 如何实现用户登陆状态

一个想法是当用户进行查看购物车,进入个人主页,购买商品等操作的时候先进行登陆权限的验证,登陆权限的验证可以使用html5的session storage,用户登陆成功之后进行跳转并在session storage中设置标记

# 开启redis的debug模式

参见[github](https://github.com/NodeRedis/node_redis#debugging)

# curl POST模拟登陆

```bash
$ curl -X POST -H 'Content-Type: application/json' -d '{"username":"admin@admin.com","password":"123456"}' http://127.0.0.1:3000/api/user/login
```

# 使用openssl生成证书提供https

```bash
# 生成服务器端的非对称秘钥
$ openssl genrsa -des3 -out server.key 1024

# 生成签名请求的CSR文件
$ openssl req -new -key server.key -out server.csr

# 自己对证书进行签名，签名的有效期是365天
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

# 去除证书文件的password
$ cp server.key server.key.orig
$ openssl rsa -in server.key.orig -out server.key
```

最终在建立HTTPS链接中使用的文件是:server.crt and server.key

## Build Setup

### mongo shell

```bash
$ use shop;
$ db.dropDatabase();
```

``` bash
$ git clone https://github.com/consoles/vue-shop.git /tmp && cd /tmp && npm i -d
$ cd server && npm i -d
$ cd .. && cp nginx.conf /usr/local/etc/nginx/nginx.conf && nginx -s reload
$ redis-server
$ mkdir -p dist/upload && node server/util/crawl.js
$ open https://127.0.0.1
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
