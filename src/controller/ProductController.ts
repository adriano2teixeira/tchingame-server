import { Request, Response } from "express";
import Woocommerce from "../utils/woocommerce";
import Cache from "../modules/cache";
import axios from "axios";

class ProductController {
  cache: any;

  constructor(Cache: any) {
    this.cache = Cache;
  }

  async index(request: Request, response: Response) {
    try {
      const queries = request.query;
      queries.consumer_key = "ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2";
      queries.consumer_secret = "cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a";

      const { data } = await axios.get(
        "https://tchingame.com/wp-json/wc/v3/products",
        {
          params: queries,
        }
      );
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

      const { data } = await Woocommerce.get(
        `products?${query_params}&&per_page=3`
      );
      return response.json(
        data.filter(
          (product) => product.status === "publish" && product.featured === true
        )
      );
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async count(request: Request, response: Response) {
    try {
      const queries = request.query;
      console.log(queries)
      queries.consumer_key = "ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2";
      queries.consumer_secret = "cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a";

      const { data, request: axioRequest } = await axios.get(
        "https://tchingame.com/wp-json/wc/v3/products",
        {
          params: queries,
        }
      );
      return response.json({
        total: data.filter((product) => product.status === "publish").length,
      });
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }
}

export default new ProductController(Cache);
