import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Result } from './result.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema()
export class Message {
  @Prop()
  name: string;

  @Prop()
  date: Date;

  @Prop()
  insertDate: Date;

  @Prop()
  details: string;

  @Prop()
  email: string;

  @Prop()
  result: Result;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
