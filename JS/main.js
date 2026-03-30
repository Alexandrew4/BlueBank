const form = document.querySelector("#form-cliente");
const campoNome = document.querySelector("#nome");
const campoCpf = document.querySelector("#cpf");
const campoEmail = document.querySelector("#email");
const campoId = document.querySelector("#id");
const botaoSalvar = document.querySelector("#btn-salvar-cliente");



form.addEventListener("submit", (event) => {
  event.preventDefault();

  const action = event.target.dataset.action;
  const nome = campoNome.value;
  const cpf = campoCpf.value;
  const email = campoEmail.value;
 const id = campoId.value;

  if (!validarCliente(nome, cpf, email)) {
    return;
  }

  if (action === "editar") {
    editarCliente({ id, nome, cpf, email });
  } else {
    salvarCliente({ nome, cpf, email });
  }
});


async function salvarCliente(dadosDoForm) {
  try {
    

const listaAtual = await obterClientesService();
const novoId = Date.now();
const clienteComId = { 
      ...dadosDoForm, 
      id: Number(novoId) 
    };

await cadastrarClientesService(clienteComId);
form.reset();
exibirClientes();
console.log(`Sucesso! Cliente cadastrado com ID: ${novoId}`);

  } catch (error) {
    console.error("Erro ao gerar ID ou salvar:", error);
  }
}

function preencheFormularioEdicao(event) {
  const id = event.currentTarget.dataset.id;
  obterClientesPeloIdService(id)
    .then((resposta) => {
      campoNome.value = resposta.nome;
      campoCpf.value = resposta.cpf;
      campoEmail.value = resposta.email;
      campoId.value = resposta.id;
      form.setAttribute("data-action", "editar");
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function editarCliente(clienteEditado) {
  editarClientesService(clienteEditado)
    .then(() => {
      form.setAttribute("data-action", "salvar");
      form.reset();
      exibirClientes();
    })
    .catch((erro) => {
      console.log(erro);
    });
}

function excluirCliente(event) {
  const result = confirm("Deseja mesmo excluir o cliente?");
  if (result) {
    const id = event.currentTarget.dataset.id;
    excluirClientesService(id)
      .then((resposta) => {
        console.log(resposta);
        exibirClientes();
      })
      .catch((erro) => {
        console.log(erro);
      });
  }
}



