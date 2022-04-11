import { IRouter } from 'express-serve-static-core';
import { MEC_APP_TYPES } from '../MecAppTypes';
import { IExpressControllerProvider } from '../service/http/IExpressControllerProvider';

export function registerRoutes(router: IRouter, controllerProvider: IExpressControllerProvider): IRouter {
    registerMECRoutes(router, controllerProvider);
    return router;
}

export function registerMECRoutes(router: IRouter, controllerProvider: IExpressControllerProvider): void {
    router.post(
        '/order/:quantity/:id',
        controllerProvider.getHandlerFunction(MEC_APP_TYPES.Http.Controller.OrderController,
            'createOrder'),
    );
    router.get(
        '/order/:id',
        controllerProvider.getHandlerFunction(MEC_APP_TYPES.Http.Controller.OrderController,
            'getOrderDetails')
    );
    router.get(
        '/product/:id',
        controllerProvider.getHandlerFunction(MEC_APP_TYPES.Http.Controller.ProductController,
            'getProductDetails')
    );
    router.get(
        '/products',
        controllerProvider.getHandlerFunction(MEC_APP_TYPES.Http.Controller.ProductController,
            'getAllProducts')
    );
    router.get(
        '/products/hot-deals',
        controllerProvider.getHandlerFunction(MEC_APP_TYPES.Http.Controller.ProductController,
            'getHotDeals')
    );
}