import { Container } from 'inversify';
import { MEC_APP_TYPES, ControllerType } from '../MecAppTypes';
import { ExpressRoutesManager } from '../service/router/ExpressRoutesManager'
import { ExpressControllerProvider } from '../service/http/ExpressControllerProvider';
import { OrderController } from '../http/controller/order/OrderController';
import { ProductController } from '../http/controller/product/ProductController';

async function bootstrapControllers(container: Container): Promise<void> {
    container.bind(MEC_APP_TYPES.Http.Service.ControllerProvider).to(ExpressControllerProvider);
    container.bind(MEC_APP_TYPES.Http.Controller.OrderController).to(OrderController).inRequestScope();
    container.bind(MEC_APP_TYPES.Http.Controller.ProductController).to(ProductController).inRequestScope();
    container.bind(MEC_APP_TYPES.Http.Service.ControllerFactory).toFactory((ctx) =>
        (controllerType: ControllerType): any => {
            if (ctx.container.isBound(controllerType)) {
                return ctx.container.get(controllerType);
            }
            return null;
        },
    );
}

async function bootstrapMiddlewares(container: Container): Promise<void> {
    return;
}

export async function bootstrapHttp(container: Container): Promise<void> {
    await Promise.all([
        bootstrapControllers(container),
        bootstrapMiddlewares(container)
    ]);
    container.bind(MEC_APP_TYPES.Http.Routes.RoutesManager).to(ExpressRoutesManager);
}