export class CreateEventDto {
    readonly id: string;
    readonly date: Date;  
    readonly ts: Date;
    readonly insertDate: Date;  
    readonly payload: string;  
    readonly status: string;
}
