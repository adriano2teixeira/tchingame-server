import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { WoocommerceService } from 'src/woocommerce.service';

@Injectable()
export class ProductsService {
  constructor(private readonly WoocommerceService: WoocommerceService) {}

  async indexProducts(query: any) {
    try {
      const { data: products, headers } =
        await this.WoocommerceService.getProducts(query);
      return { products, headers };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findProduct(query: any) {
    try {
      const { data: product } = await this.WoocommerceService.getProducts(
        query,
      );

      if (product.length === 0) {
        throw new HttpException('product not found', 404);
      }

      return product[0];
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.WoocommerceService.getProduct(id);

      return product;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
