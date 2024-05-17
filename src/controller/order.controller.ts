import {Context} from "koa";
import BaseController from "@/controller/base.controller";
import {autobind} from "@/utils/DecoratorThis";
import OrderService from "@/service/order.service";
const service = new OrderService();
class OrderController extends BaseController{
    constructor() {
        super();
    }
    @autobind
    async getListByUserPage(ctx:Context){
        ctx.body = await service.getListByUserPage(ctx)
    }
    @autobind
    async create(ctx:Context){
        ctx.body = await service.create(ctx)
    }
}

export default OrderController;