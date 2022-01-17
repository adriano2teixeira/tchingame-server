import { Controller, Get, Param, Query, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { StoresService } from './stores.service';

@Controller('stores')
export class StorsController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async index(@Query() query: any, @Response() res: Res) {
    const { data, headers } = await this.storesService.indexStores(query);

    res.json({
      stores: data,
      pagination: {
        'x-wp-total': headers['x-wp-total'],
        'x-wp-totalpages': headers['x-wp-totalpages'],
      },
    });
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return await this.storesService.findOne(slug);
  }

  @Get(':slug/products')
  async products(@Param('slug') slug: string, @Response() res: Res) {
    const { data, headers } = await this.storesService.findProducts(slug);
    res.json({products: data, pagination:{
      'x-wp-total': headers['x-wp-total'],
      'x-wp-totalpages': headers['x-wp-totalpages']
    }});
  }
}
