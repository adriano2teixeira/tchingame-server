import { Request, Response } from "express";
import DokanApi from "../utils/Dokan";

class StoresController {
  async getStores(request: Request, response: Response) {
    try {
      const { data } = await DokanApi.get("/stores");
      return response.json(data.filter((store) => store.enabled === true));
    } catch (error) {
      response.status(error.status).json({ error: error.message });
    }
  }

  async getOne(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { data } = await DokanApi.get(`/stores/${id}`);
      return response.json(data);
    } catch (error) {
      response.status(error.status).json({ error: error.message });
    }
  }

  async storeProducts(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { data } = await DokanApi.get(`/stores/${id}/products`);
      return response.json(
        data.filter((product) => product.status === "publish")
      );
    } catch (error) {
      response.status(error.status).json({ error: error.message });
    }
  }

  async storeProductsCount(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { data } = await DokanApi.get(`/stores/${id}/products`);
      return response.json({
        total: data.filter((product) => product.status === "publish").length,
      });
    } catch (error) {
      response.status(error.status).json({ error: error.message });
    }
  }
}

export default new StoresController();
