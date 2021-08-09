import { Controller, Header, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @Get()
  @Header('Cache-Control', '')
  getHello(): string {
    this.logger.log('Calling getHello()');
    return this.appService.getHello();
  }
}
