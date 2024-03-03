import mongoose from 'mongoose';
import { IMaintenanceRecord } from '../interface/maintenanceRecord';

const maintenanceRecordSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    maintenanceDate: { type: Date, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true }
});

const MaintenanceRecord = mongoose.model<IMaintenanceRecord>('MaintenanceRecord', maintenanceRecordSchema);
module.exports = { MaintenanceRecord };
