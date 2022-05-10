import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cat } from './cat.entity';

@Injectable()
export class CatService {
  constructor(
    @InjectRepository(Cat) private catRepository: Repository<Cat>,
  ) {}
  find(page, per_page) {
    return {};
    // return this.catRepository.find();
  }
}
