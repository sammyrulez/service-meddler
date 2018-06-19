"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lynx_types_1 = require("./lynx-types");
const meddler_1 = require("./meddler");
function middleware() {
    var client = new lynx_types_1.Lynx(meddler_1.configuration.host, meddler_1.configuration.port, meddler_1.configuration);
    return function expressStatsd(req, res, next) {
        var startTime = new Date().getTime();
        function sendStats() {
            var key = req[meddler_1.configuration.requestKey];
            key = key ? key + '.' : '';
            var statusCode = res.statusCode || 'unknown_status';
            client.increment(key + 'status_code.' + statusCode);
            var duration = new Date().getTime() - startTime;
            client.timing(key + 'response_time', duration);
            cleanup();
        }
        function cleanup() {
            res.removeListener('finish', sendStats);
            res.removeListener('error', cleanup);
            res.removeListener('close', cleanup);
        }
        res.once('finish', sendStats);
        res.once('error', cleanup);
        res.once('close', cleanup);
        if (next) {
            next();
        }
    };
}
exports.middleware = middleware;
//# sourceMappingURL=express-meddler.js.map