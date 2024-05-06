import { Sequelize } from 'sequelize';
import {dbConfig} from '@/config/dbConfig';
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql',
    logging: console.log
});
export default sequelize;
