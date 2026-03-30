function validarCliente(nome, cpf, email) {
  if (nome === "" || cpf === "" || email === "") {
    alert("Alguns campos obrigatórios não foram preenchidos");
    return false;
  }

  return true;
}