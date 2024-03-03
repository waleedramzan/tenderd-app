import express from 'express';
import { simulateVehicleInfoInInterval } from './src/utils/simulator';
import { connectProducer } from './src/utils/kafka-producer';

async function main() {
  const app = express();
  await connectProducer();

  app.listen({ port: 3000 });

  simulateVehicleInfoInInterval();

  console.log("Simulator ready at http://localhost:3000");
}

main();
