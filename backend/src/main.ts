import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { winstonOption } from './configs/logger.option';

import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

async function bootstrap() {
    //로그
    const logger = WinstonModule.createLogger(winstonOption.option);
    const nestAppOptions: NestApplicationOptions = {
        logger: logger,
    };

    const app = await NestFactory.create(AppModule, nestAppOptions);

    console.log(JSON.stringify(nestWinstonModuleUtilities.format.nestLike('API')));

    // 전역 범위 파이프
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
            forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
            transform: true, // 요청에서 넘어온 자료들의 형변환
        }),
    );

    // global prefix
    app.setGlobalPrefix(process.env.ROUTE_PREFIX || 'api');

    app.use(cookieParser());

    // Security
    app.use(helmet());
    app.use(csurf({ cookie: true }));
    app.enableCors({
        origin: 'http://heung.win:3000', // 허락하고자 하는 요청 주소
        credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
    });

    const port = process.env.PORT || 3000;
    await app.listen(port, () =>
        logger.log(`🚀 애플리케이션 시작 {PORT: ${port}, NODE_ENV: ${process.env.NODE_ENV}}`, 'main'),
    );
}
bootstrap();
