import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    MongooseModule.forRoot('mongodb+srv://tryyourideas:Cobian98@cluster0.k2rni.gcp.mongodb.net/juanlabrada?retryWrites=true&w=majority'),
    CatsModule,
    EventsModule,
  ],
})
export class AppModule {}
