import { Module } from '@nestjs/common';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cat]),
  ],
  providers: [CatService],
  controllers: [CatController],
  exports: [TypeOrmModule]
})
export class CatModule {}
