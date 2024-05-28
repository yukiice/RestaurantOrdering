import {R} from "@/utils/R";
import {models} from "@/config/db";
import {Op} from "sequelize";


class OrderService {
    constructor() {
    }
    async getListByUserPage(ctx: any) {
        const {page, pageSize} = ctx.request.query;
        // 生成可能存在的查询条件number
        let where = {};
        ctx.request.query.number &&  ( where = {
            number: {
                [Op.like]: `%${ctx.request.query.number}%`
            }
        })
        const data = await models.orders.findAndCountAll({
            offset: (Number(page) - 1) * Number(pageSize),
            limit: Number(pageSize),
            where: where
        });
        // 获取order_details匹配order的id
        for (let order of data.rows) {
            // @ts-ignore
            order.dataValues.orderDetails = await models.order_detail.findAll({
                where: {
                    order_id: order.id
                }
            });
        }
        console.log(data.rows);
        const list = {
            records: data.rows,
            page: Number(page),
            pageSize: Number(pageSize),
            total: data.count
        };
        return R.success(list);
    }
    async create(ctx: any) {
        const args  = ctx.request.body;
        // 根据用户id拿到当前用户的购物车数据
        const userId = ctx.session.userId ? ctx.session.userId : 1;
        const order = await models.shopping_cart.findAll({
            where: {
                user_id: userId
            }
        });
        // 如果购物车为空，返回错误
        if (order.length === 0) {
            return R.error('购物车为空');
        }
        // 根据address_book_id拿到地址信息
        const addressBookId = args.addressBookId;
        const addressBook = await models.address_book.findOne({
            where: {
                id: addressBookId
            }
        });
        // 生成一个订单号
        const orderNo = new Date().getTime() + '' + userId;
        // 拿到购物车中的总金额
        let totalAmount = 0;
        for (let item of order) {
            totalAmount += Number(item.dataValues.amount);
        }
        // 创建订单明细
        for (const item of order) {
            await models.order_detail.create({
                order_id: Number(orderNo),
                name: item.name,
                image: item.image,
                dish_id: item.dish_id,
                setmeal_id: item.setmeal_id,
                dish_flavor: item.dish_flavor,
                number: item.number,
                amount: item.amount
            });
        }
        console.log(args,'args')
        console.log(addressBook.consignee??'')
        console.log(totalAmount,'totalAmount')
        console.log(addressBook.phone)
        // 创建订单
       const  orderData = await models.orders.create({
           number: orderNo,
           user_id: userId,
           user_name: addressBook.consignee,
           status: 1,
           address_book_id: Number(addressBookId),
           amount: totalAmount,
           remark: args.remark,
           pay_method: args.payMethod,
           order_time: new Date(),
           checkout_time: new Date(),
           phone: addressBook.phone,
           address: (addressBook.city_name??'') + (addressBook.district_name??'')+ (addressBook.detail??''),
           consignee: addressBook.consignee??'',
       });
        if (!orderData) {
            return R.error('创建失败');
        }
        // 删除购物车数据
        await models.shopping_cart.destroy({
            where: {
                user_id: userId
            }
        });
        return R.success('创建成功');
    }
    async updateStatus(ctx: any) {
        const args = ctx.request.body;
        const order = await models.orders.findByPk(args.id);
        if (!order) {
            return R.error('订单不存在');
        }
        await order.update({
            status: args.status
        });
        return R.success('修改成功');
    }
}

export default OrderService;