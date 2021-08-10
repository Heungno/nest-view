import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(
        private readonly config: ConfigService, // ConfigService 불러오기
    ) {}

    getHello(): string {
        return `Hello World! ${this.config.get('DB_HOST')}`;
    }
}
