import prisma from '../../utils/dbClient';
import redisClient from '../../utils/redisClient';
import { Request, Response } from 'express';

export const createBooking = async (req: Request, res: Response): Promise<any> => {
  const { userId, vehicleId, startDate, endDate } = req.body;

  const cacheKey = `bookings_vehicle_${vehicleId}`;

  try {
    // Check Redis cache for overlapping bookings
    const cachedBookings = await redisClient.get(cacheKey);

    if (cachedBookings) {
      const bookings = JSON.parse(cachedBookings);

      const isOverlapping = bookings.some(
        (b:any) =>
          new Date(b.startDate) <= new Date(endDate) &&
          new Date(b.endDate) >= new Date(startDate)
      );

      if (isOverlapping) {
        return res.status(400).json({ error: 'Vehicle already booked for the selected dates.' });
      }
    }

    // If not in cache, query database
    const overlappingBooking = await prisma.booking.findFirst({
      where: {
        vehicleId,
        OR: [
          {
            startDate: { lte: new Date(endDate) },
            endDate: { gte: new Date(startDate) },
          },
        ],
      },
    });

    if (overlappingBooking) {
      return res.status(400).json({ error: 'Vehicle already booked for the selected dates.' });
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: { userId, vehicleId, startDate: new Date(startDate), endDate: new Date(endDate) },
    });

    // Update Redis cache
    const updatedBookings = cachedBookings
      ? [...JSON.parse(cachedBookings), booking]
      : [booking];

    await redisClient.set(cacheKey, JSON.stringify(updatedBookings), { EX: 3600 }); // Cache for 1 hour

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

export const getUserBookings = async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.body;

  // Cache key based on userId
  const cacheKey = `user_bookings_${userId}`;

  try {
    // Check Redis cache
    const cachedBookings = await redisClient.get(cacheKey);

    if (cachedBookings) {
      // Return cached bookings if available
      return res.status(200).json(JSON.parse(cachedBookings));
    }

    // Query bookings from the database
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { startDate: 'asc' }, // Optionally sort by startDate
      include: {
        vehicle: true, // Include related vehicle details
      },
    });

    // Cache the results for future requests
    await redisClient.set(cacheKey, JSON.stringify(bookings), { EX: 3600 }); // Cache for 1 hour

    // Return the bookings
    res.status(200).json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};
