import {R} from "@/utils/R";

export function GetDetailById(dishModel: any, flavorModel: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            const id = ctx.params.id;
            const data = await dishModel.findOne({
                where: {
                    id
                }
            });

            if (!data) {
                return R.error('菜品不存在');
            }

            // @ts-ignore
            data.dataValues.flavors = await flavorModel.findAll({
                where: {
                    dish_id: id
                }
            });

            return originalMethod.apply(this, [R.success(data), ...args.slice(1)]);
        };
        return descriptor;
    };
}