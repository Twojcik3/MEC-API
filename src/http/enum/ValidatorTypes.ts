import { IValidationType } from "./IValidationType";
import { ICreateOrderInput } from "../controller/order/input/ICreateOrderInput";
import { IGetOrderDetailsInput } from "../controller/order/input/IGetOrderDetailsInput";
import { IGetProductDetailsInput } from "../controller/product/input/IGetProductDetailsInput";
export const VALIDATOR_TYPES = {
    OrderController: {
        CreateOrder: {} as IValidationType<ICreateOrderInput>,
        GetOrder: {} as IValidationType<IGetOrderDetailsInput>
    },
    ProductController: {
        GetProductDetails: {} as IValidationType<IGetProductDetailsInput>
    }
}