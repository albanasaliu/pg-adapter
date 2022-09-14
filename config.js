require('dotenv').config();

module.exports = {
    postgresql: {
        host: process.env.PG_HOST,
        user: process.env.PG_USER,
        port: process.env.PG_PORT,
        password: process.env.PG_PASSWORD,
        db: process.env.PG_DATABASE,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    },
    port: process.env.PORT,
};