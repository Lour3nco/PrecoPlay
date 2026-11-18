
const NOMES_MESES = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];

function montarTabelaPrecos(jogo) {
  const melhor = menorPreco(jogo);

  return jogo.precos.map(function (preco, i) {
    const ehMaisBarata = i === melhor.indice;
    const diferenca = preco - melhor.preco;
    const desconto = Math.round((1 - preco / jogo.precoOriginal) * 100);

    return (
      '<tr class="' + (ehMaisBarata ? "mais-barata" : "") + '">' +
        "<td>" + LOJAS[i] +
          (ehMaisBarata ? ' <span class="selo-barato">MAIS BARATA</span>' : "") + "</td>" +
        "<td>" + formatarPreco(preco) + "</td>" +
        "<td>-" + desconto + "%</td>" +
        "<td>" + (ehMaisBarata ? "—" : "+ " + formatarPreco(diferenca)) + "</td>" +
      "</tr>"
    );
  }).join("");
}

function montarGrafico(jogo) {
  const maior = Math.max.apply(null, jogo.historico);
  const total = jogo.historico.length;
  const hoje = new Date();

  let barras = "";
  let rotulos = "";

  jogo.historico.forEach(function (valor, i) {
    const altura = Math.round((valor / maior) * 85);
    const data = new Date(hoje.getFullYear(), hoje.getMonth() - (total - 1 - i), 1);
    const mes = NOMES_MESES[data.getMonth()];

    barras +=
      '<div class="barra-col">' +
        '<span class="barra-valor">' + formatarPreco(valor) + "</span>" +
        '<div class="barra" style="height:' + altura + '%" title="' + mes + ": " + formatarPreco(valor) + '"></div>' +
      "</div>";
    rotulos += "<span>" + mes + "</span>";
  });

  return (
    '<div class="grafico" role="img" aria-label="Gráfico de barras com o histórico de preço dos últimos ' + total + ' meses">' +
    barras + "</div>" +
    '<div class="grafico-rotulos" aria-hidden="true">' + rotulos + "</div>"
  );
}

function classeClassificacao(c) {
  return c === "Livre" ? "" : "c" + c;
}

function mostrarJogo(jogo) {
  const melhor = menorPreco(jogo);

  document.title = jogo.nome + " | PreçoPlay";

  document.getElementById("jogo-capa").innerHTML =
    '<img src="' + capaSVG(jogo) + '" alt="Capa do jogo ' + jogo.nome + '">' +
    '<span class="badge-desconto">-' + descontoPercentual(jogo) + "%</span>";

  document.getElementById("jogo-breadcrumb").innerHTML =
    '<a href="catalogo.html">Catálogo</a> › ' +
    '<a href="catalogo.html?genero=' + encodeURIComponent(jogo.genero) + '">' + jogo.genero + "</a> › " + jogo.nome;

  document.getElementById("jogo-nome").textContent = jogo.nome;
  document.getElementById("jogo-descricao").textContent = jogo.descricao;

  document.getElementById("jogo-tags").innerHTML =
    '<span class="tag">' + jogo.genero + "</span>" +
    jogo.plataformas.map(function (p) { return '<span class="tag">' + p + "</span>"; }).join("") +
    '<span class="classificacao ' + classeClassificacao(jogo.classificacao) + '" title="Classificação indicativa">' +
    jogo.classificacao + "</span>";

  document.getElementById("jogo-preco").textContent = formatarPreco(melhor.preco);
  document.getElementById("jogo-preco-antigo").textContent = formatarPreco(jogo.precoOriginal);
  document.getElementById("jogo-loja").textContent = "Menor preço em " + melhor.loja;
  document.getElementById("btn-oferta").textContent = "Ver oferta na " + melhor.loja;

  document.getElementById("tabela-corpo").innerHTML = montarTabelaPrecos(jogo);
  document.getElementById("grafico-area").innerHTML = montarGrafico(jogo);

  iniciarBotaoFavorito(jogo);
}

function iniciarBotaoFavorito(jogo) {
  const botao = document.getElementById("btn-favorito");

  function atualizarBotao() {
    const favorito = ehFavorito(jogo.id);
    botao.textContent = favorito ? "♥ Favoritado" : "♡ Favoritar";
    botao.classList.toggle("ativo", favorito);
    botao.setAttribute("aria-pressed", favorito ? "true" : "false");
  }

  botao.addEventListener("click", function () {
    const agoraFavorito = alternarFavorito(jogo.id);
    mostrarToast(agoraFavorito ? jogo.nome + " adicionado aos favoritos!" : jogo.nome + " removido dos favoritos.");
    atualizarBotao();
  });

  atualizarBotao();
}

function iniciarPaginaJogo() {
  const conteudo = document.getElementById("conteudo-jogo");
  if (!conteudo) return;

  const id = new URLSearchParams(location.search).get("id");
  const jogo = buscarJogoPorId(id);

  if (!jogo) {
    conteudo.innerHTML =
      '<div class="estado-vazio">Jogo não encontrado. ' +
      '<a href="catalogo.html">Voltar ao catálogo</a></div>';
    return;
  }
  mostrarJogo(jogo);
}

document.addEventListener("DOMContentLoaded", iniciarPaginaJogo);
