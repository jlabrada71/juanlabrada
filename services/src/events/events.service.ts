import { Injectable, Inject } from '@nestjs/common';
import { 
  ClientProxy, 
  Payload, 
  Ctx, 
  MqttContext, 
  MessagePattern, 
  MqttRecordBuilder } from '@nestjs/microservices'
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(
      @InjectModel('Event') private readonly eventModel: Model<Event>,
      @Inject('MESSAGE_QUEUE') private readonly client: ClientProxy
    ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const userProperties = { 'x-version': '1.0.0' };
    const record = new MqttRecordBuilder(':cat:')
      .setProperties({ userProperties })
      .setQoS(1)
      .build();
    this.client.send('events', record);
    
    console.log('Sending....')
    console.log(record)

    const createdEvent = await this.eventModel.create(createEventDto);
    return createdEvent;
  }

  @MessagePattern('events')
  getEvents(@Payload() data: number[], @Ctx() context: MqttContext) {
    console.log(context.getPacket());
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updateData = {
      id: updateEventDto.id,
      date: updateEventDto.date,
      insertDate: updateEventDto.insertDate,
      ts: updateEventDto.ts,
      payload: updateEventDto.payload,
      status: updateEventDto.status,
    };
    const updatedEvent = await this.eventModel.findByIdAndUpdate({_id: id,}, updateData).exec();
    return updatedEvent;
  }

  async delete(id: string) {
    const deletedEvent = await this.eventModel.findByIdAndDelete({ _id: id })
      .exec();
    return deletedEvent;
  }
}

