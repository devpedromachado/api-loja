document.getElementById("product-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    //Recebendo os dados do formulário para criar um objeto "produto"
    const productName = document.getElementById("product-name").value.trim();
    const productPrice = document.getElementById("product-price").value;
    const productDescription = document.getElementById("product-description").value.trim();

    const produto = {
        nome: productName,
        price: parseFloat(productPrice),
        description: productDescription
    };

    try {
        console.log("Produto enviado:", produto);
        //Realizando a requisição post com o objeto produto a partir do fecth API
        const response = await fetch("http://localhost:3000/produtos", {
            method: "POST", 
            headers: { "Content-type": "application/json" }, 
            body: JSON.stringify(produto)
        });

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Produto cadastrado!", result); 
        alert("Produto cadastrado com sucesso"); 

        //Limpando o formulário
        document.getElementById("product-form").reset();

    } catch (error) {
        console.log("Erro ao cadastrar o produto!", error);
    }
})

document.getElementById("product-show").addEventListener("click", async function (event) {
    event.preventDefault();

    const response = await fetch("http://localhost:3000/produtos", {
        method: "GET"
    }); 

    const result = await response.json();
    console.log(result);

    const productList = document.getElementById("product-list");
    productList.innerHTML = ""; 

    result.forEach(product => {
        const listItem = document.createElement("li");
        listItem.textContent = `
        Id: ${product.id} - Nome: ${product.nome} - 
        Preço: ${product.price} - Descrição: ${product.description}`;
        productList.appendChild(listItem);
    });
});

document.getElementById("update-form").addEventListener("submit", async function (event) {
    event.preventDefault(); 
    
    const targetProduct = document.getElementById("target-product").value; 
    const newName = document.getElementById("new-name").value; 
    const newPrice = document.getElementById("new-price").value; 
    const newDescription = document.getElementById("new-desc").value;

    if(!targetProduct || !newName || !newPrice) {
        return alert("ID, nome e preço são obrigátorios!"); 
    }

    const product = {
        nome: newName,
        price:newPrice , 
        description: newDescription, 
        id:  targetProduct
    }; 

    console.log(product);

    try {
        const response = await fetch("http://localhost:3000/produtos", {
            method: "PUT", 
            headers: {"Content-type": "application/json"}, 
            body: JSON.stringify(product)
        }); 

        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json(); 
        console.log("Produto atualizado: ", result); 
        alert("Produto atualizado com sucesso!"); 

        document.getElementById("update-form").reset();
    } 
    catch (error) {
        
        console.log("Erro ao atualizar o produto.", error); 
    }

}); 

document.getElementById("delete-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const productId = document.getElementById("rmv-product").value; 
    
    if(!productId) {
        return alert("ID do produto é aleatório!"); 
    }

    const product = { 
        id: productId
    }
   
    try { 
        const response = await fetch("http://localhost:3000/produtos", {
            method: "DELETE", 
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(product)
        }); 

        const result = await response.json();

        console.log("Produto deletado com sucesso!", result); 
        alert("Produto deletado com sucesso!");

        document.getElementById("delete-form").reset();

    } catch (error) {
        console.log("Erro ao deletar o produto!", error);
    }

}); 