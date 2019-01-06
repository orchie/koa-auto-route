koa自动加载路由
## 基于[koa-autoload-router](https://github.com/einsqing/koa-autoload-router)

## Installation

```sh
$ npm install koa-auto-route
```

## Use with koa

```js
var app = require('koa')();
var koaAutoRoute = require('koa-autoload-router');
app.use(koaAutoRoute(app, {
    root: './app/controller',
    suffix: '.js',
    prefix: '/v1'
}));

```
## 改进
1. 可以指定非自动路由目录
2. 自动定位控制器内方法  
