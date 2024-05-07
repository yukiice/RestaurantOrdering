import router from "@koa/router"
import EmployeeController from "@/controller/employee.controller";
const EmployeeRouter = new router({prefix: "/employee"});
const EmployeeControllerImpl = new EmployeeController();
EmployeeRouter.post("/login", EmployeeControllerImpl.findUser)
EmployeeRouter.post("/logout",EmployeeControllerImpl.logout)
EmployeeRouter.get("/page",EmployeeControllerImpl.getList)
export default EmployeeRouter;