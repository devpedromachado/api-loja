const { Client } = require('pg');

const connectionString = "postgresql://loja_48p5_user:T3chZ8sSB7bhbv0IKvOoFrQf0VqSZhRf@dpg-cupln15ds78s73946heg-a/loja_48p5";

async function createTable() {
    const client = new Client({ connectionString });

    try {
        await client.connect();
        console.log("Conectado com sucesso ao banco de dados!");

        const query = `CREATE TABLE IF NOT EXISTS costumers (
            id SERIAL PRIMARY KEY,
            nome VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
        );`;

        await client.query(query);
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    } finally {
        await client.end();
    }
}

async function createTableProducts() {
    const client = new Client({ connectionString });

    try {
        await client.connect();
        const query = `CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY, 
            nome VARCHAR(255) NOT NULL,
            price REAL NOT NULL, 
            description VARCHAR(255)
        );`;

        await client.query(query);
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
    } finally {
        await client.end();
    }
}

async function main() {
    await createTable();
    await createTableProducts();
}

main();
