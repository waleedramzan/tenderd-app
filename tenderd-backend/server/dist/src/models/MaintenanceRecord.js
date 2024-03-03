"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const maintenanceRecordSchema = new mongoose_1.default.Schema({
    vehicle: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    maintenanceDate: { type: Date, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true }
});
const MaintenanceRecord = mongoose_1.default.model('MaintenanceRecord', maintenanceRecordSchema);
module.exports = { MaintenanceRecord };
