import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/users')
  async create(@Body() data: any) {
    return this.userService.create(data);
  }

  @Get("/users/:id")
  async findOne(@Param("id") id: string) {
    return this.userService.findOne(id);
  }
}
