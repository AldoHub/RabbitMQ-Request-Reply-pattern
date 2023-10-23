

class Producer {
    channel;
  
    constructor(channel){
        this.channel = channel;
    }

    async produceMessages(data, correlationId, replyToQueue){
        //send the message to whatever queue is passing as prop
        this.channel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)),{
            correlationId: correlationId
        });
    }


}

//module.exports = Producer;
export default Producer;
