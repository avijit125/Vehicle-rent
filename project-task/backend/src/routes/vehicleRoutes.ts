import express from 'express';
import { getVehicleTypes, getVehicleModels } from '../controllers/vehicle';
import { validateRequest } from '../middlewares/validationMiddleware';
import { getVehicleTypesSchema, getVehicleModelsSchema } from '../schemas/vehicleSchemas';

const router = express.Router();

router.get('/types', validateRequest(getVehicleTypesSchema), getVehicleTypes);
router.get('/models', validateRequest(getVehicleModelsSchema), getVehicleModels);

export default router;
