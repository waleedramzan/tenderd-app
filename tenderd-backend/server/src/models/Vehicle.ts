import mongoose from 'mongoose';
import { IVehicle } from '../interface/vehicle';

export enum VehicleStatus {
  ACTIVE = 'active',
  UNDER_MAINTENANCE = 'under_maintenance',
  OUT_OF_SERVICE = 'out_of_service'
}

const vehicleSchema = new mongoose.Schema({
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
  maintenanceRecords: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MaintenanceRecord' }],
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model<IVehicle>('Vehicle', vehicleSchema);
export default Vehicle;
