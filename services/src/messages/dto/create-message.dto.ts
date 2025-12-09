import { Result } from '../schemas/result.schema';
export class CreateMessageDto {
    readonly name: string;  
    readonly date: Date;  
    readonly insertDate: Date;  
    readonly details: string;  
    readonly email: string;  
    readonly result: Result;
}
