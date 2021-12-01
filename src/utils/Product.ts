import Woocommerce from "../utils/woocommerce";

class Product {
  // Check product for voucher generation
  async checkProduct(productId: any) {
    try {
      const { data: product } = await Woocommerce.get(`products/${productId}`);
      if (product.stock_quantity > 0) {
        return {
          success: true,
          expiresIn: product.acf.voucher_expiration_time,
          stock: product.stock_quantity
        };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async removeStock(productId: number, stock: number, units: number) {
    try {
      await Woocommerce.put(`products/${productId}`, {
        stock_quantity: (stock - units),
      });
      return true;
    } catch (error) {
      console.log(error.message)
      return false;
    }
  }

  async addStock(productId: number, stock: number, units: number) {
    try {
      await Woocommerce.put(`products/${productId}`, {
        stock_quantity: (stock + units),
      });
      return true;
    } catch (error) {
      console.log(error.message)
      return false;
    }
  }
}

export default new Product();
