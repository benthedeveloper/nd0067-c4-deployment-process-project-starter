import { Sequelize } from 'sequelize-typescript';
import { config } from './config/config';

export const sequelize = new Sequelize({
  username: config.username,
  password: config.password,
  database: config.database,
  host: config.host,
  dialect: 'postgres',

  // Forward the encryption instructions down to the 'pg' driver
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Bypasses self-signed AWS RDS cert requirements
    },
  },

  // Clear out any pool latency or limits
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
