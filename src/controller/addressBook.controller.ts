import {Context} from "koa";
import BaseController from "@/controller/base.controller";
import {autobind} from "@/utils/DecoratorThis";
import AddressBookService from "@/service/addressBook.service";
const service = new AddressBookService();
class AddressBookController extends BaseController{
    constructor() {
        super();
    }
    @autobind
    async getList(ctx:Context){
        ctx.body = await service.getList(ctx)
    }
    @autobind
    async setDefault(ctx:Context){
        ctx.body = await service.setDefault(ctx)
    }
    @autobind
    async add(ctx:Context){
        ctx.body = await service.add(ctx)
    }
    @autobind
    async getById(ctx:Context){
        ctx.body = await service.getById(ctx)
    }
    @autobind
    async update(ctx:Context){
        ctx.body = await service.update(ctx)
    }
    @autobind
    async delete(ctx:Context){
        ctx.body = await service.delete(ctx)
    }
    @autobind
    async getDefault(ctx:Context){
        ctx.body = await service.getDefault(ctx)
    }
}

export default AddressBookController;