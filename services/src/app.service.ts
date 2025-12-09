import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
  getVersion(): string {
    return 'Version 0.0.1-a5c3422 (main)';
  }
  getEnv(key: string): string { 
     return process.env[key]; 
  }
}
