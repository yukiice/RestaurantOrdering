import {R} from "@/utils/R";

export function UpdateWithUser(model: any) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            const requestBody = ctx.request.body;
            requestBody.update_user = ctx.session?.id ? ctx.session.userId : 1;

            const data = await model.update({
                ...requestBody
            }, {
                where: {
                    id: requestBody.id
                }
            });

            return originalMethod.apply(this, [R.success(data), ...args.slice(1)]);
        };
        return descriptor;
    };
}