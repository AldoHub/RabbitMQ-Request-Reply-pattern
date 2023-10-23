class Consumer {

    channel;
    replyQueueName;

    constructor(channel, replyQueueName){
        this.channel = channel;
        this.replyQueueName = replyQueueName;
    }

    async consumeMessages(){
       
        console.log("Ready to consume messages");
        this.channel.consume(this.replyQueueName, (message) => {
            console.log("the reply is: ", message.content.toString());
        },{
            noAck: true
        })

    }

}

module.exports = Consumer;