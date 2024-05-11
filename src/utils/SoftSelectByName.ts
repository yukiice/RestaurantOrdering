import {Op} from "sequelize";

type WhereConditionType = {
    is_deleted: number;
    name?: {
        [Op.like]: string;
    };
};
export function SoftSelectByName(model: any)  {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            console.log(ctx.request.query)
            const {page, pageSize, name} = ctx.request.query;
            let whereCondition:WhereConditionType = {
                is_deleted: 0
            };
            name && (whereCondition = {
                ...whereCondition,
                name: {
                    [Op.like]: `%${name}%`
                }
            });

            const data = await model.findAndCountAll({
                where: whereCondition,
                offset: (Number(page) - 1) * Number(pageSize),
                limit: Number(pageSize),
            })
            return originalMethod.apply(this, [data, page, pageSize, ...args.slice(1)]);
        };
        return descriptor;
    };
}