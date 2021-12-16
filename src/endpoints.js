"use strict";
exports.__esModule = true;
var express_1 = require("express");
var ProductController_1 = require("./controller/ProductController");
var CategoryController_1 = require("./controller/CategoryController");
var VoucherController_1 = require("./controller/VoucherController");
var UserController_1 = require("./controller/UserController");
var StoresController_1 = require("./controller/StoresController");
var routes = (0, express_1.Router)();
routes.get("/", function (req, res) { return res.send("Hello World"); });
/**
 * Product endpoints
 */
routes.get("/products", ProductController_1["default"].index);
routes.get("/products/:slug", ProductController_1["default"].findOneBySlug);
routes.get("/products/filter/featured", ProductController_1["default"].featuredProducts);
routes.get("/products/filter/count", ProductController_1["default"].count);
// Category endpoints
routes.get("/categories", CategoryController_1["default"].index);
routes.get("/categories/:slug", CategoryController_1["default"].findOne);
routes.get("/categories/:id/products", CategoryController_1["default"].findCategoryProducts);
routes.get("/featured/categories", CategoryController_1["default"].featured);
// Voucher endpoints
routes.get("/vouchers", VoucherController_1["default"].index);
routes.post("/vouchers", VoucherController_1["default"].generate);
routes.get("/vouchers/users/:id", VoucherController_1["default"].findMy);
// User endpoints
routes.post("/users", UserController_1["default"].create);
routes.get("/users", UserController_1["default"].index);
routes.get("/users/:id", UserController_1["default"].findOne);
routes.put("/users/:id", UserController_1["default"].updateOne);
// Stors
routes.get("/stores", StoresController_1["default"].getStores);
routes.get("/stores/:id", StoresController_1["default"].getOne);
routes.get("/stores/:id/products", StoresController_1["default"].storeProducts);
routes.get("/stores/:id/products/count", StoresController_1["default"].storeProductsCount);
exports["default"] = routes;
