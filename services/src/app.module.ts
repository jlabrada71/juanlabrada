import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { MessagesModule } from './messages/messages.module';
import { EventsModule } from './events/events.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    CatsModule,
    MessagesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
