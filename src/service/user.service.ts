import nodemailer from 'nodemailer';
import {R} from "@/utils/R";
class UserService{
    constructor(){
        console.log('User Service');
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
        console.log(email)
      const info =   await transporter.sendMail({

            from: '"YTing 👻" < javatestyukiice@163.com >', // sender address
            to: email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });
        console.log("Message sent: %s", info);
        return R.success('发送成功')
    }
}
export default UserService;