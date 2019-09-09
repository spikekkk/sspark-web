Application created by [ThinkJS](http://www.thinkjs.org)

## Install dependencies

```
npm install
```

## Start server

```
1.npm start
2.cd front
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload pm2.json
```

## api 添加路径事项

1.在 \*\*\sspark-web\src\controller\*\* 此处添加 baseApi

sub-- 门店
hq--总店
checkstand--收银台

2.在 \*\*\sspark-web\front\src\api\*\* 此处添加引用 1 中的 Action

## 切换不同后端人员服务

在 此文件中更改 --\sspark-web\src\config\config.dev.js
