"use strict";
exports.__esModule = true;
var bull_1 = require("bull");
var jobs = require("../jobs");
var queues = Object.values(jobs).map(function (job) { return ({
    bull: new bull_1["default"](job.key, 'redis://127.0.0.1:6379'),
    name: job.key,
    handle: job.handle
}); });
exports["default"] = {
    queues: queues,
    add: function (name, data, options) {
        var queue = this.queues.find(function (queue) { return queue.name === name; });
        return queue.bull.add(data, options);
    },
    process: function () {
        return this.queues.forEach(function (queue) {
            queue.bull.process(queue.handle);
            queue.bull.on('failed', function (job, err) {
                console.log('Job failed', queue.name);
                console.log(err);
            });
        });
    }
};
