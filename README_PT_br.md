<img src="./docs/public/logo_promptstock2.png" style="width:50%; height:auto; margin:0 auto;"/>

Autor: Alex Araujo de Paula (@oalexluthor) - 27/02/2026 

# 1 - O que é o PromptStock?

O PromptStock funciona como um **Static Site Generator (SSG)** especializado em IA. Ele atua como uma ponte entre os especialistas em domínios (que escrevem as lógicas no formato YAML) e os usuários finais (que precisam de uma interface amigável para preencher variáveis e obter resultados imediatos).

## Proposta de Valor

Por que não usar apenas um bloco de notas ou arquivos `.md` comuns?

* **Interatividade Real:** Através do componente `PromptRunner`, o usuário preenche campos de texto em tempo real, vendo o prompt final ser montado dinamicamente com as variáveis injetadas.
* **Organização por Equipes:** Suporte nativo para **Multi-Sidebars**, permitindo que departamentos (Desenvolvimento, Marketing, Vendas) tenham seus próprios silos de prompts isolados e organizados.
* **Versionamento Inteligente:** Estrutura focada em pastas, permitindo manter o histórico de evolução de cada agente ou instrução sem perder a referência estável.
* **Fácil Manutenção:** O humano trabalha apenas com arquivos YAML e descrições simples.

---

## Stack Tecnológica

O projeto foi construído sobre o que há de mais moderno em automação e web estática:

* **Python (v3.x):** O motor de build. Responsável por ler os arquivos YAML, sanitizar os dados e gerar os arquivos Markdown compatíveis com o VitePress.
* **VitePress:** O framework de documentação de alto desempenho (movido por Vite e Vue) que garante uma navegação instantânea e SEO otimizado.
* **Vue.js 3:** Responsável pela reatividade do componente de interface, garantindo que o processamento das variáveis ocorra inteiramente no lado do cliente (client-side).

---


---
## Screenshots

#### Página principal com categorias de prompts
<img src="./docs/public/promptstock_home.png" style="width:80%; height:auto; margin:0 auto;"/>


#### Página do prompt

<img src="./docs/public/promptstock_page_1.png" style="width:80%; height:auto; margin:0 auto;"/>


#### Gerador de prompt
Insira os valores nos campos de formulário e copie o prompt já pronto para usar!
<img src="./docs/public/promptstock_generator1.png" style="width:80%; height:auto; margin:0 auto;"/>

<img src="./docs/public/promptstock_generator2.png" style="width:80%; height:auto; margin:0 auto;"/>

---


## 🚀 Instalação e Setup Inicial

Siga este guia para configurar o seu ambiente de desenvolvimento do zero e colocar o Godzilla para rugir no seu navegador.

### 1. Clonagem do Repositório

Comece trazendo o projeto para a sua máquina local:

```bash
git clone https://github.com/seu-usuario/PromptStock.git
cd PromptStock

```

### 2. Instalação de Dependências

O PromptStock é um projeto híbrido, portanto, você precisará instalar as dependências de dois ecossistemas:

**Ambiente Node.js (Interface Visual):**
Certifique-se de ter o Node.js (LTS) instalado.

```bash
npm install

```

**Ambiente Python (Motor de Automação):**
Recomenda-se o uso de um ambiente virtual (*venv*).

```bash
# Opcional: Criar e ativar venv
python -m venv venv
source venv/bin/activate  # No Windows: venv\Scripts\activate

# Instalar dependências do Python
pip install -r requirements.txt

```

*(Caso não tenha o arquivo requirements.txt, o único pacote essencial no momento é o `PyYAML`)*.

### 3. O Ritual de Passagem (Primeiro Build)

Para que o VitePress tenha conteúdo para exibir, você deve primeiro converter os prompts brutos em páginas Markdown. Siga esta ordem obrigatória:

**Passo A: Rodar o Python**
Este comando varre a pasta `prompts/` e popula a pasta `docs/`.

```bash
python build_prompts.py

```

**Passo B: Iniciar o VitePress**
Agora que os arquivos `.md` existem, você pode subir o servidor de desenvolvimento.

```bash
npm run docs:dev

```

Após esses comandos, abra o seu navegador em `http://localhost:5173`. Você verá o **PromptStock** online, com a sidebar já organizada pelas equipes definidas nas suas pastas.

---


# 📂 2. Arquitetura de Pastas (O Coração do Projeto)

O PromptStock utiliza uma estrutura de "espelhamento". O que você organiza na pasta de entrada (`prompts/`) dita como o site será estruturado na saída.

## 📁 Diretório `prompts/` (Input Humano)

Este é o único lugar onde os usuários e engenheiros de prompt devem trabalhar. Ele é organizado em dois níveis:

