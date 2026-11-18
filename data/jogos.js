
const LOJAS = ["CofreGamer", "NeonKeys", "PixelFeira", "Bazar Byte"];

const PLATAFORMAS = ["PC", "PlayStation", "Xbox", "Switch"];
const GENEROS = ["Ação", "RPG", "Esporte", "Corrida", "Indie", "Terror"];

const JOGOS = [
  {
    id: 1, nome: "Neon Drifters", genero: "Corrida",
    plataformas: ["PC", "PlayStation", "Xbox"], classificacao: "Livre",
    descricao: "Corridas noturnas em uma metrópole futurista iluminada por neon. Customize seu carro, derrape nas curvas e domine o ranking online.",
    precoOriginal: 199.90, precos: [129.90, 119.90, 124.90, 134.90],
    historico: [199.90, 179.90, 159.90, 149.90, 129.90, 119.90],
    cores: ["#00e5ff", "#7b2cff"], emoji: "🏎️"
  },
  {
    id: 2, nome: "Crypta Profunda", genero: "Terror",
    plataformas: ["PC", "PlayStation"], classificacao: "16",
    descricao: "Explore catacumbas esquecidas com apenas uma lanterna. Cada corredor esconde um segredo — e algo que não quer ser encontrado.",
    precoOriginal: 149.90, precos: [59.90, 64.90, 54.90, 69.90],
    historico: [149.90, 129.90, 99.90, 79.90, 64.90, 54.90],
    cores: ["#2b0a3d", "#ff3b6b"], emoji: "💀"
  },
  {
    id: 3, nome: "Reino de Cinzas", genero: "RPG",
    plataformas: ["PC", "PlayStation", "Xbox"], classificacao: "14",
    descricao: "Um reino devastado pede um herói. Escolha sua classe, forme alianças e decida o destino de um mundo em ruínas neste RPG de mundo aberto.",
    precoOriginal: 249.90, precos: [99.90, 109.90, 89.90, 119.90],
    historico: [249.90, 219.90, 179.90, 139.90, 109.90, 89.90],
    cores: ["#ff7a18", "#3a0d0d"], emoji: "⚔️"
  },
  {
    id: 4, nome: "Gol Máximo 25", genero: "Esporte",
    plataformas: ["PC", "PlayStation", "Xbox", "Switch"], classificacao: "Livre",
    descricao: "O simulador de futebol com times fictícios, modo carreira e partidas online. Monte seu time dos sonhos e levante a taça.",
    precoOriginal: 299.90, precos: [219.90, 199.90, 209.90, 229.90],
    historico: [299.90, 289.90, 259.90, 239.90, 219.90, 199.90],
    cores: ["#39ff14", "#064d1c"], emoji: "⚽"
  },
  {
    id: 5, nome: "Pixel Quest Tavern", genero: "Indie",
    plataformas: ["PC", "Switch"], classificacao: "Livre",
    descricao: "Gerencie uma taverna em um mundo pixel art. Receba aventureiros, prepare poções e expanda seu negócio nesta aventura relaxante.",
    precoOriginal: 39.90, precos: [29.90, 27.90, 24.90, 31.90],
    historico: [39.90, 36.90, 34.90, 29.90, 27.90, 24.90],
    cores: ["#ffd23f", "#ee6c4d"], emoji: "🍺"
  },
  {
    id: 6, nome: "Lâmina Carmesim", genero: "Ação",
    plataformas: ["PC", "PlayStation", "Xbox"], classificacao: "18",
    descricao: "Combate frenético com espadas em uma Tóquio alternativa. Combos fluidos, chefes gigantes e uma trilha sonora eletrizante.",
    precoOriginal: 229.90, precos: [114.90, 119.90, 104.90, 129.90],
    historico: [229.90, 199.90, 169.90, 139.90, 119.90, 104.90],
    cores: ["#c1121f", "#1b1b2f"], emoji: "🗡️"
  },
  {
    id: 7, nome: "Turbo Rally Brasil", genero: "Corrida",
    plataformas: ["PC", "Xbox", "Switch"], classificacao: "Livre",
    descricao: "Rali pelas estradas de terra do interior do Brasil. Chuva, lama e curvas fechadas testam sua habilidade ao volante.",
    precoOriginal: 179.90, precos: [89.90, 94.90, 79.90, 99.90],
    historico: [179.90, 159.90, 129.90, 109.90, 94.90, 79.90],
    cores: ["#f4a261", "#2a9d8f"], emoji: "🚙"
  },
  {
    id: 8, nome: "Sombras de Eldoria", genero: "RPG",
    plataformas: ["PC", "PlayStation"], classificacao: "12",
    descricao: "Uma jornada tática por masmorras e vilarejos de Eldoria. Gerencie seu grupo, domine magias e escolha o lado da luz ou da sombra.",
    precoOriginal: 269.90, precos: [179.90, 169.90, 189.90, 174.90],
    historico: [269.90, 259.90, 229.90, 199.90, 179.90, 169.90],
    cores: ["#5a189a", "#10002b"], emoji: "🧙"
  },
  {
    id: 9, nome: "Noite Sem Fim", genero: "Terror",
    plataformas: ["PC", "Xbox", "PlayStation"], classificacao: "18",
    descricao: "Você é vigia noturno de um hospital abandonado. Sobreviva até o amanhecer — que parece nunca chegar.",
    precoOriginal: 119.90, precos: [49.90, 44.90, 52.90, 59.90],
    historico: [119.90, 99.90, 79.90, 64.90, 52.90, 44.90],
    cores: ["#0b132b", "#6a0572"], emoji: "🌙"
  },
  {
    id: 10, nome: "Arena Futsal Pro", genero: "Esporte",
    plataformas: ["PC", "Switch", "Xbox"], classificacao: "Livre",
    descricao: "Futsal rápido e técnico, com partidas de 5 minutos, modo torneio e multiplayer local para até 4 jogadores.",
    precoOriginal: 129.90, precos: [99.90, 89.90, 94.90, 104.90],
    historico: [129.90, 124.90, 119.90, 109.90, 99.90, 89.90],
    cores: ["#00b4d8", "#03045e"], emoji: "🥅"
  },
  {
    id: 11, nome: "Pequeno Farol", genero: "Indie",
    plataformas: ["PC", "Switch", "PlayStation"], classificacao: "Livre",
    descricao: "Um jogo contemplativo sobre o último guardião de um farol. Resolva enigmas, cuide do mar e descubra a história da ilha.",
    precoOriginal: 59.90, precos: [34.90, 39.90, 27.90, 37.90],
    historico: [59.90, 54.90, 49.90, 39.90, 34.90, 27.90],
    cores: ["#a8dadc", "#1d3557"], emoji: "🗼"
  },
  {
    id: 12, nome: "Fúria Orbital", genero: "Ação",
    plataformas: ["PC", "Xbox"], classificacao: "14",
    descricao: "Batalhas espaciais em primeira pessoa. Pilote caças, invada estações inimigas e proteja a última colônia humana.",
    precoOriginal: 199.90, precos: [149.90, 139.90, 159.90, 144.90],
    historico: [199.90, 189.90, 174.90, 159.90, 149.90, 139.90],
    cores: ["#4361ee", "#000814"], emoji: "🚀"
  },
  {
    id: 13, nome: "Dragões de Cristal", genero: "RPG",
    plataformas: ["PC", "PlayStation", "Xbox", "Switch"], classificacao: "12",
    descricao: "Crie vínculos com dragões feitos de cristal e voe por ilhas flutuantes. Um RPG de fantasia com exploração livre e cooperativo online.",
    precoOriginal: 279.90, precos: [129.90, 119.90, 139.90, 124.90],
    historico: [279.90, 249.90, 199.90, 159.90, 129.90, 119.90],
    cores: ["#80ffdb", "#7400b8"], emoji: "🐉"
  },
  {
    id: 14, nome: "Rua do Medo", genero: "Terror",
    plataformas: ["PC", "Switch"], classificacao: "16",
    descricao: "Investigue uma rua onde tudo parece normal... até o sol se pôr. Terror psicológico com puzzles e múltiplos finais.",
    precoOriginal: 89.90, precos: [69.90, 64.90, 59.90, 74.90],
    historico: [89.90, 84.90, 79.90, 69.90, 64.90, 59.90],
    cores: ["#ff6b6b", "#212529"], emoji: "🏚️"
  }
];

