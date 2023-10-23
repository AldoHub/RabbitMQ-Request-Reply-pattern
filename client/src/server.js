const express = require("express");
const bodyParser = require("body-parser");
const RabbitMQInstance= require("./rabbitmq/client");
const server = express();

//--second service
//const service = require("./service2");


server.use(bodyParser.json()); //body parser

server.post("/operate", async(req, res) => {
    //request must be in JSON format -- application/js
    console.log("---->", req.body);
    await RabbitMQInstance.produce(req.body);
    
    //--using multiple services should only use the generated channels, shouldnt create more
    //await service.sendMessage(req.body);
    
});


server.listen(3001, async() => {
    console.log("Server running on port 3001...");
    //start the rabbitmq instance
    RabbitMQInstance.init();    
});