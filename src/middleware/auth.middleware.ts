// auth.middleware.ts
import Koa from "koa";
import {R} from "@/utils/R";

export default function authMiddleware(ctx: Koa.Context, next: Koa.Next) {
    if (ctx.session.user) {
        return next();
    } else {
        ctx.status = 401;
        ctx.body = R.error('未登录');
    }
}