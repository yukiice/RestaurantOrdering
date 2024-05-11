import router from "@koa/router";
import setMealController from "@/controller/setmeal.controller";
const setMealRouter = new router({ prefix: "/setmeal" });
const setMealControllerImpl = new setMealController();

// 分页查询
setMealRouter.get("/page", setMealControllerImpl.getList);
// 根据id获取数据
// setMealRouter.get("/:id", DishControllerImpl.getById);
// // 新增
// setMealRouter.post("/", DishControllerImpl.add);
// // 修改
// setMealRouter.put("/", DishControllerImpl.update);
// // 删除, 逻辑删除，多删除
// setMealRouter.delete("/", DishControllerImpl.delete);
// // 状态修改，多修改
// setMealRouter.put("/status/:status", DishControllerImpl.updateStatus);
export default setMealRouter;