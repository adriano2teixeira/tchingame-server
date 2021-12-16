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
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    CategoryController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var fromCache, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, cache_1["default"].get("categories")];
                    case 1:
                        fromCache = _a.sent();
                        if (fromCache) {
                            return [2 /*return*/, response.json(JSON.parse(fromCache))];
                        }
                        return [4 /*yield*/, woocommerce_1["default"].get("products/categories").then(function (products) {
                                cache_1["default"].add("categories", JSON.stringify(products.data));
                                return response.json(products.data.filter(function (product) { return product.slug !== "uncategorized"; }));
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.findOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var slug_1, fromCache, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        slug_1 = request.params.slug;
                        return [4 /*yield*/, cache_1["default"].get("categories")];
                    case 1:
                        fromCache = _a.sent();
                        if (fromCache) {
                            return [2 /*return*/, response.json(JSON.parse(fromCache).find(function (category) { return category.slug === slug_1; }))];
                        }
                        return [4 /*yield*/, woocommerce_1["default"].get("products/categories").then(function (products) {
                                cache_1["default"].add("categories", JSON.stringify(products.data));
                                return response.json(products.data.find(function (category) { return category.slug === slug_1; }));
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_2.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.findCategoryProducts = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = request.params.id;
                        return [4 /*yield*/, woocommerce_1["default"].get("products?category=" + id).then(function (products) {
                                return response.json(products.data);
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_3.message })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.featured = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var fromCache, data, featured_categories, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, cache_1["default"].get("featured_categories")];
                    case 1:
                        fromCache = _a.sent();
                        if (fromCache) {
                            return [2 /*return*/, response.json(JSON.parse(fromCache))];
                        }
                        return [4 /*yield*/, woocommerce_1["default"].get("products/categories")];
                    case 2:
                        data = (_a.sent()).data;
                        featured_categories = data.filter(function (category) { return category.count > 0; });
                        return [4 /*yield*/, cache_1["default"].add("featured_categories", JSON.stringify(featured_categories))];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, response.json(featured_categories)];
                    case 4:
                        error_4 = _a.sent();
                        return [2 /*return*/, response.status(500).json({ code: 500, msg: error_4.message })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return CategoryController;
}());
exports["default"] = new CategoryController();
