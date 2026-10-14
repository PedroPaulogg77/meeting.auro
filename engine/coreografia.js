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
  const FX = window.Efeitos;

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
  /* ───────── Suspense das premiações ─────────
     respira(): brilho contínuo depois da revelação, fora da linha do tempo do clique
     (um tween infinito dentro do passo impediria o passador de seguir para a próxima tela) */
  function respira(el, vars) {
    if (!el) return;
    el._respira && el._respira.kill();
    el._respira = gsap.to(el, { duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", ...vars });
  }
  const solta = (...els) => els.forEach(el => { if (el && el._respira) { el._respira.kill(); el._respira = null; } });
  // clarão do golpe final: acende rápido e se apaga devagar
  const clarao = (p, el, pos) => el && p.fromTo(el, { scale: .25, opacity: 0 }, { scale: 1, opacity: .85, duration: .22, ease: "power2.out" }, pos)
    .to(el, { opacity: 0, duration: 1.8, ease: "power2.out" }, pos + .22);

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
  function contaLenta(tl, el, pos, dur) {
    if (!el) return;
    const final = el.dataset.final || (el.dataset.final = el.textContent.trim());
    const casas = final.includes(",") ? 2 : 0, alvo = parseFloat(final.replace(/\./g, "").replace(",", ".")), o = { v: 0 };
    tl.to(o, { v: alvo, duration: dur, ease: "power2.in", immediateRender: false,
      onStart: () => { el.textContent = "0"; },
      onUpdate: () => { el.textContent = o.v.toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas }); },
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
    flores(t, tl, tela, passos, loops) {
      const ramos = $$(t, "[data-a=flor]");
      tl.fromTo(ramos, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.4, stagger: { each: .14, from: "random" }, ease: "power2.out", transformOrigin: "28% 100%" }, .6);
      logo(tl, $(t, ".flores-logo .logo-svg"), 1.9);
      tl.from($(t, "[data-a=logo]"), { scale: .92, duration: 3, ease: E.out }, 1.9);
      tl.from($(t, "[data-a=frase]"), { opacity: 0, y: 16, duration: 1.4, ease: E.out }, 3.4);
      // fica no ar durante o show: o logo respira devagar
      const resp = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
      resp.to($(t, "[data-a=logo]"), { scale: 1.025, duration: 4, ease: "sine.inOut" });
      loops.push(resp);
    },
    grafico(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, ".graf-cab .au-titulo"), .1);
      if ($(t, ".graf-grupos")) {
        $$(t, "[data-a=grupo]").forEach((g, k) => {
          const p = .6 + k * .45;
          tl.from(g, { opacity: 0, y: 24, duration: .7, ease: E.out }, p)
            .from($$(g, "[data-a=barra]"), { scaleX: 0, transformOrigin: "0 50%", duration: 1.1, stagger: .08, ease: E.forte }, p + .15)
            .from($$(g, ".graf-valor"), { opacity: 0, x: -10, duration: .5, stagger: .08 }, p + .5)
            .from($(g, ".graf-total"), { opacity: 0, scale: .8, duration: .8, ease: E.volta }, p + .4);
          contagens(tl, g, p + .3, .05);
        });
        return;
      }
      tl.from($(t, "[data-a=nota]"), { opacity: 0, y: 16, duration: .8, ease: E.out }, .5)
        .from($(t, ".graf-eixo"), { opacity: 0, duration: .8 }, .4)
        .from($(t, "[data-a=media]"), { opacity: 0, duration: .8 }, .6)
        .from($(t, "[data-a=mediarot]"), { opacity: 0, x: 20, duration: .8 }, .8)
        .fromTo($(t, "[data-a=serie]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 2.6, ease: "power1.inOut" }, .7)
        .from($(t, "[data-a=faixa]"), { opacity: 0, duration: 1.4 }, 1.6);
      const pontos = $$(t, "[data-a=ponto]");
      tl.from(pontos, { scale: 0, transformOrigin: "50% 50%", transformBox: "fill-box", duration: .4, stagger: 2.6 / pontos.length, ease: E.volta }, .75)
        .from($$(t, "[data-a=rot]"), { opacity: 0, y: 10, duration: .5, stagger: .35, ease: E.out }, 1.2);
    },
    blocos(t, tl, tela, passos) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      const foto = $(t, "[data-a=foto]");
      if (foto) {
        tl.fromTo(foto, { x: -80, opacity: 0, scale: .92 }, { x: 0, opacity: 1, scale: 1, duration: 1.6, ease: E.forte }, .5)
          .call(() => { if (FX.vivo(t)) FX.estouroEm(t, foto, { n: 30, raio: 420 }); }, null, 1.1);
      }
      texto(tl, $(t, ".blc-conteudo .au-titulo"), .15, { stagger: .03 });
      tl.from($(t, "[data-a=sub]"), { opacity: 0, y: 16, duration: .8, ease: E.out }, .6);
      texto(tl, $(t, ".blc-conteudo .au-apoio"), .7);
      const blocos = $$(t, "[data-a=bloco], [data-a=misterio]");
      blocos.forEach((b, k) => {
        const p = 1 + k * .45;
        tl.from(b, { y: 50, opacity: 0, duration: .9, ease: E.forte }, p)
          .from($$(b, ".au-rotulo, h3, .blc-valor, .blc-texto"), { y: 16, opacity: 0, duration: .6, stagger: .08, ease: E.out }, p + .2);
      });
      tl.from($$(t, "[data-a=seta]"), { x: -20, opacity: 0, duration: .6, stagger: .45 }, 1.3)
        .from($(t, "[data-a=rodape]"), { opacity: 0, y: 12, duration: .8 }, 1.4 + blocos.length * .45);
      const misterio = $(t, "[data-a=misterio]");
      if (misterio) {
        // o "?" pulsa esperando o clique
        tl.to($(misterio, ".blc-valor"), { opacity: .35, duration: .9, repeat: 3, yoyo: true, ease: "sine.inOut" }, 1.6 + blocos.length * .45);
      }
      const premio = $(t, "[data-a=premio]");
      if (premio) {
        tl.set(premio, { autoAlpha: 0 }, 0);
        const R = Som.TENSAO, p = gsap.timeline({ paused: true });
        const mval = misterio && $(misterio, ".blc-valor"), raios = $(premio, ".blc-premio-raios");
        const resto = $$(t, ".blc-conteudo > *:not(.blc-linha), [data-a=bloco], [data-a=seta], [data-a=foto]");
        p.call(() => { solta(raios); if (FX.vivo(t)) { Som.rufar(R); FX.atrair(t, misterio, { n: 70, dur: R }); } }, null, 0)
          .to(resto, { opacity: .22, duration: 2.4, ease: "power2.inOut" }, .2);
        if (misterio) p.to(misterio, { scale: 1.08, boxShadow: "0 0 4cqw rgba(220,163,133,.45)", borderColor: "rgba(242,201,168,.9)", duration: R - .4, ease: "power1.in" }, 0);
        if (mval) p.set(mval, { opacity: 1 }, 0)
          .to(mval, { scale: 1.5, textShadow: "0 0 2.4cqw rgba(242,201,168,.9)", duration: R - .4, ease: "power2.in" }, 0)
          .to(mval, { scale: 1.38, duration: .35, ease: "power2.in" }, R - .4);
        p.call(() => { if (FX.vivo(t)) { FX.limpar(t); Som.final(); FX.brilho(t, { n: 90, dur: 7 }); } }, null, R)
          .fromTo(premio, { autoAlpha: 0 }, { autoAlpha: 1, duration: .5, ease: "power2.out" }, R)
          .fromTo(raios, { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.6, ease: E.out }, R)
          .call(() => respira(raios, { scale: 1.1, opacity: .72 }), null, R + 2.6)
          .from($(premio, ".blc-premio-valor"), { opacity: 0, y: 46, filter: "blur(14px)", duration: 1.8, ease: E.forte }, R + .1)
          .call(() => { if (FX.vivo(t)) FX.estouroEm(t, $(premio, ".blc-premio-valor"), { n: 26, raio: 620 }); }, null, R + .1)
          .from($$(premio, ".au-rotulo, .blc-premio-texto"), { opacity: 0, y: 20, duration: 1.2, stagger: .3, ease: E.out }, R + 1.2);
        passos.push(p);
      }
    },
    meta(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, "[data-a=nome]"), .45, { stagger: .07, dur: 1.2 });
      tl.from($(t, "[data-a=fio]"), { scaleX: 0, duration: 1.4, ease: E.io }, 1.2)
        .from($(t, "[data-a=vendas]"), { opacity: 0, y: 18, duration: 1.1, ease: E.out }, 1.6)
        .from($(t, "[data-a=chamada]"), { opacity: 0, y: 18, duration: 1.1, ease: E.out }, 2.3);
      conta(tl, $(t, "[data-a=vendas] [data-contar]"), 1.6);
    },
    premio(t, tl, tela, passos, loops) {
      const topo = $(t, ".pr-topo"), mis = $(t, "[data-a=misterio]"), rev = $(t, "[data-a=revela]");
      const q = $(mis, ".pr-q"), luz = $(mis, ".pr-luz"), base = $(mis, ".pr-aro-base"), prog = $(mis, ".pr-aro-prog");
      const veu = $(t, "[data-a=veu]"), flash = $(t, "[data-a=clarao]"), halo = $(rev, "[data-a=halo]");

      // entrada: rótulo, título letra a letra e o aro se desenhando em volta do "?"
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, "[data-a=rot]"), .35, { stagger: .045 });
      tl.set(rev, { autoAlpha: 0 }, 0).set(veu, { opacity: 0 }, 0)
        .fromTo(base, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }, .8)
        .from(luz, { opacity: 0, scale: .6, duration: 2.2, ease: E.out }, 1)
        .from(q, { opacity: 0, scale: .88, filter: "blur(10px)", duration: 1.6, ease: E.forte }, 1.5);
      // esperando o clique: a luz e o "?" respiram devagar
      const espera = gsap.timeline({ paused: true, repeat: -1, yoyo: true });
      espera.to(luz, { scale: 1.08, opacity: .8, duration: 2.6, ease: "sine.inOut" }, 0)
        .to(q, { opacity: .62, duration: 2.6, ease: "sine.inOut" }, 0);
      loops.push(espera);

      // clique: rufar de 5,5 s. O arco se completa, a tela escurece em volta, a poeira é atraída para o centro;
      // um instante de contração antes do golpe final, e o prêmio aparece
      const R = Som.TENSAO, p = gsap.timeline({ paused: true });
      p.call(() => { espera.pause(); solta(halo); if (FX.vivo(t)) { Som.rufar(R); FX.atrair(t, mis, { n: 80, dur: R }); } }, null, 0)
        .set(rev, { autoAlpha: 0 }, 0)
        .set(mis, { autoAlpha: 1, scale: 1, filter: "blur(0px)" }, 0)
        .set(q, { opacity: 1, textShadow: "0 0 0px rgba(242,201,168,0)" }, 0)
        .set(prog, { opacity: 1 }, .01)
        .fromTo(prog, { strokeDashoffset: 100 }, { strokeDashoffset: 0, duration: R - .1, ease: "power1.in" }, 0)
        .fromTo(veu, { opacity: 0 }, { opacity: 1, duration: R, ease: "power1.in" }, 0)
        .to(topo, { opacity: .3, duration: 2.4, ease: "power2.inOut" }, .2)
        .to(luz, { scale: 1.7, opacity: 1, duration: R - .4, ease: "power2.in" }, 0)
        .to(mis, { scale: 1.14, duration: R - .4, ease: "power1.in" }, 0)
        .to(q, { textShadow: "0 0 3cqw rgba(242,201,168,.85)", duration: R - .4, ease: "power2.in" }, 0)
        .to(mis, { scale: 1.04, duration: .35, ease: "power2.in" }, R - .4)
        .to(mis, { autoAlpha: 0, scale: 1.7, filter: "blur(14px)", duration: .5, ease: "power2.out" }, R - .02)
        .call(() => { if (FX.vivo(t)) { FX.limpar(t); Som.final(); FX.estouroEm(t, $(rev, "[data-a=alvo]"), { n: 22, raio: 560 }); FX.brilho(t, { n: 70, dur: 7 }); } }, null, R);
      clarao(p, flash, R);
      p.to(veu, { opacity: 0, duration: 2, ease: "power2.out" }, R)
        .to(topo, { opacity: 1, duration: 1.6, ease: "power2.out" }, R + .6)
        .set(rev, { autoAlpha: 1 }, R);
      if (halo) p.fromTo(halo, { scale: .4, opacity: 0 }, { scale: 1, opacity: 1, duration: 2.6, ease: E.out }, R)
        .call(() => respira(halo, { scale: 1.08, opacity: .72 }), null, R + 2.6);

      const valor = $(rev, ".pr-valor"), foto = $(rev, "[data-a=foto]"), prod = $(rev, ".pr-produto");
      let fim = R + 1;
      if (valor) {
        // cada algarismo surge do desfoque, um depois do outro; o "R$" chega por último, discreto
        const digs = $$(valor, ".pr-dig");
        p.from(digs, { opacity: 0, y: 46, filter: "blur(14px)", duration: 1.6, stagger: .17, ease: E.forte }, R + .05)
          .from($(valor, "small"), { opacity: 0, x: -24, duration: 1.3, ease: E.out }, R + .35 + digs.length * .17);
        fim = R + .9 + digs.length * .17;
      }
      if (foto) {
        p.fromTo(foto, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: cheio, duration: 2.4, ease: E.io }, R)
          .from($(foto, "img"), { scale: 1.28, duration: 4.5, ease: E.out }, R);
        fim = R + 1.1;
      }
      if (prod) {
        const grande = prod.classList.contains("pr-produto--grande");
        p.from(prod, grande
          ? { xPercent: 34, opacity: 0, filter: "blur(16px)", duration: 2.4, ease: E.forte }
          : { y: 70, opacity: 0, scale: .94, filter: "blur(16px)", duration: 2.2, ease: E.forte }, R);
        // depois de pousar, flutua de leve
        p.call(() => respira(prod, { y: grande ? -6 : -10, duration: 3.6 }), null, R + 2.4);
        fim = R + 1.2;
      }
      texto(p, $(rev, ".pr-titulo"), fim, { stagger: .05 });
      p.from($$(rev, ".pr-sub, .pr-extra, .pr-regra"), { opacity: 0, y: 20, duration: 1.2, stagger: .28, ease: E.out }, fim + .35)
        .from($$(rev, ".pr-det"), { opacity: 0, y: 24, duration: 1.1, stagger: .22, ease: E.forte }, fim + .7);
      passos.push(p);
    },
    contador(t, tl, tela, passos) {
      const val = $(t, ".cont-val"), pico = +val.dataset.pico, alvo = +val.dataset.alvo;
      const fmt = v => Math.round(v).toLocaleString("pt-BR");
      const foto = $(t, ".au-foto");
      if (foto) tl.from(foto, { scale: 1.2, duration: 4, ease: E.out }, 0);
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      tl.set($(t, "[data-a=apartir]"), { autoAlpha: 0 }, 0).set($(t, "[data-a=selo]"), { autoAlpha: 0 }, 0)
        .from($(t, "[data-a=num]"), { scale: .6, opacity: 0, duration: .8, ease: E.volta }, .2)
        .call(() => { if (FX.vivo(t)) Som.rufar(90, { crescer: 15, de: .3 }); }, null, .3);
      // sobe de 100 em 100 mil (rápido no começo, mais lento perto do milhão) e fica parado no pico
      const o = { v: 0 };
      tl.to(o, { v: pico, duration: 14, ease: "sine.inOut", onUpdate: () => { val.textContent = fmt(Math.round(o.v / 1000) * 1000); } }, .5)
        .to($(t, "[data-a=num]"), { scale: 1.08, duration: .5, ease: "power2.out" }, 14.5)
        .to($(t, "[data-a=num]"), { scale: 1, duration: .5, ease: "power2.inOut" }, 15);
      // clique: o valor despenca devagar (começa lento, acelera e freia até o preço real); golpe final ao pousar
      const QUEDA = 3.6, p = gsap.timeline({ paused: true });
      const o2 = { v: pico };
      p.call(() => { o2.v = pico; }, null, 0)
        .to($(t, "[data-a=num]"), { scale: .96, duration: .5, ease: "power2.out" }, 0)
        .to(o2, { v: alvo, duration: QUEDA, ease: "power3.inOut", onUpdate: () => { val.textContent = fmt(Math.round(o2.v / 100) * 100); } }, 0)
        .call(() => { val.textContent = fmt(alvo); if (FX.vivo(t)) { Som.final(); FX.brilho(t, { n: 110, dur: 7 }); FX.estouroEm(t, $(t, "[data-a=num]"), { n: 30, raio: 760 }); } }, null, QUEDA)
        .to($(t, "[data-a=num]"), { scale: 1.04, duration: .5, ease: "power2.out" }, QUEDA)
        .to($(t, "[data-a=num]"), { scale: 1, duration: 1.2, ease: "power2.inOut" }, QUEDA + .5)
        .to($(t, "[data-a=num]"), { color: "var(--rose)", duration: .6 }, QUEDA)
        .fromTo($(t, "[data-a=apartir]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, ease: E.out }, QUEDA + .6)
        .fromTo($(t, "[data-a=selo]"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 1, ease: E.out }, QUEDA + 1);
      passos.push(p);
    },
    "premio-abre"(t, tl, tela, passos, loops) {
      const folhas = $$(t, "[data-a=folha]"), cifroes = $$(t, "[data-a=cifrao]");
      tl.fromTo(folhas, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.3, stagger: .1, ease: "back.out(1.6)", transformOrigin: "28% 100%" }, 0);
      texto(tl, $(t, ".pa-conteudo .au-titulo"), .5, { stagger: .04 });
      tl.from($(t, "[data-a=fio]"), { scaleX: 0, duration: 1, ease: E.io }, 1.2);
      texto(tl, $(t, ".pa-conteudo .au-chamada"), 1.4);
      // as folhas giram e viram cifrões
      tl.set(cifroes, { scale: 0, opacity: 0 }, 0)
        .to(folhas, { scale: .4, opacity: 0, filter: "blur(6px)", duration: 1, stagger: .08, ease: "power2.in" }, 2.2)
        .fromTo(cifroes, { scale: .6, opacity: 0, filter: "blur(8px)" }, { scale: 1, opacity: .9, filter: "blur(0px)", duration: 1.2, stagger: .08, ease: E.forte }, 2.7)
        .call(() => { if (FX.vivo(t)) FX.brilho(t, { n: 70, dur: 6 }); }, null, 2.9)
        .to(cifroes, { y: -40, duration: 4, stagger: .1, ease: "sine.inOut", yoyo: true, repeat: 1 }, 4);
      // poeira dourada contínua enquanto a tela está no ar
      const chuva = gsap.timeline({ paused: true, repeat: -1 });
      chuva.call(() => FX.brilho(t, { n: 16, dur: 6 })).to({}, { duration: 3 });
      loops.push(chuva);
    },
    falsofim(t, tl, tela, passos) {
      logo(tl, $(t, ".ff-a .logo-svg"), .3);
      texto(tl, $(t, ".ff-a .au-titulo"), 1, { stagger: .04 });
      tl.set($(t, "[data-a=b]"), { autoAlpha: 0 }, 0);
      const p = gsap.timeline({ paused: true });
      p.call(() => { if (FX.vivo(t)) { Som.final(.7); FX.estouro(t, 50, 50, { n: 24, raio: 600 }); } }, null, 1.5)
        .to($(t, "[data-a=a]"), { autoAlpha: 0, filter: "blur(14px)", scale: .97, duration: 1.4, ease: "power2.inOut" }, 0)
        .set($(t, "[data-a=b]"), { autoAlpha: 1 }, 1.5);
      texto(p, $(t, ".ff-b .au-titulo"), 1.5, { stagger: .07, dur: 1.2 });
      passos.push(p);
    },
    soma(t, tl, tela, passos) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, ".soma-tit .au-titulo"), .15);
      // cada linha rola devagar (o resumo inteiro leva ~12 s)
      $$(t, "[data-a=linha]").forEach((l, k) => {
        const p = .8 + k * 2.8, n = $(l, "[data-contar]");
        tl.from(l, { x: 40, opacity: 0, duration: .7, ease: E.out }, p);
        const final = n.dataset.final || (n.dataset.final = n.textContent.trim());
        const alvo = parseFloat(final.replace(/\./g, "").replace(",", ".")), o = { v: 0 };
        tl.to(o, { v: alvo, duration: 2.6, ease: "power1.inOut", immediateRender: false,
          onStart: () => { n.textContent = "0,00"; },
          onUpdate: () => { n.textContent = o.v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); },
          onComplete: () => { n.textContent = final; } }, p);
      });
      const total = $(t, "[data-a=total]");
      tl.set(total, { autoAlpha: 0 }, 0);
      // clique: rufar enquanto o total abre e conta; golpe final quando o valor fecha
      const R = Som.TENSAO, p = gsap.timeline({ paused: true });
      p.call(() => { if (FX.vivo(t)) { Som.rufar(R); FX.atrair(t, total, { n: 60, dur: R }); } }, null, 0)
        .set(total, { autoAlpha: 1 }, 0)
        .fromTo(total, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: cheio, duration: 1.1, ease: E.io }, 0)
        .call(() => { if (FX.vivo(t)) { FX.limpar(t); Som.final(); FX.brilho(t, { n: 110, dur: 7 }); FX.estouroEm(t, total, { n: 30, raio: 620 }); } }, null, R);
      contaLenta(p, $(total, "[data-contar]"), 1, R - 1);
      passos.push(p);
    },
    tabela(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, ".tab .au-titulo"), .15);
      tl.from($(t, "thead"), { opacity: 0, y: 12, duration: .6 }, .6)
        .from($$(t, "[data-a=linha]"), { opacity: 0, x: -30, duration: .6, stagger: .18, ease: E.out }, .8);
    },
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
      sobe(tl, $(t, "[data-a=selo]"), 1.2 + $$(t, "[data-a=item]").length * .28, { y: 24 });
    },
    itens(t, tl) {
      const num = $(t, "[data-a=num]"), painel = $(t, "[data-a=painel]");
      tl.set(num, { x: 1920 * (.5 - .14) }, 0)                  // começa no meio do palco; a coluna esquerda (28%) tem centro em 14%
        .from($(num, ".au-numero"), { yPercent: 40, opacity: 0, duration: 1.1, ease: E.forte }, .15)
        .from($(num, ".num-rotulo"), { y: 20, opacity: 0, duration: .9, ease: E.out }, .55);
      conta(tl, $(num, "[data-contar]"), .2);
      tl.to(num, { x: 0, duration: 1.6, ease: "power3.inOut" }, 2)
        .fromTo(painel, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: cheio, duration: 1.5, ease: E.io }, 2.1);
      texto(tl, $(painel, ".au-titulo"), 2.9);
      tl.from($$(t, "[data-a=li]"), { x: 24, opacity: 0, duration: .6, stagger: .045, ease: E.out }, 3.3);
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
      if (iniciais.length) tl.fromTo(iniciais, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.8, stagger: Math.min(.05, 1.2 / iniciais.length), ease: "power2.inOut" }, .2);
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
      const aplicar = (k, imediato) => {
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
        gsap.to(camada, { scale: sc, xPercent: sc > 1 ? 50 - ox : 0, yPercent: sc > 1 ? 50 - oy : 0, transformOrigin: `${ox}% ${oy}%`, duration: imediato ? 0 : 2.4, ease: E.io, overwrite: "auto" });
        if (e.desenhar) gsap.to($$(t, e.desenhar), { strokeDashoffset: 0, autoRound: false, duration: 2, ease: "power2.inOut", delay: .4 });
        if (e.mostrar) {
          const alvos = $$(t, e.mostrar), pc = alvos.filter(x => x.matches(".peca")), resto = alvos.filter(x => !x.matches(".peca"));
          if (resto.length) gsap.to(resto, { opacity: 1, duration: .9, stagger: .15, delay: .6 });
          if (pc.length) gsap.fromTo(pc, { opacity: 0, scale: .5, y: 14 }, { opacity: 1, scale: 1, y: 0, duration: .8, stagger: .15, delay: e.desenhar ? 1.9 : .6, ease: E.volta });
        }
        legenda.innerHTML = Telas.txt(e.legenda || "");
        gsap.fromTo(legenda, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .9, ease: E.out });
      };
      // etapa "imediato": o mapa já nasce nesse enquadramento (ex.: aproximado no AURO) e depois abre
      etapas.forEach((e, k) => tl.call(aplicar, [k, k === 0 && e.imediato], k === 0 && e.imediato ? 0 : .9 + k * 2.4));
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
    regras(t, tl) {
      rotulo(tl, $(t, "[data-a=rotulo]"), 0);
      texto(tl, $(t, ".au-titulo"), .2);
      $$(t, "[data-a=regra]").forEach((r, k) => {
        const p = .7 + k * .35;
        tl.from(r, { x: 40, opacity: 0, duration: 1, ease: E.forte }, p)
          .from($(r, ".rg-num"), { opacity: 0, scale: .7, duration: .8, ease: E.out }, p + .1);
      });
    },
    galeria(t, tl, tela) {
      if (!tela.dados.semZoom) afasta(tl, $(t, ".au-foto"), 0, 2.2, 1.18);
      else tl.from($(t, ".au-foto"), { opacity: 0, duration: 1.2 }, 0);
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
      sobe(tl, $(t, "[data-a=chave]"), 1.1, { y: 20 });
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
      varre(tl, $(t, "[data-a=logodados]"), .4, 1.1);
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
      tl.from($$(t, "[data-a=qr]"), { scale: .8, opacity: 0, duration: 1.1, stagger: .35, ease: E.volta }, 2);
      tl.from($(t, "[data-a=cartaz]"), { opacity: 0, y: 40, scale: .96, filter: "blur(10px)", duration: 1.8, ease: E.forte }, 1.6);
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
