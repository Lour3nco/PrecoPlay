
const CHAVE_FAVORITOS = "precoplay_favoritos";
const CHAVE_ALVOS = "precoplay_alvos";

function lerStorage(chave, padrao) {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? JSON.parse(bruto) : padrao;
  } catch (erro) {
    return padrao;
  }
}

function gravarStorage(chave, valor) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch (erro) {
    mostrarToast("Não foi possível salvar neste navegador.");
  }
}

function obterFavoritos() { return lerStorage(CHAVE_FAVORITOS, []); }

function ehFavorito(id) { return obterFavoritos().indexOf(Number(id)) !== -1; }

function alternarFavorito(id) {
  id = Number(id);
  let lista = obterFavoritos();
  const favoritou = lista.indexOf(id) === -1;
  if (favoritou) {
    lista.push(id);
  } else {
    lista = lista.filter(function (x) { return x !== id; });
  }
  gravarStorage(CHAVE_FAVORITOS, lista);
  return favoritou;
}

function obterAlvos() { return lerStorage(CHAVE_ALVOS, {}); }

function salvarAlvo(id, valor) {
  const alvos = obterAlvos();
  if (valor === null) { delete alvos[id]; } else { alvos[id] = valor; }
  gravarStorage(CHAVE_ALVOS, alvos);
}

let temporizadorToast;

function mostrarToast(mensagem) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = mensagem;
  toast.classList.add("visivel");
  clearTimeout(temporizadorToast);
  temporizadorToast = setTimeout(function () { toast.classList.remove("visivel"); }, 2500);
}

function criarCardJogo(jogo) {
  const melhor = menorPreco(jogo);

  return (
    '<a class="card-jogo" href="jogo.html?id=' + jogo.id + '">' +
      '<div class="card-capa">' +
        '<img src="' + capaSVG(jogo) + '" alt="Capa do jogo ' + jogo.nome + '" loading="lazy">' +
        '<span class="badge-desconto">-' + descontoPercentual(jogo) + "%</span>" +
      "</div>" +
      '<div class="card-linha">' +
        '<h3 class="card-titulo">' + jogo.nome + "</h3>" +
        '<span class="preco">' + formatarPreco(melhor.preco) + "</span>" +
      "</div>" +
      '<span class="card-loja">Menor preço em ' + melhor.loja + "</span>" +
    "</a>"
  );
}

function iniciarMenu() {
  const botao = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-menu");
  if (!botao || !menu) return;

  botao.addEventListener("click", function () {
    const aberto = menu.classList.toggle("aberto");
    botao.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      menu.classList.remove("aberto");
      botao.setAttribute("aria-expanded", "false");
    }
  });

  const pagina = location.pathname.split("/").pop() || "index.html";
  menu.querySelectorAll("a").forEach(function (link) {
    if (link.getAttribute("href") === pagina) {
      link.classList.add("ativo");
      link.setAttribute("aria-current", "page");
    }
  });
}

function iniciarBusca() {
  const form = document.getElementById("form-busca");
  if (!form) return;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const termo = document.getElementById("campo-busca").value.trim();
    location.href = "catalogo.html" + (termo ? "?busca=" + encodeURIComponent(termo) : "");
  });
}

function mostrarOfertasDoDia() {
  const area = document.getElementById("ofertas-dia");
  if (!area) return;
  const ofertas = JOGOS.slice()
    .sort(function (a, b) { return descontoPercentual(b) - descontoPercentual(a); })
    .slice(0, 6);
  area.innerHTML = ofertas.map(criarCardJogo).join("");
}

function calcularFimPromocao() {
  const agora = new Date();
  const fim = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate(), 23, 59, 59);
  const diasAteDomingo = (7 - agora.getDay()) % 7;
  fim.setDate(fim.getDate() + diasAteDomingo);
  return fim;
}

