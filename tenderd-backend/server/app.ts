import express, { Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import vehicleRouter from './src/routes/vehicle';
import cors from 'cors';
import { connectConsumer } from './src/utils/kafka-consumer';

const app: Application = express();
const port = process.env.PORT || 3001;

dotenv.config();
app.use(bodyParser.json());
app.use(cors());

app.use('/vehicle', vehicleRouter);

mongoose.connect(process.env.DATABASE_URI as string)
.then(() => {
  app.listen(port, async () => {
    console.log(`Database connected && Server is listening at http://localhost:${port}`);
    await connectConsumer();
  });  
}).catch((error) => console.log(error));
