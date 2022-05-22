import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
  ) {}
  find(page: number, per_page: number) {
    // return {};
    return this.catRepository.find();
  }
  async create(name: string, age: number){
    const cat = new Cat();
    cat.name = name;
    cat.age = age;
    const resp = await this.catRepository.save(cat);
    return resp;
  }
  async findOne(id): Promise<Cat> {
    return await this.catRepository.findOne(id);
    // return { cat };
  }
}
