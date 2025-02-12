const { Client } = require('pg');

const client = new Client({
    connectionString: "postgresql://postgres:1234@localhost:5433/node_postgres"
});

async function createTable() {
    try {
        await client.connect();
        console.log("Conectado com sucesso ao banco de dados!");

        const query = `CREATE TABLE IF NOT EXISTS costumers (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        );`

        await client.query(query);

        client.end();
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }

}

async function createTableProducts() {
    try {
        await client.connect();
        const query = `CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY, 
            nome VARCHAR(255) NOT NULL,
            price REAL NOT NULL, 
            description VARCHAR(255)
        );`

        await client.query(query);
        client.end();

    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    }
}


