# 🎮 PreçoPlay

Site de comparação de preços de games, feito como projeto acadêmico da disciplina **Programação - Web Coding** – **UNINASSAU - GRAÇAS**.

> ⚠️ **Aviso:** jogos, lojas e preços são **fictícios**, guardados em `data/jogos.js`. Nenhuma marca real é utilizada.

🔗 **Site publicado (GitHub Pages):** https://usuario.github.io/repositorio/
📦 **Repositório:** https://github.com/usuario/repositorio

## Descrição

O PreçoPlay ajuda o jogador a encontrar o **menor preço** de um jogo. Cada jogo tem o preço em 4 lojas fictícias (CofreGamer, NeonKeys, PixelFeira e Bazar Byte). O site compara os valores, destaca a loja mais barata, mostra o histórico de preço e permite favoritar jogos e definir um preço alvo.

## Páginas

| Arquivo | Descrição |
|---|---|
| `index.html` | Página principal: busca, ofertas do dia e categorias |
| `catalogo.html` | Catálogo com busca, filtros (plataforma, gênero, preço) e ordenação |
| `jogo.html` | Detalhes, tabela de comparação, gráfico de histórico e botão Favoritar |
| `promocoes.html` | Jogos com mais de 50% de desconto, contador regressivo e cupons |
| `favoritos.html` | Lista de desejos com alerta de preço alvo |
| `sobre.html` | Proposta do site, equipe e formulário de contato com validação |

## Tecnologias

- **HTML5** semântico (`header`, `nav`, `main`, `section`, `footer`)
- **CSS3** com variáveis, Flexbox, Grid e layout responsivo
- **JavaScript puro** (sem frameworks), com `localStorage` para os favoritos
- **Google Fonts** (Orbitron e Inter)
- **Git e GitHub** (hospedagem do código e GitHub Pages)

## Estrutura do projeto

```
/
├── index.html
├── catalogo.html
├── jogo.html
├── promocoes.html
├── favoritos.html
├── sobre.html
├── css/style.css
├── js/main.js        (menu, busca, favoritos, promoções, contato)
├── js/catalogo.js    (filtros e ordenação)
├── js/jogo.js        (detalhes, tabela e gráfico)
├── js/favoritos.js   (lista de desejos e preço alvo)
├── data/jogos.js     (dados fictícios de jogos, lojas e cupons)
├── img/              (imagens e fotos da equipe)
└── README.md
```

## Como executar

Não precisa instalar nada.

1. Baixe ou clone o repositório:
   ```bash
   git clone https://github.com/usuario/repositorio.git
   ```
2. Abra o arquivo `index.html` no navegador (duplo clique).

## Equipe

| Nome | Matrícula | Responsabilidade |
|---|---|---|
| Lucas Lourenço | 01588150 | Líder, página principal, Documentação e GitHub |
| Amhos Moraes | 01589117 | CSS, identidade visual e Página do jogo |
| Carlos Guilherme | 01589907 | Catálogo, filtros e Promoções e favoritos |


## Créditos

- Capas dos jogos: arte criada pela equipe (SVG gerado por código).
- Fontes: [Google Fonts](https://fonts.google.com/) (Orbitron e Inter).
- Documentação consultada: [MDN Web Docs](https://developer.mozilla.org/pt-BR/).
