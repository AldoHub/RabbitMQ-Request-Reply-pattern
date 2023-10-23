
//const MessageHandler = require("../messagesHandler");

import * as MessageHandler from "../messagesHandler.js";


class Consumer {

    channel;
    rpcQueue;

    // we will consume the rpcqueue
    constructor(channel, rpcQueue){
        this.channel = channel;
        this.rpcQueue = rpcQueue;
    }

    async consumeMessages(){
       
        console.log("-- Ready to consume messages for replyqueue");
        //receive the rpcQueue messages
       
        this.channel.consume(this.rpcQueue, async(message) => {
            //make sure the message contains replyTo and correlationId - to know where to send it
            console.log("the reply is: ", message.content.toString());
            const {correlationId, replyTo} = message.properties;
            
            //add a new "function" property to the message headers
            const operation = message.properties.headers.function;


            if(!correlationId || !replyTo){
                console.log("Missing required fields...");
            }

            //the content cointains the Buffer
            console.log("Consumed message: ", JSON.parse(message.content.toString()));
           
            
         
            //handle messages / process the result
            //await MessageHandler.default.handle(operation, JSON.parse(message.content.toString()), correlationId, replyTo);
            //await MessageHandler.sendMessage(operation, JSON.parse(message.content.toString()), correlationId, replyTo);

        },{
            noAck: true
        })
            
    }

}

//module.exports = Consumer;
export default Consumer;
