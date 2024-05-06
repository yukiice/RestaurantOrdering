import {koaSwagger} from "koa2-swagger-ui";
import swaggerConfig from "@/config/swaggerConfig";
import koa_router from "@koa/router";
const swaggerRouter = new koa_router();
swaggerRouter.get("/swagger", koaSwagger({
    routePrefix: false, // host at / instead of default /swagger-html
    swaggerOptions: {
        url: '/api-docs', // you need to change it to the url where your swagger json is hosted
    },
}));

swaggerRouter.get('/api-docs', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = swaggerConfig;
});

export default swaggerRouter;