const CUPONS = [
  { codigo: "PLAY10",   descricao: "10% extra em qualquer jogo",       loja: "CofreGamer" },
  { codigo: "NEON15",   descricao: "15% em jogos de Ação e RPG",       loja: "NeonKeys" },
  { codigo: "FEIRA5",   descricao: "R$ 5 de desconto acima de R$ 50",  loja: "PixelFeira" },
  { codigo: "BYTE20",   descricao: "20% no primeiro pedido",           loja: "Bazar Byte" }
];

function menorPreco(jogo) {
  let indice = 0;
  for (let i = 1; i < jogo.precos.length; i++) {
    if (jogo.precos[i] < jogo.precos[indice]) indice = i;
  }
  return { preco: jogo.precos[indice], loja: LOJAS[indice], indice: indice };
}

function descontoPercentual(jogo) {
  const menor = menorPreco(jogo).preco;
  return Math.round((1 - menor / jogo.precoOriginal) * 100);
}

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function buscarJogoPorId(id) {
  return JOGOS.find(function (j) { return j.id === Number(id); });
}

function capaSVG(jogo) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 225">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="' + jogo.cores[0] + '"/>' +
    '<stop offset="1" stop-color="' + jogo.cores[1] + '"/>' +
    '</linearGradient></defs>' +
    '<rect width="400" height="225" fill="url(#g)"/>' +
    '<defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1">' +
    '<stop offset="0" stop-color="#000" stop-opacity="0"/>' +
    '<stop offset="1" stop-color="#000" stop-opacity="0.65"/>' +
    '</linearGradient></defs>' +
    '<rect y="125" width="400" height="100" fill="url(#s)"/>' +
    '<text x="200" y="125" font-size="80" text-anchor="middle">' + jogo.emoji + '</text>' +
    '<text x="200" y="195" font-size="22" font-family="Arial, sans-serif" ' +
    'font-weight="bold" fill="#ffffff" text-anchor="middle">' + jogo.nome + '</text>' +
    '</svg>';
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
