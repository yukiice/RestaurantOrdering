import {autobind} from "@/utils/DecoratorThis";
import BaseController from "@/controller/base.controller";
import {Context} from "koa";
import ShoppingCartService from "@/service/shoppingCart.service";
const service = new ShoppingCartService();
class ShoppingCartController extends BaseController {
    constructor() {
        super();
    }
    @autobind
    async list(ctx: Context) {
        ctx.body = await service.list(ctx);
    }
    @autobind
    async add(ctx: Context) {
        ctx.body = await service.add(ctx);
    }
    @autobind
    async sub(ctx: Context) {
        ctx.body = await service.sub(ctx);
    }
    @autobind
    async clean(ctx: Context) {
        ctx.body = await service.clean(ctx);
    }
}

export default ShoppingCartController;