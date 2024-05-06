import { Sequelize } from 'sequelize';
import env from '@/config/env'

// const sequelize = new Sequelize('it_cast', 'root', 'yukiice123..', {
//   host: '49.235.70.200',
//   dialect: 'mysql',
//   logging: console.log
// });
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: env.isTest ? ':memory:' : 'database.sqlite',
    logging: env.isDevelopment ? console.log : false,
});

export default sequelize;