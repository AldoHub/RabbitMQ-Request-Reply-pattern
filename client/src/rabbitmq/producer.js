const config = require("../config");

class Producer {
    channel;
    replyQueueName;
    eventEmitter;

    constructor(channel, replyQueueName,eventEmitter ){
        this.channel = channel;
        this.replyQueueName = replyQueueName;
        this.eventEmitter = eventEmitter;
    }

    async produceMessages(data){
        //console.log("______>", data)
        const uuid = Date.now() ;
        console.log("UUID is: ", uuid, "Queue: ", config.rabbitMQ.queues.rpcQueue);
        this.channel.sendToQueue(config.rabbitMQ.queues.rpcQueue, Buffer.from(JSON.stringify(data)),{
            replyTo: this.replyQueueName,
            correlationId: uuid.toString(),
            headers: {
                function: data.operation
            }
        });


        //wait for the response - event name is the correlationId = uuid
        //this data will be returned to the frontend
        return new Promise((resolve, reject) => {
            //wait for the emiter to resolve
            this.eventEmitter.once(uuid, async(msg) => {
                //console.log(JSON.parse(msg.content.toString()));
                const reply =  JSON.parse(msg.content.toString());
                resolve(reply);
            });
        })
        
    }


}

module.exports = Producer;