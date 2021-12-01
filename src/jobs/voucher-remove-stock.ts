import Product from "../utils/Product";

export default {
  key: "VoucherRemoveStock",

  async handle({ data }) {
    const { productId, stock, units } = data;
    const removedFromStock = await Product.removeStock(productId, stock, units);

    if (!removedFromStock) {
      console.log(
        "============ something went wrong while trying to update product sock ==========="
      );
    }
  },
};
