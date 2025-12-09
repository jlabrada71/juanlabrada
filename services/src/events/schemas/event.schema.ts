import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type EventDocument = HydratedDocument<Event>;

@Schema()
export class Event {
  @Prop()
  id: string;

  @Prop()
  ts: Date;

  @Prop()
  date: Date;

  @Prop()
  insertDate: Date;

  @Prop()
  payload: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);
