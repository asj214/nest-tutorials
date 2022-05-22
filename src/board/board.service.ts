import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  async create(createBoardDto: CreateBoardDto) {
    const board = new Board();
    board.title = createBoardDto.title;
    board.body = createBoardDto.body;

    return await this.boardRepository.save(board);
  }

  async findAll() {
    const qb = this.boardRepository.createQueryBuilder('boards');

    qb.where("1 = 1");
    qb.orderBy('boards.id', 'DESC');

    const count = await qb.getCount();
    const boards = await qb.getMany();

    return { boards, count };


    /*
    const resp = await this.boardRepository.findAndCount({
      order: {
        ['id']: 'DESC'
      }
    });
    // console.log(resp);
    return { count: resp[1], data: resp[0] };
    */
  }

  async findOne(id: number) {
    return await this.boardRepository.findOne({ where: { id: id } });
  }

 async update(id: number, updateBoardDto: UpdateBoardDto) {
    const toUpdate = await this.boardRepository.findOne({ where: { id: id } });
    const updated = Object.assign(toUpdate, updateBoardDto);
    const board = await this.boardRepository.save(updated);
    return { board };
  }

  async remove(id: number) {
    return await this.boardRepository.delete({ id: id });
  }
}
