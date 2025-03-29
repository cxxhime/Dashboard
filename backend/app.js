import ENV from './config/env.js';
import express from 'express';
import connectMongoDB from './config/dbMongo.js'; 
import applicationRouter from './routes/application.router.js';
import cors from 'cors';

const app = express();

// CONNEXION MONGO
connectMongoDB(ENV.URI_MONGO, ENV.DB_NAME);

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// PREFIX 
app.use('/api/applications', applicationRouter);

export default app;