import dotenv from 'dotenv';
import fs from 'fs';
import {logger} from '@xcheng85/node-infra';

if (fs.existsSync('.env')) {
  logger.info('Use .env file to supply config environment variables');
  dotenv.config({path: '.env'});
}

export const CONFIG_PATH = process.env.CONFIG_PATH || '/configs/config.json';
export const SECRET_PATH = process.env.SECRET_PATH || '/secrets/secret.json';
