import process from 'node:process';  //获取、设置和删除环境变量

import { cleanEnv, port, str } from 'envalid';

const environment = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ['development', 'production', 'test'],
        default: 'development',
    }),
    PORT: port({ default: 3000 }),
    SECRET: str({
        example: 'must-be-a-very-long-string-at-least-32-chars',
        desc: 'The secret to sign the JSON Web Tokens',
        default: 'frisbee-triumph-entail-janitor-impale',
    }),
});

export default environment;