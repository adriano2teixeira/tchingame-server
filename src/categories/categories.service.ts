import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { WoocommerceService } from 'src/woocommerce.service';
import { Cache } from 'cache-manager';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly woocommerce: WoocommerceService,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async findFeatured() {
    try {
      const fromCache = (await this.cache.get(
        '@categories-featured',
      )) as string;
      if (fromCache) {
        return JSON.parse(fromCache).filter(
          (category) => category.slug !== 'uncategorized',
        );
      }

      const categories = await this.woocommerce.getFeaturedCategories();
      await this.cache.set('@categories-featured', JSON.stringify(categories), {
        ttl: 50000,
      });
      return categories.filter((category) => category.slug !== 'uncategorized');
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(slug: string) {
    try {
      const fromCache = (await this.cache.get('@categories')) as string;
      if (fromCache) {
        let categories = JSON.parse(fromCache);
        let category = categories.find((category) => category.slug === slug);

        if (category) {
          return category;
        }
      }

      const category = await this.woocommerce.getCategoryBySlug(slug);
      return category;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findProductsBySlug(slug: string, query: any) {
    try {
      const fromCache = (await this.cache.get('@categories')) as string;
      if (fromCache) {
        const categories = JSON.parse(fromCache);
        let category = categories.find((category) => category.slug === slug);

        if (category) {
          return await this.woocommerce.getCategoryProducts(category.id, query);
        }
      }

      const categories = await this.woocommerce.getCategories();
      const category = categories.find((category) => category.slug === slug);
      await this.cache.set('@categories', JSON.stringify(categories), {
        ttl: 50000,
      });
      const products = await this.woocommerce.getCategoryProducts(
        category.id,
        query,
      );
      return products;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findProductsById(id: string, query: any) {
    try {
      const products = await this.woocommerce.getCategoryProducts(
        id,
        query,
      );
      return products;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
