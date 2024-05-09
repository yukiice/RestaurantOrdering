import router from "@koa/router";
import DishController from "@/controller/dish.controller";
const DishRouter = new router({ prefix: "/dish" });
const DishControllerImpl = new DishController();

// 分页查询
DishRouter.get("/page", DishControllerImpl.getList);
// 新增
DishRouter.post("/", DishControllerImpl.add);
// 修改
DishRouter.put("/", DishControllerImpl.update);

export default DishRouter;