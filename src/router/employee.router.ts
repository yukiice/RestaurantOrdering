import router from "@koa/router"
import EmployeeController from "@/controller/employee.controller";
const EmployeeRouter = new router({prefix: "/employee"});
const EmployeeControllerImpl = new EmployeeController();
// 登录
EmployeeRouter.post("/login", EmployeeControllerImpl.findUser)
// 登出
EmployeeRouter.post("/logout",EmployeeControllerImpl.logout)
// 员工查询
EmployeeRouter.get("/page",EmployeeControllerImpl.getList)
// 员工新增
EmployeeRouter.post("/",EmployeeControllerImpl.add)
export default EmployeeRouter;