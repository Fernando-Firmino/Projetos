# Diferenças entre a versão FIEL e a versão LIMPA

Como foi calculado: simulei a cascata do CSS (especificidade, ordem, @media e herança) para o desktop (1440px)
e o mobile (390px), comparando cada elemento nas duas versões. Não renderizei a página em um navegador, e os
scripts do próprio Canva (`/_sdk/...`) podem acrescentar regras que eu não enxergo. Confira no navegador.

## Números

| | Fiel | Limpa |
|---|---|---|
| Atributos `style="..."` no HTML | 173 | 0 |
| Tamanho do `index.html` | 45.599 caracteres | 31.105 caracteres |
| Linhas do `styles.css` | 189 | 355 |
| Declarações vindas das tags | 647 | 192 migradas + 455 redundantes (não copiadas) |

## Onde a aparência MUDA (e por quê)

Regra de ouro: dentro da tag, o estilo vence qualquer regra do CSS. Fora da tag, vence a regra mais
**específica** (e, se empatar, a que vem depois). O seletor `[data-template-id="x"]` tem especificidade baixa
(0,1,0), então perde para seletores mais específicos que já existiam, como `.step h3` ou `.dark .eyebrow`.

| Elemento | Propriedade | Fiel (antes) | Limpa (depois) | Quem passou a vencer |
|---|---|---|---|---|
| `header-buy`, `mobile-buy` (botões "Quero o Método ADC") | tamanho da letra | 16px | 10px | `.topbar .pill` |
| `mobile-inicio`, `mobile-sobre`, `mobile-aplicacao`, `mobile-conteudo`, `mobile-contato` | tamanho (mobile) | 16px | 18px | `.mobile-panel .nav-item` |
| `problem-line-1/2/3` | peso e tamanho | 400 / 16px | 500 / 40px (desktop), 24px (mobile) | `.problem-lines p` |
| `step-1..6-title` (verbos do método) | peso e tamanho | 400 / 19px | 500 / 47,5px (desktop), 32px (mobile) | `.step h3` |
| `step-1..6-copy` (perguntas do método) | tamanho (desktop) | 16px | 18px | `.step p:last-child` |
| `offer-label` ("A OFERTA") | cor | #924932 (ferrugem) | #ffb586 (pêssego) | `.dark .eyebrow` |
| `offer-subtitle` | tamanho | 16px | 18px | `.offer-box .offer-sub` |
| `offer-included-title`, `offer-bonus-title` | tamanho | 19px | 22px | `.offer-box h3` |
| `offer-price` (R$ 97) | peso e tamanho | 400 / 16px | 500 / 48px | `.offer-price strong` |
| `whatsapp-message` | cor | #924932 | #491d01 | `.faq-help p` |
| `footer-tagline`, `footer-email`, `footer-instagram` | tamanho e cor | 16px, branco sólido | 13px, branco 75% | `.footer p` |
| `about-copy`, `final-copy`, `kit-intro`, `problem-close` | cor | branco sólido | branco 82% | `.dark .support` |
| `module-1..5-copy` | cor | branco sólido | branco 82% | `.dark .answer` |
| `kit-1..6-copy` | cor | branco sólido | branco 80% | `.kit-item p` |

## Dois pontos para observar

1. **A maioria das mudanças aproxima a página do que o CSS tinha desenhado** (verbos grandes no método,
   preço em 48px, perguntas em 18px). Isso mostra que, na versão fiel, os `font-size` colocados pelo Canva
   dentro das tags (16px, 19px, 24px, 32px) cobriam os tamanhos do CSS.
2. **Dois pontos pioram:** o rótulo "A OFERTA" fica pêssego sobre fundo creme (pouco contraste) e os botões do
   header ficam com letra de 10px. Se isso acontecer no navegador, a correção é aumentar a especificidade da
   regra na seção 22 (por exemplo, `.offer-box [data-template-id="offer-label"]{color:var(--rust)}`).

## O que continua igual

- `hero-title` (h1) e os títulos h2 continuam em 32px e 24px, porque a regra `[data-template-id]` (0,1,0) vence
  o seletor `h1` ou `h2` (0,0,1). Para usar os tamanhos "desenhados" (até ~73px no h1), apague esses `font-size`
  da seção 22 do CSS.
- Estrutura, textos, links, `data-template-id` e classes `canva-*` não mudaram.
