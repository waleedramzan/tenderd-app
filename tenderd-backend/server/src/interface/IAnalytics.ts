import { IVehicle } from "./vehicle"

export interface IAnalytics {
    vehicle: string | IVehicle
    hoursOperated: number
    distanceTraveled: number
    createdAt: Date
}
