const botao = document.querySelector("#botao-enviar");
const botaoLimpar = document.querySelector("#botao-limpar");
const botaoPesquisar = document.querySelector("#botao-pesquisar");
const btnResetar = document.querySelector("#botao-resetar");
const nomeForm = document.querySelector("#name");
const emailForm = document.querySelector("#email");
const telefoneForm = document.querySelector("#telefone");
const profissaoForm = document.querySelector("#profissao");
const mensagemForm = document.querySelector("#mensagem");
const listaHTML = document.querySelector(".lista");
let lista = [];

function handleForm(event) {
  let nome = nomeForm.value;
  let email = emailForm.value;
  let listaLocal = localStorage.getItem("lista");
  let listaLocalObj = JSON.parse(listaLocal);
  console.log(listaLocal);

  let data = new Date();

  const dia = data.getDate(); // Dia do mês (1-31)
  const mes = data.getMonth(); // Mês (0-11, janeiro é 0)
  const ano = data.getFullYear();
  const diaCompleto = `${dia}/${mes + 1}/${ano} `;

  if (listaLocal) {
    console.log("Oi");
    let listaObj = {
      nome,
      email,
      diaCompleto,
    };
    listaLocalObj.push(listaObj);
    let novaListaLocalObj = JSON.stringify(listaLocalObj);
    localStorage.setItem("lista", novaListaLocalObj);
    listaHTML.parentNode.removeChild("li");
    renderizarLista(listaLocalObj);
  }

  let listaObj = {
    nome,
    email,
    diaCompleto,
  };

  lista.push(listaObj);

  let listaString = JSON.stringify(lista);

  localStorage.setItem("lista", listaString);

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

function renderizarLista(itemObjeto) {
  listaHTML.innerHTML = "";
  itemObjeto.forEach((itemLista, index) => {
    let li = document.createElement("li");
    let h5 = document.createElement("h5");
    let p = document.createElement("p");
    let pDia = document.createElement("p");
    let div1 = document.createElement("div");
    let div2 = document.createElement("div");
    let botaoDeletarItem = document.createElement("button");
    botaoDeletarItem.id = "btn-Deletar";
    var lbl = document.createTextNode("Deletar");

    h5.innerHTML = itemLista.nome;
    p.innerHTML = itemLista.email;
    pDia.innerHTML = itemLista.diaCompleto;
    botaoDeletarItem.appendChild(lbl);
    div1.appendChild(h5);
    div1.appendChild(p);
    div2.appendChild(pDia);
    div2.appendChild(botaoDeletarItem);
    li.appendChild(div1);
    li.appendChild(div2);
    listaHTML.appendChild(li);

    botaoDeletarItem.addEventListener("click", () => {
      const listaLocal = localStorage.getItem("lista");
      JSON.parse(listaLocal).splice(index, 1);
      localStorage.setItem("lista", JSON.stringify(listaLocal));
      renderizarLista(listaLocal);
    });
  });
}

function loadPagina() {
  const listaLocal = localStorage.getItem("lista");
  const listaObjetoLocal = JSON.parse(listaLocal);

  if (
    listaObjetoLocal &&
    Array.isArray(listaObjetoLocal) &&
    listaObjetoLocal.length > 0
  ) {
    renderizarLista(listaObjetoLocal);
  }
}

function resetarForm() {
  localStorage.clear();
}

function pesquisar() {
  listaHTML.innerHTML = "";
  const input = document.querySelector("#tarefa").value.toLowerCase();
  const listaLocal = JSON.parse(localStorage.getItem("lista"));

  const itensFiltrados = listaLocal.filter((item) => {
    console.log(item);
    if (
      item.nome.toLowerCase().includes(input) ||
      item.email.toLowerCase().includes(input)
    ) {
      return item;
    }
  });

  console.log(itensFiltrados);

  renderizarLista(itensFiltrados);
}

botao.addEventListener("click", handleForm);
botaoLimpar.addEventListener("click", handleLimpar);
btnResetar.addEventListener("click", resetarForm);
window.addEventListener("load", loadPagina);
botaoPesquisar.addEventListener("click", pesquisar);
