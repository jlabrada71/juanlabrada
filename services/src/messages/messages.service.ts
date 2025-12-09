import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './schemas/message.schema';

@Injectable()
export class MessagesService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const createdMessage = await this.messageModel.create(createMessageDto);
    return createdMessage;
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }

  async findOne(id: string): Promise<Message> {
    return this.messageModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const updateData = {
      name: updateMessageDto.name,
      date: updateMessageDto.date,
      insertDate: updateMessageDto.insertDate,
      details: updateMessageDto.details,
      email: updateMessageDto.email,
      result: updateMessageDto.result
    };
    const updatedMessage = await this.messageModel.findByIdAndUpdate({_id: id,}, updateData).exec();
    return updatedMessage;
  }

  async delete(id: string) {
    const deletedMessage = await this.messageModel.findByIdAndDelete({ _id: id })
      .exec();
    return deletedMessage;
  }
}



// curl localhost:3000/messages
// curl -d '{"name":"juan labrada", "date":"2023-09-05T01:29:16.850Z", "result": {}, "insertDate": "2023-09-05T01:29:16.850Z", "email": "jlabrada@yahoo.com", "details":"this is the email details"}' -H "Content-Type: application/json" -X POST http://localhost:3000/messages
// curl -d '{"name":"bartolomeo", "age":"10", "breed": "egipcio"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cats

// curl localhost:3000/cats/65a192e46521bb371531d684  (misifuid>
// curl -d '{ "age":"13"}' -H "Content-Type: application/json" -X PATCH http://localhost:3000/cats/65a1a5a09bc572392c7aed83  (bartolomeo id)

// curl -X DELETE http://localhost:3000/cats/65a1a5a09bc572392c7aed83