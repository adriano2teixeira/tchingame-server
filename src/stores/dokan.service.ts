import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DokanService {
  constructor(private httpService: HttpService) {}

  async getStores(params: object) {
    const { data, headers } = await this.httpService
      .get('stores', {
        params: params,
      })
      .toPromise();
    return {
      data: data.filter((store: any) => store.enabled === true),
      headers: headers,
    };
  }

  async findOneByUrlName(slug: string) {
    const stores = await this.getStores({});
    const store = stores.data.find(
      (store: any) => store.shop_url.split('/')[3] === slug,
    );
    return store;
  }

  async findOneById(id: any) {
    const { data } = await this.httpService.get('stores/' + id).toPromise();
    return data;
  }

  async findProducts(storeId: any) {
    const { data, headers } = await this.httpService
      .get('stores/' + storeId + '/products')
      .toPromise();
    return {
      data: data.filter(
        (product: any) =>
          product.in_stock === true && product.status === 'publish',
      ),
      headers,
    };
  }
}
