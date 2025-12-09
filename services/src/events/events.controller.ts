import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiKeyGuard } from '../guards/apikey.guard';

// curl localhost:3000/events --header "X-API-KEY: 123456"
// curl https://services.juanlabrada.com/events --header "X-API-KEY: 123456"

// curl -X POST -d '{"id":"id-01", "status": "new", "date":"2023-09-05T01:29:16.850Z", "insertDate": "2023-09-05T01:29:16.850Z", "payload":"this is the email details"}' -H "Content-Type: application/json" -H "X-API-KEY: 123456"  http://localhost:3000/events

// curl localhost:3000/cats/65a192e46521bb371531d684  (misifuid>
// curl -d '{ "age":"13"}' -H "Content-Type: application/json" -X PATCH http://localhost:3000/cats/65a1a5a09bc572392c7aed83  (bartolomeo id)

// curl -X DELETE http://localhost:3000/events/664fb62a89450d66088a97fe --header "X-API-KEY: 123456"

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get()
  @UseGuards(ApiKeyGuard)
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @UseGuards(ApiKeyGuard)
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(ApiKeyGuard)
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  remove(@Param('id') id: string) {
    return this.eventsService.delete(id);
  }
}
