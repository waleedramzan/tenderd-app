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
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
class VehicleClass {
    constructor() {
        this.vehicleInfoList = [];
    }
    handleConsumedVehicleInfo(vehicleInfoList) {
        return __awaiter(this, void 0, void 0, function* () {
            this.vehicleInfoList = vehicleInfoList;
            const bulkWriteList = [];
            for (let vehicleInfo of this.vehicleInfoList) {
                const updateElem = {};
                if (vehicleInfo.speed) {
                    updateElem.speed = vehicleInfo.speed;
                }
                if (vehicleInfo.location) {
                    updateElem.location = { coordinates: vehicleInfo.location };
                }
                updateElem.updatedAt = new Date();
                const _query = {
                    updateOne: {
                        filter: { vin: vehicleInfo.vin },
                        update: { $set: updateElem }
                    }
                };
                bulkWriteList.push(_query);
            }
            if (!bulkWriteList || !bulkWriteList.length) {
                return;
            }
            yield Vehicle_1.default.bulkWrite(bulkWriteList);
            console.log(`Vehicles updated`);
        });
    }
}
exports.default = VehicleClass;
