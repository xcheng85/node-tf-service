import fs from 'fs';
import _ from 'lodash';
import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {plainToInstance} from 'class-transformer';
import {validateSync, ValidationError} from 'class-validator';
import {
  IConfig,
  logger,
  methodLogging,
  FileWatcherService,
  SHARED_CUSTOM_EVENT,
} from '@xcheng85/node-infra';
import {APP_CONFIG_KEY, APP_SERVICE_IDENTIFIER} from '../constants';
import {Config, Secret} from '../models';
import {CONFIG_PATH, SECRET_PATH} from '../utils';

@injectable()
export class ConfigService implements IConfig {
  public constructor(
    @inject(APP_SERVICE_IDENTIFIER.ConfigFileWatcherService)
    private _configFileWatcherService: FileWatcherService,
    @inject(APP_SERVICE_IDENTIFIER.SecretFileWatcherService)
    private _secretFileWatcherService: FileWatcherService,
    protected _kv: {[k: string]: any} = {}
  ) {
    this.initializeConfig(CONFIG_PATH);
    const configFileEventEmitter = _configFileWatcherService.eventEmitter;
    configFileEventEmitter.on(SHARED_CUSTOM_EVENT.FILE_CHANGED, () => {
      this.initializeConfig(CONFIG_PATH);
    });

    this.initializeSecret(SECRET_PATH);
    const secretFileEventEmitter = _secretFileWatcherService.eventEmitter;
    secretFileEventEmitter.on(SHARED_CUSTOM_EVENT.FILE_CHANGED, () => {
      this.initializeSecret(SECRET_PATH);
    });
  }

  public get(key: string) {
    return this._kv[key];
  }

  @methodLogging()
  private initializeConfig(configPath: string) {
    try {
      const configJson = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      const config = plainToInstance(Config, configJson);
      const errors: ValidationError[] = validateSync(config);
      if (errors.length > 0) {
        throw JSON.stringify(errors);
      }
      this.updateConfig(config);
    } catch (error) {
      logger.error(error);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  }

  @methodLogging()
  private updateConfig(config: Config) {
    logger.info(this._kv);
  }

  @methodLogging()
  private initializeSecret(secretPath: string) {
    try {
      const secretJson = JSON.parse(fs.readFileSync(secretPath, 'utf8'));
      const secret = plainToInstance(Secret, secretJson);
      const errors: ValidationError[] = validateSync(secret);
      if (errors.length > 0) {
        throw JSON.stringify(errors);
      }
      this.updateSecret(secret);
    } catch (error) {
      logger.error(error);
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    }
  }

  @methodLogging()
  private updateSecret(secret: Secret) {
    logger.info(this._kv);
  }
}
