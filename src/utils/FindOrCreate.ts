export function FindOrCreateOrUpdate(model: any, operation: 'create' | 'update') {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: any[]) {
            const ctx = args[0];
            const requestBody = ctx.request.body;
            const userId = ctx.session?.id ? ctx.session.userId : 1;

            let data, created;
            if (operation === 'create') {
                [data, created] = await model.findOrCreate({
                    where:{
                        name: requestBody.name,
                    },
                    defaults: {
                        ...requestBody,
                        create_user: userId,
                        update_user: userId
                    }
                });
            } else if (operation === 'update') {
                data = await model.update({
                    ...requestBody,
                    update_user: userId
                }, {
                    where: {
                        id: requestBody.id
                    }
                });
                created = false;
            }

            return originalMethod.apply(this, [requestBody,data, created]);
        };
        return descriptor;
    };
}