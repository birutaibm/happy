import { createConnection, ConnectionOptions } from 'typeorm';
import config from './ormconfig.json';

createConnection(config as ConnectionOptions);