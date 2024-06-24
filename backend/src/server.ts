import path from 'path';
import dotenv from 'dotenv';

// Determine the environment and load the appropriate .env file
// const environment = process.env.NODE_ENV || 'development';
// let envPath = '';

// switch (environment) {
//   case 'production':
//     envPath = path.resolve(__dirname, '../.env.production');
//     break;
//   case 'test':
//     envPath = path.resolve(__dirname, '../.env.test');
//     break;
//   default:
//     envPath = path.resolve(__dirname, '../.env.development');
// }

// dotenv.config({ path: envPath });

dotenv.config();

import testConnection from './database/DBInit';
import app from './app';

// Set the port
const port = process.env.PORT || 3000;

// Start server
const startServer = async () => {
    await testConnection();

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
};

startServer();
