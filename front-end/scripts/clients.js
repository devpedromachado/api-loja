document.getElementById("client-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const clientName = document.getElementById("client-name").value;
    const clientEmail = document.getElementById("client-email").value;

    if (!clientName & !clientEmail) {
        alert("Nome e email são obrigáorios!");
    }

    const client = {
        nome: clientName,
        email: clientEmail
    };
    console.log(client);

    try {
        const response = await fetch("http://localhost:3000/clientes", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(client)
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Cliente cadastrado com sucesso!", result);
        alert("Cliente cadastrado com sucesso!");

        document.getElementById("client-form").reset();

    } catch (error) {
        console.log("Erro ao cadastrar o cliente!", error);
    }

});

document.getElementById("client-show").addEventListener("click", async function (event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/clientes", {
        method: "GET"
    }); 

    const result = await response.json();
    console.log(result);

    const clientList = document.getElementById("client-list");
    clientList.innerHTML = ""; 

    result.forEach(client => {
        const listItem = document.createElement("li");
        listItem.textContent = `Id: ${client.id} - Nome: ${client.nome} - Email: ${client.email}`;
        clientList.appendChild(listItem);
    });
});

document.getElementById("update-form").addEventListener("submit", async function (event) {
    event.preventDefault(); 

    const targetClient = document.getElementById("target-client").value; 
    const newName = document.getElementById("new-name").value; 
    const newEmail = document.getElementById("new-email").value; 

    if(!targetClient || !newName || !newEmail) {
        alert("Todos os campos são obrigatórios!"); 
    }

    const client = {  
        nome: newName,
        email: newEmail,
        id: targetClient
    }

    console.log(client);

    try {
        const response = await fetch("http://localhost:3000/clientes", {
            method: "PUT", 
            headers: {"Content-type": "application/json"}, 
            body: JSON.stringify(client)
        }); 

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json(); 
        console.log("Cliente atualizado: ", result); 
        alert("Cliente atualizado com sucesso!"); 

        document.getElementById("update-form").reset();
    } 
    catch (error) {
        console.log("Erro ao atualizar o cliente.", error); 
    }

}); 

document.getElementById("delete-form").addEventListener("submit", async function (event) {
    event.preventDefault()
    
    const clientId = document.getElementById("rmv-client").value; 

    if(!clientId) { 
        return alert("ID do cliente é obrigatório!"); 
    }

    const client = { 
        id: clientId
    }

    try {
        const response = await fetch("http://localhost:3000/clientes", {
            method: "DELETE", 
            headers: { "Content-type": "application/json" }, 
            body: JSON.stringify(client)
        }); 

        const result = await response.json(); 
        console.log("Cliente deletado com sucesso!", result);
        alert("Cliente deletado com sucesso!");

        document.getElementById("delete-form").reset();
    } catch (error) { 
        console.log("Erro ao remover o cliente!", error); 
    }
}); 

