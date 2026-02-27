import os
import yaml
import json
from pathlib import Path

# Configurações de caminhos
SOURCE_DIR = Path("prompts")
OUTPUT_DIR = Path("docs")

def build():
    print("🚀 Iniciando processamento de prompts...")

    # Garante que a pasta docs existe
    if not OUTPUT_DIR.exists():
        OUTPUT_DIR.mkdir()

    # Percorre cada pasta dentro de 'prompts/'
    for group_folder in SOURCE_DIR.iterdir():
        if not group_folder.is_dir():
            continue

        print(f"📦 Processando: {group_folder.name}")
        
        
        for prompt_folder in group_folder.iterdir():
          if not prompt_folder.is_dir():
            continue

          # 1. Tenta ler o README.md (Descrição do Prompt)
          description_path = prompt_folder / "README.md"
          description_content = ""
          if description_path.exists():
              description_content = description_path.read_text(encoding="utf-8")
          else:
              print(f"⚠️  Aviso: README.md não encontrado em {prompt_folder.name}")

          # 2. Acessa a pasta 'latest' para pegar o YAML
          latest_dir = prompt_folder / "latest"
          yaml_files = list(latest_dir.glob("*.yml")) + list(latest_dir.glob("*.yaml"))

          if not yaml_files:
              print(f"❌ Erro: Nenhum arquivo YAML encontrado em {latest_dir}")
              continue

          # Pegamos o primeiro YAML encontrado na pasta latest
          with open(yaml_files[0], "r", encoding="utf-8") as f:
              prompt_data = yaml.safe_load(f)

          # 3. Extrai metadados do YAML
          target_path = prompt_data.get("target", "geral/")
          prompt_id = prompt_data.get("id", prompt_folder.name)
          template_text = prompt_data.get("template", "")
          variables = prompt_data.get("input_variables", [])
          
          
          # Preparamos os dados para o componente Vue (escapando caracteres especiais)
          json_variables = json.dumps(variables)
          json_template = json.dumps(template_text)
          
          
          
          
          
          

          # 4. Define o destino final
          # Ex: docs/desenvolvedor/revisor-codigo.md
          final_dest_dir = OUTPUT_DIR / target_path.strip("/")
          final_dest_dir.mkdir(parents=True, exist_ok=True)
          
          final_file_path = final_dest_dir / f"{prompt_id}.md"

          # 5. Monta o conteúdo do Markdown final
          markdown_output = f"""

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
  """

          # 6. Salva o arquivo (dentro do loop)
          with open(final_file_path, "w", encoding="utf-8") as f:
              f.write(markdown_output)

          print(f"✅ Gerado: {final_file_path}")
        
        
if __name__ == "__main__":
    build()
print("\n✨ Processo concluído com sucesso!")
