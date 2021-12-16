"use strict";
exports.__esModule = true;
var redis = require("redis");
var client = redis.createClient();
client.on("error", function (error) {
    console.error(error);
});
exports["default"] = client;
