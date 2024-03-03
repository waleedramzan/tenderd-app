import { faker } from '@faker-js/faker';
import { sendMessage } from './kafka-producer';

const simulateVehicleInfo = async () => {
    for (let i = 0; i < 10; i++) {
        const vin = `vehicle_${i}`;
        const location = faker.location.nearbyGPSCoordinate({ origin: [24.996053, 55.186942], radius: 5, isMetric: true }) 
        const speed = faker.number.int({ min: 0, max: 120 });
    
        const message = { location, speed, vin };
        await sendMessage("vehicle-info", JSON.stringify(message));
    
        console.log(`Sent data for vehicle ${vin}`);
    }
}

export const simulateVehicleInfoInInterval = async () => {
    setInterval(simulateVehicleInfo, 10000);
}