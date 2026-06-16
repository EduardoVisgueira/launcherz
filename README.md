# 🧟 Apocalipse Z — Painel de Controle do Launcher

Este repositório é o "painel de controle" do launcher. **Tudo que você editar aqui
muda no launcher de TODOS os jogadores** — sem ninguém precisar reinstalar nada.

> ⏱️ As mudanças aparecem em até **5 minutos** (depois de salvar) e o jogador vê
> ao **abrir o launcher** de novo.

---

## 📝 Como editar (passo a passo, pelo site do GitHub)

Você **não precisa instalar nada**. É tudo pelo navegador:

1. Entre no arquivo **`launcher-config.json`** (clique no nome dele aqui na lista).
2. Clique no **lápis ✏️** (canto superior direito) → "Edit this file".
3. Altere o que quiser (veja os exemplos abaixo).
4. Desça até o final e clique no botão verde **"Commit changes"**.
5. Pronto! Em ~5 min está valendo pra todos.

> ⚠️ **Cuidado com vírgulas e aspas.** É um arquivo `.json`: cada item termina com
> vírgula, menos o último. Se quebrar, o launcher ignora e usa o anterior. Na dúvida,
> use um validador: cole o conteúdo em https://jsonlint.com e veja se diz "Valid JSON".

---

## 🔧 O que dá pra mudar (no `launcher-config.json`)

### Nome do launcher
```json
"launcher_name": "Apocalipse Z",
```
Troque o texto entre aspas.

### Imagens de fundo (slideshow)
1. Entre na pasta **`banners/`** → botão **"Add file" → "Upload files"** → arraste suas imagens.
2. Depois edite a lista abaixo, colocando o **nome exato** de cada imagem que você subiu:
```json
"slideshow_images": [
  "https://raw.githubusercontent.com/EduardoVisgueira/launcherz/main/banners/slide1.jpg",
  "https://raw.githubusercontent.com/EduardoVisgueira/launcherz/main/banners/slide2.jpg",
  "https://raw.githubusercontent.com/EduardoVisgueira/launcherz/main/banners/slide3.png"
],
"slideshow_interval_ms": 5000,
```
- Pode ter quantas quiser (3, 5, 10…). Só copie a linha e mude o nome do arquivo.
- `slideshow_interval_ms` = tempo de cada imagem (5000 = 5 segundos).
- Use imagens **largas (paisagem)**, tipo print do jogo. Formatos: `.jpg`, `.png` ou `.webp`.

### Textos da tela de login e botão
```json
"login_title": "Acesso à Zona",
"login_subtitle": "Identifique-se para entrar na quarentena",
"play_button_label": "ENTRAR NA ZONA",
```

### Aviso/recado no topo (opcional)
```json
"announcement": {
  "text": "Servidor em manutenção sábado às 14h!",
  "type": "info"
},
```
Deixe `"text": ""` (vazio) pra não mostrar nada.

### Notícias
```json
"news": [
  {
    "title": "Bem-vindo à Zona",
    "body": "Servidor no ar. Boa sobrevivência.",
    "date": "2026-06-15"
  }
],
```
Pra adicionar outra notícia, copie o bloco `{ ... }` e separe com vírgula.

### Redes sociais (aparecem como botões)
```json
"social_links": {
  "discord": "https://discord.gg/SEULINK",
  "youtube": "https://youtube.com/@SEUCANAL",
  "instagram": "",
  "twitter": "",
  "tiktok": "",
  "telegram": "",
  "website": ""
},
```
Deixe `""` (vazio) nas que não usar — elas somem.

### Loja
```json
"store_url": "https://sualoja.com",
"store_label": "Loja",
```

### Cor do tema
```json
"theme": {
  "accent_color": "#84cc16",
  ...
}
```
`#84cc16` é o verde tóxico. Troque pelo código de cor que quiser (ex.: `#ff3333` vermelho).

### Versão do modpack
```json
"modpack": {
  "name": "Zona Morta",
  "manifest_url": "...não mexa...",
  "version": "1.0.0"
},
```
Suba a `version` quando atualizar o modpack (ex.: `1.0.1`). O launcher mostra que tem
atualização nova.

---

## 🎮 Atualizar o MODPACK (os mods)

Os mods (`.jar`) **não vão nos arquivos** — vão em **Releases** (mais leve e rápido).
Resumo:

1. Na aba **"Releases"** (lateral direita da página do repo) → **"Create a new release"**.
2. Em **"Tag"** coloque algo como `modpack-v1` e arraste todos os `.jar` na área de anexos.
3. No seu PC, na pasta com `mods/` e `config/`, rode o **`gerar-manifest.ps1`**
   (ele pergunta 2 links). Isso cria o `manifest.json`.
4. Aqui no repo, suba o **`manifest.json`** novo e a pasta **`config/`**.
5. No launcher, o botão **"Sincronizar"** baixa só o que mudou.

> 💡 Trocou 1 mod? Re-suba o `.jar` no Release, rode o script de novo e suba o
> `manifest.json` atualizado. Os jogadores baixam só a diferença.

---

## ❓ Dúvidas comuns

- **Mudei e não apareceu** → espere ~5 min e **feche/abra o launcher**.
- **O launcher "quebrou" o texto** → provável vírgula/aspas erradas no JSON. Valide em https://jsonlint.com.
- **Imagem não aparece** → confira se o nome na lista é **idêntico** ao do arquivo em `banners/` (maiúsculas contam!).
- **Repositório precisa ser público** (não deixe privado, senão o launcher não baixa).
