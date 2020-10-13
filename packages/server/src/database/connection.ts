import { createConnection, ConnectionOptions } from 'typeorm';
import config from './ormconfig.json';

createConnection(config as ConnectionOptions/* {
  type: "sqlite",
  database: './src/database/database.sqlite',
} */);