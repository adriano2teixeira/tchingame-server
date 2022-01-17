import {
  HttpException,
  Injectable,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { DokanService } from './dokan.service';
import { Cache } from 'cache-manager';

@Injectable()
export class StoresService {
  constructor(
    private readonly dokanService: DokanService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async indexStores(params: any) {
    try {
      const stores = await this.dokanService.getStores(params);
      return stores;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(slug: string) {
    try {
      let chachedStore = (await this.cache.get(`@store-${slug}`)) as string;

      if (chachedStore) {
        return JSON.parse(chachedStore);
      }

      const cacheId = await this.cache.get(`@store-${slug}-id`);

      if (cacheId) {
        const store = this.dokanService.findOneById(cacheId);
        return store;
      }

      const store = await this.dokanService.findOneByUrlName(slug);
      await this.cache.set(`@store-${slug}-id`, store.id);
      await this.cache.set(`@store-${slug}`, JSON.stringify(store), {
        ttl: 5000,
      });
      return store;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findProducts(slug: string) {
    try {
      let fromCache = await this.cache.get(`@store-${slug}-id`);

      if (fromCache) {
        const products = await this.dokanService.findProducts(fromCache);
        return products;
      }

      const store = await this.dokanService.findOneByUrlName(slug);
      await this.cache.set(`@store-${slug}-id`, store.id, { ttl: 10000000})
      const products = await this.dokanService.findProducts(store.id);
      return products;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
