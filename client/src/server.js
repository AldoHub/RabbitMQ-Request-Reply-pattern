const express = require("express");
const bodyParser = require("body-parser");
const RabbitMQInstance= require("./rabbitmq/client");
const server = express();

//--second service
//const service = require("./service2");

server.use(bodyParser.json()); //body parser



//--- FRONTEND WILL REACH THIS ENDPOINT AND THE REQUEST-REPLY PATTERN WILL PROCESS THE DATA AND RETURN IT


server.post("/operate", async(req, res) => {
    //request must be in JSON format -- application/js
    console.log("---->", req.body);
    
    //return the request-reply data processed by the microservices
    const response = await RabbitMQInstance.produce(req.body);
    console.log("RESPONSE: ", response);
    res.status(200).send({response});
    
});

server.listen(3001, async() => {
    console.log("Server running on port 3001...");
    //start the rabbitmq instance
    RabbitMQInstance.init();    
});