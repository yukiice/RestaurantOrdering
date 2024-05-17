import {R} from "@/utils/R";
import {models} from "@/config/db";
import {FindById} from "@/utils/FindById";


class AddressBookService {
    constructor() {
    }
    async getList(ctx: any) {
        // 拿到address_book里的列表数据
        const data = await models.address_book.findAll({
            where:{
                is_deleted: 0
            }
        });
        // @ts-ignore
        data.map(item => {
            // @ts-ignore
            item.dataValues.is_default = item.dataValues.is_default ? 1 : 0;
        });
        return R.success(data);
    }
    async setDefault(ctx: any) {
        const {id} = ctx.request.body;
        await models.address_book.update({
            is_default: 0
        }, {
            where: {
                is_deleted: 0
            }
        });
        await models.address_book.update({
            is_default: 1
        }, {
            where: {
                id
            }
        });
        return R.success('设置成功');
    }
    async add(ctx: any) {
        const args = ctx.request.body;
        const userId = ctx.session.userId?ctx.session.userId:1;
        await models.address_book.create({
            ...args,
            create_user: userId,
            update_user: userId,
            user_id: userId
        });
        return R.success('添加成功');
    }

    @FindById(models.address_book)
    async getById(ctx: any) {
        const [id,data] = arguments;
        console.log(id)
        return R.success(data);
    }
    async update(ctx: any) {
        const args = ctx.request.body;
        const userId = ctx.session.userId?ctx.session.userId:1;
        await models.address_book.update({
            ...args,
            update_user: userId
        }, {
            where: {
                id: args.id
            }
        });
        return R.success('更新成功');
    }
    async delete(ctx: any) {
        const {ids} = ctx.request.query;
        await models.address_book.update({
            is_deleted: 1
        }, {
            where: {
                id: ids
            }
        });
        return R.success('删除成功');
    }
    async getDefault(ctx: any) {
        const data = await models.address_book.findOne({
            where: {
                is_default: 1
            }
        });
        return R.success(data);
    }
}

export default AddressBookService;