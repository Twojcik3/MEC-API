import { injectable, inject } from 'inversify';
import { MEC_APP_TYPES, ControllerType } from '../../MecAppTypes';
import { IExpressControllerProvider } from './IExpressControllerProvider';
import { AbstractBaseController } from '../../http/controller/AbstractBaseController';
import { NextFunction, Request, Response } from 'express-serve-static-core';

@injectable()
export class ExpressControllerProvider implements IExpressControllerProvider {
    constructor (
    @inject(MEC_APP_TYPES.Http.Service.ControllerFactory) protected controllerFactory: (controllerName: ControllerType) => AbstractBaseController) {

    }

    public getHandlerFunction(controllerName: ControllerType, controllerMethod: string = 'index'):
      (req: Request, res: Response, next: NextFunction) => {} {
        const controller = this.controllerFactory(controllerName);
        if (controller) {
            if (typeof controller[controllerMethod] === 'function') {
                return controller.doRequest(controllerMethod);
            } else {
                throw new Error(`Controller ${controllerName.toString()} does not contain function ${controllerMethod}.`);
            }
        } else {
            throw new Error(`Controller ${controllerName.toString()} not found.`);
        }
    }

    public getGuardedHandlerFunction(controllerName: ControllerType, controllerMethod: string):
      (req: Request, res: Response, next: NextFunction) => {} {
        return this.wrapHandler(this.getHandlerFunction(controllerName, controllerMethod));
    }

    protected wrapHandler(handler: (req: Request, res: Response, next: NextFunction) => any):
      (req: Request, res: Response, next: NextFunction) => {} {
        return (req1: Request, res1: Response, next1: NextFunction): any => {
            handler(req1, res1, next1);
        };
    }
}