import multer from "@koa/multer";

// 生成一个上传中间件,对上传文件的名字进行处理,文件夹格式为年月日+文件名,文件名字使用uuid生成
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 地址为项目中的assets文件夹
        cb(null, 'assets/upload_resource')
    },
    filename: function (req, file, cb) {
        const fileFormat = (file.originalname).split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    }
})
const upload = multer({ storage: storage });
const uploadMiddleware = upload.single('file');
export default uploadMiddleware;
