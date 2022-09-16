function postgresql_connection() {
    const readline = require("readline-sync");
    const { Pool, Client } = require("pg");
    const config = require("./config");

    let input = readline.question("What kind of connection do you want to establish? (Pool or Client): ");
    let user_input = input.toLocaleLowerCase();
    const query = `SELECT * FROM support.tickets`;

    if (user_input === "pool") {
        //creating a pool
        const PG_DB = new Pool({
            "host": config.postgresql.host,
            "user": config.postgresql.user,
            "port": config.postgresql.port,
            "password": config.postgresql.password,
            "database": config.postgresql.db,
        });
        (async () => {
            try {
                const pool_conn = await PG_DB.connect();
                const res = await pool_conn.query(query);

                for (let row of res.rows) {
                    console.log(row);
                }
                console.log(`You are using ${user_input} connection`);
            } catch (err) {
                console.error(err);
            }
            await PG_DB.end();
        })();
    } else if (user_input === "client") {
        //creating a single client
        const client = new Client({
            "host": config.postgresql.host,
            "user": config.postgresql.user,
            "port": config.postgresql.port,
            "password": config.postgresql.password,
            "database": config.postgresql.db,
        });
        (async () => {
            try {
                const client_connection = await client.connect();
                const res = await client_connection.query(query);

                for (let row of res.rows) {
                    console.log(row);
                }
                console.log(`You are using ${user_input} connection`);
            } catch (err) {
                console.error(err);
            }
            await client.end();
        })();
    }
    else {
        console.log("Please enter a valid input!");
    }
}

module.exports.postgresql_connection = postgresql_connection;