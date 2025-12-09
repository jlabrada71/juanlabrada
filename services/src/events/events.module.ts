import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventSchema } from './schemas/event.schema';
import { ApiKeyService } from 'src/apikeys/apikey.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Event', schema: EventSchema }]),
    ClientsModule.register([
      {
        name: 'MESSAGE_QUEUE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://ec2-3-135-51-234.us-east-2.compute.amazonaws.com:1883',
          username: 'wisehome',
          password: 'Cobian98'
        }
      },
    ]), 
  ],   // Cat.name
  controllers: [EventsController],
  providers: [EventsService, ApiKeyService,],
})
export class EventsModule {}
