import 'reflect-metadata';
import {Container} from 'inversify';

import {
  SERVICE_IDENTIFIER,
  IConfig,
  FileWatcherService,
} from '@xcheng85/node-infra';
import {ConfigService} from '../services';
import {APP_SERVICE_IDENTIFIER} from '../constants';

export class CustomContainer extends Container {
  constructor() {
    super();
    this.initialize();
  }

  protected initialize() {
    this.bind<IConfig>(SERVICE_IDENTIFIER.CONFIG)
      .to(ConfigService)
      .inSingletonScope();
    this.bind<FileWatcherService>(
      APP_SERVICE_IDENTIFIER.ConfigFileWatcherService
    )
      .to(FileWatcherService)
      .inSingletonScope();
    this.bind<FileWatcherService>(
      APP_SERVICE_IDENTIFIER.SecretFileWatcherService
    )
      .to(FileWatcherService)
      .inSingletonScope();
  }
}

export default new CustomContainer();
