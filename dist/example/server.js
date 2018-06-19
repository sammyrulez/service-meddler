"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const homeCtr_1 = require("./homeCtr");
const fibCtr_1 = require("./fibCtr");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const meddlerExpress = require("../express-meddler");
const meddler = require("../meddler");
class App {
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        meddler.configure("localhost", 8125, "demoNodeApp");
        this.express.use(meddlerExpress.middleware());
    }
    routes() {
        let router = express.Router();
        router.get('/', homeCtr_1.homeCtr());
        router.get('/fib', fibCtr_1.fibCtr());
        this.express.use('/', router);
    }
}
console.log('ts-express:server');
const port = normalizePort(process.env.PORT || 3000);
const testApp = new App().express;
testApp.set('port', port);
const server = http.createServer(testApp);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    let port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== 'listen')
        throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}
//# sourceMappingURL=server.js.map