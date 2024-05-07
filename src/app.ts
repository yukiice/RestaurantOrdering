import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import env from '@/config/env';
import useRoutes from '@/router';
import cors from '@koa/cors';
import serve from 'koa-static';
import session from 'koa-session';
const app = new Koa({ env: env.NODE_ENV });
app.keys =['yukiice_key']
app.use(bodyParser());
app.use(cors());
app.use(serve('static'));
app.use(session(app));
useRoutes.apply(app);

if (!env.isTest) app.use(logger());

export default app;