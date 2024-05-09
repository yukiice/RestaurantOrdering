import {Context} from "koa";
import BaseController from "@/controller/base.controller";
import {autobind} from "@/utils/DecoratorThis";
import EmployeeService from "@/service/employee.service";

const service = new EmployeeService();
class EmployeeController extends BaseController{
    constructor() {
        super();
    }
    @autobind
    async findUser(ctx:Context){
        ctx.body = await service.findUser(ctx);
    }

    @autobind
    async logout(ctx:Context){
        ctx.body = await service.logout(ctx)
    }

    @autobind
    async getList(ctx:Context){
        ctx.body = await service.getList(ctx)
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
}

export default EmployeeController;