import { IVehicle } from "./vehicle"

export interface IMaintenanceRecord {
    vehicle: string | IVehicle
    maintenanceDate: Date
    description: string
    cost: Number
}