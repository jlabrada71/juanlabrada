import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventSchema } from './schemas/event.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }])],   // Event.name
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
