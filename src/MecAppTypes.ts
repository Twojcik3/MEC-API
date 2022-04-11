export type ControllerType = symbol;
export type MiddlewareType = symbol;

export const MEC_APP_TYPES = {
    Config: Symbol.for('AppConfig'),
    Http: {
        Controller: {
            OrderController: Symbol.for('OrderController'),
            ProductController: Symbol.for('ProductController')
        },
        Middleware: {

        },
        Service: {
            ControllerFactory: Symbol.for('Factory<AbstractBaseController>'),
            ControllerProvider: Symbol.for('ControllerProvider'),
        },
        Routes: {
            RoutesManager: Symbol.for('RoutesManager'),
        },
    },
    Service: {
        Order: {
            Service: Symbol.for('OrderService'),
            Handler: Symbol.for('OrderHandler'),
        },
        Product: {
            Service: Symbol.for('ProductService'),
            Handler: Symbol.for('ProductHandler'),
        },
        ValidationServiceFactory: Symbol.for('<Factory>ValidationService'),
    },
    Repository: {
        OrderRepository: Symbol.for('OrderRepository'),
        ProductRepository: Symbol.for('ProductRepository')
    }
}