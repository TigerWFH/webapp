const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

// 解析application/json编码的body
app.use(bodyParser.json());
// 解析application/x-www-form-urlencoded编码的body
app.use(bodyParser.urlencoded({ extended: true }));
// 解析text/的body
app.use(bodyParser.text());
// 解析raw
app.use(bodyParser.raw())

// 代理远程请求
app.post('/m.api', function(req, res, next) {
    var body = null;
    const contentType = req.header('Content-Type');
    if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        body = req.body;
    }
    else if (contentType.indexOf('text/plain') > -1) {
        body = JSON.parse(req.body)
    }
    
    const data = {
        code: 0,
        msg: '成功',
        data: undefined
    };
    switch(body._mt) {
        case 'megrez.queryList':
            data.data = {
                name: "monkey"
            };
            break;
        default:
            return {}
    }
    // res.json会自动调用JSON.stringify进行序列化
    res.json(data);
});
// 请求路径
app.get('/v1/user', function (req, res, next) {
    var filePath = `./mock/${req.path}/index.json`;
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, { encoding: 'utf8' });
        let result = {
            code: 0,
            msg: '成功',
            content: JSON.parse(data)
        };
        res.json(result);
    }
    else {
        next();
    }
});

const MAX_TIME = 100000000;
app.get('/v1/timeout', function(req, res, next) {
    let i = 0;
    while(i <= MAX_TIME) {
        console.log("i====>", i++);
    }

    res.json({
        code: 0,
        msg: '成功',
        content: []
    })
});

app.all('*', (req, res, next) => {
    let date = new Date();
    let time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    var filePath = `./mock/${req.path}/index.json`;
    if (fs.existsSync(filePath)) {
        let data = fs.readFileSync(filePath, { encoding: 'utf8' });
        let result = {
            code: 0,
            msg: '成功',
            content: JSON.parse(data)
        };
        res.json(result);
    }
    else {
        next();
    }
});

// 处理NOT FOUND的路由
app.use(function (req, res, next) {
    var err = new Error('NOT FOUND');
    err.status = 404;
    next(err);
});
// 如果匹配到了路由，路由抛出了异常，会被捕捉
// 开发环境
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json(err);
    });
}
// 生产环境
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json(err);
});

app.listen(9000, function () {
    let date = new Date();
    let log = `${date.toLocaleDateString()} ${date.toLocaleTimeString()} API server is on at port 9000`;
    console.log(log)
});