* **Nível 1: Grupos/Equipes:** Pastas que representam os departamentos (ex: `developer/`, `marketing/`, `rh/`). O nome dessas pastas aparecerá como o título da seção na sidebar.
* **Nível 2: O Prompt:** Cada prompt possui sua própria pasta. Dentro dela, a estrutura é rígida para garantir o build:
* `README.md`: Contém a documentação técnica do prompt (Uso, Variáveis, Changelog).
* `latest/`: Pasta que contém o arquivo `.yml` (ou `.yaml`) com o template e as variáveis reais. O script de build sempre buscará o primeiro arquivo YAML dentro desta pasta.
* `vx-x-x/`: Pastas de versões anteriores do prompt no formato SEM Version, com arquivo `.yml`.



## 🤖 Diretório `docs/` (Output do Robô)

Esta pasta é a "fábrica" do VitePress. **Nunca edite arquivos diretamente aqui.**

* Todo o conteúdo de `docs/` (exceto a pasta `.vitepress`) é deletado ou sobrescrito sempre que o script `build_prompts.py` é executado. O script transforma a estrutura completa de `prompts/` em arquivos `.md` planos e otimizados que o VitePress consegue renderizar como páginas web.

* Dentro da pasta `.vitepress/` ficam os arquivos de configuração e dos componentes do tema. Leia a documentação do vitepress para fazer modificações caso necessário.

* O arquivo `index.md` é o arquivo da página principal da sua documentação. ELE NÃO É GERADO AUTOMATICAMENTE. Edite ele da forma que preferir, principalmente para criar os menus das categorias.  É recomendado colocar o link de pelo menos um prompt de uma categoria para renderizar os outros dentro da sidebar.


---

## 📝 Exemplo Visual da Estrutura

```text
PromptStock/
├── prompts/                # 🛠️ VOCÊ TRABALHA AQUI
│   └── developer/          # Nome da Equipe
│       └── code-reviewer/  # Pasta do Prompt
│           ├── README.md   # Descrição humana
│           └── latest/
│               └── code-reviewer.yml  # Template e Variáveis
├── docs/                   # ⚠️ NÃO MEXA AQUI (Auto-gerado)
│   ├── .vitepress/         # Configurações do site
│   └── developer/
│       └── code-reviewer.md
├── build_prompts.py        # 🚀 O Motor de Automação
└── package.json            # Scripts do Node.js

```

---


# 🛠️ 3. Fluxo de Trabalho Manual (Guia do Usuário)

Adicionar um novo prompt ao **PromptStock** segue um processo padronizado de três etapas.

## 1 - Criando um Novo Prompt: Passo a Passo

1. **Identifique a Equipe:** Vá até a pasta `prompts/` e escolha a pasta da equipe correspondente (ex: `marketing/`). Se a equipe não existir, crie a pasta.
2. **Crie a Pasta do Prompt:** Dentro da pasta da equipe, crie uma subpasta com o nome do seu prompt em formato *kebab-case* (ex: `gerador-de-emails`).
3. **Prepare a Estrutura:** Dentro da pasta do seu prompt, você precisará obrigatoriamente de:
* Um arquivo `README.md`.
* Uma pasta chamada `latest/`.
* Um arquivo `.yml` dentro da pasta `latest/` com o mesmo nome do prompt.



---

## 2 - O Arquivo YAML do prompt

Aqui está o detalhamento dos campos do arquivo YAML dentro da pasta `latest/`.

| Campo | Descrição | Exemplo |
| --- | --- | --- |
| `_type` | Identificador de tipo para o script Python. | `prompt` |
| `id` | Identificador único (usado no nome do arquivo final). | `analise-de-seo` |
| `target` | Caminho relativo dentro de `docs/` onde o arquivo será salvo. Deve ser o mesmo caminho que a na pasta prompts. | `marketing/seo/` |
| `version` | Controle de versão semântica do prompt. | `1.0.2` |
| `input_variables` | Lista de variáveis que se tornarão campos de texto na UI. | `['texto_base', 'palavra_chave']` |
| `template` | O texto do prompt com as variáveis entre chaves `{}`. | `Analise o texto {texto_base}...` |

> **Atenção:** No campo `template`, use o caractere `|` (pipe) para blocos de texto multilinha, mantendo a formatação original do prompt.
> **Dica:** Na raiz desse projeto, existe um arquivo de template para prompts chamado `prompt_exemplo.yml`. Você pode copiá-lo e usá-lo como base.

---

## 3 - O Arquivo README: Documentação Humana

Enquanto o YAML fala com a máquina, o `README.md` fala com o usuário. Ele deve conter:

* **Título:** Nome amigável do prompt.
* **Contexto:** Para que serve e qual problema ele resolve.
* **Guia de Variáveis:** Explicação do que deve ser inserido em cada campo.
* **Changelog:** O que mudou nas últimas versões.

