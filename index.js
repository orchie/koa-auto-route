const path = require('path');
const fs = require('fs');
const router = require('koa-router')();
const os = require('os');
const ds = os.type() == 'Windows_NT' ? '\\' : '/';
const re = /\s(\w+)\(ctx\)/g;

function walk(dir) {
    dir = path.resolve(__dirname, dir);
    var files = fs.readdirSync(dir);
    var list = {};
    for (var file of files) {
        if (fs.statSync(dir + ds + file).isDirectory()) {
            if (file == 'common') {
                continue
            }
            list = { ...list,
                ...walk(dir + ds + file)
            }
        } else {
            let path = dir + ds + file
            let content = fs.readFileSync(path).toString()
            let methods = []
            while ((res = re.exec(content)) != null) {
                methods.push(res[1])
            }
            list[path] = methods;
        }
    }
    return list;
}

module.exports = function(app, options) {
    if (!options || typeof options.root === 'string') {
        if (!path.isAbsolute(options.root)) {
            options.root = path.join(__dirname, options.root);
        }
    } else {
        throw Error('root must be specified');
    }
    options.suffix = options.suffix || '.js';
    options.action = options.action || 'index';
    options.prefix = options.prefix || '';

    var paths = walk(options.root);
    for (let i in paths) {
        let _path = path.relative(options.root, i);
        _path = _path.slice(0, _path.length - options.suffix.length).replace(/\\/g, '/');
        paths[i].forEach((v, k) => {
            router.post(options.prefix + "/" + _path + "/" + v, require(i)[v]);
        })
    }
    app.use(router.routes());

    return function* koaResource(next) {
        yield* next;
    };
};