import * as amqp from "amqplib/callback_api";

amqp.connect("amqp://localhost", function (connectionError, connection) {
  if (connectionError) {
    console.log(connectionError);
  }

  connection.createChannel(function (channelCreationError, channel) {
    var queue = "hello";
    var msg = "Hello world";

    channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(msg));
    console.log(" [x] Sent %s", msg);

    setTimeout(function () {
      connection.close();
      process.exit(0);
    }, 500);
  });
});
