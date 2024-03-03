import Vehicle from "../models/Vehicle";
import WebSocketClass from "./WebSocketClass";

interface VehicleInfo {
    location: string
    speed: number
    vin: string
}

export default class VehicleClass {

    vehicleInfoList: VehicleInfo[] = [];
    webSocketIns: any

    constructor() {
        this.webSocketIns = new WebSocketClass();
        this.webSocketIns.initializeWebSockets();
    }

    async handleConsumedVehicleInfo(vehicleInfoList: VehicleInfo[]) {
        this.vehicleInfoList = vehicleInfoList;

        const bulkWriteList = [];
        for (let vehicleInfo of this.vehicleInfoList) {
            const updateElem: any = {};
            if (vehicleInfo.speed) { updateElem.speed = vehicleInfo.speed; }
            if (vehicleInfo.location) { updateElem.location = { coordinates: vehicleInfo.location } }
            updateElem.updatedAt = new Date();
            const _query = {
                updateOne: {
                    filter: { vin: vehicleInfo.vin },
                    update: { $set: updateElem }
                }
            }
            bulkWriteList.push(_query);
        }
        if (!bulkWriteList || !bulkWriteList.length) { return; }
        await Vehicle.bulkWrite(bulkWriteList);
        console.log('vehicles updated!!');

        const vehicles = await Vehicle.find({}, {}, { lean: true });
        this.webSocketIns.sendMessageInIntervalsToClient(JSON.stringify(vehicles));
    }
}