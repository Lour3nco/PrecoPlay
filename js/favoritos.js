
function situacaoAlvo(jogo, alvo) {
  if (alvo === undefined || alvo === null) {
    return { tipo: "sem-alvo", texto: "" };
  }
  const atual = menorPreco(jogo).preco;
  if (atual <= alvo) {
    return { tipo: "abaixo", texto: "🎉 Alerta! O menor preço (" + formatarPreco(atual) + ") está dentro do seu alvo!" };
  }
  return { tipo: "acima", texto: "Ainda faltam " + formatarPreco(atual - alvo) + " para chegar ao seu alvo." };
}

function criarItemFavorito(jogo, alvo) {
  const melhor = menorPreco(jogo);
  const situacao = situacaoAlvo(jogo, alvo);
  const aviso = situacao.tipo === "sem-alvo" ? "" :
    '<span class="aviso ' + (situacao.tipo === "abaixo" ? "aviso-ok" : "aviso-acima") + '">' + situacao.texto + "</span>";

  return (
    '<article class="favorito-item' + (situacao.tipo === "abaixo" ? " abaixo-alvo" : "") + '">' +
      '<a href="jogo.html?id=' + jogo.id + '"><img src="' + capaSVG(jogo) + '" alt="Capa do jogo ' + jogo.nome + '"></a>' +
      "<div>" +
        '<h3><a href="jogo.html?id=' + jogo.id + '">' + jogo.nome + "</a></h3>" +
        '<span class="preco">' + formatarPreco(melhor.preco) + "</span> " +
        '<span class="card-loja">em ' + melhor.loja + "</span>" +
        '<form class="alvo-form" data-id="' + jogo.id + '">' +
          '<label for="alvo-' + jogo.id + '">Preço alvo (R$):</label>' +
          '<input type="number" id="alvo-' + jogo.id + '" min="1" step="0.01" placeholder="Ex.: 50" value="' + (alvo !== undefined ? alvo : "") + '">' +
          '<button type="submit" class="btn btn-secundario">Definir alvo</button>' +
        "</form>" +
        aviso +
      "</div>" +
      '<div class="favorito-acoes">' +
        '<a class="btn btn-primario" href="jogo.html?id=' + jogo.id + '">Comparar</a>' +
        '<button type="button" class="btn btn-perigo" data-remover="' + jogo.id + '">Remover</button>' +
      "</div>" +
    "</article>"
  );
}

function mostrarFavoritos() {
  const area = document.getElementById("lista-favoritos");
  const resumo = document.getElementById("resumo-favoritos");
  const ids = obterFavoritos();
  const alvos = obterAlvos();

  const jogos = ids.map(buscarJogoPorId).filter(function (j) { return j !== undefined; });

  if (jogos.length === 0) {
    area.innerHTML =
      '<div class="estado-vazio">Você ainda não favoritou nenhum jogo.<br>' +
      '<a class="btn btn-primario" style="margin-top:14px" href="catalogo.html">Explorar o catálogo</a></div>';
    resumo.textContent = "";
    return;
  }

  area.innerHTML = jogos.map(function (j) { return criarItemFavorito(j, alvos[j.id]); }).join("");

  const alertas = jogos.filter(function (j) { return situacaoAlvo(j, alvos[j.id]).tipo === "abaixo"; }).length;
  resumo.textContent = jogos.length + " jogo(s) na lista. " + alertas + " alerta(s) de preço ativo(s).";
}

function iniciarFavoritos() {
  const area = document.getElementById("lista-favoritos");
  if (!area) return;

  area.addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const id = form.getAttribute("data-id");
    const bruto = form.querySelector("input").value.replace(",", ".");
    const valor = parseFloat(bruto);

    if (bruto === "") {
      salvarAlvo(id, null);
      mostrarToast("Preço alvo removido.");
    } else if (isNaN(valor) || valor <= 0) {
      mostrarToast("Digite um valor válido maior que zero.");
      return;
    } else {
      salvarAlvo(id, valor);
      mostrarToast("Preço alvo definido: " + formatarPreco(valor));
    }
    mostrarFavoritos();
  });

  area.addEventListener("click", function (e) {
    const id = e.target.getAttribute("data-remover");
    if (!id) return;
    alternarFavorito(id);
    salvarAlvo(id, null);
    mostrarToast("Jogo removido da lista.");
    mostrarFavoritos();
  });

  mostrarFavoritos();
}

document.addEventListener("DOMContentLoaded", iniciarFavoritos);
