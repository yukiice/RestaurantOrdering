import {SoftSelectByName} from "@/utils/SoftSelectByName";
import {models} from "@/config/db";
import {R} from "@/utils/R";

class DishService {
    constructor() {

    }
    @SoftSelectByName(models.dish)
    async getList(ctx: any){
        const [data,page,pageSize] = arguments;
        for (let dish of data.rows) {
            const category = await models.category.findOne({
                where: {
                    id: dish.category_id,
                }
            });
            // @ts-ignore
            dish.dataValues.category_name = category.name;
        }
        const list = {
            records: data.rows,
            page: Number(page),
            pageSize: Number(pageSize),
            total: data.count
        };
        return R.success(list);
    }
}

export default DishService;