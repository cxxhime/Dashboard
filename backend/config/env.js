import dotenv from 'dotenv';

dotenv.config();

export default {
  PORT: process.env.PORT || 3000, 
  DB_NAME: process.env.DB_NAME || 'applications', 
  URI_MONGO: process.env.MONGO_URI || 'mongodb://localhost:27017' 
};