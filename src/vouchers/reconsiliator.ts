import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';

interface iJobDataType {
  voucherId: number;
}

@Processor('voucher-stock-reconsiliation')
export class VoucherReconsiliationConsumer {
  woocommerce: any;
  constructor(private readonly prisma: PrismaService) {
    this.woocommerce = axios.create({
      baseURL: 'https://tchingame.com/wp-json/wc/v3/',
      params: {
        consumer_key: 'ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2',
        consumer_secret: 'cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a',
      },
    });
  }

  @Process()
  async reconsiliate(job: Job<iJobDataType>) {
    const { data } = job;

    const voucher = await this.prisma.voucher.findUnique({
      where: {
        id: data.voucherId,
      },
    });

    if (voucher.status === 'ACTIVE') {
      await this.woocommerce.put('/orders/' + voucher.order_id, {
        status: 'cancelled',
      });

      await this.prisma.voucher.update({
        where: {
          id: data.voucherId,
        },
        data: {
          status: 'EXPIRED',
        },
      });

      const { data: product } = await this.woocommerce.get(
        '/products/' + voucher.product_id,
      );
      await this.woocommerce.put('/products/' + voucher.product_id, {
        stock_quantity: parseInt(product.stock_quantity) + voucher.qty,
      });
    }
  }
}
