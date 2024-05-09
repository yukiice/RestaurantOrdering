import BaseController from "@/controller/base.controller";
import {Context} from "koa";
import CategoryService from "@/service/category.service";
import {autobind} from "@/utils/DecoratorThis";
const service = new CategoryService();
class CategoryController extends BaseController {
    constructor() {
        super();
    }
    @autobind
    async getList(ctx: Context) {
        ctx.body = await service.getList(ctx);
    }
    @autobind
    async add(ctx: Context) {
        ctx.body = await service.add(ctx);
    }
    @autobind
    async update(ctx: Context) {
        ctx.body = await service.update(ctx);
    }
    @autobind
    async delete(ctx: Context) {
        ctx.body = await service.delete(ctx);
    }
    @autobind
    async getAll(ctx: Context) {
        ctx.body = await service.getAll(ctx);
    }
}

export default CategoryController;