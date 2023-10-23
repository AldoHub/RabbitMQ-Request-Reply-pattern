const config = require("../config");

class Producer {
    channel;
    replyQueueName;

    constructor(channel, replyQueueName){
        this.channel = channel;
        this.replyQueueName = replyQueueName;
    }

    async produceMessages(data){
        const uuid = Date.now() ;
        console.log("UUID is: ", uuid);
        this.channel.sendToQueue(config.rabbitMQ.queues.rpcQueue, Buffer.from(JSON.stringify(data)),{
            replyTo: this.replyQueueName,
            correlationId: uuid.toString()
        });
    }


}

module.exports = Producer;