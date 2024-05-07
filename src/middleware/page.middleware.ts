import Koa from "koa";

export default function paginationMiddleware(ctx: Koa.Context, next: Koa.Next) {
    let page: number = Number(ctx.request.query.page)
    let pageSize = Number(ctx.request.query.pageSize)


    // 检查 page 和 pageSize 是否是有效的数字
    if (isNaN(page) || page < 1) {
        page = 1; // 默认值
    }
    if (isNaN(pageSize) || pageSize < 1) {
        pageSize = 10; // 默认值
    }

    // 将分页信息添加到 ctx.state 中
    ctx.state.page = page.toString();
    ctx.state.pageSize = pageSize.toString();
    return next();
}