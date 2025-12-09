import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel('Event') private readonly eventModel: Model<Event>) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    const createdEvent = await this.eventModel.create(createEventDto);
    return createdEvent;
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<Event> {
    return this.eventModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const updateData = {
      name: updateEventDto.name,
      age: updateEventDto.age,
      breed: updateEventDto.breed
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

// curl localhost:3000/events
// curl -d '{"name":"misifu", "age":"4", "breed": "escaminha"}' -H "Content-Type: applievention/json" -X POST http://localhost:3000/events
// curl -d '{"name":"bartolomeo", "age":"10", "breed": "egipcio"}' -H "Content-Type: applievention/json" -X POST http://localhost:3000/events

// curl localhost:3000/events/65a192e46521bb371531d684  (misifuid>
// curl -d '{ "age":"13"}' -H "Content-Type: applievention/json" -X PATCH http://localhost:3000/events/65a1a5a09bc572392c7aed83  (bartolomeo id)

// curl -X DELETE http://localhost:3000/events/65a1a5a09bc572392c7aed83