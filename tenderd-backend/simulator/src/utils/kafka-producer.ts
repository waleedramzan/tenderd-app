import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "tenderd-iot-app",
  brokers: ["kafka1:19092"]
});
const topics = ["vehicle-info"];

const producer = kafka.producer();

export async function connectProducer() {
  await producer.connect();
  console.log("Producer connected");
}

export async function sendMessage(topic: typeof topics[number], message: any) {
  return producer.send({
    topic,
    messages: [{ value: message }],
  });
}
