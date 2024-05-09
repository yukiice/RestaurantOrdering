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
// 根据id查询员工
EmployeeRouter.get("/:id",EmployeeControllerImpl.getById)
// 员工修改
EmployeeRouter.put("/",EmployeeControllerImpl.update)
export default EmployeeRouter;