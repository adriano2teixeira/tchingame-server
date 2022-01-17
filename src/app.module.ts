import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { WoocommerceService } from './woocommerce.service';
import { BullModule } from '@nestjs/bull';
import { VouchersModule } from './vouchers/vouchers.module';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://tchingame.com/wp-json/wc/v3/',
      params: {
        consumer_key: 'ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2',
        consumer_secret: 'cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a',
      },
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ProductsModule,
    StoresModule,
    VouchersModule,
    CategoriesModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, WoocommerceService, PrismaService, UserService],
})
export class AppModule {}
