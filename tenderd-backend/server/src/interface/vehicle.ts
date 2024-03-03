import { IMaintenanceRecord } from "./maintenanceRecord"

export interface IVehicle {
    vin: string
    make: string
    model: string
    year: number
    registration: {
        registrationNumber: string,
        registrationDate: Date
    },
    location: {
        coordinates: [number, number]
    }
    speed: number
    maintenanceRecords: string [] | IMaintenanceRecord [],
    createdAt: Date,
    updatedAt: Date
}
