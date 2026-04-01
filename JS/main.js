const form = document.querySelector("#form-cliente");
const campoNome = document.querySelector("#nome");
const campoCpf = document.querySelector("#cpf");
const campoEmail = document.querySelector("#email");
const campoId = document.querySelector("#id");
const botaoSalvar = document.querySelector("#btn-salvar-cliente");



form.addEventListener("submit", (event) => {
  event.preventDefault();

  const action = form.dataset.action;
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
    
    await cadastrarClientesService(dadosDoForm);
    form.reset();
    exibirClientes();



  } catch (error) {
    console.error("Erro ao gerar ID ou salvar:", error);
  }
}

async function preencheFormularioEdicao(event) {
  try {
    const id = event.currentTarget.dataset.id;
    const resposta = await obterClientesPeloIdService(id);

    campoNome.value = resposta.nome;
    campoCpf.value = resposta.cpf;
    campoEmail.value = resposta.email;
    campoId.value = resposta.id;

    form.setAttribute("data-action", "editar");

    botaoSalvar.innerText = "Atualizar Cliente";
    botaoSalvar.classList.remove("btn-primary");
    botaoSalvar.classList.add("btn-warning");


  } catch {
    alert("Erro ao carregar dados do cliente!");
  }
}

async function editarCliente(clienteEditado) {
  try {
    await editarClientesService(clienteEditado);

    form.setAttribute("data-action", "salvar");
    form.reset();

    botaoSalvar.innerText = "Cadastrar Cliente";
    botaoSalvar.classList.remove("btn-warning");
    botaoSalvar.classList.add("btn-primary");


    exibirClientes();
  } catch (erro) {
    console.log(erro);
  }
}


async function excluirCliente(event) {
  const result = confirm("Deseja mesmo excluir o cliente?");
  if (!result) return;

  try {
    const id = event.currentTarget.dataset.id;
    await excluirClientesService(id);
    exibirClientes();
  } catch (erro) {
    console.log(erro);
  }
}


// navegacao pelas secoes
const menuToggle = document.querySelector("#menu-toggle");
const linksMenu = document.querySelectorAll(".nav-link");
const secoes = document.querySelectorAll(".secao");

linksMenu.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const id = e.currentTarget.dataset.secao;

    // esconde todas
    secoes.forEach(secao => secao.classList.add("d-none"));

    // 🔥 agora sim funciona
    const secaoAtiva = document.querySelector(`#${id}`);
    if (secaoAtiva) secaoAtiva.classList.remove("d-none");

    // ativa menu
    linksMenu.forEach(l => l.classList.remove("active"));
    e.currentTarget.classList.add("active");

    // fecha menu mobile
    menuToggle.checked = false;
  });
});