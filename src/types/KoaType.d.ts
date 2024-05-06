import {Context,Next} from "koa";

export type KoaType = {
    ctx:Context,
    next:Next
}