import { WinstonModuleOptions } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

const logPath = process.env.LOG_PATH || process.cwd() + '/logs';
const nestLikeFormat = format.printf(({ context, level, timestamp, message }) => {
    return `${level}: ${new Date(timestamp).toLocaleString()}\t [${context}] ${message}`;
});

export class winstonOption {
    static option: WinstonModuleOptions = {
        format: format.combine(
            format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
            //format.colorize({ all: true }),
            //format.prettyPrint(),
            //format.json(),
            //format.simple(),
            //format.ms(),
            //nestLikeFormat.
            nestWinstonModuleUtilities.format.nestLike('API'),
        ),
        transports: [
            new transports.Console(),
            new transports.DailyRotateFile({
                format: format.combine(format.uncolorize()),
                filename: `${logPath}/application/application-%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                level: 'info',
            }),
            new transports.DailyRotateFile({
                format: format.combine(format.uncolorize()),
                filename: `${logPath}/error/error-%DATE%.log`,
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                level: 'error',
            }),
        ],
    };
}
