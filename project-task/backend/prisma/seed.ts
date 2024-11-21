import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  const hashedPassword = await bcrypt.hash('password', 10);

  // Create Users
  const users = await prisma.user.createMany({
    data: [
      { firstName: 'Avijit', lastName: 'Chanda', email: 'avijit@example.com', password: hashedPassword },
      { firstName: 'Saikat', lastName: 'Dey', email: 'saikat@example.com', password: hashedPassword },
    ],
  });

  console.log('Users created:', users);

  // Create Vehicles
  const vehicles = await prisma.vehicle.createMany({
    data: [
      { type: 'car', model: 'Hatchback' },
      { type: 'car', model: 'SUV' },
      { type: 'bike', model: 'Cruiser' },
      { type: 'bike', model: 'Sports' },
    ],
  });

  console.log('Vehicles created:', vehicles);
}

main().catch((e) => console.error(e))

