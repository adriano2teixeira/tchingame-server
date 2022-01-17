import { Body, Controller, Get, Headers, HttpException, Param, Post } from '@nestjs/common';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly vouchersService: VouchersService) {}

  @Get("/user/:id")
  async findUserVouchers(@Param("id") id: string) {
    return await this.vouchersService.findUserVouchers(id);
  }

  @Get(":order")
  async findOne(@Param("order") orderId: string){
    return await this.vouchersService.findOne(parseInt(orderId))
  }


  @Post()
  async create(@Body() data: any, @Headers('auth') userId: string) {
    if (!userId) {
      throw new HttpException('forbiden', 403);
    }

    data.userUid = userId;
    return await this.vouchersService.create(data);
  }
}
