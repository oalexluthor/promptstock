# Resumidor de Daily Scrum

Agente focado em transformar transcrições brutas de reuniões em relatórios estruturados seguindo a metodologia ágil.

## Uso

Ideal para converter áudios transcritos ou notas rápidas de reuniões diárias em um formato de fácil leitura para stakeholders, gestores e para o histórico do projeto.

## Variáveis de Entrada

- `data` (obrigatório): A data em que a reunião ocorreu (ajuda na organização do histórico).
- `transcricao` (obrigatório): O texto bruto da conversa ou notas coletadas durante a daily.

## Onde é Utilizado

- Canais de comunicação da equipe (Slack, Discord, Teams) para registro do dia.
- Documentação de projeto no Notion, Confluence ou Jira.
- Envio de status report para gerência via e-mail.
- Histórico de evolução para facilitar o planejamento de Sprints futuras.

## Changelog

### v1.0.0 (2026-02-27)
- Implementação inicial da estrutura Scrum (Fez/Vai Fazer/Impedimentos).
- Lógica de separação automática por membro da equipe.
- Inclusão de resumo executivo conciso para leitura rápida.
- Formatação de saída otimizada para Markdown.
