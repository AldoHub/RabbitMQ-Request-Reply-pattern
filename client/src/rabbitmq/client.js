const Consumer = require("./consumer");
const Producer = require("./producer")
const amqplib = require("amqplib");
const config = require("../config");
const eventEmitter = require("events");


//rabbitmqclient singleton
class RabbitMQClient {

    producer;
    consumer;
    connection;
    producerChannel;
    consumerChannel;

    isInitialized = false;
    static instance;
    eventEmitter;

    constructor(){}

    static getInstance(){
        if(!this.instance){
           this.instance = new RabbitMQClient();
        }   

        return this.instance;
    }



    async init(){
        console.log("INIT RABBITMQ CLIENT")
        
        if(this.isInitialized){
            console.log(this.isInitialized)
            return;
        }

        //create the connection
        this.connection = await amqplib.connect(config.rabbitMQ.url).catch(err => console.log(err));
        
        //create the channels
        this.producerChannel = await this.connection.createChannel();
        this.consumerChannel = await this.connection.createChannel();
        //set the name of the queue var to "replyQueueName"
        const { queue: replyQueueName } = await this.consumerChannel.assertQueue('', {
            exclusive: true
        });
        
        //init the eventEmitter
        this.eventEmitter = new eventEmitter.EventEmitter();
        //use the producer class
        this.producer = new Producer(this.producerChannel, replyQueueName, this.eventEmitter)
        //use the consumer class
        this.consumer = new Consumer(this.consumerChannel, replyQueueName, this.eventEmitter);
   
        this.consumer.consumeMessages();


        //init
        this.isInitialized = true;
    
    }


    async produce(data){
        console.log(this.isInitialized)
        if(!this.isInitialized){
            await this.init();
        }
        return await this.producer.produceMessages(data);
    }

    
   
}

//return the singleton instance created
module.exports = RabbitMQClient.getInstance();
