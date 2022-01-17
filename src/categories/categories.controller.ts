import { Controller, Get, Param, Query, Response } from '@nestjs/common';
import { Response as Res } from 'express';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  @Get('/featured')
  async findFeautred() {
    return await this.categoriesService.findFeatured();
  }

  @Get(':slug/products')
  async getCategoryProductsBySlug(
    @Param('slug') slug: string,
    @Response() res: Res,
    @Query() query: any,
  ) {
    const resolve = await this.categoriesService.findProductsBySlug(
      slug,
      query,
    );

    return res.json({
      products: resolve.products,
      pagination: {
        'x-wp-total': resolve.headers['x-wp-total'],
        'x-wp-totalpages': resolve.headers['x-wp-totalpages'],
      },
    });
  }

  @Get('products/:id')
  async findCategoryProductsById(
    @Param('id') id: string,
    @Response() res: Res,
    @Query() query: any,
  ) {
    const resolve = await this.categoriesService.findProductsById(
      id,
      query,
    );

    return res.json({
      products: resolve.products,
      pagination: {
        'x-wp-total': resolve.headers['x-wp-total'],
        'x-wp-totalpages': resolve.headers['x-wp-totalpages'],
      },
    });
  }

  @Get(':slug')
  async getCategory(@Param('slug') slug: string) {
    return await this.categoriesService.findOne(slug);
  }
}
