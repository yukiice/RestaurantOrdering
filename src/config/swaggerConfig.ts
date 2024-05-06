import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'yukiicehub',
            version: '1.0.0',
        },
    },
    apis: ['./src/router/*.router.ts'], // files containing annotations as above
};

const specs = swaggerJsdoc(options);
export default specs;