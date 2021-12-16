"use strict";
exports.__esModule = true;
var express_1 = require("express");
var endpoints_1 = require("./endpoints");
var cors_1 = require("cors");
var body_parser_1 = require("body-parser");
// import "./amq/receiver"
// import "./amq/sender"
//import "../src/queue"
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(body_parser_1["default"].json());
app.use(endpoints_1["default"]);
exports["default"] = app;
