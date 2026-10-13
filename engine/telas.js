/*
  Modelos de tela: transformam cada tela do roteiro no HTML do design system AURO (classes au-*).
  Cada modelo devolve { cls, html, rapida?, passos?, ativar?, desativar? }.
  As animações ficam em coreografia.js, ligadas pelos atributos data-a e data-split.
*/
(() => {
  const ASSETS = "assets/";
  const usar4k = screen.width * (window.devicePixelRatio || 1) >= 2560;

  const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const txt = s => esc(s).replace(/\*([^*]+)\*/g, "<em>$1</em>").replace(/\n/g, "<br>");
  const pad = n => String(n).padStart(2, "0");

  function src(nome) {
    if (!nome) return "";
    if (nome.startsWith("vetores/")) return `${ASSETS}${nome}.svg`;
    return `${ASSETS}img/${nome}${usar4k ? "" : ".hd"}.webp`;
  }
  function img(nome, cls = "", attrs = "") {
    if (!nome) return `<div class="ph ${cls}" ${attrs}><span>imagem pendente</span></div>`;
    return `<img class="${cls}" src="${src(nome)}" data-nome="${esc(nome)}" alt="" ${attrs}>`;
  }
  const folha = (nome, de, estilo) =>
    `<img class="au-folha au-folha--${de}" src="${ASSETS}vetores/folhagem/${nome}.svg" alt="" style="${estilo}">`;

  // composições de folhagem (sempre do lado oposto ao texto)
  const FOLHAS = {
    cantos: () => folha("ramo-folhas-longas", "de-baixo", "left:-3cqw;bottom:-9cqw;width:22cqw;--base:28% 100%;--atraso:.3s;--ritmo:9s")
      + folha("ramo-salgueiro-fino", "de-cima", "right:4cqw;top:-6cqw;width:15cqw;--base:20% 0;--atraso:.6s;--ritmo:7.5s"),
    direitaA: () => folha("ramo-salgueiro", "de-cima", "right:8cqw;top:-5cqw;width:21cqw;--base:30% 0;--atraso:.3s;--ritmo:10s")
      + folha("ramo-redondo-fino", "da-direita", "right:-4cqw;bottom:4cqw;width:30cqw;--base:100% 70%;--atraso:.7s;--ritmo:8s"),
    direitaB: () => folha("ramo-folhas-longas", "de-baixo", "right:6cqw;bottom:-10cqw;width:22cqw;--base:30% 100%;--atraso:.3s;--ritmo:9.5s")
      + folha("ramo-sementes-fino", "de-cima", "right:-2cqw;top:-3cqw;width:26cqw;--base:2% 0;--atraso:.6s;--ritmo:8s"),
    direitaC: () => folha("ramo-redondo", "da-direita", "right:-3cqw;top:14cqw;width:32cqw;--base:100% 70%;--atraso:.3s;--ritmo:9s")
      + folha("ramo-folhas-longas-fino", "de-baixo", "right:14cqw;bottom:-8cqw;width:13cqw;--base:40% 100%;--atraso:.7s;--ritmo:7s"),
    painel: () => folha("ramo-sementes-fino", "de-cima", "right:-3cqw;top:-6cqw;width:17cqw;--base:2% 0;--atraso:.6s;--ritmo:9s")
      + folha("ramo-folhas-longas-fino", "de-baixo", "right:4cqw;bottom:-6cqw;width:12cqw;--base:40% 100%;--atraso:.9s;--ritmo:7s"),
    baixo: () => folha("ramo-folhas-longas-fino", "de-baixo", "right:3cqw;bottom:-8cqw;width:13cqw;--base:40% 100%;--atraso:.8s;--ritmo:8s"),
    // abertura: arabescos dos dois lados, se formando e balançando
    laterais: () =>
      folha("ramo-folhas-longas", "de-baixo", "left:-3cqw;bottom:-12cqw;width:25cqw;--base:28% 100%;--atraso:.1s;--ritmo:7s;--giro:2.6deg")
      + folha("ramo-sementes", "de-cima", "left:-6cqw;top:-4cqw;width:30cqw;--base:2% 0;--atraso:.5s;--ritmo:9s;--giro:2deg;transform:scaleX(-1)")
      + folha("ramo-redondo-fino", "da-direita", "left:-5cqw;top:38cqw;width:26cqw;--base:100% 70%;--atraso:.9s;--ritmo:8s;--giro:2.4deg;transform:scaleX(-1)")
      + folha("ramo-salgueiro", "de-cima", "right:1cqw;top:-8cqw;width:18cqw;--base:30% 0;--atraso:.3s;--ritmo:8.5s;--giro:2.6deg")
      + folha("ramo-folhas-longas", "de-baixo", "right:-3cqw;bottom:-12cqw;width:24cqw;--base:28% 100%;--atraso:.7s;--ritmo:7.5s;--giro:2.4deg;transform:scaleX(-1)")
      + folha("ramo-redondo", "da-direita", "right:-9cqw;top:28cqw;width:24cqw;--base:100% 70%;--atraso:1.1s;--ritmo:9.5s;--giro:2deg")
      + folha("ramo-salgueiro-fino", "de-cima", "left:22cqw;top:-8cqw;width:12cqw;--base:30% 0;--atraso:1.3s;--ritmo:6.5s;--giro:3deg")
      + folha("ramo-folhas-longas-fino", "de-baixo", "right:24cqw;bottom:-10cqw;width:12cqw;--base:40% 100%;--atraso:1.5s;--ritmo:7s;--giro:3deg"),
    // divisores: ramos dos dois lados, texto centralizado
    ladosA: () => folha("ramo-folhas-longas", "de-baixo", "left:-3cqw;bottom:-10cqw;width:21cqw;--base:28% 100%;--atraso:.2s;--ritmo:9s")
      + folha("ramo-salgueiro", "de-cima", "right:4cqw;top:-6cqw;width:19cqw;--base:30% 0;--atraso:.5s;--ritmo:10s")
      + folha("ramo-redondo-fino", "da-direita", "right:-4cqw;bottom:3cqw;width:24cqw;--base:100% 70%;--atraso:.8s;--ritmo:8s"),
    ladosB: () => folha("ramo-sementes", "de-cima", "left:-5cqw;top:-4cqw;width:27cqw;--base:2% 0;--atraso:.2s;--ritmo:9s;transform:scaleX(-1)")
      + folha("ramo-folhas-longas", "de-baixo", "right:-3cqw;bottom:-10cqw;width:21cqw;--base:28% 100%;--atraso:.5s;--ritmo:8.5s;transform:scaleX(-1)")
      + folha("ramo-folhas-longas-fino", "de-baixo", "left:8cqw;bottom:-9cqw;width:11cqw;--base:40% 100%;--atraso:.9s;--ritmo:7s"),
    ladosC: () => folha("ramo-redondo", "da-direita", "left:-4cqw;top:8cqw;width:28cqw;--base:100% 70%;--atraso:.2s;--ritmo:9s;transform:scaleX(-1)")
      + folha("ramo-salgueiro-fino", "de-cima", "right:6cqw;top:-7cqw;width:14cqw;--base:30% 0;--atraso:.5s;--ritmo:7.5s")
      + folha("ramo-folhas-longas", "de-baixo", "right:-2cqw;bottom:-11cqw;width:20cqw;--base:28% 100%;--atraso:.8s;--ritmo:9.5s;transform:scaleX(-1)"),
    topo: () => folha("ramo-sementes-fino", "de-cima", "left:-4cqw;top:-3cqw;width:24cqw;--base:2% 0;--atraso:.3s;--ritmo:9s;transform:scaleX(-1)")
      + folha("ramo-salgueiro-fino", "de-cima", "right:5cqw;top:-7cqw;width:13cqw;--base:30% 0;--atraso:.6s;--ritmo:7.5s"),
  };
  const DIVISORES = ["ladosA", "ladosB", "ladosC"];

  function qr(link, legenda) {
    let codigo = '<div class="qr-ph">QR Code<br>pendente</div>';
    if (link && window.qrcode) {
      const q = qrcode(0, "M"); q.addData(link); q.make();
      codigo = q.createSvgTag({ cellSize: 8, margin: 0, scalable: true });
    }
    return `<div class="au-qr" data-a="qr"><div class="au-qr-codigo">${codigo}</div><span>${txt(legenda || "")}</span></div>`;
  }
  const legal = t => t ? `<p class="au-legal">${txt(t)}</p>` : "";
  const splitTipo = s => (String(s || "").length <= 40 ? "chars" : "lines");
  const tamTitulo = s => (String(s || "").replace(/\*/g, "").length > 46 ? " au-titulo--m" : "");

  function fundo(f = {}, extra = "") {
    const imagens = f.imagens || [];
    const seq = imagens.length > 1;
    let html = `<div class="au-foto au-foto--kb${seq ? " au-foto--seq" : ""}">`;
    html += imagens.map((n, k) => img(n, k === 0 && seq ? "atual" : "")).join("");
    if (f.video) html += `<video muted loop playsinline preload="auto" src="${ASSETS}video/${esc(f.video)}"></video>`;
    html += "</div>";
    const alpha = f.escurecer ?? .45;
    html += alpha >= .6
      ? `<div class="au-veu" data-a="veu" style="background:color-mix(in srgb,var(--verde-fundo) ${Math.round(alpha * 100)}%,transparent)"></div>${extra}`
      : `<div class="au-veu au-veu--leve" data-a="veu"></div>${extra}`;
    return html;
  }
  // ciclo de imagens de fundo
  function ciclo(raiz, segundos, aoTrocar) {
    let timer = null, k = 0;
    return {
      iniciar() {
        const itens = [...raiz.querySelectorAll(".au-foto--seq > img, .au-foto--seq > .ph")];
        if (itens.length < 2) return;
        k = 0; itens.forEach((e, i) => e.classList.toggle("atual", i === 0)); aoTrocar && aoTrocar(0);
        timer = setInterval(() => { k = (k + 1) % itens.length; itens.forEach((e, i) => e.classList.toggle("atual", i === k)); aoTrocar && aoTrocar(k); }, segundos * 1000);
      },
      parar() { clearInterval(timer); }
    };
  }
  function videoHooks() {
    return {
      ativar(el) { const v = el.querySelector(".au-foto video"); if (v) v.play().catch(() => {}); },
      desativar(el) { const v = el.querySelector(".au-foto video"); if (v) v.pause(); },
    };
  }

  function numero(item, config) {
    if (item.preco && !config.exibirValores) return `<span class="au-numero">${txt(config.mascaraValor)}</span>`;
    const v = String(item.valor ?? "");
    if (/^\d{4}$/.test(v)) {
      // ano: cada dígito gira como um odômetro até o valor
      const rolos = [...v].map((d, k) => {
        const faixa = [...Array(10 + k * 3).keys()].map(i => i % 10).concat(+d);
        return `<span class="rolo"><span class="rolo-faixa" data-a="rolo">${faixa.map(n => `<span>${n}</span>`).join("")}</span></span>`;
      }).join("");
      return `<span class="au-numero rolos">${rolos}</span>`;
    }
    const contavel = /^(\d{1,3}(\.\d{3})+|\d+)(,\d+)?$/.test(v);
    const casas = (v.split(",")[1] || "").length;
    return `<span class="au-numero">${item.prefixo ? `<small>${txt(item.prefixo.trim())}</small>` : ""}<span ${contavel ? `data-contar data-casas="${casas}"` : ""}>${txt(v)}</span>${item.sufixo ? `<small class="suf">${txt(item.sufixo.trim())}</small>` : ""}</span>`;
  }

  /* ───────────────────────── Modelos ───────────────────────── */
  const M = {
    divisor(t) {
      const cap = t.capitulo, tit = cap.titulo || "";
      const estilo = tit.length > 16 ? ' style="font-size:4.6cqw"' : "";
      const titulo = cap.logo
        ? `<div class="div-logo">${window.AURO_LOGO}</div>`
        : `<h1 class="au-titulo" data-split="${tit.length <= 16 ? "chars" : "words"}"${estilo}>${txt(tit)}</h1>`;
      return { cls: "au-divisor", html: FOLHAS[DIVISORES[cap.numero % 3]]()
        + `<div class="au-conteudo">${titulo}<span class="fio" data-a="fio"></span>`
        + (cap.subtitulo ? `<p class="au-chamada${cap.chamadaMenor ? " au-chamada--menor" : ""}" data-split="words">${txt(cap.subtitulo)}</p>` : "") + "</div>" };
    },

    hero(t, ctx) {
      const temFoto = (t.fundo?.imagens || []).length || t.fundo?.video;
      const conteudo = `<div class="au-conteudo">${t.marca ? window.AURO_LOGO : ""}`
        + (t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo" style="color:var(--rose);margin-bottom:2cqw">${txt(t.sobretitulo)}</p>` : "")
        + (t.titulo ? `<h1 class="au-titulo${t.destaque ? " au-titulo--impacto" : tamTitulo(t.titulo)}" data-split="${splitTipo(t.titulo)}">${txt(t.titulo)}</h1>` : "")
        + (t.texto ? `<p class="au-apoio" data-split="lines">${txt(t.texto)}</p>` : "") + "</div>";
      const cls = `au-frase${t.posicao === "esquerda" ? " au-frase--esquerda" : ""}`;
      if (!temFoto) return { cls, html: FOLHAS[t.folhas || "cantos"]() + conteudo + legal(t.aviso) };
      const v = videoHooks();
      return { cls, html: fundo(t.fundo) + conteudo + legal(t.aviso || "Imagem ilustrativa."), ativar: v.ativar, desativar: v.desativar };
    },

    // tela de espera (fundo do show): arabescos laterais + ramos que brotam em volta do centro e revelam o logo
    flores(t) {
      const n = t.ramos || 10, rx = 19, ry = 7.5;
      let ramos = "";
      for (let k = 0; k < n; k++) {
        const ang = (360 / n) * k + 18, r = ang * Math.PI / 180;
        const x = 50 + rx * Math.cos(r), y = 28.125 + ry * Math.sin(r);
        const nome = k % 2 ? "ramo-folhas-longas-fino" : "ramo-folhas-longas", w = k % 2 ? 9 : 12.5;
        ramos += `<div class="flor" style="left:${x.toFixed(2)}cqw;top:${y.toFixed(2)}cqw;transform:rotate(${(ang + 90).toFixed(1)}deg)">`
          + `<img data-a="flor" src="${ASSETS}vetores/folhagem/${nome}.svg" alt="" style="width:${w}cqw;margin-left:${-w * .28}cqw;--k:${k}"></div>`;
      }
      return { cls: "au-flores", html: FOLHAS.laterais() + `<div class="flores-roda">${ramos}</div>`
        + `<div class="flores-logo" data-a="logo">${window.AURO_LOGO}</div>`
        + (t.frase ? `<p class="flores-frase" data-a="frase">${txt(t.frase)}</p>` : "") };
    },

    // gráficos (dados da Brain): linha do tempo da intenção de compra ou barras agrupadas de motivações
    grafico(t) {
      const fonte = t.fonte ? `<p class="fonte-tela">Fonte: ${txt(t.fonte)}</p>` : "";
      const cab = `<div class="graf-cab"><p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo || "")}</p>`
        + `<h2 class="au-titulo au-titulo--m" data-split="lines">${txt(t.titulo)}</h2></div>`;
      if (t.tipo === "barras") {
        const max = Math.max(...t.grupos.flatMap(g => g.itens.map(i => i[1])));
        const grupos = t.grupos.map(g => `<div class="graf-grupo" data-a="grupo"><div class="graf-barras">`
          + g.itens.map(([nome, v]) => `<div class="graf-linha"><span class="graf-nome">${txt(nome)}</span>`
            + `<span class="graf-trilho"><i class="graf-barra" data-a="barra" style="--p:${(v / max).toFixed(3)}"></i>`
            + `<b class="graf-valor"><span data-contar data-casas="0">${v}</span>%</b></span></div>`).join("")
          + `</div><div class="graf-total"><span class="au-numero"><span data-contar data-casas="0">${g.total}</span><small class="suf">%</small></span><small>${txt(g.nome)}</small></div></div>`).join("");
        return { cls: "au-grafico graf-tipo-barras", html: FOLHAS.baixo() + `<div class="graf">${cab}<div class="graf-grupos">${grupos}</div></div>` + fonte };
      }
      // linha: série única + faixa de margem de erro + média tracejada; rótulo só nos pontos-chave
      const W = 1600, H = 420, pad = { l: 20, r: 120, t: 40, b: 60 };
      const vals = t.serie.map(s => s[1]), vmin = t.escala?.[0] ?? 25, vmax = t.escala?.[1] ?? 56, mg = t.margem ?? 2;
      const X = k => pad.l + k * (W - pad.l - pad.r) / (vals.length - 1);
      const Y = v => pad.t + (vmax - v) / (vmax - vmin) * (H - pad.t - pad.b);
      const pts = vals.map((v, k) => [X(k), Y(v)]);
      const faixa = vals.map((v, k) => `${X(k).toFixed(1)},${Y(v + mg).toFixed(1)}`).join(" ") + " "
        + vals.map((v, k) => [k, v]).reverse().map(([k, v]) => `${X(k).toFixed(1)},${Y(v - mg).toFixed(1)}`).join(" ");
      const chave = new Set(t.destaques || [0, vals.length - 1]);
      const ultimo = vals.length - 1;
      let svg = `<svg class="graf-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">`
        + `<polygon class="graf-faixa" data-a="faixa" points="${faixa}"/>`
        + (t.media != null ? `<line class="graf-media" data-a="media" x1="${pad.l}" x2="${W - pad.r + 10}" y1="${Y(t.media).toFixed(1)}" y2="${Y(t.media).toFixed(1)}"/>` : "")
        + `<polyline class="graf-serie" data-a="serie" pathLength="1" points="${pts.map(p => p.map(v => v.toFixed(1)).join(",")).join(" ")}"/>`
        + pts.map(([x, y], k) => `<circle class="graf-ponto${k === ultimo ? " graf-ponto--fim" : ""}" data-a="ponto" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${k === ultimo ? 9 : 5}"/>`).join("")
        + "</svg>";
      // rótulos em HTML por cima (o SVG estica; o texto não)
      const rot = pts.map(([x, y], k) => chave.has(k)
        ? `<span class="graf-rot${k === ultimo ? " graf-rot--fim" : ""}" data-a="rot" style="left:${(x / W * 100).toFixed(2)}%;top:${(y / H * 100).toFixed(2)}%">${vals[k]}%</span>` : "").join("");
      const eixo = t.serie.map(([nome], k) => `<span style="left:${(X(k) / W * 100).toFixed(2)}%">${txt(nome)}</span>`).join("");
      const media = t.media != null ? `<span class="graf-media-rot" data-a="mediarot" style="top:${(Y(t.media) / H * 100).toFixed(2)}%">Média ${t.media}%</span>` : "";
      const nota = t.nota ? `<p class="graf-nota" data-a="nota">${txt(t.nota)}</p>` : "";
      return { cls: "au-grafico graf-tipo-linha", html: FOLHAS.baixo()
        + `<div class="graf">${cab}${nota}<div class="graf-area">${svg}${rot}${media}<div class="graf-eixo">${eixo}</div></div></div>` + fonte };
    },

    // blocos lado a lado (campanha, cupons). seta:true liga os blocos como etapas
    blocos(t) {
      const blocos = t.blocos.map((b, k) => (t.seta && k ? '<span class="blc-seta" data-a="seta">→</span>' : "")
        + `<div class="blc${b.destaque ? " blc--destaque" : ""}" data-a="bloco">`
        + (b.rotulo ? `<p class="au-rotulo">${txt(b.rotulo)}</p>` : "")
        + (b.titulo ? `<h3>${txt(b.titulo)}</h3>` : "")
        + (b.valor ? `<span class="blc-valor">${txt(b.valor)}</span>` : "")
        + (b.texto ? `<p class="blc-texto">${txt(b.texto)}</p>` : "") + "</div>").join("");
      return { cls: "au-blocos", html: FOLHAS[t.folhas || "cantos"]() + `<div class="au-conteudo blc-conteudo">`
        + (t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo)}</p>` : "")
        + `<h2 class="au-titulo${t.impacto ? " au-titulo--impacto" : " au-titulo--m"}" data-split="${t.impacto ? "chars" : "lines"}">${txt(t.titulo)}</h2>`
        + (t.texto ? `<p class="au-apoio" data-split="lines">${txt(t.texto)}</p>` : "")
        + `<div class="blc-linha n${t.blocos.length}${t.seta ? " com-seta" : ""}">${blocos}</div>`
        + (t.rodape ? `<p class="blc-rodape" data-a="rodape">${txt(t.rodape)}</p>` : "") + "</div>" + legal(t.aviso) };
    },

    // meta de vendas: cada clique libera um prêmio; o prêmio principal "explode"
    meta(t) {
      const cards = t.premios.map(p => `<div class="meta-premio${p.destaque ? " meta-premio--destaque" : ""}" data-a="premio">`
        + (p.img ? img(p.img, "meta-img") : "")
        + `<b>${txt(p.titulo)}</b>${p.sub ? `<small>${txt(p.sub)}</small>` : ""}</div>`).join("");
      const faiscas = Array.from({ length: 28 }, (_, k) => `<i style="--k:${k}"></i>`).join("");
      return { cls: "au-meta", passos: t.premios.length, html: `<div class="meta-raios" data-a="raios"></div>`
        + FOLHAS[t.folhas || "cantos"]()
        + `<div class="meta-esq"><p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo || "Premiação por metas")}</p>`
        + `<p class="meta-nome" data-a="nome">${txt(t.nome)}</p>`
        + `<div class="meta-num" data-a="num"><span class="au-numero"><span data-contar data-casas="0">${txt(t.vendas)}</span></span><span class="meta-vendas">vendas</span></div>`
        + (t.chamada ? `<p class="au-apoio" data-a="chamada">${txt(t.chamada)}</p>` : "") + "</div>"
        + `<div class="meta-premios n${t.premios.length}">${cards}</div><div class="meta-faiscas" data-a="faiscas">${faiscas}</div>`
        + legal(t.aviso) };
    },

    // soma do que o corretor ganha numa venda
    soma(t) {
      const linhas = t.linhas.map(l => `<li data-a="linha"><span>${txt(l.rotulo)}</span><b>${l.aprox ? "~ " : ""}R$ <span data-contar data-casas="2">${txt(l.valor)}</span></b></li>`).join("");
      return { cls: "au-soma", html: FOLHAS.cantos() + `<div class="soma"><div class="soma-tit">`
        + (t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo)}</p>` : "")
        + `<h2 class="au-titulo au-titulo--m" data-split="lines">${txt(t.titulo)}</h2></div>`
        + `<div class="soma-conta"><ul>${linhas}</ul><div class="soma-total" data-a="total"><span>${txt(t.total.rotulo)}</span>`
        + `<b class="au-numero"><small>R$</small><span data-contar data-casas="2">${txt(t.total.valor)}</span></b></div></div></div>`
        + (t.nota ? `<p class="fonte-tela">${txt(t.nota)}</p>` : "") };
    },

    // tabela de valores (linhas com espaço para preencher)
    tabela(t, ctx) {
      const cab = `<tr>${t.colunas.map(c => `<th>${txt(c)}</th>`).join("")}</tr>`;
      const linhas = t.linhas.map(l => `<tr data-a="linha">${l.map((c, k) => `<td${k === l.length - 1 ? ' class="tab-valor"' : ""}>${txt(c || ctx.config.mascaraValor)}</td>`).join("")}</tr>`).join("");
      return { cls: "au-claro au-tabela", html: FOLHAS.baixo() + `<div class="au-conteudo tab">`
        + (t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo)}</p>` : "")
        + `<h2 class="au-titulo au-titulo--m" data-split="lines">${txt(t.titulo)}</h2>`
        + `<table class="tab-tabela"><thead>${cab}</thead><tbody>${linhas}</tbody></table></div>` + legal(t.aviso) };
    },

    sequencia(t) {
      const imagens = t.imagens.map(i => i.img);
      const html = fundo({ imagens, escurecer: .5, ...t.fundo })
        + `<div class="au-conteudo">${t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo" style="color:var(--rose);margin-bottom:2cqw">${txt(t.sobretitulo)}</p>` : ""}`
        + `<h1 class="au-titulo${tamTitulo(t.titulo)}" data-split="${splitTipo(t.titulo)}">${txt(t.titulo)}</h1></div>`
        + `<p class="au-rotulo seq-legenda" data-a="legenda"></p>` + legal(t.aviso || "Imagens ilustrativas.");
      let c = null;
      return { cls: "au-frase", html,
        ativar(el) {
          const leg = el.querySelector(".seq-legenda");
          c = ciclo(el, t.intervalo || 5, k => { leg.textContent = t.imagens[k].legenda || ""; gsap.fromTo(leg, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: .8 }); });
          c.iniciar();
        },
        desativar() { c && c.parar(); } };
    },

    painel(t) {
      return { cls: "au-painel", html:
        `<div class="au-lado-foto"><div class="au-foto au-foto--kb">${img(t.img)}</div>${legal(t.aviso || "Imagem ilustrativa.")}</div>`
        + `<div class="au-lado-verde">${FOLHAS.painel()}`
        + (t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo" style="color:var(--rose)">${txt(t.sobretitulo)}</p>` : "")
        + `<h2 class="au-titulo" data-split="lines">${txt(t.titulo)}</h2>`
        + (t.texto ? `<p class="au-apoio" data-split="lines" style="font-size:1.15cqw">${txt(t.texto)}</p>` : "") + "</div>" };
    },

    numeros(t, ctx) {
      const unico = t.itens.length === 1;
      const item = i => `<div class="num-item" data-a="item">${numero(i, ctx.config)}`
        + (i.rotulo ? `<small class="num-rotulo">${txt(i.rotulo)}</small>` : "")
        + (i.detalhe ? `<span class="num-detalhe">${txt(i.detalhe)}</span>` : "")
        + (i.fonte ? `<span class="num-fonte">Fonte: ${txt(i.fonte)}</span>` : "") + "</div>";
      let corpo;
      if (t.layout === "destaque") {
        const n = t.destaques || 1;
        corpo = `<div class="num-destaques n${n}">${t.itens.slice(0, n).map(item).join("")}</div>`
          + (t.itens.length > n ? `<div class="num-secundarios">${t.itens.slice(n).map(item).join("")}</div>` : "");
      } else {
        const tipo = unico ? "unico" : t.layout === "grade" ? "grade" : "linha";
        corpo = `<div class="num-${tipo}">${t.itens.map(item).join("")}</div>`;
      }
      const temFoto = (t.fundo?.imagens || []).length;
      const base = temFoto ? fundo({ ...t.fundo, escurecer: t.fundo.escurecer ?? .8 }) : FOLHAS[t.folhas || "baixo"]();
      const centro = t.alinhamento === "centro" || t.layout === "destaque";
      return { cls: `au-numeros-tela${centro ? " num-centro" : ""}`, html: base
        + `<div class="num-conteudo">${t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo)}</p>` : ""}`
        + (t.titulo ? `<h2 class="au-titulo au-titulo--m" data-split="lines">${txt(t.titulo)}</h2>` : "")
        + corpo
        + (t.texto ? `<p class="au-apoio" data-a="texto">${txt(t.texto)}</p>` : "") + "</div>"
        + (t.fonte ? `<p class="fonte-tela">${txt(t.fonte)}</p>` : "") + legal(t.aviso) };
    },

    // +30 itens: o número entra no centro e vai para a esquerda enquanto a lista numerada aparece à direita
    itens(t, ctx) {
      const lista = t.itens || [];
      const tam = Math.ceil(lista.length / 3);
      const cols = [lista.slice(0, tam - 1), lista.slice(tam - 1, 2 * tam - 2), lista.slice(2 * tam - 2)];   // 10 · 10 · 11
      let k = 0;
      const colunas = cols.map(c => `<ol class="itens-col">${c.map(nome => `<li data-a="li"><span class="itens-n">${++k}</span><span>${txt(nome)}</span></li>`).join("")}</ol>`).join("");
      return { cls: "au-itens", html:
        folha("ramo-folhas-longas-fino", "de-baixo", "left:2cqw;bottom:-9cqw;width:12cqw;--base:40% 100%;--atraso:.6s;--ritmo:8s")
        + `<div class="itens-num" data-a="num">${numero(t.numero, ctx.config)}<small class="num-rotulo">${txt(t.numero.rotulo)}</small></div>`
        + `<div class="itens-painel" data-a="painel"><h2 class="au-titulo au-titulo--m" data-split="lines">${txt(t.titulo)}</h2><div class="itens-lista">${colunas}</div></div>`
        + (t.fonte ? `<p class="fonte-tela">${txt(t.fonte)}</p>` : "") };
    },

    manchetes(t) {
      const giros = [-2.2, 1.6, 1.1, -1.5];
      const cards = t.itens.map((m, k) => `<article class="recorte" data-a="card" style="--r:${giros[k % 4]}deg">`
        + `<header><b>${txt(m.veiculo)}</b><span>${txt(m.data)}</span></header><h3>${txt(m.manchete)}</h3>`
        + (m.destaque ? `<p class="recorte-dado">${txt(m.destaque)}</p>` : "") + "</article>").join("");
      return { cls: "au-manchetes", html: FOLHAS.baixo() + `<div class="au-conteudo mch"><div class="mch-tit">`
        + `<p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo || "O contexto econômico")}</p>`
        + `<h2 class="au-titulo" data-split="chars">${txt(t.titulo)}</h2>`
        + (t.texto ? `<p class="au-apoio" data-split="lines">${txt(t.texto)}</p>` : "") + `</div>`
        + `<div class="recortes n${t.itens.length}">${cards}</div></div>` };
    },

    mapa(t) {
      // mapa do designer separado em camadas: fundo ampliado + peças (etiquetas/ícones) + rotas desenháveis
      function camadas(nome, t) {
        const c = (window.CAMADAS || {})[nome];
        if (!c) return '<div class="ph"><span>mapa pendente</span></div>';
        const ocultar = new Set(t.ocultar || []);
        const pecas = c.pecas.map((p, k) => ocultar.has(k) ? "" :
          `<img class="peca p${pad(k)}${(t.pulsar || []).includes(k) ? " pulsa" : ""}" data-a="peca" src="${ASSETS}img/mapas/${nome}/${p.arquivo}" alt=""`
          + ` style="left:${p.x}%;top:${p.y}%;width:${p.w}%;height:${p.h}%">`).join("");
        const rotas = c.rotas.length ? `<svg class="mapa-rotas" viewBox="0 0 ${c.proporcao * 100} 100">`
          + c.rotas.map((r, k) => `<polyline id="rota${k ? k + 1 : ""}" class="rota-camada" pathLength="1" points="${r.pontos.map(q => [q[0] * c.proporcao, q[1]].join(",")).join(" ")}"/>`).join("")
          + "</svg>" : "";
        return `<div class="mapa-caixa" style="aspect-ratio:${c.proporcao}">${img(`mapas/${nome}-base`, "mapa-img")}${rotas}${pecas}</div>`;
      }
      const base = t.base || "";
      let camada;
      if (base.startsWith("svg:")) camada = (window.MAPAS || {})[base.slice(4)] || '<div class="ph"><span>mapa pendente</span></div>';
      else if (base === "esquema-df") camada = svgDF();
      else if (base.startsWith("camadas:")) camada = camadas(base.slice(8), t);
      else camada = `<div class="mapa-caixa" style="aspect-ratio:${t.proporcao || 1.4755}">${img(base, "mapa-img")}`
        + (t.pinos || []).map((p, k) => `<span class="mapa-pino" data-a="pino" style="left:${p[0]}%;top:${p[1]}%;--k:${k}"></span>`).join("") + "</div>";
      const cartao = t.cartao ? `<div class="mapa-cartao" data-a="cartao"><span class="au-numero">${txt(t.cartao.valor)}</span><small class="num-rotulo">${txt(t.cartao.rotulo)}</small></div>` : "";
      const extra = (base.startsWith("camadas:") ? " mapa--camadas" : "") + (t.legendaLado === "direita" ? " mapa--leg-dir" : "");
      return { cls: "au-mapa" + extra, html: `<div class="mapa-viewport"><div class="mapa-camada">${camada}</div></div>`
        + `<div class="mapa-veu"></div>${t.sobretitulo ? `<p class="au-rotulo mapa-rotulo" data-a="rotulo">${txt(t.sobretitulo)}</p>` : ""}`
        + `<h2 class="au-titulo au-titulo--m mapa-legenda" data-a="legenda"></h2>${cartao}`
        + (t.fonte ? `<p class="fonte-tela">${txt(t.fonte)}</p>` : ""), mapa: { etapas: t.etapas || [{}], esquema: base === "esquema-df" } };
    },

    lista(t) {
      const cols = t.categorias.map(c => `<div class="entorno-col" data-a="coluna">${img(c.img, "ent-img")}<h3>${txt(c.nome)}</h3><ul>`
        + c.itens.map(([l, tm]) => `<li><span>${txt(l)}</span><b>${txt(tm)}</b></li>`).join("") + "</ul></div>").join("");
      return { cls: "au-entorno", html: `<div class="au-conteudo ent"><p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo || "A região")}</p>`
        + `<h2 class="au-titulo au-titulo--m" data-split="chars">${txt(t.titulo)}</h2><div class="entorno-grade">${cols}</div></div>`
        + (t.fonte ? `<p class="fonte-tela">${txt(t.fonte)}</p>` : "") };
    },

    galeria(t, ctx) {
      return { cls: "au-galeria", rapida: true, html:
        `<div class="au-foto${t.semZoom ? "" : " au-foto--kb"}">${img(t.img, "", t.pos ? `style="object-position:${t.pos}"` : "")}</div>`
        + (t.frase ? '<div class="au-veu au-veu--base"></div>' : "")
        + (t.marca ? `<div class="gal-logo">${window.AURO_LOGO}</div>` : "")
        + (t.rotulo ? `<p class="au-etiqueta"><span data-split="chars">${txt(t.rotulo)}</span></p>` : "")
        + (t.grupo ? `<p class="au-rotulo gal-grupo" data-a="grupo">${txt(t.grupo)}</p>` : "")
        + (t.frase ? `<div class="au-conteudo au-pos-base"><h2 class="au-titulo au-titulo--m" data-split="lines">${txt(t.frase)}</h2></div>` : "")
        + (t.credito ? `<p class="au-legal" style="left:auto;right:3.1cqw;text-align:right">${txt(t.credito)}</p>` : "")
        + legal(t.aviso || ctx.config.avisoImagens) };
    },

    planta(t) {
      const cobertura = /cobertura/i.test(t.tipo);
      return { cls: "au-claro au-planta", rapida: true, html: `<div class="au-planta-ficha"><p class="au-rotulo" data-a="rotulo">${txt(t.tipo)}</p>`
        + `<div class="au-qtos"><span class="au-qtos-n" data-a="n">${txt(t.quartos)}</span><span class="au-qtos-col"><span data-split="chars">Qtos</span>`
        + (t.suite ? '<span class="au-selo" data-a="selo">1 suíte</span>' : "") + "</span></div>"
        + `<div class="au-area" data-a="area"${String(t.area).length > 10 ? ' style="font-size:2.5cqw"' : ""}>${txt(t.area)}</div>`
        + (cobertura ? '<span class="au-selo" data-a="selo">Cobertura</span>' : t.varanda ? '<span class="au-selo" data-a="selo">Com varanda</span>' : "")
        + (t.chave ? `<div class="planta-chave" data-a="chave">${img(t.chave)}<small>Posição no pavimento</small></div>` : "")
        + `</div><div class="au-planta-img">${img(t.img, "", 'data-a="planta"')}<p class="au-unidades" data-a="unidades">Unidades ${txt(t.unidades)}</p></div>`
        + legal("Planta ilustrativa. Os móveis e utensílios não fazem parte do contrato.") };
    },

    tipologia(t) {
      return { cls: "au-tipologia", html: FOLHAS.cantos() + `<div class="au-conteudo">`
        + `<div class="au-tip-topo"><img class="tip-icone" data-a="icone" src="${ASSETS}vetores/icones/icone-planta.svg" alt=""><span data-a="topo">Apartamentos<br>${txt(t.metragem)}</span><span class="au-tip-div" data-a="div"></span><span data-a="topo"><i>${txt(t.rotuloCobertura || "Penthouse")}</i><br>${txt(t.cobertura)}</span></div>`
        + `<div class="au-tip-meio"><span class="au-tip-num"><span data-a="n2" style="display:inline-block">2</span><i data-a="ne" style="display:inline-block">e</i><span data-a="n3" style="display:inline-block">3</span></span>`
        + `<span class="au-tip-dir"><span class="au-tip-qtos" data-split="chars">Qtos</span><span class="au-selo au-selo--escuro" data-a="selo">${txt(t.selo)}</span></span></div>`
        + `<p class="au-apoio" data-split="lines">${txt(t.apoio)}</p></div>` + legal(t.aviso) };
    },

    icones(t) {
      const itens = t.itens.map((i, k) => `<li data-a="item" style="--k:${k}"><img src="${ASSETS}vetores/icones/icone-${i.icone}.svg" alt=""><span>${txt(i.texto)}${i.sub ? `<small>${txt(i.sub)}</small>` : ""}</span></li>`).join("");
      return { cls: "au-claro au-lista", html: FOLHAS.baixo()
        + `<div class="au-conteudo"><h2 class="au-titulo au-titulo--m" data-split="lines">${txt(t.titulo)}</h2><ul class="au-lista-icones">${itens}</ul></div>` };
    },

    rostos(t) {
      const cel = t.pessoas.map(p => `<figure class="rosto" data-a="rosto">${img(p.img, "rosto-img", p.pos ? `style="object-position:${p.pos}"` : "")}<figcaption class="au-rotulo">${txt(p.perfil)}</figcaption></figure>`).join("");
      return { cls: "au-rostos", html: `<div class="rostos-grade">${cel}<div class="rosto-titulo"><h2 class="au-titulo au-titulo--m" data-split="chars">${txt(t.titulo)}</h2></div></div>` };
    },

    argumentos(t) {
      const cols = t.itens.map((a, k) => `<div class="arg-col" data-a="argumento"><span class="arg-num">${pad(k + 1)}</span>`
        + `<h3 class="au-titulo au-titulo--m" data-split="chars">${txt(a.palavra)}</h3><span class="arg-fio" data-a="argfio"></span><p class="au-apoio">${txt(a.texto)}</p></div>`).join("");
      return { cls: "au-argumentos", passos: t.fechamento ? 1 : 0, html:
        `<div class="au-foto au-foto--kb">${img(t.fundo?.imagens?.[0])}</div><div class="au-veu arg-veu" data-a="veu"></div>`
        + `<div class="au-conteudo arg-conteudo"><p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo || "Por que o AURO")}</p>`
        + `<div class="arg-grade">${cols}</div></div>`
        + (t.fechamento ? `<div class="fechamento" data-a="fechamento">${FOLHAS.laterais()}<h1 class="au-titulo au-titulo--impacto" data-split="chars" style="position:relative;z-index:3">${txt(t.fechamento)}</h1></div>` : "")
        + legal("Imagem ilustrativa.") };
    },

    video(t) {
      const src4k = t.src4k && usar4k ? `<source src="${ASSETS}video/${esc(t.src4k)}" type="video/mp4">` : "";
      return { cls: "au-video", html: `<video class="video-conceito" playsinline preload="auto" ${t.som ? "" : "muted"}>${src4k}<source src="${ASSETS}video/${esc(t.src)}" type="video/mp4"></video>`,
        ativar(el) { const v = el.querySelector("video"); if (v) { v.currentTime = 0; v.play().catch(() => {}); } },
        desativar(el) { const v = el.querySelector("video"); if (v) v.pause(); },
        aoFalharVideo: `<div class="ph"><b>Vídeo conceito</b><span>Arquivo pendente: ${esc(t.src)}</span></div>` };
    },

    grupo(t) {
      const marcas = t.empresas.map(e => `<div class="grupo-marca" data-a="marca">${img(e.img, "", e.escala ? `style="max-height:${2.6 * e.escala}cqw"` : "")}<span class="au-circulo au-circulo--rose">${txt(e.anos)}<small>anos</small></span></div>`).join("");
      const dados = t.itens.map(i => `<div class="au-dado" data-a="dado">${numero(i, {})}<span class="au-dado-txt"><b>${txt(i.palavra)}</b><small>${txt(i.rotulo)}</small></span></div>`).join("");
      return { cls: "au-concreto au-numeros", html: `<div class="au-lado-verde">`
        + `<p class="au-rotulo" data-a="rotulo" style="color:var(--rose)">${txt(t.sobretitulo || "Quem realiza")}</p>`
        + img(t.logo, "grupo-logo", 'data-a="logo"') + `<div class="grupo-marcas">${marcas}</div>`
        + folha("ramo-folhas-longas-fino", "de-baixo", "right:2cqw;bottom:-7cqw;width:11cqw;--base:40% 100%;--atraso:1s;--ritmo:8s")
        + `</div><div class="au-dados">${t.logoDados ? img(t.logoDados, "dados-logo", 'data-a="logodados"') : ""}${dados}</div>` };
    },

    realizacao(t) {
      const logos = t.logos.map(l => `<div class="real-item" data-a="logo"><p class="au-rotulo">${txt(l.rotulo)}</p>${img(l.img, "real-img")}</div>`).join("");
      return { cls: "au-realizacao", html: FOLHAS.topo()
        + `<div class="au-conteudo real"><p class="au-rotulo" data-a="rotulo">${txt(t.sobretitulo || "Realização")}</p><div class="real-grade">${logos}</div></div>` };
    },

    campanha(t, ctx) {
      const regras = (t.itens || []).map(r => `<li data-a="regra">${txt(r)}</li>`).join("");
      return { cls: "au-campanha", html: `<div class="camp-img" data-a="camp-img">${t.img ? img(t.img, "camp-midia") : '<div class="ph"><span>Imagem da moto<br>(pendente)</span></div>'}</div>`
        + `<div class="au-lado-verde">${FOLHAS.painel()}`
        + (t.sobretitulo ? `<p class="au-rotulo" data-a="rotulo" style="color:var(--rose)">${txt(t.sobretitulo)}</p>` : "")
        + `<h2 class="au-titulo" data-split="lines">${txt(t.titulo)}</h2><ul class="camp-regras">${regras}</ul>`
        + (t.qr ? qr(ctx.config[t.qr], t.qrLegenda) : "") + "</div>" };
    },

    "linha-do-tempo"(t, ctx) {
      const etapas = t.etapas.map((e, k) => `<li class="${k < t.atual ? "au-feita" : k === t.atual ? "au-atual" : k === t.atual + 1 ? "au-proxima" : ""}"><b>${txt(e.nome)}</b><small>${txt(e.data || "")}</small></li>`).join("");
      const qrHtml = t.qr ? qr(ctx.config[t.qr], t.qrLegenda || "Materiais e regulamento").replace('class="au-qr"', 'class="au-qr" style="right:var(--au-margem);top:6cqw"') : "";
      return { cls: "au-linha", html: folha("ramo-redondo-fino", "da-direita", "right:-5cqw;bottom:-2cqw;width:26cqw;--base:100% 70%;--atraso:1.4s;--ritmo:8s")
        + `<div class="au-conteudo"><p class="au-rotulo" data-a="rotulo" style="color:var(--rose);margin-bottom:2cqw">Plano de ação</p>`
        + `<h2 class="au-titulo au-titulo--m" data-split="chars">${txt(t.titulo)}</h2><ol class="au-etapas" style="--n:${t.etapas.length}"><span class="trilho" data-a="trilho"></span>${etapas}</ol></div>` + qrHtml };
    },

    encerramento(t, ctx) {
      return { cls: "au-encerramento", html: `<div class="au-foto au-foto--kb">${img(t.fundo?.imagens?.[0], "", 'style="object-position:70% 50%"')}</div>`
        + `<div class="au-veu" data-a="veu" style="background:linear-gradient(90deg,var(--verde-fundo) 22%,color-mix(in srgb,var(--verde-fundo) 0%,transparent) 62%)"></div>`
        + `<div class="au-conteudo">${window.AURO_LOGO}<h1 class="au-titulo" data-split="lines">${txt(t.titulo)}</h1>`
        + (t.assinatura ? `<p class="au-apoio" data-split="words">${txt(t.assinatura)}</p>` : "") + "</div>"
        + (t.qr ? qr(ctx.config[t.qr], t.qrLegenda) : "") + legal("Imagem ilustrativa.") };
    },
  };

  /* ───────────────── Mapa esquemático do DF ───────────────── */
  const DF = {
    lim: { lon0: -48.34, lon1: -47.28, lat0: -15.47, lat1: -16.08 },
    cidades: {
      "plano-piloto": ["Plano Piloto", -47.89, -15.79], "lago-sul": ["Lago Sul", -47.84, -15.84, "baixo"],
      "guara": ["Guará", -47.98, -15.82], "aguas-claras": ["Águas Claras", -48.03, -15.845, "esqbaixo"],
      "taguatinga": ["Taguatinga", -48.06, -15.835, "esq"], "vicente-pires": ["Vicente Pires", -48.03, -15.80],
      "ceilandia": ["Ceilândia", -48.11, -15.82, "esq"], "samambaia": ["Samambaia", -48.09, -15.875, "esqbaixo"],
      "riacho-fundo": ["Riacho Fundo", -48.02, -15.88, "baixo"], "nucleo-bandeirante": ["N. Bandeirante", -47.97, -15.87],
      "recanto": ["Recanto das Emas", -48.07, -15.91, "esqbaixo"], "gama": ["Gama", -48.06, -16.02],
      "sobradinho": ["Sobradinho", -47.79, -15.65], "brazlandia": ["Brazlândia", -48.20, -15.68],
      "planaltina": ["Planaltina", -47.65, -15.62], "sao-sebastiao": ["São Sebastião", -47.78, -15.90],
      "paranoa": ["Paranoá", -47.78, -15.77],
    },
    linhas: {
      eptg: [[[-48.06, -15.835], [-48.03, -15.828], [-47.98, -15.81], [-47.93, -15.80], [-47.89, -15.79]]],
      estrutural: [[[-48.08, -15.815], [-48.03, -15.795], [-47.98, -15.785], [-47.93, -15.78], [-47.89, -15.785]]],
      epnb: [[[-48.055, -15.85], [-48.02, -15.875], [-47.97, -15.87], [-47.93, -15.845]]],
      metro: [[[-48.11, -15.82], [-48.06, -15.84], [-48.03, -15.845], [-47.98, -15.825], [-47.93, -15.80], [-47.89, -15.795]],
              [[-48.09, -15.875], [-48.05, -15.855], [-48.03, -15.845]]],
    },
    xy(lon, lat) { const l = this.lim; return [(lon - l.lon0) / (l.lon1 - l.lon0) * 1920, (lat - l.lat0) / (l.lat1 - l.lat0) * 1080]; },
  };
  function svgDF() {
    const [x0, y0] = DF.xy(-48.29, -15.50), [x1, y1] = DF.xy(-47.31, -16.05);
    const R = { dir: [14, -12, "start"], esq: [-14, -12, "end"], baixo: [14, 32, "start"], esqbaixo: [-14, 32, "end"] };
    let s = `<svg class="esquema-df" viewBox="0 0 1920 1080"><rect class="df-limite" x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}"/>`;
    for (const [id, partes] of Object.entries(DF.linhas))
      for (const p of partes) s += `<path class="df-linha" data-linha="${id}" d="${p.map(([lo, la], k) => (k ? "L" : "M") + DF.xy(lo, la).map(v => v.toFixed(1)).join(" ")).join(" ")}"/>`;
    for (const [id, [nome, lo, la, lado = "dir"]] of Object.entries(DF.cidades)) {
      const [x, y] = DF.xy(lo, la), [dx, dy, a] = R[lado];
      s += `<g class="df-cidade" data-cidade="${id}"><circle class="df-anel" cx="${x}" cy="${y}" r="34"/><circle cx="${x}" cy="${y}" r="7"/><text x="${x + dx}" y="${y + dy}" text-anchor="${a}">${nome}</text></g>`;
    }
    return s + "</svg>";
  }

  /* ───────────────── Montagem ───────────────── */
  function render(t, ctx) {
    const modelo = M[t.modelo];
    if (!modelo) { console.warn("Modelo desconhecido:", t.modelo, t.id); return null; }
    const m = modelo(t, ctx);
    const el = document.createElement("section");
    el.className = "tela dormindo" + (m.rapida || t.transicao === "rapida" ? " rapida" : "");
    el.dataset.id = t.id;
    el.dataset.modelo = t.modelo;
    el.innerHTML = `<div class="au-tela ${m.cls}">${m.html}</div>`;
    // mídia que falta vira marcador visível (só aparece enquanto o arquivo não chega)
    el.querySelectorAll("img").forEach(i => i.addEventListener("error", () => {
      if (i.classList.contains("au-folha")) return i.remove();
      const d = document.createElement("div");
      d.className = "ph " + i.className; d.innerHTML = `<span>${esc(i.dataset.nome || "imagem")}</span>`;
      i.replaceWith(d);
    }, { once: true }));
    el.querySelectorAll("video").forEach(v => {
      v.addEventListener("canplay", () => v.classList.add("pronto"), { once: true });
      v.addEventListener("error", () => { if (m.aoFalharVideo) v.outerHTML = m.aoFalharVideo; else v.remove(); }, { once: true });
    });
    return { el, dados: t, passos: m.passos || 0, ativar: m.ativar, desativar: m.desativar, mapa: m.mapa, DF };
  }

  window.Telas = { render, DF, txt };
})();
