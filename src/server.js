"use strict";
exports.__esModule = true;
var app_1 = require("./app");
app_1["default"].listen(process.env.PORT || 3001, function () {
    console.log("Server running at : http://localhost:3001");
});
