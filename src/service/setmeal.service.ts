import {SoftSelectByName} from "@/utils/SoftSelectByName";
import {models} from "@/config/db";
import {R} from "@/utils/R";
import {FindById} from "@/utils/FindById";
import {FindOrCreateOrUpdate} from "@/utils/FindOrCreate";
import {DeleteMore} from "@/utils/DeleteMore";
import {Context} from "koa";
import {UpdateStatus} from "@/utils/UpdateStatus";

class DishService {
    constructor() {

    }
    @SoftSelectByName(models.setmeal)
    async getList(ctx: any){
        const [data,page,pageSize] = arguments;
        console.log(data.rows)
        for (let setmeal of data.rows) {
            const category = await models.category.findOne({
                where: {
                    id: setmeal.category_id,
                }
            });
            console.log(category.name)
            // @ts-ignore
            setmeal.dataValues.category_name = category.name;
        }
        console.log(data.rows)
        const list = {
            records: data.rows,
            page: Number(page),
            pageSize: Number(pageSize),
            total: data.count
        };
        return R.success(list);
    }
    @FindById(models.setmeal)
    async getById(ctx: any){
        const [id, data] = arguments;
        if (!data) {
            return R.error('套餐不存在');
        }
        // 获取dish的flavors
        // @ts-ignore
        data.dataValues.setmealDishes = await models.setmeal_dish.findAll({
            where: {
                setmeal_id: id
            }
        });

        return R.success(data);
    }
    async getByCategoryId(ctx: any){
        const {category_id} = ctx.query;
        const data = await models.setmeal.findAll({
            where: {
                category_id
            }
        });
        return R.success(data);
    }

    @FindOrCreateOrUpdate(models.setmeal, 'create')
    async add(ctx: any){
        const [requestBody,data,created] = arguments;
        if (!created) {
            return R.error('套餐已存在');
        }
        const userId = ctx.session?.id ? ctx.session.userId : 1;
        for (const item of requestBody.setmealDishes) {
            await models.setmeal_dish.create({
                setmeal_id: data.id,
                ...item,
                create_user: userId,
                update_user: userId
            })
        }
        return R.success('新增套餐成功');
    }

    @FindOrCreateOrUpdate(models.setmeal, 'update')
    async update(ctx: any){
        const [requestBody,data] = arguments;
        if (data[0] === 0) {
            return R.error('菜品不存在');
        }
        const userId = ctx.session?.id ? ctx.session.userId : 1;
        // 更新dish_flavor
        for (const item of requestBody.setmealDishes) {
            await models.setmeal_dish.update({
                ...item,
                update_user: userId
            }, {
                where: {
                    setmeal_id: requestBody.id
                }
            })
        }
        return R.success('更新菜品成功');
    }
    @DeleteMore(models.setmeal, models.setmeal_dish)
    async delete(ctx: Context){
    }
    @UpdateStatus(models.setmeal)
    async updateStatus(ctx: Context){
    }
}

export default DishService;