const { Client } = require('pg');
const express = require('express');
const cors = require("cors");

const client = new Client({
    connectionString: "postgresql://postgres:1234@localhost:5433/node_postgres"
});

client.connect()
    .then(() => console.log("Conectado ao banco de dados!"))
    .catch(err => console.error("Erro ao conectar:", err));

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.get('/clientes', async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM "public"."costumers"; `);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.log("Erro ao listar clientes", (error))
    }
});

app.get('/produtos', async(req, res) => {
    try {
        const result = await client.query(`SELECT * FROM "public"."products"; `);
        console.log(result.rows);
        res.json(result.rows);
    } catch (error) {
        console.log("Erro ao listar produtos", (error))
    }
}); 

app.post('/clientes', async (req, res) => {
    console.log("Body recebido:", req.body);

    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: "Nome e email são obrigatórios!" });
        }

        const result = await client.query(`INSERT INTO "public"."costumers" (nome, email)
                                          VALUES ($1, $2) RETURNING*;`,
            [nome, email]
        );
        console.log("Registro inserido:", result.rows[0]);
        res.status(201).json({ message: "Cliente inserido com sucesso!", cliente: result.rows[0] });

    } catch (error) {
        console.error("Erro ao inserir cliente:", error);
        res.status(500).json({ error: "Erro ao inserir cliente." });
    }

});

app.post('/produtos', async (req, res) => { 
    console.log("Body recebido:", req.body);

    try {
        const {nome, price, description} = req.body; 
        const descriptionValue = description || "Sem descrição";
        const priceValue = parseFloat(price);

        if (!nome || !price) {
            return res.status(400).json({message: "Nome e preço são obrigatórios!"}); 
        }

        const result = await client.query(`INSERT INTO "public"."products" 
                                         (nome, price, description) VALUES ($1, $2, $3) RETURNING*;`, 
                                         [nome, priceValue, descriptionValue]
                                         ); 
        console.log("Registro inserido:", result.rows[0]);
        res.status(201).json({ message: "Produto inserido com sucesso!", cliente: result.rows[0] });
                                         
    } catch(error) {
        console.log("Erro ao inserir o produto", error);
        res.status(500).json({error: "Erro ao inserir o produto"});
    }
}); 

app.put('/clientes', async (req, res) => {
    try {
        const { nome, email, id } = req.body;

        if (!id || !nome || !email) {
            return res.status(400).json({ error: "ID, nome e email são obrigatórios!" });
        }

        const result = await client.query(`UPDATE costumers SET nome=$1, email=$2 WHERE id=$3 RETURNING *;`,
            [nome, email, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Cliente não encontrado!" });
        }

        console.log("Cliente atualizado:", result.rows[0]);
        res.status(200).json({ message: "Cliente atualizado com sucesso!", cliente: result.rows[0] });

    } catch (error) {
        console.log("Erro ao editar registro", (error))
    }
}); 

app.put('/produtos', async(req, res) => { 
    try { 
        const {nome, price, description, id} = req.body; 

        if (!nome & !price) {
            res.status(400).json({message: "Nome e preço são obrigátórios"}); 
        }

        const result = await client.query(` UPDATE products SET nome=$1, price=$2, description=$3 
                                            WHERE id=$4 RETURNING*;`, 
                                            [nome, price, description, id]); 
        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Produto não encontrado!" });
        }

        console.log("Produto atualizado:", result.rows[0]);
        res.status(200).json({ message: "Produto atualizado com sucesso!", cliente: result.rows[0] });

    } catch (error) { 
        console.log("Erro ao editar registro", (error));
    }; 
}); 

app.delete('/clientes', async(req, res) =>{ 
    try {
        const { id } = req.body; 

        if (!id) {
            return res.status(400).json({error: "Por favor, forneça o ID do cliente."});
        }

        const result = await client.query(
            `DELETE FROM costumers WHERE id=$1 RETURNING *;`, 
            [id] 
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Cliente não encontrado!" });
        }

        console.log("Cliente deletado:", result.rows[0]);
        res.status(200).json({ message: "Cliente deletado com sucesso!", cliente: result.rows[0] });

    } catch (error) { 
        console.log("Erro ao deletar o registro", error);
        res.status(500).json({ error: "Erro interno ao deletar o cliente." });
    }
});

app.delete('/produtos', async(req, res) => { 
    try {
        const {id} = req.body; 

        if (!id) {
            res.status(400).json({message: "ID do produto é obrigátorio"}); 
        }

        const result = await client.query(`DELETE FROM products WHERE id=$1 RETURNING*;`,
                                         [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "Produto não encontrado!" });
        }

        console.log("Produto deletado:", result.rows[0]);
        res.status(200).json({ message: "Produto deletado com sucesso!", cliente: result.rows[0] });

    } catch (error) {
        console.log("Erro ao deletar o produto", error);
    }
}); 

app.listen(port, () => {
    console.log(`Servidor rodando na porta${port}`);
});


