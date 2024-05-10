import {R} from "@/utils/R";

export function UpdateStatus(model: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            const ids = ctx.request.query;
            const { status } = ctx.params;

            const data = await model.update({
                status
            }, {
                where: {
                    id: ids.split(',')
                }
            });

            if (data[0] === 0) {
                return R.error("更新状态失败");
            }
            return R.success("更新状态成功");
        };
        return descriptor;
    };
}