"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const lynx_types_1 = require("./lynx-types");
var _configuration = { host: 'localhost', port: 8125, requestKey: '' };
function configure(hostname, portNumber, applicationName) {
    _configuration = { host: hostname, port: portNumber, requestKey: applicationName != undefined ? applicationName : '' };
}
exports.configure = configure;
exports.configuration = _configuration;
var client = new lynx_types_1.Lynx(exports.configuration.host, exports.configuration.port);
function timer(target, propertyName, descriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
        var startTime = new Date().getTime();
        const outVal = method.apply(this, arguments);
        var duration = 1 + new Date().getTime() - startTime;
        const key = method.name;
        client.timing(key, duration);
        return outVal;
    };
}
exports.timer = timer;
function count(target, propertyName, descriptor) {
    let method = descriptor.value;
    descriptor.value = function () {
        const outVal = method.apply(this, arguments);
        const key = method.name;
        client.increment(key);
        return outVal;
    };
}
exports.count = count;
function countKey(value) {
    return function (target, propertyKey, descriptor) {
        client.increment(value);
    };
}
exports.countKey = countKey;
//# sourceMappingURL=meddler.js.map