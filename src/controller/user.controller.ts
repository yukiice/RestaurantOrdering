
import UserService from "@/service/user.service";
import {Context} from "koa";

const service = new UserService();
class UserController {
    public static async getUser(ctx:Context) {
        console.log(ctx)
        const res = await service.create();
        ctx.body = res.name
    }
}

export default UserController;