import {models} from "@/config/db";
import {Context} from "koa";
import {employeeAttributes} from "@/models/employee";
import crypto from 'crypto';
import {R} from "@/utils/R";

class EmployeeService{
    constructor(){
        console.log('User Service');
    }
    async findUser(ctx:Context){
        const {username, password} = ctx.request.body as employeeAttributes;
        // 对密码进行md5加密
        const md5 = crypto.createHash('md5');
        const password_md5 = md5.update(password).digest('hex');
        // 根据username查询用户，查到后与现在的密码进行比对
        const user = await models.employee.findOne({
            where: {
                username
            }
        });
        if(user){
            if(user.password === password_md5){
                ctx.session.userId = user.id;
                return R.success('登陆成功')
            }else{
                return R.error('密码错误')
            }
        }else{
            return R.error('用户不存在')
        }
    }

    async logout(ctx:Context){
        ctx.session.userId = null;
        return R.success('退出成功')
    }

    async getList(ctx:Context){
        const {page, pageSize} = ctx.request.query;
        console.log(page,pageSize)
        const data = await models.employee.findAndCountAll({
            limit: Number(pageSize),
            offset: (Number(page) - 1) * Number(pageSize)
        });
        const list = {
            records: data.rows,
            page: Number(page),
            pageSize: Number(pageSize),
            total: data.count
        }
        // 设计一个对象，data为record，当前页码为page，每页数量为pageSize，总数为total
        return R.success(list)
    }
}
export default EmployeeService;