function validarCliente(nome, cpf, email) {
  if (nome === "" || cpf === "" || email === "") {
    alert("Alguns campos obrigatórios não foram preenchidos");
    return false;
  }
  if ( !email.includes("@")){
    alert("Fomato email inválido(utilizar @)"); 
    return false; 
  }

  return true;
}