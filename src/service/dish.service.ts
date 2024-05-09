import {Op} from "sequelize";
import {R} from "@/utils/R";
import {models} from "@/config/db";
import { v4 as uuidv4 } from 'uuid';
class DishService{
    constructor() {

    }
    async getList(ctx: any){
        const {page, pageSize, name} = ctx.request.query;
        let whereCondition = {};
        name && (whereCondition = {
            name: {
                [Op.like]: `%${name}%`
            }
        });

        const data = await models.dish.findAndCountAll({
            where: whereCondition,
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize),
        });

        // After getting the dishes, get the categories for each dish
        for (let dish of data.rows) {
            const category = await models.category.findOne({
                where: {
                    id: dish.category_id
                }
            });
        //     category_name不在dish表中，需要手动添加
            // @ts-ignore
            dish.dataValues.category_name = category.name;
        }
        const list = {
            records: data.rows,
            page: Number(page),
            pageSize: Number(pageSize),
            total: data.count
        };
        return R.success(list);
    }
    async add(ctx: any){
        const args = ctx.request.body;
        console.log(args)
        // 查重
        const isHave = await models.dish.findOne({
            where: {
                name: args.name
            }
        });
        if (isHave) {
            return R.error("菜品名称已存在");
        }
        const data = await models.dish.create({
            id: Number(uuidv4()),
            name: args.name,
            price: args.price,
            category_id: args.categoryId,
            code: args.code,
            image: args.image,
            description: args.description,
            status: args.status,
            create_user: ctx.session.userId??1,
            update_user: ctx.session.userId??1
        });
        // for (const item of args.flavors) {
        //     await models.dish_flavor.create({
        //         dish_id: data,
        //         name: item.name,
        //         value: item.value,
        //         create_user: ctx.session.userId??1,
        //         update_user: ctx.session.userId??1
        //     })
        // }
        return R.success(data);
    }

    async update(ctx: any){
        const {id, name, price, category_id} = ctx.request.body;
        if (!name || !price || !category_id) {
            return R.error("参数错误");
        }
        // update
        const data = await models.dish.update({
            name,
            price,
            category_id
        }, {
            where: {
                id
            }
        });
        return R.success(data);
    }
}

export default DishService;