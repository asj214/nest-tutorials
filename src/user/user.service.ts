import { Injectable, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserEntity } from './entities/user.entity';
import { SECRET } from 'src/config';
import * as argon2 from 'argon2';
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async login({email, password}: LoginUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    if (!user) throw new NotFoundException();
    if (!await argon2.verify(user.password, password)) {
      throw new NotFoundException();
    }

    user.lastLoginAt = new Date();
    return await this.userRepository.save(user);

  }

  async create(dto: CreateUserDto) {
    const { email, name, password } = dto;
    const isExist = await this.userRepository.findOne({
      where: {
        email: email
      }
    })

    if (isExist) throw new BadRequestException();

    const user = new UserEntity();
    user.email = email;
    user.name = name;
    user.password = password;

    const errors = await validate(user);
    if (errors.length > 0) {
      const _errors = {username: 'Userinput is not valid.'};
      throw new HttpException({message: 'Input data validation failed', _errors}, HttpStatus.BAD_REQUEST);

    }

    return await this.userRepository.save(user);
  }

  async findAll() {
    const qb = this.userRepository.createQueryBuilder();

    qb.where("1 = 1");
    qb.orderBy('id', 'DESC');

    const count = await qb.getCount();
    const users = await qb.getMany();

    return { users, count };
  }

  async getData(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findOne(id: number) {
    return this.userRO(await this.getData(id));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.getData(id);
    const updated = Object.assign(user, updateUserDto);
    return this.userRO(await this.userRepository.save(updated));
  }

  async remove(id: number) {
    return await this.userRepository.softDelete({ id: id });
  }

  generateJWT(user) {
    let today = new Date();
    let exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      exp: exp.getTime() / 1000,
    }, SECRET);
  }

  userRO(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      lastLoginAt: user.lastLoginAt,
      createdAt: user.createdAt
    }
  }

}
