import {  Controller, Sse } from '@nestjs/common';
import { EventsService } from './events.service';

import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
 
  @Sse('random')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map((_) => ({ data: Math.random()* 100 }) as MessageEvent),
    );
  }

}
