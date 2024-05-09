import router from "@koa/router";
import CategoryController from "@/controller/category.controller";
const CategoryRouter = new router({ prefix: "/category" });
const CategoryControllerImpl = new CategoryController();

//分页查询
CategoryRouter.get("/page", CategoryControllerImpl.getList);
// 新增
CategoryRouter.post("/", CategoryControllerImpl.add);
// 编辑
CategoryRouter.put("/", CategoryControllerImpl.update);
// 删除
CategoryRouter.delete("/", CategoryControllerImpl.delete);
// 获取所有分类
CategoryRouter.get("/list", CategoryControllerImpl.getAll);
export default CategoryRouter;