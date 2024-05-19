import {Context} from "koa";
import {models} from "@/config/db";
import {categoryAttributes} from "@/models/category";
import {Op} from "sequelize";
import {R} from "@/utils/R";
class CategoryService{
    constructor(){

    }
    async getList(ctx:Context){
        const {page, pageSize,name} = ctx.request.query;
        let whereCondition = {};
        name &&  ( whereCondition = {
            name: {
                [Op.like]: `%${name}%`
            }
        })
        const data = await models.category.findAndCountAll({
            where: whereCondition,
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize),
            order: [['sort', 'ASC']]
        });
        const list = {
            records: data.rows,
            page: Number(page),
            pageSize: Number(pageSize),
            total: data.count
        }
        return R.success(list);
    }

    async add(ctx:Context){
        const args = ctx.request.body as categoryAttributes;
        // 查重
        const isCategory = await models.category.findOne({
            where: {
                name: args.name
            }
        });
        if(isCategory){
            return R.error('分类已存在');
        }else{
            // 添加create_time update_time create_user update_user
            args.create_time = new Date();
            args.update_time = new Date();
            args.create_user = ctx.session.userId??1;
            args.update_user = ctx.session.userId??1;
            await models.category.create(args);
            return R.success('添加成功');
        }
    }

    async update(ctx:Context){
        const args = ctx.request.body as categoryAttributes;
            // 添加update_time update_user
            args.update_time = new Date();
            args.update_user = ctx.session.userId??1;
            await models.category.update(args,{
                where: {
                    id: args.id
                }
            });
            return R.success('修改成功');
    }
    async delete(ctx:Context){
        const {ids} = ctx.request.query as {ids:string};
        await models.category.destroy({
            where: {
                id:ids
            }
        });
        return R.success('删除成功');
    }

    async getAll(ctx:Context){
        const whereCondition = {};
        // @ts-ignore
        ctx.request.query.type && (whereCondition['type'] = ctx.request.query.type);
        const data = await models.category.findAll({
            where: whereCondition
        });
        return R.success(data);
    }
}

export default CategoryService;