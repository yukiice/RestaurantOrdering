import fs from 'fs';
import path from 'path';
import Koa from 'koa';

const useRoutes = function(this: Koa) {
    const files = fs.readdirSync(__dirname);
    for (const file of files) {
        if (file === 'index.ts') continue;
        import(path.join(__dirname, file)).then(router => {
            this.use(router.default.routes());
            this.use(router.default.allowedMethods());
        });
    }
}

export default useRoutes;