
 // Busca dados e inicia a construção

async function exibirClientes() {
    try {
        const resposta = await obterClientesService();
        renderizaTabelaCompleta(resposta);
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}


  // Monta o esqueleto da tabela

function renderizaTabelaCompleta(clientes) {
    const containerPrincipal = document.querySelector("#lista-clientes");
    if (!containerPrincipal) return;

    containerPrincipal.innerHTML = ""; // Limpa qualquer resíduo

    // Criar o Card do Bootstrap
    const card = criaElemento("div", "card shadow-sm border-0 mt-4");
    
    // Criar o Cabeçalho do Card (Título)
    const cardHeader = criaElemento("div", "card-header bg-white py-3");
    cardHeader.innerHTML = '<h5 class="mb-0 fw-bold text-dark"><i class="bi bi-list-ul me-2"></i>Lista de Clientes</h5>';
    
    // Criar a Estrutura da Tabela
    const tableResponsive = criaElemento("div", "table-responsive");
    const tabela = criaElemento("table", "table table-hover align-middle mb-0");
    
    // Criar o THEAD (Cabeçalho da Tabela)
    const thead = criaElemento("thead", "table-light");
    const trHeader = criaElemento("tr", "");
    
    const colunas = ["Nome Completo", "CPF", "E-mail", "Ações"];
    colunas.forEach((texto, index) => {
        const th = criaElemento("th", index === 0 ? "ps-4" : (index === 3 ? "text-center" : ""));
        th.innerText = texto;
        trHeader.appendChild(th);
    });
    thead.appendChild(trHeader);

    // Criar o TBODY (Corpo da Tabela)
    const tbody = criaElemento("tbody", "");

    // Loop de Dados.Cria as linhas para cada cliente
    clientes.forEach((cliente) => {
        const tr = criaElemento("tr", "");

        const tdNome = criaElemento("td", "ps-4");
        tdNome.innerText = cliente.nome;

        const tdCpf = criaElemento("td", "");
        tdCpf.innerText = cliente.cpf;

        const tdEmail = criaElemento("td", "");
        tdEmail.innerText = cliente.email;

        const tdAcoes = criaElemento("td", "text-center");
        const divBotoes = criaElemento("div", "d-flex gap-2 justify-content-center");

        // Botão Editar
        const btnEditar = criaElemento("button", "btn btn-sm btn-outline-primary");
        btnEditar.innerHTML = '<i class="bi bi-pencil"></i>';
        btnEditar.setAttribute("data-id", cliente.id);
        btnEditar.addEventListener("click", preencheFormularioEdicao);

        // Botão Excluir
        const btnExcluir = criaElemento("button", "btn btn-sm btn-outline-danger");
        btnExcluir.innerHTML = '<i class="bi bi-trash"></i>';
        btnExcluir.setAttribute("data-id", cliente.id);
        btnExcluir.addEventListener("click", excluirCliente);

        divBotoes.append(btnEditar, btnExcluir);
        tdAcoes.appendChild(divBotoes);

        tr.append(tdNome, tdCpf, tdEmail, tdAcoes);
        tbody.appendChild(tr);
    });

    // Montagem final 
    tabela.append(thead, tbody);
    tableResponsive.appendChild(tabela);
    card.append(cardHeader, tableResponsive);
    
    // Injeta tudo no HTML de uma vez só
    containerPrincipal.appendChild(card);
}


 // Cria elementos com classes dinamicamente
 
function criaElemento(tag, classes) {
    const novoElemento = document.createElement(tag);
    if (classes) {
        novoElemento.classList.add(...classes.split(" ").filter(c => c !== ""));
    }
    return novoElemento;
}


