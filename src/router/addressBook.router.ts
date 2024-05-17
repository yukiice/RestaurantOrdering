import router from "@koa/router";
import addressBookController from "@/controller/addressBook.controller";
const addressBookRouter = new router({ prefix: "/addressBook" });
const addressBookControllerImpl = new addressBookController();
// 分页查询
addressBookRouter.get("/list", addressBookControllerImpl.getList);
// 获取默认地址
addressBookRouter.get("/default", addressBookControllerImpl.getDefault);
// 设为默认
addressBookRouter.put("/default", addressBookControllerImpl.setDefault);
// 添加地址
addressBookRouter.post("/", addressBookControllerImpl.add);
// 更新地址
addressBookRouter.put("/", addressBookControllerImpl.update);
// 删除地址
addressBookRouter.delete("/", addressBookControllerImpl.delete);
// 获取地址详情
addressBookRouter.get("/:id", addressBookControllerImpl.getById);
export default addressBookRouter;