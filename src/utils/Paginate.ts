import {Context} from "koa";
import {Op} from "sequelize";
import {R} from "@/utils/R";

export function paginate(model: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = async function(ctx: Context) {
            const {page, pageSize, name} = ctx.request.query;
            let whereCondition = {};
            name && (whereCondition = {
                name: {
                    [Op.like]: `%${name}%`
                }
            });
            const data = await model.findAndCountAll({
                where: whereCondition,
                offset: (Number(page) - 1) * Number(pageSize),
                limit: Number(pageSize)
            });
            const list = {
                records: data.rows,
                page: Number(page),
                pageSize: Number(pageSize),
                total: data.count
            };
            return R.success(list);
        };
        return descriptor;
    };
}