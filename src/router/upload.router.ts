import router from "@koa/router";
import UploadController from "@/controller/upload.controller";
import uploadMiddleware from "@/middleware/upload.middleware";
const UploadRouter = new router({ prefix: "/common" });
const UploadControllerImpl = new UploadController();
// 地址为项目中的assets文件夹
// 上传文件
UploadRouter.post("/upload",uploadMiddleware,UploadControllerImpl.upload);

// 下载文件
UploadRouter.post("/download",UploadControllerImpl.download);

export default UploadRouter;