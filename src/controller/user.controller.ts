
import UserService from "@/service/user.service";
import {Context} from "koa";
import BaseController from "@/controller/base.controller";
import {autobind} from "@/utils/DecoratorThis";
const service = new UserService();
class UserController extends BaseController{
    constructor() {
        super();
    }
    @autobind
    async sendMsg (ctx:Context){
        ctx.body = await service.sendMsg(ctx);

    }
    @autobind
    async login(ctx:Context){
        ctx.body = await service.login(ctx);
    }
}

export default UserController;