*O conteúdo deste arquivo será injetado no topo da página gerada pelo VitePress.*

---

## Convenções de Nomenclatura

1. **Kebab-Case:** Todos os nomes de pastas e IDs devem ser em letras minúsculas separadas por hífen.
* ✅ `revisor-de-codigo`
* ❌ `Revisor_De_Codigo` ou `revisordecodigo`


2. **IDs Únicos:** O campo `id` no YAML não deve se repetir entre prompts diferentes, mesmo de equipes distintas.
3. **Sem Caracteres Especiais:** Evite acentos, cedilhas ou símbolos nos nomes de pastas e campos `id`.

---

# ⚙️ 4. O Motor de Automação (`build_prompts.py`)

O script `build_prompts.py` é o coração da automação do **PromptStock**. Ele atua como um tradutor, pegando as definições estáticas em YAML e transformando-as em arquivos Markdown dinâmicos que o VitePress consegue interpretar.

## 📋 Pré-requisitos

Para rodar o motor de build, você precisará ter o Python instalado (versão 3.8 ou superior) e a biblioteca de processamento de YAML:

```bash
# Instalação da dependência necessária
pip install PyYAML

```

## 🛠️ O que o script faz?

O script executa um pipeline de processamento em cinco etapas:

1. **Mapeamento de Território:** O script varre a pasta `prompts/`, identifica as pastas de equipes e localiza os arquivos `README.md` e os arquivos YAML dentro de `latest/`.
2. **Leitura de Metadados:** Ele extrai as variáveis, o ID e o template do prompt definidos no YAML.
3. **Injeção de Componente:** Ele combina o conteúdo do `README.md` com a tag do componente `<PromptRunner />`, passando os dados sanitizados como propriedades (*props*).
4. **Geração do Markdown:** Cria o arquivo `.md` final no diretório de destino especificado pelo campo `target` do YAML.

## 🚀 Como executar o Build

Sempre que você criar ou editar um prompt na pasta `prompts/`, você deve rodar o motor para atualizar o site:

```bash
# Na raiz do projeto, execute:
python build_prompts.py

```

**O que acontece após o comando?**

* O terminal exibirá o progresso de cada prompt processado.
* Os arquivos dentro de `docs/` (exceto `.vitepress`) serão atualizados.
* Se o servidor do VitePress estiver rodando (`npm run dev`), as mudanças aparecerão instantaneamente no navegador através do *Hot Module Replacement* (HMR).

---



# 🧹 5. Manutenção e Boas Práticas

Para manter o **PromptStock** organizado, seguro e eficiente à medida que o volume de prompts cresce, siga estas diretrizes de manutenção.

### Versionamento de Prompts

O sistema foi desenhado para que o site sempre exiba a versão mais estável e recente, mas sem perder o histórico.

* **A Pasta `latest/`:** O motor de build sempre buscará o arquivo YAML dentro da pasta `latest/`. Ela deve conter apenas o arquivo da versão que deve estar "ao vivo".
* **Arquivamento:** Quando criar uma nova versão do prompt, mova o YAML antigo para uma pasta de histórico (ex: `v1/`, `v2/`) ao lado da `latest/`.
* **Por que fazer isso?** Isso permite que você rastreie a evolução da lógica do prompt via Git, enquanto garante que a interface do usuário no site permaneça simples e sempre atualizada com a melhor versão disponível.

### Segurança e Dados Sensíveis

Prompts são poderosos, mas podem ser perigosos se expuserem segredos.

* **Zero Segredos:** Nunca coloque chaves de API, senhas ou URLs privadas diretamente no campo `template` do YAML.
* **Placeholders:** Se um prompt precisar de uma chave de acesso, crie uma variável de entrada (ex: `api_key`) para que o usuário a preencha manualmente na interface do site. Isso garante que nenhum dado sensível seja "assado" nos arquivos estáticos do site.

### Limpeza de Arquivos Órfãos

O script de build cria arquivos, mas ele não apaga arquivos que não existem mais na origem por padrão.

* **Sincronização:** Se você deletar uma pasta de prompt em `prompts/`, o arquivo correspondente em `docs/` continuará existindo.
* **Recomendação:** Periodicamente, apague todo o conteúdo de `docs/` (exceto a pasta `.vitepress`) e rode o `python build_prompts.py`. Isso garante que o site reflita exatamente o que está na sua pasta de origem, sem "lixo" de prompts antigos ou renomeados.

### Testes Antes do Build

Antes de converter um YAML para o site:

1. Teste o texto do seu `template` diretamente no playground da IA escolhida (ChatGPT, Claude, Gemini).
2. Certifique-se de que todas as variáveis `{chaves}` estão escritas exatamente igual ao que foi definido em `input_variables`.
3. Valide se o YAML está com a indentação correta (use um linter de YAML se necessário).

