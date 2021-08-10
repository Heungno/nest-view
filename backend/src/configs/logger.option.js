"use strict";
exports.__esModule = true;
exports.winstonOption = void 0;
var nest_winston_1 = require("nest-winston");
var winston_1 = require("winston");
require("winston-daily-rotate-file");
var logPath = process.env.LOG_PATH || process.cwd() + '/logs';
var nestLikeFormat = winston_1.format.printf(function (_a) {
    var context = _a.context, level = _a.level, timestamp = _a.timestamp, message = _a.message;
    return level + ": " + new Date(timestamp).toLocaleString() + "\t [" + context + "] " + message;
});
var winstonOption = /** @class */ (function () {
    function winstonOption() {
    }
    winstonOption.option = {
        format: winston_1.format.combine(winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }), 
        //format.colorize({ all: true }),
        //format.prettyPrint(),
        //format.json(),
        //format.simple(),
        //format.ms(),
        //nestLikeFormat.
        nest_winston_1.utilities.format.nestLike('API')),
        transports: [
            new winston_1.transports.Console(),
            new winston_1.transports.DailyRotateFile({
                format: winston_1.format.combine(winston_1.format.uncolorize()),
                filename: logPath + "/application/application-%DATE%.log",
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                level: 'info'
            }),
            new winston_1.transports.DailyRotateFile({
                format: winston_1.format.combine(winston_1.format.uncolorize()),
                filename: logPath + "/error/error-%DATE%.log",
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                level: 'error'
            }),
        ]
    };
    return winstonOption;
}());
exports.winstonOption = winstonOption;
