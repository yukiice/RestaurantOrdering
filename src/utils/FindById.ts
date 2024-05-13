export function FindById(model: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            const id = ctx.params.id;
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