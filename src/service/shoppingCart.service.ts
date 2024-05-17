import {R} from "@/utils/R";
import {models} from "@/config/db";

class ShoppingCartService {
    constructor() {
    }
    async list(ctx: any) {
        // 拿到shopping_cart表中的数据，以数组形式传回
        const data = await models.shopping_cart.findAll();
        // 对data进行遍历去重，如果有重复的数据，只保留一条，同时新增一个字段number，表示该商品的数量，其他数据保持不变
        let result: any[] = [];
        data.forEach((item) => {
            const index = result.findIndex((value) => value.name === item.name);
            if (index === -1) {
                result.push({
                    ...item.dataValues,
                    number: 1
                });
            } else {
                result[index].number++;
            }
        });
        return R.success(result);
    }
    async add(ctx: any) {
        // 获取请求的参数
        const requestBody = ctx.request.body;
        const user_id = ctx.session?.id ? ctx.session.userId : 1;
        // 在shopping_cart表中创建一条数据
        const data = await models.shopping_cart.create({
            ...requestBody,
            user_id
        });
        return R.success(data)
    }
    async sub(ctx: any) {
        // 获取请求的参数
        const requestBody = ctx.request.body;
        // 如果是dish_id，就在shopping_cart表中找到对应的数据，然后将number减1
        // 如果是setmeal_id，就在shopping_cart表中找到对应的数据，然后将number减1
        const whereCondition:any = {}
        if (requestBody.dish_id) {
            whereCondition['dish_id'] = requestBody.dish_id;
        } else if (requestBody.setmeal_id) {
            whereCondition['setmeal_id'] = requestBody.setmeal_id;
        }
        // 对数据进行删除
        const data = await models.shopping_cart.destroy({
            where: whereCondition
        });
        // 删除失败，返回错误信息
        if (!data) {
            return R.error('删除失败')
        }
        return R.success('')
    }
    async clean(ctx: any) {
        // 如果表中没有数据，返回购物车为空
        const datas = await models.shopping_cart.findAll();
        console.log(datas)
        if (datas.length === 0) {
            return R.error('购物车为空')
        }
        // 在shopping_cart表中删除所有数据
        const data = await models.shopping_cart.destroy({
            where: {}
        });
        if (!data) {
            return R.error('删除失败')
        }
        return R.success('')
    }
}

export default ShoppingCartService;