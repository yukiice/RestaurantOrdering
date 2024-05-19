import nodemailer from 'nodemailer';
import {R} from "@/utils/R";
import redis from "@/config/redisConnect";
import {models} from "@/config/db";
class UserService{
    constructor(){
        console.log('User Service');
    }
    generateVerificationCode() {
        let code = Math.floor(Math.random() * 1000000);
        // 如果生成的数字小于6位，前面补0
        while(code < 100000) {
            code = Math.floor(Math.random() * 1000000);
        }
        return code;
    }
    async sendMsg(ctx:any){
        let transporter = nodemailer.createTransport({
            host: "smtp.163.com",
            port: 465,
            secure: true,
            auth: {
                user: 'javatestyukiice@163.com', // generated ethereal user
                pass: 'IXQADHCOAZKVCVTX', // generated ethereal password
            },
        });

        //  从body拿到email
        const {email} = ctx.request.body;
        // 如果没有email,返回错误
        if (!email) {
            return R.error('请输入邮箱');
        }
        // 生成随机的6位
        const code = this.generateVerificationCode();
        // 存储到redis里面
        redis.set(email, code);
        redis.expire(email, 60);
        await transporter.sendMail({
            from: '"YTing 👻" < javatestyukiice@163.com >', // sender address
            to: email, // list of receivers
            subject: `验证码为${code}`, // Subject line
            html: `<b>您的验证码为${code}</b>`, // html body
        });
        return R.success('发送成功')
    }
async login(ctx:any){
        const {email, code} = ctx.request.body;
        // 如果没有email,返回错误
        if (!email) {
            return R.error('请输入邮箱');
        }
        // 从redis里面拿到code
        const redisCode = await redis.get(email);
        if (redisCode !== code) {
            return R.error('验证码错误');
        }
        // 查询该用户是否在user表中
        // 如果没有，插入一条数据
    const [user] =  await models.user.findOrCreate({
        where: {
            email
        },
        defaults: {
            email
        }
    });
        // 设置session
    ctx.session.user = user.id;
    return R.success('登录成功');
    }

//     退出登录
    async logout(ctx:any){
        ctx.session = null;
        return R.success('退出成功');
    }

}
export default UserService;