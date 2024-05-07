
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
    async getUser (ctx:Context){
        const res = await service.create();
        this.success(ctx,200,res,'获取用户信息成功');
    }
}

export default UserController;