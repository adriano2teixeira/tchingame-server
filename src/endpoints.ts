import { Router, Request, Response } from "express";
import ProductController from "./controller/ProductController";
import CategoryController from "./controller/CategoryController";
import VoucherController from "./controller/VoucherController";
import UserController from "./controller/UserController";

const routes = Router();

routes.get("/", (req: Request, res: Response) => res.send("Hello World"));

/**
 * Product endpoints
 */
routes.get("/products", ProductController.index);
routes.get("/products/:slug", ProductController.findOneBySlug);
routes.get("/products/filter/featured", ProductController.featuredProducts)

// Category endpoints
routes.get("/categories", CategoryController.index);
routes.get("/categories/:slug", CategoryController.findOne);
routes.get("/categories/:id/products", CategoryController.findCategoryProducts);
routes.get("/featured/categories", CategoryController.featured);

// Voucher endpoints
routes.get("/vouchers", VoucherController.index);
routes.post("/vouchers", VoucherController.generate);
routes.get("/vouchers/users/:id", VoucherController.findMy)

// User endpoints
routes.post("/users", UserController.create);
routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.findOne);
routes.put("/users/:id", UserController.updateOne);

export default routes;
