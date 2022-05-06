import { Controller, Get, Post, Put, Delete, Req, HttpCode } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatController {
  @Get()
  findAll(@Req() request: Request): object {
    return request.query
  }
  @Post()
  create(@Req() request: Request): object {
    return request.body
  }
  @Get(':id')
  findOne(@Req() request: Request): object {
    return request.params;
  }
  @Put(':id')
  update(@Req() request: Request): object {
    const resp = {
      id: request.params.id,
      body: request.body
    }
    return resp;
  }
  @Delete(':id')
  @HttpCode(204)
  destroy(@Req() request: Request): object {
    return request.params;
  }
}
