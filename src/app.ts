import 'reflect-metadata';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import env from '@/config/env';
import useRoutes from '@/router';

const app = new Koa({ env: env.NODE_ENV });
app.use(bodyParser());
useRoutes.apply(app);

if (!env.isTest) app.use(logger());

export default app;