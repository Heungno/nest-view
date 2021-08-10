import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    getMilliseconds(start: number): string{
        return `\x1b[36m[+${Date.now() - start}ms]\x1b[0m`;
    }

    use(request: Request, response: Response, next: NextFunction): void {
        const { ip, method, originalUrl } = request;
        const userAgent = request.get('user-agent') || '';

        const start = Date.now();
        this.logger.log(`\x1b[2m--> ${method} ${originalUrl} - - - ${userAgent} ${ip}\x1b[0m`);

        response.on('finish', () => {
            const { statusCode } = response;
            const contentLength = response.get('content-length');

            this.logger.log(`\x1b[2m<-- ${method} ${originalUrl} ${statusCode} ${contentLength ?? 0} - ${userAgent}  ${ip} ${this.getMilliseconds(start)}\x1b[0m`);
        });
        next();
    }
}
