import { Kafka } from "kafkajs";
import VehicleClass from "../classes/VehicleClass";

const topics = ["vehicle-info"];

const kafka = new Kafka({
  clientId: "tenderd-iot-service",
  brokers: ["kafka1:19092"]
});

const consumer = kafka.consumer({
  groupId: "tenderd-iot-service",
});

export async function connectConsumer() {
  const vehicleIns = new VehicleClass(); 
  await consumer.connect();
  console.log("Connected to consumer");

  for (let i = 0; i < topics.length; i++) {
    await consumer.subscribe({
      topic: topics[i],
      fromBeginning: true,
    });
  }

  await consumer.run({
    eachBatchAutoResolve: false,
    eachBatch: async ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => {
      const vehicleInfoList = [];
      for (let message of batch.messages) {
        if (!isRunning() || isStale()) break
        const _message = JSON.parse((message as any).value?.toString());
        vehicleInfoList.push(_message);
        resolveOffset(message.offset)
        await heartbeat()
      }
      vehicleIns.handleConsumedVehicleInfo(vehicleInfoList);
    }
  })
}