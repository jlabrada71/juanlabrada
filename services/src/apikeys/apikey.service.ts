import { Injectable } from '@nestjs/common';

 @Injectable()
export class ApiKeyService {
    isKeyValid(apikey: string ): boolean {
        return apikey === '123456';
    }
}
