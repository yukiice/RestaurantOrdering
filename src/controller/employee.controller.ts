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
}

export default EmployeeController;