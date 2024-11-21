import express from 'express';
import { createBooking,getUserBookings } from '../controllers/booking';
import { validateRequest } from '../middlewares/validationMiddleware';
import { createBookingSchema } from '../schemas/bookingSchemas';
import { validateJWTAuth } from '../middlewares/validateAuth';
import { get } from 'http';

const router = express.Router();

router.post('/',validateJWTAuth, validateRequest(createBookingSchema), createBooking);
router.post('/get-bookings', validateJWTAuth, getUserBookings);

export default router;
