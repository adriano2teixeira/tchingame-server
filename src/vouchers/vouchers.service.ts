import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { WoocommerceService } from 'src/woocommerce.service';

@Injectable()
export class VouchersService {
  constructor(
    private readonly prisma: PrismaService,
    @InjectQueue('voucher-generation') private voucherGenerationQueue: Queue,
    private readonly woocommerceService: WoocommerceService,
  ) {}

  async create(data: any) {
    try {
      const product = await this.woocommerceService.getProduct(data.product_id);

      if (!product) {
        return {
          status: 404,
          code: 'prduct-not-found',
          message: 'O producto não está mais disponível em loja.',
        };
      }

      if (product.stock_quantity < parseInt(data.qty)) {
        return {
          status: 400,
          code: 'low-stock',
          message:
            'O producto não tem unidades suficiente disponíveis em loja.',
        };
      }

      data.product_name = product.name;
      data.store_id = product.store.id;
      data.store_name = product.store.name;
      data.sellPrice =
        parseFloat(product.sale_price) || parseFloat(product.regular_price);
      data.productPrice = parseFloat(product.regular_price);
      data.total = product.price * data.qty;

      const voucher = await this.prisma.voucher.create({
        data,
      });
      await this.woocommerceService.updateProduct(data.product_id, {
        stock_quantity: product.stock_quantity - parseInt(data.qty),
      });
      this.voucherGenerationQueue.add({
        voucherId: voucher.id,
        productId: product.id,
        voucherExpiresIn: product.acf.voucher_expiration_time,
        unitsQty: data.qty
      });
      return voucher;
    } catch (error) {
      throw new HttpException(error.messgae, error.status);
    }
  }

  async findUserVouchers(userId: string) {
    try {
      return await this.prisma.voucher.findMany({
        where: {
          userUid: userId,
        },
      });
    } catch (error) {
      throw new HttpException(error.messgae, error.status);
    }
  }

  async findOne(orderId: any) {
    try {
      return await this.prisma.voucher.findUnique({
        where: {
          order_id: orderId,
        },
      });
    } catch (error) {
      throw new HttpException(error.messgae, error.status);
    }
  }
}
