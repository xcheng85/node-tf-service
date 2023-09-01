import * as http from 'http';
import {AddressInfo} from 'net';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import server from './server';
import {logger} from '@xcheng85/node-infra';

async function main() {
  const httpServer = http.createServer(server.instance);
  // const app = express();
  // const httpServer = http.createServer(app);

  const PORT = process.env.PORT || 4000;

  function serverError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    throw error;
  }

  function serverListening() {
    const addressInfo = <AddressInfo>httpServer.address();
    logger.info(`Listening on ${addressInfo.address}:${PORT}`);
  }

  httpServer.on('error', serverError);
  httpServer.on('listening', serverListening);

  // serverInstance.listen(PORT, () => {
  //   logger.info(`Server is listening on: ${PORT}`);
  // });

  // Modified server startup
  await new Promise<void>(resolve => httpServer.listen({port: 4000}, resolve));
  logger.info('🚀 Server ready at http://localhost:4000/');

  process.on('unhandledRejection', (reason: Error) => {
    logger.error(`Unhandled Promise Rejection: reason is ${reason.message}`);
    logger.error(reason.stack);
  });
}

main();
