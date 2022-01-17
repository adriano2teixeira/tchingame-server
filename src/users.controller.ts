import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello() {
    return 'Hello world';
  }

  @Post('/')
  async create(@Body() data: any) {
    return this.userService.create(data);
  }

  @Put('/:id')
  async update(@Body() data: any, @Param('id') id: string) {
    return this.userService.update(data, id);
  }
  
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }
}
