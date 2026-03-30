const BASE_URL = "http://localhost:3000/clientes";

// // headers padrao
function getHeaders() {
  return {
    "Content-Type": "application/json"
  };
}

// padrao resposta
async function tratarResposta(resposta) {
  if (!resposta.ok) {
    const erroTexto = await resposta.text();
    throw new Error(`Erro na requisição: ${resposta.status} - ${erroTexto}`);
  }
  return resposta.json();
}

// criar cliente
async function cadastrarClientesService(cliente) {
  const resposta = await fetch(BASE_URL, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(cliente),
  });

  return tratarResposta(resposta);
}

// lista cliente
async function obterClientesService() {
  const resposta = await fetch(BASE_URL);
  return tratarResposta(resposta);
}

// buscar cliente
async function obterClientesPeloIdService(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`);
  return tratarResposta(resposta);
}

// editar cliente
async function editarClientesService(cliente) {
  const resposta = await fetch(`${BASE_URL}/${cliente.id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(cliente),
  });

  return tratarResposta(resposta);
}

// excluir cliente
async function excluirClientesService(id) {
  const resposta = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  return tratarResposta(resposta);
}