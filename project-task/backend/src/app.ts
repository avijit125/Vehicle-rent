import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'
import vehicleRoutes from './routes/vehicleRoutes';
import bookingRoutes from './routes/bookingRoutes';
import userRoutes from './routes/userRoutes';
import { connectToDatabase } from './utils/dbClient';

const app = express();

const limiter =  rateLimit({
	windowMs: 60 * 1000 * 1, // Time window of 1 minute
	max: 1000, // Max hits allowed
	standardHeaders: false,
	legacyHeaders: false,
})

app.use(cors());
app.use(bodyParser.json());
app.use(limiter)

app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(5000, () => {
  connectToDatabase();
  console.log('Server running on http://localhost:5000');
});
