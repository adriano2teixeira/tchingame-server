import { Request, Response } from "express";
import Woocommerce from "../utils/woocommerce";
import Cache from "../modules/cache";

class CategoryController {
  async index(request: Request, response: Response) {
    try {
      const fromCache: any = await Cache.get("categories");
      if (fromCache) {
        return response.json(JSON.parse(fromCache));
      }

      await Woocommerce.get("products/categories").then((products: any) => {
        Cache.add("categories", JSON.stringify(products.data));
        return response.json(products.data.filter(product => product.slug !== "uncategorized"));
      });
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async findOne(request: Request, response: Response) {
    try {
      const { slug } = request.params;
      const fromCache: any = await Cache.get("categories");
      if (fromCache) {
        return response.json(
          JSON.parse(fromCache).find((category) => category.slug === slug)
        );
      }

      await Woocommerce.get("products/categories").then((products: any) => {
        Cache.add("categories", JSON.stringify(products.data));
        return response.json(
          products.data.find((category) => category.slug === slug)
        );
      });
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async findCategoryProducts(request: Request, response: Response) {
    try {
      const { id } = request.params;

      await Woocommerce.get(`products?category=${id}`).then((products: any) => {
        return response.json(products.data);
      });
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }

  async featured(request: Request, response: Response) {
    try {
      const fromCache: any = await Cache.get("featured_categories");
      if (fromCache) {
        return response.json(JSON.parse(fromCache));
      }

      const { data } = await Woocommerce.get("products/categories");
      const featured_categories = data.filter(
        (category: any) => category.count > 0
      );
      await Cache.add(
        "featured_categories",
        JSON.stringify(featured_categories)
      );
      return response.json(featured_categories);
    } catch (error) {
      return response.status(500).json({ code: 500, msg: error.message });
    }
  }
}

export default new CategoryController();
