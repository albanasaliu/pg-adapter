function postgresql_connection() {
    const readline = require("readline-sync");
    const { Pool, Client } = require("pg");
    const config = require("./config");

    let input = readline.question("What kind of connection do you want to establish? (Pool or Client): ");
    let user_input = input.toLowerCase();
    const query = `SELECT * FROM support.tickets`;

    if (user_input === "pool") {
        //creating a pool
        const pool = new Pool({
            "host": config.postgresql.host,
            "user": config.postgresql.user,
            "port": config.postgresql.port,
            "password": config.postgresql.password,
            "database": config.postgresql.db,
        });
        (async () => {
            try {
                await pool.connect();
                const res = await pool.query(query);

                for (let row of res.rows) {
                    console.log(row);
                }
                console.log(`You are using ${user_input} connection`);
            } catch (err) {
                console.error(err);
            } finally {
                //await pool.end();
            }
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
                await client.connect();
                const res = await client.query(query);

                for (let row of res.rows) {
                    console.log(row);
                }
                console.log(`You are using ${user_input} connection`);
            } catch (err) {
                console.error(err);
            } finally {
                await client.end();
            }
        })();
    }
    else {
        console.log("Please enter a valid input!");
    }
}

module.exports.postgresql_connection = postgresql_connection;