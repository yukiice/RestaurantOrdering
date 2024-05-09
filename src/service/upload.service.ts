import {R} from "@/utils/R";


class UploadService {
    constructor() {
    }
    async upload(ctx: any) {
    //     对multer处理后的文件进行处理
        const file = ctx.request.file;
        const name = "/"+'upload_resource/'+file.filename;
        return R.success(name)
    //     对图片进行处理
    }
    async download(ctx: any) {
        const {name} = ctx.request.query;
        console.log(ctx.request.query)
        return name
    }
}

export default UploadService;