import _ from 'lodash';
import {Request, Response} from 'express';
import {StatusCodes} from 'http-status-codes';
import {
  controller,
  httpPost,
  httpDelete,
  httpPut,
  BaseHttpController,
} from 'inversify-express-utils';
import {inject} from 'inversify';
import {ValidateBody, ValidateParams} from '@xcheng85/node-infra';
import {TensorflowValidateService} from '../services';
import {APP_SERVICE_IDENTIFIER} from '../constants';
import {TensorflowValidateRequest} from '../dto';

@controller('/tensorflow/validate')
export class TensorflowValidateController extends BaseHttpController {
  constructor(
    @inject(APP_SERVICE_IDENTIFIER.TensorFlowValidateService)
    private _tfValidateService: TensorflowValidateService
  ) {
    super();
  }

  // @ValidateBody(TensorflowValidateRequest)
  // @ValidateParams(TensorflowValidateRequest)
  @httpPost('')
  public async validate(request: Request, response: Response) {
    const res = await this._tfValidateService.validate();
    return this.json(res, StatusCodes.OK);
  }
}
