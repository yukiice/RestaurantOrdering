export function FindById(model: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            // 如果存在id，则使用id，params中的id或者query中的id,且作为搜索条件，否则不要做
            // 如果存在category_id，则使用category_id，params中的category_id或者query中的category_id
            let id = ctx.params.id
            const data = await model.findOne({
                where: {
                    id
                }
            });
            return originalMethod.apply(this, [id, data, ...args.slice(1)]);
        };
        return descriptor;
    };
}