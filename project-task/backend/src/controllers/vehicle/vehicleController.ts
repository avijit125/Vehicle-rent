import prisma from '../../utils/dbClient';
import redisClient from '../../utils/redisClient';
import { Request, Response } from 'express';

export const getVehicleTypes = async (req: Request, res: Response): Promise<any> => {
  const { wheels } = req.query;
  const cacheKey = `vehicle_types_${wheels}`;

  try {
    // Check Redis cache first
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Query database if not in cache
    const types = await prisma.vehicle.findMany({
      where: { type: wheels === '2' ? 'bike' : 'car' },
      select: { type: true },
    });

    const uniqueTypes = [...new Set(types.map((t:any) => t.type))];

    // Cache the result in Redis
    await redisClient.set(cacheKey, JSON.stringify(uniqueTypes), { EX: 3600 }); // Cache for 1 hour

    res.json(uniqueTypes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle types' });
  }
};

export const getVehicleModels = async (req: Request, res: Response): Promise<any> => {
  const { type } = req.query;

  // Ensure `type` is a string, or if it is an array, take the first element.
  const queryType = Array.isArray(type) ? type[0] : type;

  const cacheKey = `vehicle_models_${queryType}`;

  try {
    // Check Redis cache first
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    // Query database if not in cache
    const models = await prisma.vehicle.findMany({
      where: { type: queryType }, // Use `queryType` which is guaranteed to be a string or undefined
      select: { model: true, id: true },
    });

    

    // Cache the result in Redis
    await redisClient.set(cacheKey, JSON.stringify(models), { EX: 3600 }); // Cache for 1 hour

    res.json(models);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch vehicle models' });
  }
};
