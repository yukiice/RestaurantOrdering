import BaseController from "@/controller/base.controller";
import {autobind} from "@/utils/DecoratorThis";
import DishService from "@/service/dish.service";
const service = new DishService();
class DishController extends BaseController{
    constructor() {
        super();
    }

    @autobind
    async getList(ctx: any){
        ctx.body = await service.getList(ctx);
    }

    @autobind
    async getById(ctx: any){
        ctx.body = await service.getById(ctx);
    }

    @autobind
    async add(ctx: any){
        ctx.body = await service.add(ctx);
    }

    @autobind
    async update(ctx: any){
        ctx.body = await service.update(ctx);
    }

    @autobind
    async delete(ctx: any){
        ctx.body = await service.delete(ctx);
    }

    @autobind
    async updateStatus(ctx: any){
        ctx.body = await service.updateStatus(ctx);
    }

    @autobind
    async getAllByCategoryId(ctx: any){
        ctx.body = await service.getAllByCategoryId(ctx);
    }
}

export default DishController;