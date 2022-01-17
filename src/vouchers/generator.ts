import { Processor, Process } from '@nestjs/bull';
import { Job, Queue } from 'bull';
import axios from 'axios';
import { PrismaService } from 'src/prisma.service';
import { InjectQueue } from '@nestjs/bull';

interface iJobDataType {
  productId: number;
  voucherId: number;
  voucherExpireIn: number;
  unitsQty: number;
}

@Processor('voucher-generation')
export class VoucherGenerationConsumer {
  woocommerce: any;
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('voucher-stock-reconsiliation') private stockQueue: Queue,
  ) {
    this.woocommerce = axios.create({
      baseURL: 'https://tchingame.com/wp-json/wc/v3/',
      params: {
        consumer_key: 'ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2',
        consumer_secret: 'cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a',
      },
    });
  }

  @Process()
  async generate(job: Job<iJobDataType>) {
    const { data } = job;

    // Creating order on Wordpress
    const { data: order } = await this.woocommerce.post('/orders', {
      payment_method: 'bacs',
      payment_method_title: 'Cache and Carry',
      set_paid: false,
      status: 'pending',
      line_items: [
        {
          product_id: data.productId,
          quantity: data.unitsQty,
        },
      ],
    });

    // Updating the status of the voucher in our local database
    await this.prisma.voucher.update({
      where: {
        id: data.voucherId,
      },
      data: {
        status: 'ACTIVE',
        reference: `#TCH${order.id}`,
        order_id: order.id,
      },
    });

    this.stockQueue.add({ voucherId: data.voucherId }, { delay: 120000  })
  }
}
