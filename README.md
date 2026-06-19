# launcherz — conteúdo do launcher

Repositório de **conteúdo** (não tem código aqui). São os arquivos que o launcher baixa
pela internet em tempo de execução. Editar algo aqui muda o launcher de **todos os
jogadores** sem ninguém reinstalar nada.

- **Propagação:** servido via `raw.githubusercontent.com` (cache de ~5 min). O jogador vê
  a mudança ao **reabrir o launcher**.
- **O repositório precisa ser público** — se ficar privado, o launcher não baixa.
- **Repo de código** (separado): `EduardoVisgueira/minecraft-custom-launcher`.

---

## Estrutura do repositório

```
launcherz/
├── launcher-config.json   textos, RAM, noticias, slideshow, modpack (o que voce mais edita)
├── modpack/
│   └── pack.mrpack        O MODPACK — arquivo .mrpack (Modrinth). Troque por aqui.
├── banners/               imagens do slideshow da tela inicial
├── branding/              logo mostrado DENTRO do app (theme.logo_url)
└── README.md
```

### `modpack/` — o modpack (formato `.mrpack`)
O modpack inteiro é **um único arquivo `.mrpack`** (padrão Modrinth). O launcher baixa esse
arquivo, lê o índice (os mods vêm direto da **CDN do Modrinth**) e extrai os `overrides/`
(config, kubejs, etc.), instalando tudo na instância do jogador — **baixando só o que mudou**.

**Não precisa gerar manifest nem hospedar os `.jar`.** Mods que não estão no Modrinth já vão
embutidos dentro do próprio `.mrpack`.

**Como montar / trocar / atualizar o modpack:**
1. Monte o pack no que você já usa (Modrinth App, ATLauncher, Prism…) e **exporte como `.mrpack`**.
2. Suba o arquivo em **`modpack/pack.mrpack`** (substitua o que está lá).
3. No `launcher-config.json`: confira `modpack.mrpack_url` apontando pra ele, ajuste
   `modpack.name` (nome do pack) e **aumente `modpack.version`** (ex: `2.4` → `2.5`).
4. Pronto — todos os jogadores recebem o diff ao abrir o launcher.

> Trocar o nome do pack (`modpack.name`) cria uma **instância nova** no PC do jogador (pastas
> isoladas por nome), então ele rebaixa o pack uma vez.

### `launcher-config.json`
Arquivo principal — textos, visual e comportamento. Lido a cada abertura. Campos na
**Referência** abaixo.

### `branding/`
Logo mostrado **dentro do app** (ex: tela de splash), via `theme.logo_url`. Para trocar:
suba seu PNG (quadrado, fundo transparente) e aponte a URL em `theme.logo_url`. **Atenção:**
isto NÃO muda o ícone da barra de tarefas / área de trabalho — esse fica embutido no `.exe`.

### `banners/`
Imagens do slideshow da tela inicial. Referenciadas em `slideshow_images`. Recomendado:
paisagem 16:9, ~1920×1080, `.jpg`/`.png`/`.webp`. Troque subindo a imagem (mesmo nome) ou
adicione uma nova e aponte no config.

---

## Referência — `launcher-config.json`

| Campo | Tipo | O que faz |
|---|---|---|
| `config_url` | string | URL deste próprio arquivo. **Não mexer.** |
| `launcher_name` | string | Nome exibido no launcher (in-app). |
| `forge_version` | string | Versão do Forge (`1.20.1-47.4.10`), deve casar com a do `.mrpack`. |
| `login_title` / `login_subtitle` | string | Textos da tela de login. |
| `play_button_label` | string | Texto do botão de jogar. |
| `announcement` | objeto | `{ "text": "", "type": "info" \| "warning" }`. Texto vazio = sem aviso. |
| `slideshow_images` | array | URLs das imagens da tela inicial (use as de `banners/`). |
| `slideshow_interval_ms` | número | Tempo entre slides em ms (`5000` = 5s). |
| `social_links` | objeto | `discord`, `youtube`, `instagram`, `twitter`, `tiktok`, `telegram`, `website`. Vazio = botão escondido. |
| `store_url` / `store_label` | string | Link e rótulo do botão de loja. |
| `news` | array | Transmissões: `{ "title", "body", "date": "AAAA-MM-DD" }`. |
| `modpack.name` | string | Nome do modpack (vira o nome da instância isolada). |
| `modpack.mrpack_url` | string | URL do `.mrpack` (aponta pra `modpack/pack.mrpack`). |
| `modpack.version` | string | Versão do pack. **Aumente a cada update** (`2.4` → `2.5`) p/ sinalizar atualização. |
| `modpack.forge_version` | string | Versão do Forge do pack. |
| `ram` | objeto | `default_mb`, `min_mb`, `max_mb` (limites do slider de RAM). |
| `theme.accent_color` | string | Cor de destaque (hex). |
| `theme.background_overlay_opacity` | número | Escurecimento do fundo (0–1). |
| `theme.logo_url` | string | URL do logo in-app (use o de `branding/`). |

> É JSON: vírgula no fim de cada item **menos o último**, textos entre aspas. Sintaxe
> quebrada = o launcher ignora o arquivo e usa a última versão válida. Valide em
> https://jsonlint.com.

---

## Tarefas comuns

### Trocar / atualizar o modpack
Exporte o `.mrpack`, suba em `modpack/pack.mrpack`, aumente `modpack.version`. (Detalhe na
seção `modpack/` acima.)

### Adicionar uma notícia (a mais recente no topo)
```json
"news": [
  { "title": "Evento de fim de semana", "body": "XP em dobro até domingo.", "date": "2026-06-20" },
  { "title": "Bem-vindo!", "body": "Servidor no ar.", "date": "2026-06-15" }
]
```

### Mostrar um aviso no topo
```json
"announcement": { "text": "Manutenção sábado às 14h.", "type": "warning" }
```
Deixe `"text": ""` para esconder.

### Ligar uma rede social
```json
"social_links": { "discord": "https://discord.gg/SEULINK", "website": "https://seusite.com", "youtube": "", "instagram": "", "twitter": "", "tiktok": "", "telegram": "" }
```
Campo vazio = botão escondido.

### Trocar um banner
Suba a imagem em `banners/` e, se mudou o nome, atualize a URL em `slideshow_images`.
