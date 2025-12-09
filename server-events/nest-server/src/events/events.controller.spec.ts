import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from './events.controller';
import { CreateEventDto } from './dto/create-event.dto';
import { EventsService } from './events.service';

describe('Events Controller', () => {
  let controller: EventsController;
  let service: EventsService;
  const createEventDto: CreateEventDto = {
    name: 'Event #1',
    breed: 'Breed #1',
    age: 4,
  };

  const mockEvent = {
    name: 'Event #1',
    breed: 'Breed #1',
    age: 4,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Event #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                name: 'Event #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                name: 'Event #3',
                breed: 'Breed #3',
                age: 2,
              },
            ]),
            create: jest.fn().mockResolvedValue(createEventDto),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  describe('create()', () => {
    it('should create a new event', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockEvent);

      await controller.create(createEventDto);
      expect(createSpy).toHaveBeenCalledWith(createEventDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of events', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Event #1',
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'Event #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'Event #3',
          breed: 'Breed #3',
          age: 2,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
