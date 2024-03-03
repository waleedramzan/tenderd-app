import mongoose from 'mongoose';
import { Request, Response, NextFunction } from "express";
import Vehicle from '../models/Vehicle';

const createVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { vin, make, model, year, registrationNumber, registrationDate, status } = req.body;

        const isExistingVehcile = await Vehicle.findOne({ vin });
        if (isExistingVehcile) {
            return res.status(400).json({ message: `Vehicle with VIN number ${vin} already exists` })
        }

        const vehicle = new Vehicle({
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
        await vehicle.save();
        res.status(201).json(vehicle);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add vehicle' });
    }
}

const getVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { _id: id } = req.params;
        const _id = new mongoose.Types.ObjectId(id);
        const vehicle = await Vehicle.findOne({ _id });
        res.status(200).json(vehicle);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get vehicle' });
    }
}

const getAllVehicles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to get all vehicles' });
    }
}

const updateVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update vehicle' });
    }
}

const deleteVehicle = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete vehicle' });
    }
}

export default { createVehicle, getVehicle, getAllVehicles, updateVehicle, deleteVehicle }