"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const analyticsSchema = new mongoose_1.default.Schema({
    vehicle: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    hoursOperated: { type: Number, required: true },
    distanceTraveled: { type: Number, required: true },
    createdAt: { type: Date, required: true }
});
const Analytics = mongoose_1.default.model('Analytics', analyticsSchema);
module.exports = { Analytics };
