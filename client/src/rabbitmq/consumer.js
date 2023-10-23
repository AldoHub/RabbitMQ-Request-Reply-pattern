class Consumer {

    channel;
    replyQueueName;
    eventEmitter;

    constructor(channel, replyQueueName, eventEmitter){
        this.channel = channel;
        this.replyQueueName = replyQueueName;
        this.eventEmitter = eventEmitter;
    }

    async consumeMessages(){
       
        console.log("Ready to consume messages");
        this.channel.consume(this.replyQueueName, (message) => {
            console.log("the reply is: ", message.content.toString());
            //use the correlationId that is being passed by
            this.eventEmitter.emit(message.properties.correlationId, message)
        },{
            noAck: true
        })

    }

}

module.exports = Consumer;