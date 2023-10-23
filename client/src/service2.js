const RabbitMQInstance = require("./rabbitmq/client");

const sendMessage = async(data) => {
    console.log("SENDING MESsAGE FROM SERVICE 2");
    await RabbitMQInstance.produce(data);
}

module.exports = {
    sendMessage
}