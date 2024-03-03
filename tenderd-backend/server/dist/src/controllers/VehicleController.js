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
const mongoose_1 = __importDefault(require("mongoose"));
const Vehicle_1 = __importDefault(require("../models/Vehicle"));
const createVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vin, make, model, year, registrationNumber, registrationDate, status } = req.body;
        const isExistingVehcile = yield Vehicle_1.default.findOne({ vin });
        if (isExistingVehcile) {
            return res.status(400).json({ message: `Vehicle with VIN number ${vin} already exists` });
        }
        const vehicle = new Vehicle_1.default({
            vin,
            make,
            model,
            year,
            registration: {
                registrationNumber,
                registrationDate: new Date(registrationDate),
            },
            status,
            createdAt: new Date()
        });
        yield vehicle.save();
        res.status(201).json(vehicle);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add vehicle' });
    }
});
const getVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id: id } = req.params;
        const _id = new mongoose_1.default.Types.ObjectId(id);
        const vehicle = yield Vehicle_1.default.findOne({ _id });
        res.status(200).json(vehicle);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get vehicle' });
    }
});
const getAllVehicles = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const vehicles = yield Vehicle_1.default.find();
        res.status(200).json(vehicles);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get all vehicles' });
    }
});
const updateVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update vehicle' });
    }
});
const deleteVehicle = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete vehicle' });
    }
});
exports.default = { createVehicle, getVehicle, getAllVehicles, updateVehicle, deleteVehicle };
