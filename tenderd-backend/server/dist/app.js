"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const vehicle_1 = __importDefault(require("./src/routes/vehicle"));
const cors_1 = __importDefault(require("cors"));
// import { connectConsumer } from './src/utils/kafka-consumer';
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use('/vehicle', vehicle_1.default);
mongoose_1.default.connect(process.env.DATABASE_URI)
    .then(() => {
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Database connected && Server is listening at http://localhost:${port}`);
        const WebSocket = require('ws');
        const wss = new WebSocket.Server({ port: 8081 });
        // await connectConsumer();
        wss.on('connection', function connection(ws) {
            console.log('Client connected');
            ws.on('message', function incoming(message) {
                console.log('Received: %s', message);
                // Echo message back to client
                console.log('send 1');
                ws.send(message);
            });
        });
        function broadcast(message) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    console.log('send 2');
                    client.send(message);
                }
            });
        }
        setInterval(function () {
            broadcast('Message from server hello');
        }, 5000);
    }));
}).catch((error) => console.log(error));
