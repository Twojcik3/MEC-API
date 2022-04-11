import { Container } from "inversify";
import { MEC_APP_TYPES } from "../MecAppTypes";
import { IValidationType } from "../http/enum/IValidationType";
import * as yup from 'yup';
import { VALIDATOR_TYPES } from "../http/enum/ValidatorTypes";
import { IGetOrderDetailsInput } from "../http/controller/order/input/IGetOrderDetailsInput";
import { IGetProductDetailsInput } from "../http/controller/product/input/IGetProductDetailsInput";
import { ICreateOrderInput } from "../http/controller/order/input/ICreateOrderInput";

export function bootstrapValidators(container: Container): void {
    container.bind(MEC_APP_TYPES.Service.ValidationServiceFactory).toFactory(() => 
    <T>(validationType: IValidationType<T>): { validate(obj: unknown): Promise<unknown> } => {
        switch(validationType) {
            case VALIDATOR_TYPES.OrderController.CreateOrder: {
                const schema = yup.object( {
                    id: yup.string().required().uuid(),
                    quantity: yup.number().required()
                });
                return {
                    async validate(obj: unknown): Promise<ICreateOrderInput> {
                        return schema.validate(obj, { abortEarly: false});
                    },
                };
            }
            case VALIDATOR_TYPES.OrderController.GetOrder: {
                const schema = yup.object( {
                    id: yup.string().required().uuid(),
                });
                return {
                    async validate(obj: unknown): Promise<IGetOrderDetailsInput> {
                        return schema.validate(obj, { abortEarly: false});
                    },
                };
            }
            case VALIDATOR_TYPES.ProductController.GetProductDetails: {
                const schema = yup.object( {
                    id: yup.string().required().uuid(),
                });
                return {
                    async validate(obj: unknown): Promise<IGetProductDetailsInput> {
                        return schema.validate(obj, { abortEarly: false});
                    },
                };
            }
            default:
                  throw new Error('no such validation type');
        }
    })
}