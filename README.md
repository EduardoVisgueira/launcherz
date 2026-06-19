# launcherz — conteúdo do launcher Apocalipse Z

Repositório de **conteúdo** do launcher (não tem código aqui). São os arquivos que o
launcher baixa pela internet em tempo de execução. Editar algo neste repo muda o launcher
de **todos os jogadores** sem ninguém reinstalar nada.

- **Propagação:** o GitHub serve os arquivos via `raw.githubusercontent.com`, com cache de
  **~5 minutos**. Passado isso, o jogador vê a mudança ao **reabrir o launcher** (a config é
  baixada no startup).
- **O repositório precisa ser público** — se ficar privado, o launcher não consegue baixar.
- **Repo de código** (separado): `EduardoVisgueira/minecraft-custom-launcher`.

---

## Estrutura do repositório

```
launcherz/
├── launcher-config.json   configuracao do launcher (textos, RAM, noticias, slideshow, modpack)
├── manifest.json          lista de arquivos do modpack (mods/config/kubejs) com hash e URL
├── branding/              logo mostrado DENTRO do app (theme.logo_url)
├── banners/               imagens do slideshow da tela inicial
├── config/                configs dos mods (servidas cruas e baixadas na instancia)
└── kubejs/                scripts KubeJS do modpack
```

### `launcher-config.json`
Arquivo principal — controla texto, visual e comportamento do launcher. Lido a cada
abertura. É o que você mais edita. Campos na seção **Referência** abaixo.

### `manifest.json`
Lista de **todos os arquivos do modpack** que o launcher baixa e mantém sincronizados. Cada
entrada tem `path`, `url` e um hash (`sha512` para mods de CDN, `sha256` para arquivos
servidos por este repo). Formato:

```json
{
  "managed_dirs": ["mods", "config", "kubejs", "resourcepacks"],
  "files": [
    { "path": "mods/exemplo.jar", "url": "https://cdn.modrinth.com/...", "sha512": "..." },
    { "path": "config/exemplo.toml", "url": "https://raw.githubusercontent.com/EduardoVisgueira/launcherz/main/config/exemplo.toml", "sha256": "..." }
  ]
}
```

- `managed_dirs`: pastas que o launcher **gerencia** na instância do jogador. Arquivo que
  sai do manifest é apagado da instância (exceto entradas começando com `.`, tipo
  `.connector`, que são dados de runtime e ficam intactas).
- O launcher só baixa o que tem hash diferente do local — quem já tem o pack não rebaixa tudo.
- **Não edite na mão.** É gerado (ver *Atualizar o modpack*).
- Mods são referenciados por **URL** (hoje aponta para a CDN do Modrinth); `config/` e
  `kubejs/` são servidos crus deste repo.

### `branding/`
Logo do launcher mostrado **dentro do app** (ex: tela de splash), via `theme.logo_url` no
`launcher-config.json`. Para trocar: suba seu PNG (recomendado quadrado, fundo transparente)
e aponte a URL em `theme.logo_url`. **Atencao:** isto NAO muda o icone da barra de tarefas /
area de trabalho — esse icone fica embutido no `.exe` (definido no build, nao por config).

### `banners/`
Imagens do slideshow da tela inicial (`slide1.jpg`, `slide2.jpg`, `slide3.png`).
Referenciadas em `launcher-config.json → slideshow_images`. Recomendado: paisagem 16:9,
~1920×1080, `.jpg`/`.png`/`.webp`. Para trocar, suba a imagem (mesmo nome) ou adicione uma
nova e aponte no config.

### `config/`
Configs dos mods (as mesmas de `.minecraft/config`). Baixadas na instância conforme o
`manifest.json`. Mudou uma config do pack? Atualize aqui e **regenere o manifest**.

### `kubejs/`
Scripts KubeJS do pack (receitas, eventos). Mesmo fluxo do `config/`: editar + regenerar manifest.

---

## Referência — `launcher-config.json`

| Campo | Tipo | O que faz |
|---|---|---|
| `config_url` | string | URL deste próprio arquivo. **Não mexer.** |
| `launcher_name` | string | Nome exibido no launcher. |
| `forge_version` | string | Versão do Forge (`1.20.1-47.4.10`), casada com o modpack. |
| `login_title` / `login_subtitle` | string | Textos da tela de login. |
| `play_button_label` | string | Texto do botão de jogar. |
| `announcement` | objeto | `{ "text": "", "type": "info" \| "warning" }`. Texto vazio = sem aviso. |
| `slideshow_images` | array | URLs das imagens da tela inicial (use as de `banners/`). |
| `slideshow_interval_ms` | número | Tempo entre slides em ms (`5000` = 5s). |
| `social_links` | objeto | `discord`, `youtube`, `instagram`, `twitter`, `tiktok`, `telegram`, `website`. Vazio = botão escondido. |
| `store_url` / `store_label` | string | Link e rótulo do botão de loja. |
| `news` | array | Transmissões: `{ "title", "body", "date": "AAAA-MM-DD" }`. |
| `modpack.name` | string | Nome do modpack (vira o nome da instância isolada). |
| `modpack.manifest_url` | string | URL do `manifest.json`. **Não mexer.** |
| `modpack.version` | string | Versão do pack. **Aumente a cada update** (`2.4` → `2.5`) para o launcher sinalizar atualização. |
| `modpack.forge_version` | string | Versão do Forge do pack. |
| `ram` | objeto | `default_mb`, `min_mb`, `max_mb` (limites do slider de RAM). |
| `theme.accent_color` | string | Cor de destaque (hex). |
| `theme.background_overlay_opacity` | número | Escurecimento do fundo (0–1). |
| `theme.logo_url` | string | URL de logo opcional. |

> É JSON: vírgula no fim de cada item **menos o último**, textos entre aspas. Sintaxe
> quebrada = o launcher ignora o arquivo e usa a última versão válida. Valide em
> https://jsonlint.com.

---

## Tarefas comuns

### Adicionar uma notícia (a mais recente no topo)
```json
"news": [
  { "title": "Evento de fim de semana", "body": "XP em dobro até domingo.", "date": "2026-06-20" },
  { "title": "Bem-vindo à Zona", "body": "Servidor no ar.", "date": "2026-06-15" }
]
```

### Mostrar um aviso no topo
```json
"announcement": { "text": "Manutenção sábado às 14h.", "type": "warning" }
```
Deixe `"text": ""` para esconder.

### Ligar uma rede social
```json
"social_links": { "discord": "https://discord.gg/SEULINK", "youtube": "", "instagram": "", "twitter": "", "tiktok": "", "telegram": "", "website": "" }
```
Campo vazio = botão escondido.

### Trocar um banner
Suba a imagem em `banners/` e, se mudou o nome, atualize a URL em `slideshow_images`.

### Atualizar o modpack (mods / config / kubejs)
1. Atualize os arquivos: mods entram por URL no manifest; `config/` e `kubejs/` são commitados aqui.
2. Regenere o `manifest.json` com `ferramentas/gerar-manifest.ps1` (no repo de código).
3. **config/kubejs:** o GitHub normaliza quebra de linha (CRLF) ao commitar, então o hash tem
   que sair do **blob commitado**, não do arquivo local — o fluxo do script já trata isso.
4. Suba o `manifest.json` junto com os arquivos.
5. Aumente `modpack.version` no `launcher-config.json` para sinalizar o update aos jogadores.
