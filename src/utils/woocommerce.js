"use strict";
exports.__esModule = true;
var woocommerce_rest_api_1 = require("@woocommerce/woocommerce-rest-api");
var api = new woocommerce_rest_api_1["default"]({
    url: "https://tchingame.com",
    consumerKey: "ck_834fdc3f67d2ffc40f61d8f53c172874a12064a2",
    consumerSecret: "cs_23fd3d5a902354fe2cb32555f3379f7fe6cfe23a",
    version: "wc/v3"
});
exports["default"] = api;
