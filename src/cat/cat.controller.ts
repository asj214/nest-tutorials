import { Controller, Get, Post, Put, Delete, Req, Param, Query, HttpCode } from '@nestjs/common';
import { Request } from 'express';
import { CatService } from './cat.service';

@Controller('cats')
export class CatController {
  constructor(private readonly catService: CatService) {}
  @Get()
  findAll(@Query('page') page, @Query('per_page') per_page) {
    return this.catService.find(page, per_page);
  }
  @Post()
  create(@Req() request: Request): object {
    return request.body
  }
  @Get(':id')
  findOne(@Param('id') id): any {
    return id;
  }
  @Put(':id')
  update(@Param('id') id,@Req() request: Request): object {
    const resp = {
      id: id,
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
