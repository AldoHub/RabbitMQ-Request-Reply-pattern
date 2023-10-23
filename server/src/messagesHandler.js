//const RabbitMQInstance= require("./rabbitmq/client");
/*
import * as rabbitMQ from "./rabbitmq/client.js";

//handle msessages
class MessageHandler {
    static async handle(operation, data, correlationId, replyToQueue){
        //set the response
        let response = {};
        const {numb1, numb2} = data;

        console.log("The operation is: ", operation);

        //handle the operation
        switch(operation) {
            case "multiply":
                response: numb1 * numb2;
                break;

            case "sum":
                response: numb1 + numb2;
                break;    

            default:
                response = 0;
                break;    
        }

     

        //produce the response to send to the client
        //await RabbitMQInstance.default.produce(data);
        await rabbitMQ.default.produce(data);
       
    }
   
}


export default MessageHandler;
*/