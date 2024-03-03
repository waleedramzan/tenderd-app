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
exports.connectConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const VehicleClass_1 = __importDefault(require("../classes/VehicleClass"));
const topics = ["vehicle-info"];
const kafka = new kafkajs_1.Kafka({
    clientId: "tenderd-iot-service",
    brokers: ["kafka1:19092"]
});
const consumer = kafka.consumer({
    groupId: "tenderd-iot-service",
});
function connectConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        yield consumer.connect();
        console.log("Connected to consumer");
        for (let i = 0; i < topics.length; i++) {
            yield consumer.subscribe({
                topic: topics[i],
                fromBeginning: true,
            });
        }
        yield consumer.run({
            eachBatchAutoResolve: false,
            eachBatch: ({ batch, resolveOffset, heartbeat, isRunning, isStale }) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const vehicleInfoList = [];
                for (let message of batch.messages) {
                    if (!isRunning() || isStale())
                        break;
                    const _message = JSON.parse((_a = message.value) === null || _a === void 0 ? void 0 : _a.toString());
                    vehicleInfoList.push(_message);
                    resolveOffset(message.offset);
                    yield heartbeat();
                }
                const vehicleIns = new VehicleClass_1.default();
                vehicleIns.handleConsumedVehicleInfo(vehicleInfoList);
            })
        });
    });
}
exports.connectConsumer = connectConsumer;
