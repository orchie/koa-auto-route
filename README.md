koa自动加载路由
## 基于[koa-autoload-router](https://github.com/einsqing/koa-autoload-router)

## Installation

```sh
$ npm install koa-autoregroute
```

## Use with koa

```js
var app = require('koa')();
var autoRegRoute = require('koa-autoregroute');
app.use(autoRegRoute(app, {
    root: './app/controller',
    suffix: '.js',
    prefix: '/v1'
}));

```
## 改进
1. 可以指定非自动路由目录
2. 自动定位控制器内方法  
