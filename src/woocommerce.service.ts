import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WoocommerceService {
  constructor(private httpService: HttpService) {}

  async getProducts(params: object) {
    const { data, headers } = await this.httpService
      .get('products?per_page=20', {
        params: params,
      })
      .toPromise();

    return { data, headers };
  }

  async getProduct(id: number) {
    const { data } = await this.httpService.get('products/' + id).toPromise();
    return data;
  }

  async getFeaturedCategories() {
    const { data } = await this.httpService
      .get('products/categories?display=default')
      .toPromise();
    return data.filter((category) => category.display === 'default');
  }

  async getCategories() {
    const { data } = await this.httpService
      .get('products/categories')
      .toPromise();
    return data;
  }

  async getCategoryProducts(id: any, query: any) {
    const { data, headers } = await this.httpService
      .get(`products?category=${id}`, {
        params: query,
      })
      .toPromise();
    return {
      products: data.filter((product) => product.status === 'publish'),
      headers,
    };
  }

  async getCategoryBySlug(slug) {
    const { data } = await this.httpService
      .get(`products/categories`)
      .toPromise();
    return data.find((category) => category.slug === slug);
  }

  async updateProduct(productId: number, body: any) {
    const { data } = await this.httpService
    .put(`products/${productId}`, body)
    .toPromise();
    return data
  }
  
}
