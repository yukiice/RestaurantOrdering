import {R} from "@/utils/R";
import {models} from "@/config/db";
import {UpdateStatus} from "@/utils/UpdateStatus";
import {DeleteMore} from "@/utils/DeleteMore";
import {Context} from "koa";
import {FindOrCreateOrUpdate} from "@/utils/FindOrCreate";
import {SoftSelectByName} from "@/utils/SoftSelectByName";
import {FindById} from "@/utils/FindById";
import {createQueryCondition} from "@/utils/QuerySelect";
class DishService{
    constructor() {

    }
    @SoftSelectByName(models.dish)
    async getList(ctx: any){
        const [data,page,pageSize] = arguments;
        for (let dish of data.rows) {
            const category = await models.category.findOne({
                where: {
                    id: dish.category_id,
                }
            });
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
    @FindById(models.dish)
    async getById(ctx: any){
        const [id, data] = arguments;
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
                ...item,
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
    async getAllByCategoryId(ctx: any){
        const condition = createQueryCondition(ctx.query);
        const data = await models.dish.findAll({
            where: condition
        });
        return R.success(data);
    }
}

export default DishService;