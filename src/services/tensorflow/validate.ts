import _ from 'lodash';
import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {plainToInstance} from 'class-transformer';
import {validateSync, ValidationError} from 'class-validator';
import {IConfig, logger, methodLogging} from '@xcheng85/node-infra';
import {APP_CONFIG_KEY, APP_SERVICE_IDENTIFIER} from '../../constants';
import {TensorflowValidateRequest} from '../../dto';

// import * as tf from '@tensorflow/tfjs-node";
const tf = require('@tensorflow/tfjs-node-gpu');

@injectable()
export class TensorflowValidateService {
  public constructor() {}

  public async validate() {
    return tf.version.tfjs;
  }
}
