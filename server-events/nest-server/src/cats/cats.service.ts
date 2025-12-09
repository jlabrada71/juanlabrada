import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './schemas/cat.schema';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catModel.create(createCatDto);
    return createdCat;
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec();
  }

  async update(id: string, updateCatDto: UpdateCatDto): Promise<Cat> {
    const updateData = {
      name: updateCatDto.name,
      age: updateCatDto.age,
      breed: updateCatDto.breed
    };
    const updatedCat = await this.catModel.findByIdAndUpdate({_id: id,}, updateData).exec();
    return updatedCat;
  }

  async delete(id: string) {
    const deletedCat = await this.catModel.findByIdAndDelete({ _id: id })
      .exec();
    return deletedCat;
  }
}

// curl localhost:3000/cats
// curl -d '{"name":"misifu", "age":"4", "breed": "escaminha"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cats
// curl -d '{"name":"bartolomeo", "age":"10", "breed": "egipcio"}' -H "Content-Type: application/json" -X POST http://localhost:3000/cats

// curl localhost:3000/cats/65a192e46521bb371531d684  (misifuid>
// curl -d '{ "age":"13"}' -H "Content-Type: application/json" -X PATCH http://localhost:3000/cats/65a1a5a09bc572392c7aed83  (bartolomeo id)

// curl -X DELETE http://localhost:3000/cats/65a1a5a09bc572392c7aed83