import { APP_GUARD } from '@nestjs/core';
import { MiddlewareConsumer, Module, NestModule, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RequestLoggerMiddleware } from './middlewares/request-logger.middleware';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath:
                process.env.NODE_ENV === 'dev' ? '.env.dev' : process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
            //ignoreEnvFile: process.env.NODE_ENV === 'prod',
        }),
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10,
        }),
        ConfigService,
        UserModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        Logger,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(RequestLoggerMiddleware).forRoutes('*');
    }
}
