import { CacheModule, Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import * as redisStore from 'cache-manager-redis-store';
import { WoocommerceService } from 'src/woocommerce.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    CacheModule.register<{ store: string; host: string; port: number }>({
      store: redisStore,
      // Store-specific configuration:
      host: 'localhost',
      port: 6379,
    }),
    HttpModule.register({
      baseURL: 'https://tchingame.com/wp-json/wc/v3/',
      params: {
        consumer_key: 'ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2',
        consumer_secret: 'cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a',
      },
    }),
  ],
  providers: [CategoriesService, WoocommerceService, PrismaService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
