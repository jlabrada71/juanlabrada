import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { EventsService } from './events.service';
import { Event } from './schemas/event.schema';

const mockEvent = {
  name: 'Event #1',
  breed: 'Breed #1',
  age: 4,
};

describe('EventsService', () => {
  let service: EventsService;
  let model: Model<Event>;

  const eventsArray = [
    {
      name: 'Event #1',
      breed: 'Breed #1',
      age: 4,
    },
    {
      name: 'Event #2',
      breed: 'Breed #2',
      age: 2,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getModelToken('Event'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockEvent),
            constructor: jest.fn().mockResolvedValue(mockEvent),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    model = module.get<Model<Event>>(getModelToken('Event'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all events', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(eventsArray),
    } as any);
    const events = await service.findAll();
    expect(events).toEqual(eventsArray);
  });

  it('should insert a new event', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Event #1',
        breed: 'Breed #1',
        age: 4,
      } as any),
    );
    const newEvent = await service.create({
      name: 'Event #1',
      breed: 'Breed #1',
      age: 4,
    });
    expect(newEvent).toEqual(mockEvent);
  });
});
