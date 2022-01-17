import { Job, DoneCallback } from 'bull';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();
const woocommerceApi = axios.create({
  baseURL: 'https://tchingame.com/wp-json/wc/v3/',
  params: {
    consumer_key: 'ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2',
    consumer_secret: 'cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a',
  },
});

export default async function (job: Job, cb: DoneCallback) {
  const { id: VoucherId } = job.data;

  const voucher = await prisma.voucher.findUnique({
    where: {
      id: VoucherId,
    },
  });

  if (voucher.status === 'ACTIVE') {
    await woocommerceApi.put('/orders/' + voucher.order_id, {
      status: 'cancelled',
    });
    await prisma.voucher.update({
      where: {
        id: VoucherId,
      },
      data: {
        status: 'EXPIRED',
      },
    });
 
    const { data: product } = await woocommerceApi.get('/products/' + voucher.product_id);
    await woocommerceApi.put('/products/' + voucher.product_id, {
        stock_quantity: parseInt(product.stock_quantity) + voucher.qty,
    });
    cb(null, 'Stock Reconsiliated');
  }
}
