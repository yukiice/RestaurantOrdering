import {autobind} from "@/utils/DecoratorThis";
import BaseController from "@/controller/base.controller";
import {Context} from "koa";
import UploadService from "@/service/upload.service";
const service = new UploadService();
class UploadController extends BaseController {
    constructor() {
        super();
    }
    @autobind
    async upload(ctx: Context) {
        ctx.body = await service.upload(ctx);
    }
    @autobind
    async download(ctx: Context) {
        ctx.body = await service.download(ctx);
    }
}

export default UploadController;