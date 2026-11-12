# Calculadora

Calculadora web que funciona como app (PWA): abre no navegador, pode ser instalada na tela inicial do celular e funciona offline.

## Funções
- Soma, subtração, multiplicação e divisão
- Porcentagem, troca de sinal (±) e apagar dígito (⌫)
- Formato brasileiro (vírgula decimal, ponto de milhar)
- Histórico de contas (toque para reutilizar o resultado)
- Atalhos de teclado: números, `+ - * /`, `Enter`, `Backspace`, `Esc`
- Tema claro/escuro automático

## Rodar localmente
```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera a pasta dist/
```

## Google AI Studio
Projeto no formato Vite + TypeScript (com `metadata.json`), pronto para importar do GitHub no Google AI Studio.

## Publicar (Vercel / Netlify)
Build: `npm run build` · Output: `dist`

## Instalar no celular
Abra o link no navegador → menu → **Adicionar à tela inicial**.
