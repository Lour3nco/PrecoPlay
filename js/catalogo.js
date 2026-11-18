
function normalizarTexto(texto) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

function filtrarEOrdenar(f) {
  const termo = normalizarTexto(f.busca);

  const lista = JOGOS.filter(function (jogo) {
    if (termo && normalizarTexto(jogo.nome).indexOf(termo) === -1) return false;
    if (f.plataformas.length > 0) {
      const tem = jogo.plataformas.some(function (p) { return f.plataformas.indexOf(p) !== -1; });
      if (!tem) return false;
    }
    if (f.generos.length > 0 && f.generos.indexOf(jogo.genero) === -1) return false;
    if (menorPreco(jogo).preco > f.precoMax) return false;
    return true;
  });

  lista.sort(function (a, b) {
    if (f.ordem === "desconto") return descontoPercentual(b) - descontoPercentual(a);
    if (f.ordem === "alfabetica") return a.nome.localeCompare(b.nome, "pt-BR");
    return menorPreco(a).preco - menorPreco(b).preco;
  });

  return lista;
}

function precoMaximoCatalogo() {
  const maior = Math.max.apply(null, JOGOS.map(function (j) { return menorPreco(j).preco; }));
  return Math.ceil(maior / 10) * 10;
}

function iniciarCatalogo() {
  const grade = document.getElementById("grade-catalogo");
  if (!grade) return;

  const campoBusca = document.getElementById("filtro-busca");
  const grupoPlat = document.getElementById("grupo-plataforma");
  const grupoGen = document.getElementById("grupo-genero");
  const faixa = document.getElementById("filtro-preco");
  const valorFaixa = document.getElementById("valor-preco");
  const selOrdem = document.getElementById("filtro-ordem");
  const info = document.getElementById("catalogo-info");
  const btnLimpar = document.getElementById("btn-limpar");

  const params = new URLSearchParams(location.search);
  const platUrl = params.get("plataforma");
  const genUrl = params.get("genero");
  campoBusca.value = params.get("busca") || "";

  grupoPlat.innerHTML = PLATAFORMAS.map(function (p) {
    return '<label class="check"><input type="checkbox" value="' + p + '"' + (p === platUrl ? " checked" : "") +
      '><span class="caixa"></span><span>' + p + "</span></label>";
  }).join("");

  grupoGen.innerHTML = GENEROS.map(function (g) {
    return '<button type="button" class="chip" data-valor="' + g + '" aria-pressed="' + (g === genUrl) + '">' + g + "</button>";
  }).join("");

  const maximo = precoMaximoCatalogo();
  faixa.max = maximo;
  faixa.value = maximo;

  function plataformasMarcadas() {
    return Array.prototype.map.call(grupoPlat.querySelectorAll("input:checked"), function (i) { return i.value; });
  }
  function generosLigados() {
    return Array.prototype.map.call(grupoGen.querySelectorAll('.chip[aria-pressed="true"]'), function (c) { return c.getAttribute("data-valor"); });
  }

  function atualizar() {
    valorFaixa.textContent = "até " + formatarPreco(Number(faixa.value));

    const resultado = filtrarEOrdenar({
      busca: campoBusca.value.trim(),
      plataformas: plataformasMarcadas(),
      generos: generosLigados(),
      precoMax: Number(faixa.value),
      ordem: selOrdem.value
    });

    if (resultado.length === 0) {
      grade.innerHTML = '<div class="estado-vazio" style="grid-column:1/-1">' +
        "Nenhum jogo encontrado com esses filtros. Tente limpar a busca.</div>";
    } else {
      grade.innerHTML = resultado.map(criarCardJogo).join("");
    }
    info.textContent = resultado.length + " de " + JOGOS.length + " jogos exibidos";
  }

  [campoBusca, faixa, selOrdem].forEach(function (el) { el.addEventListener("input", atualizar); });
  grupoPlat.addEventListener("change", atualizar);
  grupoGen.addEventListener("click", function (e) {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    chip.setAttribute("aria-pressed", chip.getAttribute("aria-pressed") === "true" ? "false" : "true");
    atualizar();
  });

  btnLimpar.addEventListener("click", function () {
    campoBusca.value = "";
    grupoPlat.querySelectorAll("input").forEach(function (i) { i.checked = false; });
    grupoGen.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", "false"); });
    faixa.value = maximo;
    selOrdem.value = "menor-preco";
    atualizar();
  });

  atualizar();
}

document.addEventListener("DOMContentLoaded", iniciarCatalogo);
