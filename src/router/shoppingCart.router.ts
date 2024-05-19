import router from "@koa/router"
import ShoppingCartController from "@/controller/shoppingCart.controller";
const shoppingCartRouter = new router({prefix: "/shoppingCart"});
const shoppingCartControllerImpl = new ShoppingCartController();
shoppingCartRouter.get("/list",shoppingCartControllerImpl.list)
shoppingCartRouter.post("/add",shoppingCartControllerImpl.add)
shoppingCartRouter.post("/sub", shoppingCartControllerImpl.sub)
shoppingCartRouter.delete("/clean", shoppingCartControllerImpl.clean)
export default shoppingCartRouter;