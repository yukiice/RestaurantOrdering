import { Sequelize } from 'sequelize';
import {dbConfig} from '@/config/dbConfig';
import {initModels} from '@/models/init-models';
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    logging: console.log
});
const models =  initModels(sequelize);
export {sequelize, models};
