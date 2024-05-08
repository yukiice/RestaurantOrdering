import {models} from "@/config/db";
import {Context} from "koa";
import {employeeAttributes} from "@/models/employee";
import crypto from 'crypto';
import {R} from "@/utils/R";
import {Op} from "sequelize";

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
        const {page, pageSize,name} = ctx.request.query;
        let whereCondition = {};
        name &&  ( whereCondition = {
            name: {
                [Op.like]: `%${name}%`
            }
        })
        console.log(whereCondition)
        const data = await models.employee.findAndCountAll({
            where: whereCondition,
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize)
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

    async add(ctx:Context) {
        // 用户会输入用户数据，employeeAttributes的必传字段
        // @ts-ignore
        const {name, username, idNumber:id_number, sex, phone} = ctx.request.body as employeeAttributes;

        // 对手机号和身份证号进行正则校验
        const phoneReg = /^1[3-9]\d{9}$/;
        const idNumberReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!phoneReg.test(phone)){
            return R.error('手机号格式错误');
        }
        if(!idNumberReg.test(id_number)){
            return R.error('身份证号格式错误');
        }
        // 初始化密码为123456
        const md5 = crypto.createHash('md5');
        const password_md5 = md5.update('123456').digest('hex');
        // 用户添加
        // 使用findOrCreate方法查找或创建用户
        const [user, created] = await models.employee.findOrCreate({
            where: { username },
            defaults: {
                name,
                username,
                id_number,
                create_time: new Date(),
                update_time: new Date(),
                create_user: 1,
                update_user: 1,
                sex,
                phone,
                password: password_md5
            }
        });
        if (created) {
            return R.success(user);
        } else {
            return R.error('用户已存在');
        }
    }
}
export default EmployeeService;