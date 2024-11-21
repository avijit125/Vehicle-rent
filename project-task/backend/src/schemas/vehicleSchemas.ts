import { z } from 'zod';

export const getVehicleTypesSchema = z.object({
  query: z.object({
    wheels: z.string({ required_error: 'Wheels query parameter is required' }).refine((val) => val === '2' || val === '4', {
      message: 'Wheels must be either "2" or "4"',
    }),
  }),
});

export const getVehicleModelsSchema = z.object({
  query: z.object({
    type: z.string({ required_error: 'Vehicle type is required' }),
  }),
});
