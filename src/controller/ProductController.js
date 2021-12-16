"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var woocommerce_1 = require("../utils/woocommerce");
var cache_1 = require("../modules/cache");
var axios_1 = require("axios");
var ProductController = /** @class */ (function () {
    function ProductController(Cache) {
        this.cache = Cache;
    }
    ProductController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var queries, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queries = request.query;
                        queries.consumer_key = "ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2";
                        queries.consumer_secret = "cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a";
                        return [4 /*yield*/, axios_1["default"].get("https://tchingame.com/wp-json/wc/v3/products", {
                                params: queries
                            })];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, response.json(data.filter(function (product) { return product.status === "publish"; }))];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_1.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.findOneBySlug = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var slug, data, products, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        slug = request.params.slug;
                        return [4 /*yield*/, woocommerce_1["default"].get("products?slug=" + slug)];
                    case 1:
                        data = (_a.sent()).data;
                        products = data.filter(function (product) { return product.status === "publish"; });
                        if (products[0]) {
                            return [2 /*return*/, response.json(products[0])];
                        }
                        return [2 /*return*/, response
                                .status(404)
                                .json({ code: 404, msg: "product not found!" })];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_2.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.featuredProducts = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var queries, query_params, query, data, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        queries = request.query;
                        query_params = "";
                        for (query in queries) {
                            query_params += query + "=" + queries[query] + "&&";
                        }
                        return [4 /*yield*/, woocommerce_1["default"].get("products?" + query_params + "&&per_page=3")];
                    case 1:
                        data = (_a.sent()).data;
                        return [2 /*return*/, response.json(data.filter(function (product) { return product.status === "publish" && product.featured === true; }))];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.count = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var queries, _a, data, axioRequest, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        queries = request.query;
                        console.log(queries);
                        queries.consumer_key = "ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2";
                        queries.consumer_secret = "cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a";
                        return [4 /*yield*/, axios_1["default"].get("https://tchingame.com/wp-json/wc/v3/products", {
                                params: queries
                            })];
                    case 1:
                        _a = _b.sent(), data = _a.data, axioRequest = _a.request;
                        return [2 /*return*/, response.json({
                                total: data.filter(function (product) { return product.status === "publish"; }).length
                            })];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_4.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports["default"] = new ProductController(cache_1["default"]);
