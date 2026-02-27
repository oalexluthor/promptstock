import os
import yaml
import json
import html  # <--- IMPORTANTE: Para limpar os dados para o Vue
import inspect
from pathlib import Path

# Configurações de caminhos
SOURCE_DIR = Path("prompts")
OUTPUT_DIR = Path("docs")

def build():
    print("🚀 Iniciando processamento de prompts...")

    if not OUTPUT_DIR.exists():
        OUTPUT_DIR.mkdir()

    # 1. Navega nos grupos (ex: projetos, developer)
    for group_folder in SOURCE_DIR.iterdir():
        if not group_folder.is_dir() or group_folder.name.startswith('.'):
            continue

        print(f"📦 Grupo: {group_folder.name}")
        
        # 2. Navega nos prompts dentro do grupo
        for prompt_folder in group_folder.iterdir():
            if not prompt_folder.is_dir() or prompt_folder.name.startswith('.'):
                continue

            # Busca README.md
            description_path = prompt_folder / "README.md"
            description_content = description_path.read_text(encoding="utf-8") if description_path.exists() else ""

            # Busca a pasta 'latest' e o YAML
            latest_dir = prompt_folder / "latest"
            yaml_files = list(latest_dir.glob("*.yml")) + list(latest_dir.glob("*.yaml"))

            if not yaml_files:
                print(f"⚠️  Pulando {prompt_folder.name}: YAML não encontrado")
                continue

            with open(yaml_files[0], "r", encoding="utf-8") as f:
                prompt_data = yaml.safe_load(f)

            target_path = prompt_data.get("target", f"{group_folder.name}/")
            prompt_id = prompt_data.get("id", prompt_folder.name)
            template_text = prompt_data.get("template", "")
            variables = prompt_data.get("input_variables", [])

            # --- O PULO DO GATO ---
            # 1. Transformamos em JSON
            # 2. Escapamos as aspas para que o HTML/Vue não se confunda
            json_variables = html.escape(json.dumps(variables))
            json_template = html.escape(json.dumps(template_text))

            final_dest_dir = OUTPUT_DIR / target_path.strip("/")
            final_dest_dir.mkdir(parents=True, exist_ok=True)
            final_file_path = final_dest_dir / f"{prompt_id}.md"

            # 5. Monta o Markdown (Usando aspas DUPLAS no atributo do componente)
            # O textwrap.dedent remove os espaços extras da esquerda no Python
            markdown_output = inspect.cleandoc(f"""\
{description_content}

---

## 🚀 Gerador Dinâmico
Use os campos abaixo para preencher as variáveis e gerar o prompt final pronto para uso.

<PromptRunner 
    :variables='{json_variables}' 
    :template='{json_template}' 
/>

---

## 🛠 Detalhes Técnicos
**Versão:** `{prompt_data.get('version', '1.0.0')}`  
**ID:** `{prompt_id}`
""")

            with open(final_file_path, "w", encoding="utf-8") as f:
                f.write(markdown_output)

            print(f"   ✅ Gerado: {final_file_path}")

if __name__ == "__main__":
    build()
    print("\n✨ Processo concluído com sucesso!")
