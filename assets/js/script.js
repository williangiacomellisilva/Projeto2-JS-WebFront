const botao = document.querySelector("#botao-enviar");
const botaoLimpar = document.querySelector("#botao-limpar");
const nomeForm = document.querySelector("#name");
const emailForm = document.querySelector("#email");
const telefoneForm = document.querySelector("#telefone");
const profissaoForm = document.querySelector("#profissao");
const mensagemForm = document.querySelector("#mensagem");
const listaHTML = document.querySelector(".lista");
let lista = [];

function handleForm(event) {
  event.preventDefault();
  let nome = nomeForm.value;
  let email = emailForm.value;

  let data = new Date();

  const dia = data.getDate(); // Dia do mês (1-31)
  const mes = data.getMonth(); // Mês (0-11, janeiro é 0)
  const ano = data.getFullYear();
  const diaCompleto = `${dia}/${mes + 1}/${ano} `;

  let listaObj = {
    nome,
    email,
  };

  // lista.push(listaObj);
  // console.log(lista);

  localStorage.setItem("nome", nome);
  localStorage.setItem("email", email);

  let li = document.createElement("li");
  let h5 = document.createElement("h5");
  let p = document.createElement("p");
  let pDia = document.createElement("p");
  let div1 = document.createElement("div");
  let div2 = document.createElement("div");

  h5.innerHTML = nome;
  p.innerHTML = email;
  pDia.innerHTML = diaCompleto;
  div1.appendChild(h5);
  div1.appendChild(p);
  div2.appendChild(pDia);
  li.appendChild(div1);
  li.appendChild(div2);
  listaHTML.appendChild(li);

  nomeForm.value = "";
  emailForm.value = "";
  telefoneForm.value = "";
  profissaoForm.value = "";
  mensagemForm.value = "";
}

function handleLimpar(event) {
  event.preventDefault();
  nomeForm.value = "";
  emailForm.value = "";
  telefoneForm.value = "";
  profissaoForm.value = "";
  mensagemForm.value = "";
}

botao.addEventListener("click", handleForm);
botaoLimpar.addEventListener("click", handleLimpar);
