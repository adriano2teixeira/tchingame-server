import { Controller, Get, Param, Query, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { ProductsService } from './product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async index(@Query() query: any, @Response() res: Res) {
    query.status = 'publish';
    const resolve = await this.productsService.indexProducts(query);

    res.json({
      products: resolve.products,
      pagination: {
        'x-wp-total': resolve.headers['x-wp-total'],
        'x-wp-totalpages': resolve.headers['x-wp-totalpages'],
      },
    });
  }

  @Get(':slug')
  async find(@Param('slug') slug: string) {
    let query = {} as any;
    query.status = 'publish';
    query.slug = slug;
    return await this.productsService.findProduct(query);
  }

  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(parseInt(id));
  }
}
