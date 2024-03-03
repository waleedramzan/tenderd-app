import express from "express";
const router = express.Router();

import VehicleController from '../controllers/VehicleController';

router.get('', VehicleController.getAllVehicles);
router.get('/:_id', VehicleController.getVehicle);
router.post('', VehicleController.createVehicle);
router.put('/:_id', VehicleController.updateVehicle);
router.delete('/:_id', VehicleController.deleteVehicle);

export default router;