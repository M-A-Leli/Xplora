import prisma from '../config/Prisma.Config';

const testConnection = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed', error);
        process.exit(1);
    }
};

export default testConnection;
