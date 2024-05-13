import router from "@koa/router";
import DishController from "@/controller/dish.controller";
const DishRouter = new router({ prefix: "/dish" });
const DishControllerImpl = new DishController();

// 分页查询
DishRouter.get("/page", DishControllerImpl.getList);
// 根据id获取菜品列表
DishRouter.get("/list", DishControllerImpl.getAllByCategoryId);
// 根据id获取数据
DishRouter.get("/:id", DishControllerImpl.getById);
// 新增
DishRouter.post("/", DishControllerImpl.add);
// 修改
DishRouter.put("/", DishControllerImpl.update);
// 删除, 逻辑删除，多删除
DishRouter.delete("/", DishControllerImpl.delete);
// 状态修改，多修改
DishRouter.put("/status/:status", DishControllerImpl.updateStatus);
export default DishRouter;