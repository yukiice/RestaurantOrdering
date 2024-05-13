import {Op} from "sequelize";

export function createQueryCondition(query: any) {
    const condition: { [key: string]: any } = {};
    for (const key in query) {
        if (query[key]) {
            condition[key] = {
                [Op.like]: `%${query[key]}%`
            };
        }
    }
    return condition;
}