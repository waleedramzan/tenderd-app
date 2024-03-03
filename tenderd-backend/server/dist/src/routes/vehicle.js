"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const VehicleController_1 = __importDefault(require("../controllers/VehicleController"));
router.get('', VehicleController_1.default.getAllVehicles);
router.get('/:_id', VehicleController_1.default.getVehicle);
router.post('', VehicleController_1.default.createVehicle);
router.put('/:_id', VehicleController_1.default.updateVehicle);
router.delete('/:_id', VehicleController_1.default.deleteVehicle);
exports.default = router;
