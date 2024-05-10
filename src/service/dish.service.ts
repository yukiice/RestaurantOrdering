import {Op} from "sequelize";
import {R} from "@/utils/R";
import {models} from "@/config/db";
import {UpdateStatus} from "@/utils/UpdateStatus";
import {DeleteMore} from "@/utils/DeleteMore";
import {Context} from "koa";
import {FindOrCreateOrUpdate} from "@/utils/FindOrCreate";

type WhereConditionType = {
    is_deleted: number;
    name?: {
        [Op.like]: string;
    };
};
class DishService{
    constructor() {

    }
    async getList(ctx: any){
        const {page, pageSize, name} = ctx.request.query;
        // 搜索的is_deleted为0的数据
         let whereCondition:WhereConditionType = {
                is_deleted: 0
          };
        name && (whereCondition = {
            ...whereCondition,
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
                    id: dish.category_id,
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

    async getById(ctx: any){
        const id = ctx.params.id;
        const data = await models.dish.findOne({
            where: {
                id
            }
        });
        if (!data) {
            return R.error('菜品不存在');
        }
        // 获取dish的flavors
        // @ts-ignore
        data.dataValues.flavors = await models.dish_flavor.findAll({
            where: {
                dish_id: id
            }
        });

        return R.success(data);
    }

    @FindOrCreateOrUpdate(models.dish, 'create')
    async add(ctx: any){
        const [requestBody,data,created] = arguments;
        if (!created) {
            return R.error('菜品已存在');
        }
        const userId = ctx.session?.id ? ctx.session.userId : 1;
        for (const item of requestBody.flavors) {
            await models.dish_flavor.create({
                dish_id: data.id,
                name: item.name,
                value: item.value,
                create_user: userId,
                update_user: userId
            })
        }
        return R.success('新增菜品成功');
    }
    @FindOrCreateOrUpdate(models.dish, 'update')
    async update(ctx: any){
        const [requestBody,data] = arguments;
        if (data[0] === 0) {
            return R.error('菜品不存在');
        }
        const userId = ctx.session?.id ? ctx.session.userId : 1;
        // 更新dish_flavor
        for (const item of requestBody.flavors) {
            await models.dish_flavor.update({
                name: item.name,
                value: item.value,
                update_user: userId
            }, {
                where: {
                    dish_id: requestBody.id
                }
            })
        }
        return R.success('更新菜品成功');
    }

    @DeleteMore(models.dish, models.dish_flavor)
    async delete(ctx: Context){
    }
    @UpdateStatus(models.dish)
    async updateStatus(ctx: Context){
    }
}

export default DishService;