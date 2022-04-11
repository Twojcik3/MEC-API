import { NextFunction, Request, Response } from 'express-serve-static-core';
import { injectable } from 'inversify';

@injectable()
export abstract class AbstractBaseController {
    public doRequest(actionName: string): (req1: Request, res1: Response, next1: NextFunction) => any {
        return (async (req, res, next): Promise<void> => {
            try {
                await this[actionName](req, res, next);
            } catch (e) {
                next(e);
            }
        });
    }
}