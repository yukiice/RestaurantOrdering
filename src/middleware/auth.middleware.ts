// auth.middleware.ts
import Koa from "koa";
import {R} from "@/utils/R";

export default function authMiddleware(ctx: Koa.Context, next: Koa.Next) {
    console.log(ctx.session.user)
    if (ctx.session.user) {
        return next();
    } else {
        ctx.body = R.error('NOTLOGIN');
    }
}