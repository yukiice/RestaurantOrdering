import {sequelize} from "@/config/db";

class UserService{
    constructor(){
        console.log('User Service');
    }
    async create(){
        const stateMent = 'select * from category;';
        return await sequelize.query(stateMent);
    }
}
export default UserService;