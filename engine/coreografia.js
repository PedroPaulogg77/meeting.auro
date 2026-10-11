/*
  Coreografia (GSAP + SplitText): uma linha do tempo por tela, que roda sozinha quando ela entra.
  Coreografia.criar(tela) devolve { tl, passos: [timelines dos cliques internos] }.
*/
(() => {
  gsap.registerPlugin(SplitText);
  const E = { out: "power3.out", forte: "power4.out", io: "power4.inOut", volta: "back.out(1.7)" };
  const cheio = "inset(0% 0% 0% 0%)";
  const $ = (t, s) => t.querySelector(s);
  const $$ = (t, s) => [...t.querySelectorAll(s)];

  /* ───────── Peças ───────── */
  function texto(tl, el, pos, opc = {}) {
    if (!el) return;
    const tipo = el.dataset.split || "lines";
    const s = el._split || (el._split = SplitText.create(el, { type: tipo === "lines" ? "lines" : tipo === "chars" ? "lines,words,chars" : `lines,${tipo}`, mask: "lines" }));
    const alvos = tipo === "chars" ? s.chars : tipo === "words" ? s.words : s.lines;
    tl.from(alvos, { yPercent: 115, rotate: tipo === "chars" ? 6 : 0, duration: opc.dur || (tipo === "chars" ? .9 : 1.1),
      stagger: opc.stagger ?? (tipo === "chars" ? Math.min(.035, 1 / Math.max(alvos.length, 1)) : tipo === "words" ? .07 : .14), ease: E.forte }, pos);
  }
  const rotulo = (tl, el, pos) => el && tl.from(el, { letterSpacing: "1.4em", opacity: 0, duration: 1.4, ease: E.out }, pos);
  const varre = (tl, el, pos, dur = .9) => el && tl.fromTo(el, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: cheio, duration: dur, ease: E.io }, pos);
  const sobe = (tl, els, pos, opc = {}) => els && (els.length ?? 1) && tl.from(els, { y: opc.y ?? 40, opacity: 0, duration: opc.dur ?? 1, stagger: opc.stagger ?? .12, ease: opc.ease || E.forte }, pos);
  function afasta(tl, el, pos, dur = 2.6, de = 1.22) { el && tl.from(el, { scale: de, duration: dur, ease: E.out }, pos); }
  function conta(tl, el, pos) {
    if (!el) return;
    const final = el.dataset.final || (el.dataset.final = el.textContent.trim());
    const casas = +(el.dataset.casas || 0), agrupa = final.includes(".");
    const alvo = parseFloat(final.replace(/\./g, "").replace(",", "."));
    const o = { v: 0 };
    tl.to(o, { v: alvo, duration: 1.6, ease: "power2.out", immediateRender: false,
      onStart: () => { el.textContent = "0"; },
      onUpdate: () => { el.textContent = o.v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas, useGrouping: agrupa }); },
      onComplete: () => { el.textContent = final; } }, pos);
  }
  function logo(tl, svg, pos) {
    if (!svg) return;
    tl.fromTo($(svg, ".logo-auro"), { clipPath: "inset(100% 0% 0% 0%)", y: 60 }, { clipPath: cheio, y: 0, duration: 1.4, ease: E.forte }, pos)
      .from($(svg, ".logo-tag"), { opacity: 0, scaleX: 1.35, transformOrigin: "50% 50%", duration: 1.6, ease: E.out }, `${pos}+=.5`);
  }
  const qr = (tl, el, pos) => el && tl.from(el, { scale: .6, rotate: -8, opacity: 0, duration: 1.1, ease: E.volta }, pos);
  function contagens(tl, raiz, pos, passo = .3) { $$(raiz, "[data-contar]").forEach((n, k) => conta(tl, n, pos + k * passo)); }

  /* ───────── Por modelo ───────── */
  const A = {
    divisor(t, tl) {
      logo(tl, $(t, ".div-logo .logo-svg"), .2);
      texto(tl, $(t, ".au-titulo"), .2, { stagger: .05 });
      tl.from($(t, "[data-a=fio]"), { scaleX: 0, duration: 1, ease: E.io }, .8);
      texto(tl, $(t, ".au-chamada"), 1);
    },
    hero(t, tl, tela) {
      const foto = $(t, ".au-foto");
      if (foto) tl.from(foto, { scale: 1.3, opacity: 0, duration: 3, ease: E.out }, 0).from($(t, "[data-a=veu]"), { opacity: 0, duration: 1.4 }, .3);
      logo(tl, $(t, ".logo-svg"), .4);
      rotulo(tl, $(t, "[data-a=rotulo]"), .5);
      texto(tl, $(t, ".au-titulo"), foto ? .9 : tela.dados.folhas ? 1.3 : .4, tela.dados.destaque ? { stagger: .04, dur: 1.2 } : {});
      texto(tl, $(t, ".au-apoio"), 1.5);
    },
    sequencia(t, tl, tela) { A.hero(t, tl, tela); },
    painel(t, tl) {
      tl.fromTo($(t, ".au-lado-foto"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: cheio, duration: 1.5, ease: E.io }, 0);
      afasta(tl, $(t, ".au-lado-foto .au-foto"), 0, 2.6, 1.3);
      tl.from($(t, ".au-lado-verde"), { xPercent: 100, duration: 1.2, ease: E.io }, .15);
      rotulo(tl, $(t, ".au-lado-verde [data-a=rotulo]"), .8);
      texto(tl, $(t, ".au-lado-verde .au-titulo"), .9);
      texto(tl, $(t, ".au-lado-verde .au-apoio"), 1.4);
    },
    numeros(t, tl) {
      const foto = $(t, ".au-foto");
      if (foto) tl.from(foto, { scale: 1.25, duration: 3, ease: E.out }, 0).from($(t, "[data-a=veu]"), { opacity: 0, duration: 1 }, 0);
      rotulo(tl, $(t, "[data-a=rotulo]"), .1);
      texto(tl, $(t, ".num-conteudo > .au-titulo"), .2);
      $$(t, "[data-a=rolo]").forEach((f, k) => {
        const n = f.children.length;
        const larg = f.lastElementChild.offsetWidth; if (larg) f.parentElement.style.width = larg + "px";
        tl.fromTo(f, { yPercent: 0 }, { yPercent: -100 * (n - 1) / n, duration: 1.6 + k * .35, ease: "power3.out" }, .3);
      });
      $$(t, "[data-a=item]").forEach((it, k) => {
        const p = .4 + k * .28;
        tl.from($(it, ".au-numero"), { yPercent: 50, opacity: 0, duration: 1, ease: E.forte }, p)
          .from($$(it, ".num-rotulo, .num-detalhe, .num-fonte"), { x: -30, opacity: 0, duration: .9, stagger: .1, ease: E.out }, p + .2);
        conta(tl, $(it, "[data-contar]"), p);
      });
      sobe(tl, $(t, "[data-a=texto]"), .9 + $$(t, "[data-a=item]").length * .28, { y: 24 });
    },
    manchetes(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, ".mch-tit .au-titulo"), .15);
      texto(tl, $(t, ".mch-tit .au-apoio"), .7);
      $$(t, "[data-a=card]").forEach((c, k) => {
        const r = parseFloat(c.style.getPropertyValue("--r")) || 0;
        tl.fromTo(c, { y: -90, rotate: r + (k % 2 ? 9 : -9), opacity: 0 }, { y: 0, rotate: r, opacity: 1, duration: 1.1, ease: "back.out(1.4)" }, .7 + k * .45)
          .from($(c, "h3"), { opacity: 0, y: 12, duration: .7, ease: E.out }, .95 + k * .45);
      });
    },
    mapa(t, tl, tela) {
      const etapas = tela.mapa.etapas;
      const camada = $(t, ".mapa-camada"), legenda = $(t, "[data-a=legenda]"), svg = $(camada, "svg");
      tl.from($(t, ".mapa-viewport"), { scale: 1.1, opacity: 0, duration: 1.8, ease: E.out }, 0);
      rotulo(tl, $(t, "[data-a=rotulo]"), .2);
      const iniciais = svg ? $$(svg, ".df-borda.traco, .ra.traco") : [];
      if (iniciais.length) tl.fromTo(iniciais, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, stagger: Math.min(.05, 1.2 / iniciais.length), ease: "power2.inOut" }, .2);
      etapas.forEach(e => {
        if (e.desenhar) tl.set($$(t, e.desenhar), { strokeDashoffset: 1 }, 0);
        if (e.mostrar) tl.set($$(t, e.mostrar), { opacity: 0 }, 0);
      });
      const pinos = $$(t, "[data-a=pino]");
      if (pinos.length) tl.from(pinos, { scale: 0, opacity: 0, duration: .7, stagger: .12, ease: E.volta }, 1);
      // peças dos mapas em camadas: as que nenhuma etapa revela entram em cascata
      const reservadas = new Set(etapas.flatMap(e => e.mostrar ? $$(t, e.mostrar) : []));
      const pecas = $$(t, "[data-a=peca]").filter(x => !reservadas.has(x));
      if (pecas.length) tl.from(pecas, { scale: .5, y: 14, opacity: 0, duration: .7, stagger: Math.min(.09, 2.2 / pecas.length), ease: E.volta }, 1);
      const aplicar = k => {
        const atuais = etapas.slice(0, k + 1), e = etapas[k] || {};
        $$(t, ".foco").forEach(x => x.classList.remove("foco"));
        const foco = [...atuais].reverse().find(x => x.foco)?.foco;
        if (foco) $$(t, foco).forEach(x => x.classList.add("foco"));
        const z = [...atuais].reverse().find(x => x.zoom)?.zoom;
        let ox = 50, oy = 50, sc = 1;
        if (z) {
          sc = z.escala || 1.5;
          const alvo = z.alvo || foco;
          if (z.x != null) { ox = z.x; oy = z.y; }
          else if (alvo && svg && $(svg, alvo)) { const b = $(svg, alvo).getBBox(); ox = (b.x + b.width / 2) / 19.2; oy = (b.y + b.height / 2) / 10.8; }
        }
        gsap.to(camada, { scale: sc, xPercent: sc > 1 ? 50 - ox : 0, yPercent: sc > 1 ? 50 - oy : 0, transformOrigin: `${ox}% ${oy}%`, duration: 2, ease: E.io, overwrite: "auto" });
        if (e.desenhar) gsap.to($$(t, e.desenhar), { strokeDashoffset: 0, duration: 2, ease: "power2.inOut", delay: .4 });
        if (e.mostrar) {
          const alvos = $$(t, e.mostrar), pc = alvos.filter(x => x.matches(".peca")), resto = alvos.filter(x => !x.matches(".peca"));
          if (resto.length) gsap.to(resto, { opacity: 1, duration: .9, stagger: .15, delay: .6 });
          if (pc.length) gsap.fromTo(pc, { opacity: 0, scale: .5, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: .8, stagger: .15, delay: e.desenhar ? 1.9 : .6, ease: E.volta });
        }
        legenda.innerHTML = Telas.txt(e.legenda || "");
        gsap.fromTo(legenda, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .9, ease: E.out });
      };
      etapas.forEach((_, k) => tl.call(aplicar, [k], .9 + k * 2.4));
      const fim = .9 + etapas.length * 2.4;
      const cartao = $(t, "[data-a=cartao]");
      if (cartao) tl.from(cartao, { y: 40, opacity: 0, duration: 1, ease: E.forte }, fim - 1.2);
      tl.to({}, { duration: .1 }, fim);
    },
    lista(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, ".au-titulo"), .15);
      $$(t, "[data-a=coluna]").forEach((c, k) => {
        const p = .5 + k * .18, foto = $(c, ".ent-img");
        if (foto) tl.fromTo(foto, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: cheio, duration: 1, ease: E.io }, p);
        tl.from($(c, "h3"), { y: 30, opacity: 0, duration: .8, ease: E.forte }, p + .3)
          .from($$(c, "li"), { x: -20, opacity: 0, duration: .6, stagger: .06, ease: E.out }, p + .45);
      });
    },
    galeria(t, tl) {
      afasta(tl, $(t, ".au-foto"), 0, 2.2, 1.18);
      const logoG = $(t, ".gal-logo .logo-svg");
      if (logoG) logo(tl, logoG, .4);
      varre(tl, $(t, ".au-etiqueta"), .2);
      texto(tl, $(t, ".au-etiqueta [data-split]"), .55, { stagger: .025, dur: .6 });
      rotulo(tl, $(t, "[data-a=grupo]"), .4);
      texto(tl, $(t, ".au-conteudo .au-titulo"), .7);
    },
    planta(t, tl) {
      const planta = $(t, "[data-a=planta]");
      if (planta) tl.fromTo(planta, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: cheio, duration: 1.6, ease: E.io }, .1).from(planta, { scale: 1.08, duration: 2.2, ease: E.out }, .1);
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      tl.from($(t, "[data-a=n]"), { yPercent: 70, opacity: 0, duration: 1, ease: E.forte }, .1);
      texto(tl, $(t, ".au-qtos-col [data-split]"), .25, { stagger: .07 });
      $$(t, "[data-a=selo]").forEach((s, k) => varre(tl, s, .6 + k * .4));
      sobe(tl, $(t, "[data-a=area]"), .7, { y: 30 });
      sobe(tl, $(t, "[data-a=unidades]"), 1.4, { y: 12 });
    },
    tipologia(t, tl) {
      tl.from($(t, "[data-a=n2]"), { xPercent: -80, opacity: 0, duration: 1.2, ease: E.forte }, 0)
        .from($(t, "[data-a=n3]"), { xPercent: 80, opacity: 0, duration: 1.2, ease: E.forte }, 0)
        .from($(t, "[data-a=ne]"), { scale: 0, duration: .8, ease: E.volta }, .6);
      texto(tl, $(t, ".au-tip-qtos"), .4, { stagger: .08 });
      tl.from($(t, "[data-a=icone]"), { scale: 0, rotate: -25, duration: .9, ease: E.volta }, .9);
      varre(tl, $(t, "[data-a=selo]"), 1);
      tl.from($$(t, "[data-a=topo]"), { y: -30, opacity: 0, duration: 1, stagger: .15, ease: E.out }, .9)
        .from($(t, "[data-a=div]"), { scaleY: 0, duration: .8, ease: E.io }, 1);
      texto(tl, $(t, ".au-apoio"), 1.3);
    },
    icones(t, tl, tela, passos, loops) {
      texto(tl, $(t, ".au-titulo"), 0, { dur: 1.4 });
      const itens = $$(t, "[data-a=item]");
      itens.forEach((li, k) => {
        const p = .8 + k * .28;
        tl.from($(li, "img"), { scale: 0, rotate: -30, duration: 1.1, ease: E.volta }, p).from($(li, "span"), { x: -36, opacity: 0, duration: 1.1, ease: E.out }, p + .15);
      });
      // depois da entrada, um destaque percorre os itens sem parar (a tela fica muito tempo parada)
      const giro = gsap.timeline({ paused: true, repeat: -1, repeatDelay: .6 });
      itens.forEach((li, k) => {
        giro.to($(li, "img"), { scale: 1.22, duration: .45, ease: "power2.out" }, k * 1.1)
          .to($(li, "span"), { x: 10, duration: .45, ease: "power2.out" }, k * 1.1)
          .to($(li, "img"), { scale: 1, duration: .6, ease: "power2.inOut" }, k * 1.1 + .55)
          .to($(li, "span"), { x: 0, duration: .6, ease: "power2.inOut" }, k * 1.1 + .55);
      });
      loops.push(giro);
    },
    rostos(t, tl) {
      $$(t, "[data-a=rosto]").forEach((r, k) => {
        const p = k * .16;
        tl.fromTo(r, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: cheio, duration: 1, ease: E.io }, p);
        const m = $(r, ".rosto-img"); if (m) tl.from(m, { scale: 1.3, duration: 2, ease: E.out }, p);
        tl.from($(r, "figcaption"), { letterSpacing: "1.2em", opacity: 0, duration: 1.2, ease: E.out }, p + .5);
      });
      texto(tl, $(t, ".rosto-titulo .au-titulo"), .6);
    },
    argumentos(t, tl, tela, passos) {
      afasta(tl, $(t, ".au-foto"), 0, 3.2, 1.25);
      tl.from($(t, "[data-a=veu]"), { opacity: 0, duration: 1.2 }, 0);
      rotulo(tl, $(t, "[data-a=rotulo]"), .3);
      $$(t, "[data-a=argumento]").forEach((a, k) => {
        const p = .7 + k * .5;
        tl.from(a, { borderLeftColor: "rgba(220,163,133,0)", duration: .8 }, p)
          .from($(a, ".arg-num"), { yPercent: 80, opacity: 0, duration: .8, ease: E.forte }, p);
        texto(tl, $(a, "[data-split]"), p + .1, { stagger: .03 });
        tl.from($(a, "[data-a=argfio]"), { scaleX: 0, duration: .9, ease: E.io }, p + .4)
          .from($(a, ".au-apoio"), { y: 20, opacity: 0, duration: .9, ease: E.out }, p + .5);
      });
      const f = $(t, "[data-a=fechamento]");
      if (f) {
        const p = gsap.timeline({ paused: true });
        p.set(f, { visibility: "visible" }, 0).fromTo(f, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: cheio, duration: 1.1, ease: E.io }, 0);
        texto(p, $(f, ".au-titulo"), .7, { stagger: .035 });
        passos.push(p);
      }
    },
    video() {},
    grupo(t, tl) {
      tl.from($(t, ".au-lado-verde"), { xPercent: -100, duration: 1.1, ease: E.io }, 0);
      rotulo(tl, $(t, "[data-a=rotulo]"), .6);
      varre(tl, $(t, "[data-a=logo]"), .8, 1.1);
      tl.from($$(t, "[data-a=marca]"), { y: 30, opacity: 0, duration: .8, stagger: .12, ease: E.volta }, 1.2);
      $$(t, "[data-a=dado]").forEach((d, k) => {
        const p = .6 + k * .3;
        tl.from($(d, ".au-numero"), { yPercent: 60, opacity: 0, duration: 1, ease: E.forte }, p)
          .from($$(d, ".au-dado-txt > *"), { x: -40, opacity: 0, duration: .9, stagger: .08, ease: E.out }, p + .15);
        conta(tl, $(d, "[data-contar]"), p);
      });
    },
    realizacao(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      $$(t, "[data-a=logo]").forEach((l, k) => {
        const p = .4 + k * .25;
        tl.from($(l, ".au-rotulo"), { opacity: 0, letterSpacing: "1em", duration: 1.1, ease: E.out }, p);
        varre(tl, $(l, ".real-img"), p + .2, 1);
      });
    },
    campanha(t, tl) {
      tl.fromTo($(t, "[data-a=camp-img]"), { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: cheio, duration: 1.4, ease: E.io }, 0);
      tl.from($(t, ".au-lado-verde"), { xPercent: 100, duration: 1.2, ease: E.io }, .1);
      rotulo(tl, $(t, "[data-a=rotulo]"), .8);
      texto(tl, $(t, ".au-titulo"), .9);
      sobe(tl, $$(t, "[data-a=regra]"), 1.3, { y: 20, stagger: .12 });
      qr(tl, $(t, "[data-a=qr]"), 1.8);
    },
    "linha-do-tempo"(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, ".au-titulo"), .15, { stagger: .04 });
      tl.from($(t, "[data-a=trilho]"), { scaleX: 0, duration: 1.8, ease: E.io }, .6)
        .from($$(t, ".au-etapas li"), { y: 30, opacity: 0, duration: .8, stagger: .14, ease: E.volta }, .8);
      qr(tl, $(t, "[data-a=qr]"), 1.4);
    },
    encerramento(t, tl) {
      afasta(tl, $(t, ".au-foto"), 0, 3.2, 1.3);
      tl.from($(t, "[data-a=veu]"), { xPercent: -50, opacity: 0, duration: 1.6, ease: E.io }, 0);
      logo(tl, $(t, ".logo-svg"), .5);
      texto(tl, $(t, ".au-titulo"), 1.1);
      texto(tl, $(t, ".au-apoio"), 1.6);
      qr(tl, $(t, "[data-a=qr]"), 2);
    },
  };

  window.Coreografia = {
    criar(tela) {
      const tl = gsap.timeline({ paused: true });
      const passos = [], loops = [];
      (A[tela.dados.modelo] || (() => {}))(tela.el, tl, tela, passos, loops);
      return { tl, passos, loops };
    },
  };
})();
