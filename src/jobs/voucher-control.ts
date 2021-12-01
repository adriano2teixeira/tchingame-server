import Queue from "../modules/Queue";
import Product from "../utils/Product";
import Woocommerce from "../utils/woocommerce";
import { PrismaClient } from "@prisma/client";

async function getOrder(orderId: number) {
  try {
    const { data } = await Woocommerce.get(`orders/${orderId}`);
    return { success: true, data };
  } catch (error) {
    console.log(error.message);
    return { success: false, data: error.message };
  }
}

export default {
  key: "VoucherControl",

  async handle({ data }) {
    const { order_id: orderId } = data;

    const { success, data: orderData } = await getOrder(orderId);
    if (success) {
      if (orderData.status === "pending") {
        const { data: product } = await Woocommerce.get(
          `products/${orderData.line_items[0].product_id}`
        );
        await Woocommerce.put(
          `products/${orderData.line_items[0].product_id}`,
          {
            stock_quantity:
              Number(product.stock_quantity) +
              Number(orderData.line_items[0].quantity),
          }
        );

        await Woocommerce.put(`orders/${orderId}`, { status: "cancelled" });
      }
    }
  },
};
