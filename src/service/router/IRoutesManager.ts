import { IRouter } from 'express-serve-static-core';

export interface IRoutesManager {
    register(router: IRouter): void;
}