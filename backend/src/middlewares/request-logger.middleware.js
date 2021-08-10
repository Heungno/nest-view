"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RequestLoggerMiddleware = void 0;
var common_1 = require("@nestjs/common");
var RequestLoggerMiddleware = /** @class */ (function () {
    function RequestLoggerMiddleware() {
        this.logger = new common_1.Logger('HTTP');
    }
    RequestLoggerMiddleware.prototype.getMilliseconds = function (start) {
        return "\u001B[36m[+" + (Date.now() - start) + "ms]\u001B[0m";
    };
    RequestLoggerMiddleware.prototype.use = function (request, response, next) {
        var _this = this;
        var ip = request.ip, method = request.method, originalUrl = request.originalUrl;
        var userAgent = request.get('user-agent') || '';
        var start = Date.now();
        this.logger.log("\u001B[2m--> " + method + " " + originalUrl + " - - - " + userAgent + " " + ip + "\u001B[0m");
        response.on('finish', function () {
            var statusCode = response.statusCode;
            var contentLength = response.get('content-length');
            _this.logger.log("\u001B[2m<-- " + method + " " + originalUrl + " " + statusCode + " " + (contentLength !== null && contentLength !== void 0 ? contentLength : 0) + " - " + userAgent + "  " + ip + " " + _this.getMilliseconds(start) + "\u001B[0m");
        });
        next();
    };
    RequestLoggerMiddleware = __decorate([
        common_1.Injectable()
    ], RequestLoggerMiddleware);
    return RequestLoggerMiddleware;
}());
exports.RequestLoggerMiddleware = RequestLoggerMiddleware;
