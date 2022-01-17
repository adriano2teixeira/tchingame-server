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
  try {
    const { id: VoucherId } = job.data;


    // Creating order on Wordpress
    const { data: order } = await woocommerceApi.post('/orders', {
      payment_method: 'bacs',
      payment_method_title: 'Cache and Carry',
      set_paid: false,
      status: "pending",
      line_items: [
        {
          product_id: job.data.product_id,
          quantity: job.data.qty,
        },
      ],
    });

    // Getting the product from woocommerce -> as it is the single source of truth
    const { data: product } = await woocommerceApi.get('/products/' + job.data.product_id);
    
    // Decreasing the amount of units available as a reservation strategy
     await woocommerceApi.put('/products/' + job.data.product_id, {
      stock_quantity: parseInt(product.stock_quantity) - parseInt(job.data.qty),
    });
  
    // Updating the status of the voucher in our local database
    await prisma.voucher.update({
      where: {
        id: VoucherId,
      },
      data: {
        status: 'ACTIVE',
        reference: `#TCH${order.id}`,
        order_id: order.id,
      },
    });
  
    cb(null, 'Voucher Generated');
  } catch (error) {
    
  }
 
}
