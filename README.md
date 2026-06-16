# Apocalipse Z — conteúdo online do launcher

Este repositório controla o launcher **sem precisar reinstalar nada**. Edite os
arquivos aqui e os launchers atualizam sozinhos no próximo boot.

## Arquivos

- **`launcher-config.json`** — nome, textos, slideshow, notícias, redes sociais, loja, versão do modpack, cor do tema. É o que o launcher lê.
- **`banners/`** — as imagens do slideshow (`slide1.jpg`, `slide2.jpg`, `slide3.png`). Troque/adicione e atualize a lista `slideshow_images` no `launcher-config.json`.
- **`config/`** — os arquivos de configuração do modpack.
- **`manifest.json`** — lista dos mods/configs com hash (gerado pelo script). O launcher usa pra baixar/atualizar.

## Modpack (mods)

Os `.jar` ficam em **Releases** (não nos arquivos do repo):

1. Crie um Release e suba os `.jar`:
   `gh release create modpack-v1 .\mods\*.jar -t "Modpack v1"`
2. Rode o `gerar-manifest.ps1` (pergunta as 2 URLs) na pasta com `mods/` e `config/`.
3. Faça commit do `manifest.json` + da pasta `config/`.
4. Trocou um mod? Re-suba o asset no Release, rode o script e commite o `manifest.json` novo.

## Importante

- Repositório deve ser **público**.
- Edições aparecem em ~5 min (cache do GitHub).
- Mods sem espaço no nome do arquivo.
