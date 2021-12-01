import { Request, Response } from "express";
import Woocommerce from "../utils/woocommerce";
import Cache from "../modules/cache";

class ProductController {
  cache: any;

  constructor(Cache: any) {
    this.cache = Cache;
  }

  async index(request: Request, response: Response) {
    try {
      const queries = request.query;
      let query_params = "";

      for (let query in queries) {
        query_params += `${query}=${queries[query]}&&`;
      }

      const { data } = await Woocommerce.get(`products?${query_params}`);
      return response.json(
        data.filter((product) => product.status === "publish")
      );
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async findOneBySlug(request: Request, response: Response) {
    try {
      const { slug } = request.params;
      const { data } = await Woocommerce.get(`products?slug=${slug}`);
      const products = data.filter((product) => product.status === "publish");

      if (products[0]) {
        return response.json(products[0]);
      }

      return response
        .status(404)
        .json({ code: 404, msg: "product not found!" });
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async featuredProducts(request: Request, response: Response) {
    try {
      const queries = request.query;
      let query_params = "";

      for (let query in queries) {
        query_params += `${query}=${queries[query]}&&`;
      }

      const { data } = await Woocommerce.get(`products?${query_params}&&per_page=3`);
      return response.json(
        data.filter((product) => product.status === "publish")
      );
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }
}

export default new ProductController(Cache);
