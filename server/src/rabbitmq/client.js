
import * as Consumer from "./consumer.js";
import * as Producer from "./producer.js";
import amqplib from "amqplib";
import * as config from "../config.js";


//rabbitmqclient singleton
class RabbitMQClient {

    producer;
    consumer;
    connection;
    producerChannel;
    consumerChannel;

    isInitialized = false;
    static instance;

    constructor(){}

    static getInstance(){
        if(!this.instance){
           this.instance = new RabbitMQClient();
        }   

        return this.instance;
    }



    async init(){
        console.log("INIT RABBITMQ CLIENT ON REPLY QUEUE")
        
        if(this.isInitialized){
            console.log(this.isInitialized)
            return;
        }

        //create the connection
        this.connection = await amqplib.connect(config.default.rabbitMQ.url).catch(err => console.log(err));
       /*
        //create the channels
        this.producerChannel = await this.connection.createChannel();
        this.consumerChannel = await this.connection.createChannel();
        //set the name of the queue var to "replyQueueName"
        const { queue: rpcQueue } = await this.consumerChannel.assertQueue('rpc_queue', {
            exclusive: true
        });
       

        //use the producer class
        this.producer = new Producer.default(this.producerChannel)
        //use the consumer class
        this.consumer = new Consumer.default(this.consumerChannel, rpcQueue);
   
        this.consumer.consumeMessages();


        //init
        this.isInitialized = true;
     */
    }


    async produce(data, correlationId, replyToQueue){
    /*
        console.log(this.isInitialized)
        if(!this.isInitialized){
            await this.init();
        }
        return await this.producer.default.produceMessages(data, correlationId, replyToQueue);
        */
    }

    
   
}

//return the singleton instance created
//module.exports = RabbitMQClient.getInstance();
export default RabbitMQClient.getInstance();