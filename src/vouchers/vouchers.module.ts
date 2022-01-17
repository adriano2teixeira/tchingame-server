import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { BullModule } from '@nestjs/bull';
import { HttpModule } from '@nestjs/axios';
import { WoocommerceService } from 'src/woocommerce.service';
import { join } from 'path';
import { VoucherGenerationConsumer } from './generator';
import { VoucherReconsiliationConsumer } from './reconsiliator';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'https://tchingame.com/wp-json/wc/v3/',
      params: {
        consumer_key: 'ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2',
        consumer_secret: 'cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a',
      },
    }),
    BullModule.registerQueue({
      name: 'voucher-generation',
    }),
    BullModule.registerQueue({
      name: 'voucher-stock-reconsiliation',
    }),
  ],
  controllers: [VouchersController],
  providers: [
    VouchersService,
    PrismaService,
    WoocommerceService,
    VoucherGenerationConsumer,
    VoucherReconsiliationConsumer,
  ],
})
export class VouchersModule {}
