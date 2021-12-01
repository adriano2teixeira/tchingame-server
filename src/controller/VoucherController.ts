import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { WooOrder } from "../utils/WooOrder";
import crypto from "crypto-promise";
import Queue from "../modules/Queue";
import Product from "../utils/Product";

const WooOrderUtil = new WooOrder();

const prisma = new PrismaClient();

interface iGeneration {
  product_id: number;
  store_id: number;
  product_name: string;
  store_name: string;
  qty: number;
  order_id: number;
  reference: number;
}

class VoucherController {
  async index(request: Request, response: Response) {
    try {
      const data = request.body;
      const vouchers = await prisma.voucher.findMany();
      return response.json(vouchers);
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async findMy(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const vouchers = await prisma.voucher.findMany({
        where: { ownerId: Number(id) },
      });
      return response.json(vouchers);
    } catch (error) {
      console.log(error.message)
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async generate(request: Request, response: Response) {
    try {
      const data: any = request.body;
      // Check product
      const { success, expiresIn, stock, error } = await Product.checkProduct(
        data.product_id
      );

      if (!success) {
        console.log(error);
        return response.status(400).json({ error: "Alguma coisa correu mal " });
      }

      // Create the order on wordpress
      const { order } = await WooOrderUtil.create([
        { product_id: data.product_id, quantity: data.qty },
      ]);

      data.order_id = order.id;

      const hash = await crypto.randomBytes(2);
      let reference = hash.toString("hex");
      data.reference = `TCH${reference}`;

      const voucher = await prisma.voucher.create({ data });

      Queue.add(
        "VoucherRemoveStock",
        {
          productId: data.product_id,
          stock: Number(stock),
          units: Number(data.qty),
        },
        {}
      );
      // divide the days by 3600000 to get miliseconds
      Queue.add("VoucherControl", voucher, { delay: 30000 });

      return response.json(voucher);
    } catch (error) {
      console.log(error.message);
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }
}

export default new VoucherController();
