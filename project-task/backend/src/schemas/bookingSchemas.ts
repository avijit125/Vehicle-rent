import { z } from 'zod';

export const createBookingSchema = z.object({
  body: z.object({
    userId: z.number({ required_error: 'User ID is required' }),
    vehicleId: z.number({ required_error: 'Vehicle ID is required' }),
    startDate: z.string({ required_error: 'Start date is required' }).refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid start date format',
    }),
    endDate: z.string({ required_error: 'End date is required' }).refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid end date format',
    }),
  }),
});
