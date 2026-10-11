# AURO Taguatinga — apresentação do meeting

Esta pasta funciona diretamente no computador e como site estático. Não precisa instalar dependências nem executar um build.

## Abrir offline

1. Extraia o arquivo `meeting.auro-offline.zip` inteiro. Mantenha `index.html`, `engine/`, `conteudo/` e `assets/` juntos.
2. Abra `index.html` no navegador. No Windows, `ABRIR APRESENTACAO.bat` abre o Chrome em modo quiosque.
3. A grade lateral aparece ao carregar. Clique em **Entrar em tela cheia** ou pressione **F** para começar a apresentação. Fora da tela cheia, **Ver grade** no canto superior direito reabre a grade lateral. **V** também reabre a grade lateral; **G** mostra a grade em tela inteira. Na grade lateral, clicar em uma miniatura troca o slide e mantém a grade aberta; o passador também continua funcionando.

O conteúdo e as bibliotecas usados pela apresentação estão nesta pasta. A conexão com a internet não é necessária para abrir os slides. Vídeos ainda não fornecidos aparecem com as alternativas previstas na apresentação.

## Controles

| Tecla | Ação |
| --- | --- |
| →, ↓, PageDown, Espaço ou Enter | Avança ou completa a animação atual |
| ←, ↑, PageUp ou Backspace | Volta |
| V | Abre ou fecha a grade lateral de telas |
| G | Abre ou fecha a grade em tela inteira |
| F ou F5 | Entra ou sai da tela cheia |
| Esc | Fecha a grade |
| B ou . | Liga ou desliga a tela preta |
| R | Mostra notas de revisão |
| Número + Enter | Vai para a tela indicada |

Os textos, a ordem dos slides e os links dos QR Codes ficam em `conteudo/roteiro.js`.

## Publicar no GitHub e na Vercel

Use **o conteúdo desta pasta** como raiz do repositório [meeting.auro](https://github.com/PedroPaulogg77/meeting.auro). O arquivo `index.html` deve ficar na raiz do repositório, junto de `assets/`, `conteudo/` e `engine/`.

Na Vercel, importe o repositório e selecione:

- **Framework Preset:** Other
- **Root Directory:** `.` (raiz do repositório)
- **Build Command:** vazio
- **Output Directory:** `.`

A Vercel publica projetos HTML/CSS/JavaScript estáticos sem etapa de build. Cada atualização enviada ao repositório conectado gera uma nova publicação. Consulte a [documentação de builds da Vercel](https://vercel.com/docs/builds).

Antes de tornar o link público, revise `conteudo/roteiro.js`: ele contém textos, notas de revisão e pendências da apresentação. O conteúdo de um site estático pode ser lido por qualquer pessoa que tenha acesso ao site.
