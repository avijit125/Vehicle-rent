import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Gracefully handle connection and disconnect
export const connectToDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (e: any) {
    console.error('Error connecting to the database:', e);
    process.exit(1);  // Exit process with failure code
  }
};

// Close the Prisma Client connection when the application shuts down
const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('Disconnected from the database');
  } catch (e: any) {
    console.error('Error disconnecting from the database:', e);
  }
};



// Gracefully shutdown Prisma client
process.on('SIGINT', disconnectDatabase);
process.on('SIGTERM', disconnectDatabase);

export default prisma;
