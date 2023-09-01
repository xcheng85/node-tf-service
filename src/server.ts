import express, {Application} from 'express';
import cors from 'cors';
import 'reflect-metadata';
import {InversifyExpressServer} from 'inversify-express-utils';
import helmet from 'helmet';
// import swaggerUi from 'swagger-ui-express';
import {CustomErrorHandler} from '@xcheng85/node-infra';
// load all injectable entities
import './ioc/loader';
import {CustomContainer} from './ioc/custom-container';
// import * as swaggerDocument from './swagger.json';

export class Server {
  private readonly _instance: Application;

  get instance(): Application {
    return this._instance;
  }

  constructor() {
    const container = new CustomContainer();
    // start the server
    const server = new InversifyExpressServer(container);
    // middleware must be configured before server.build() is called.
    // the following configuration must be disabled to make appollo work
    // server.setConfig(app => {
    //   app.use(helmet());
    //   app.use(
    //     express.urlencoded({
    //       extended: true,
    //     })
    //   );
    //   app.use(express.json());
    //   app.use(cors());
    // });

    this._instance = server.build();
    // this._instance.use(
    //   '/swagger',
    //   swaggerUi.serve,
    //   swaggerUi.setup(swaggerDocument)
    // )
    this._instance.use(CustomErrorHandler);
  }
}

export default new Server();
