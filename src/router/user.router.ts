import router from "@koa/router"
import UserController from "@/controller/user.controller";
const userRouter = new router({prefix: "/user"});

userRouter.post("/", UserController.getUser)
export default userRouter;