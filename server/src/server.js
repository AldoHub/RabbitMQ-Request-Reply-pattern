import amqplib from "amqplib";
import * as config from "./config.js";


//create the connection
const connection = await amqplib.connect(config.default.rabbitMQ.url).catch(err => console.log(err))
const producerChannel = await connection.createChannel();
const consumerChannel = await connection.createChannel();


//assert
const { queue: rpcQueue } = await consumerChannel.assertQueue('rpc_queue', {
    exclusive: true
});

const consumeMessages = async() => {
    console.log("-- Ready to consume messages for replyqueue");

    
    consumerChannel.consume(rpcQueue, async(message) => {
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
        await messageHandler(operation, JSON.parse(message.content.toString()), correlationId, replyTo);

    },{
        noAck: true
    })
}


consumeMessages();


const messageHandler = async (operation, data, correlationId, replyToQueue) => {
    let response = "";
    const {numb1, numb2} = data;

    console.log("The operation is: ", operation);

    //handle the operation
    switch(operation) {
        case "multiply":
            response = numb1 * numb2;
            break;

        case "sum":
            response = numb1 + numb2;
            break;    

        default:
            response = 0;
            break;    
    }

    await produceMessages(response, correlationId, replyToQueue)

}

const produceMessages = async (data, correlationId, replyToQueue) => {
   
    producerChannel.sendToQueue(replyToQueue, Buffer.from(JSON.stringify(data)),{
        correlationId: correlationId
    });
 
   
}