function iniciarContador() {
  const area = document.getElementById("contador");
  if (!area) return;
  const fim = calcularFimPromocao();

  function dois(n) { return String(n).padStart(2, "0"); }

  function atualizar() {
    let restante = Math.max(0, Math.floor((fim - new Date()) / 1000));
    const dias = Math.floor(restante / 86400); restante %= 86400;
    const horas = Math.floor(restante / 3600); restante %= 3600;
    const minutos = Math.floor(restante / 60);
    const segundos = restante % 60;

    area.innerHTML =
      '<div class="tempo-bloco"><strong>' + dois(dias) + "</strong><small>dias</small></div>" +
      '<div class="tempo-bloco"><strong>' + dois(horas) + "</strong><small>horas</small></div>" +
      '<div class="tempo-bloco"><strong>' + dois(minutos) + "</strong><small>min</small></div>" +
      '<div class="tempo-bloco"><strong>' + dois(segundos) + "</strong><small>seg</small></div>";
  }
  atualizar();
  setInterval(atualizar, 1000);
}

function copiarTexto(texto) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(texto);
  }
  return new Promise(function (resolve, reject) {
    const campo = document.createElement("textarea");
    campo.value = texto;
    document.body.appendChild(campo);
    campo.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(campo);
    ok ? resolve() : reject();
  });
}

function iniciarPromocoes() {
  const grade = document.getElementById("grade-promocoes");
  if (!grade) return;

  const promocoes = JOGOS.filter(function (j) { return descontoPercentual(j) > 50; })
    .sort(function (a, b) { return descontoPercentual(b) - descontoPercentual(a); });
  grade.innerHTML = promocoes.map(criarCardJogo).join("");

  iniciarContador();

  const areaCupons = document.getElementById("lista-cupons");
  areaCupons.innerHTML = CUPONS.map(function (c) {
    return (
      '<div class="cupom">' +
        '<span class="tag">' + c.loja + "</span>" +
        '<span class="cupom-codigo">' + c.codigo + "</span>" +
        "<p>" + c.descricao + "</p>" +
        '<button type="button" class="btn btn-primario" data-codigo="' + c.codigo + '">Copiar código</button>' +
      "</div>"
    );
  }).join("");

  areaCupons.addEventListener("click", function (e) {
    const codigo = e.target.getAttribute("data-codigo");
    if (!codigo) return;
    copiarTexto(codigo).then(
      function () { mostrarToast("Cupom " + codigo + " copiado!"); },
      function () { mostrarToast("Não foi possível copiar. Código: " + codigo); }
    );
  });
}

function marcarErro(campo, mensagem) {
  const caixa = campo.closest(".campo");
  caixa.classList.toggle("invalido", mensagem !== "");
  caixa.querySelector(".erro-msg").textContent = mensagem;
  campo.setAttribute("aria-invalid", mensagem !== "" ? "true" : "false");
}

function iniciarFormularioContato() {
  const form = document.getElementById("form-contato");
  if (!form) return;

  const nome = document.getElementById("contato-nome");
  const email = document.getElementById("contato-email");
  const mensagem = document.getElementById("contato-mensagem");
  const sucesso = document.getElementById("msg-sucesso");

  function validarNome() {
    return nome.value.trim().length >= 3 ? "" : "Informe seu nome (mínimo 3 letras).";
  }
  function validarEmail() {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Informe um e-mail válido, como nome@email.com.";
  }
  function validarMensagem() {
    return mensagem.value.trim().length >= 10 ? "" : "Escreva uma mensagem com pelo menos 10 caracteres.";
  }

  nome.addEventListener("blur", function () { marcarErro(nome, validarNome()); });
  email.addEventListener("blur", function () { marcarErro(email, validarEmail()); });
  mensagem.addEventListener("blur", function () { marcarErro(mensagem, validarMensagem()); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const erros = [
      [nome, validarNome()], [email, validarEmail()], [mensagem, validarMensagem()]
    ];
    erros.forEach(function (par) { marcarErro(par[0], par[1]); });

    const primeiroErro = erros.find(function (par) { return par[1] !== ""; });
    if (primeiroErro) {
      sucesso.classList.remove("visivel");
      primeiroErro[0].focus();
      return;
    }
    sucesso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato, " + nome.value.trim().split(" ")[0] + ".";
    sucesso.classList.add("visivel");
    form.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  iniciarMenu();
  iniciarBusca();
  mostrarOfertasDoDia();
  iniciarPromocoes();
  iniciarFormularioContato();
});
