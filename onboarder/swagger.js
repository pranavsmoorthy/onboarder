const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
    openapi: '3.0.0',
        info: {
            title: 'Onboarder API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/admin/*.js', './routes/protected/*.js', './routes/public/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;