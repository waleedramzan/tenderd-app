"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var VehicleStatus;
(function (VehicleStatus) {
    VehicleStatus["ACTIVE"] = "active";
    VehicleStatus["UNDER_MAINTENANCE"] = "under_maintenance";
    VehicleStatus["OUT_OF_SERVICE"] = "out_of_service";
})(VehicleStatus || (exports.VehicleStatus = VehicleStatus = {}));
const vehicleSchema = new mongoose_1.default.Schema({
    vin: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    status: {
        type: String,
        enum: [VehicleStatus.ACTIVE, VehicleStatus.UNDER_MAINTENANCE, VehicleStatus.OUT_OF_SERVICE],
        default: VehicleStatus.ACTIVE,
    },
    registration: {
        registrationNumber: { type: String, required: true },
        registrationDate: { type: Date, required: true }
    },
    location: {
        coordinates: { type: [String], default: ['0', '0'] },
    },
    speed: { type: Number, default: 0 },
    maintenanceRecords: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'MaintenanceRecord' }],
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, default: Date.now }
});
const Vehicle = mongoose_1.default.model('Vehicle', vehicleSchema);
exports.default = Vehicle;
