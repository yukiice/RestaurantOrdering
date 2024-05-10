import {R} from "@/utils/R";

export function DeleteMore(model1: any, model2: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            const ids = ctx.request.query.ids;

            const data = await model1.update({
                is_deleted: 1
            }, {
                where: {
                    id: ids.split(',')
                }
            });

            await model2.update({
                is_deleted: 1
            }, {
                where: {
                    dish_id: ids.split(',')
                }
            });

            if (data[0] === 0) {
                return R.error("删除失败");
            }
            return R.success("删除成功");
        };
        return descriptor;
    };
}