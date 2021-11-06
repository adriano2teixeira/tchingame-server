import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const api = new WooCommerceRestApi({
  url: "https://tchingame.com",
  consumerKey: "ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2",
  consumerSecret: "cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a",
  version: "wc/v3",
});

export default api
