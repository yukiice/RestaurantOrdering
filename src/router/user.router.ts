import router from "@koa/router"
import UserController from "@/controller/user.controller";
const userRouter = new router({prefix: "/user"});
const userControllerImpl = new UserController();
// 获取验证码操作
userRouter.post("/sendMsg", userControllerImpl.sendMsg)
// 登录操作
userRouter.post("/login", userControllerImpl.login)
// 退出登录
userRouter.post("/loginout", userControllerImpl.logout)
export default userRouter;