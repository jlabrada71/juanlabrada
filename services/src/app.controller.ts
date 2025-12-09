import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('version')
  getVersion(): string {
    return this.appService.getVersion();
  }

  @Get('env/:key')
  getEnv(@Param("key") key: string): string {
    return this.appService.getEnv(key);
  }
}
