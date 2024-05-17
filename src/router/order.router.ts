import router from "@koa/router";
import orderController from "@/controller/order.controller";
const orderRouter = new router({ prefix: "/order" });
const orderControllerImpl = new orderController();
// 分页查询
orderRouter.get("/userPage", orderControllerImpl.getListByUserPage);
// 分页查询
orderRouter.get("/page", orderControllerImpl.getListByUserPage);
// 创建订单
orderRouter.post("/submit", orderControllerImpl.create);
export default orderRouter;