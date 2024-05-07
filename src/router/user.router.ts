import router from "@koa/router"
import UserController from "@/controller/user.controller";
const userRouter = new router({prefix: "/user"});
const userControllerImpl = new UserController();
userRouter.post("/", userControllerImpl.getUser)
export default userRouter;