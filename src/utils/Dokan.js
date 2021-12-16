"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var DokanApi = axios_1["default"].create({ baseURL: "https://tchingame.com/wp-json/dokan/v1" });
exports["default"] = DokanApi;
