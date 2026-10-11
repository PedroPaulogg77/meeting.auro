/*
  Motor da apresentação AURO: monta as telas a partir do ROTEIRO, roda a coreografia e controla o passador.

  Passador / teclado
    → ↓ PageDown Espaço Enter   avança (se a animação ainda roda, completa; senão, próxima tela)
    ← ↑ PageUp Backspace         volta
    B  .                         tela preta
    F  F5                        tela cheia
    V                            grade lateral de miniaturas (Esc fecha)
    G                            grade de miniaturas (Esc fecha)
    R                            modo revisão (pendências e notas)
    número + Enter               vai direto para a tela
    Home / End                   primeira / última tela
*/
(() => {
  const R = window.ROTEIRO;
  const palco = document.getElementById("palco");
  const ctx = { config: R.config, meta: R.meta };

  /* ───────── Montagem: divisor de capítulo + telas do roteiro ───────── */
  const telas = [];
  R.capitulos.forEach(cap => {
    const lista = cap.divisor === false ? cap.telas : [{ id: `${cap.id}-divisor`, modelo: "divisor", capitulo: cap }, ...cap.telas];
    lista.forEach(dados => {
      const t = Telas.render(dados, ctx);
      if (!t) return;
      t.capitulo = cap;
      palco.appendChild(t.el);
      telas.push(t);
    });
  });

  let atual = -1, passo = 0, digitos = "";
  const visao = Visao.criar({ telas, roteiro: R, irPara: n => irPara(n), aoMudar: () => escala() });

  const escala = () => {
    const lateral = document.body.classList.contains("visao-lateral") ? Math.min(520, innerWidth * .46) : 0;
    palco.style.setProperty("--s", Math.min((innerWidth - lateral) / 1920, innerHeight / 1080));
  };
  addEventListener("resize", escala); escala();

  /* ───────── Coreografia ───────── */
  function core(t) { return t.core || (t.core = Coreografia.criar(t)); }

  /* ───────── Navegação ───────── */
  function irPara(n, p = 0) {
    n = Math.max(0, Math.min(telas.length - 1, n));
    if (n !== atual) {
      const velha = telas[atual], nova = telas[n];
      if (velha) {
        velha.el.classList.remove("ativa");
        velha.desativar && velha.desativar(velha.el);
        setTimeout(() => {
          if (velha.el.classList.contains("ativa")) return;
          velha.el.classList.add("dormindo");
          const c = core(velha); c.tl.pause(0); c.passos.forEach(x => x.pause(0)); c.loops.forEach(x => x.pause(0));
        }, 900);
      }
      nova.el.classList.remove("dormindo"); void nova.el.offsetWidth; nova.el.classList.add("ativa");
      const c = core(nova); c.passos.forEach(x => x.pause(0)); c.tl.restart();
      c.loops.forEach(x => { x.pause(0); gsap.delayedCall(c.tl.duration() + .4, () => nova.el.classList.contains("ativa") && x.restart()); });
      nova.ativar && nova.ativar(nova.el);
      atual = n; passo = 0;
    }
    const c = core(telas[n]);
    while (passo < Math.min(p, telas[n].passos)) { c.tl.progress(1); c.passos[passo] && c.passos[passo].progress(1); passo++; }
    history.replaceState(null, "", `#${atual + 1}`);
    visao.atualizar(atual);
    atualizarHud();
  }

  function avancar() {
    const t = telas[atual], c = core(t);
    const rodando = passo === 0 ? c.tl : c.passos[passo - 1];
    if (rodando && rodando.progress() < .999) { rodando.progress(1); return; }
    if (passo < t.passos) { c.passos[passo] && c.passos[passo].restart(); passo++; atualizarHud(); return; }
    irPara(atual + 1);
  }
  function voltar() {
    if (passo > 0) { passo--; core(telas[atual]).passos[passo]?.pause(0); atualizarHud(); return; }
    if (atual > 0) irPara(atual - 1);
  }

  /* ───────── Tela preta e revisão ───────── */
  const preto = document.getElementById("preto");
  const hud = document.getElementById("hud");
  let revisao = new URLSearchParams(location.search).has("revisao");
  function atualizarHud() {
    hud.classList.toggle("on", revisao);
    if (!revisao || atual < 0) return;
    const t = telas[atual], d = t.dados, cap = t.capitulo;
    hud.innerHTML = `<div><b>${String(cap.numero).padStart(2, "0")} · ${Telas.txt(cap.titulo)}</b> · ${Telas.txt(cap.apresentador || "")}</div>`
      + `<div>Tela ${atual + 1}/${telas.length} · <code>${Telas.txt(d.id)}</code> · ${d.modelo}${t.passos ? ` · passo ${passo}/${t.passos}` : ""}</div>`
      + (d.pendente ? `<div class="hud-pendente">⚠ ${Telas.txt(d.pendente)}</div>` : "")
      + (d.notas ? `<div class="hud-notas">${Telas.txt(d.notas)}</div>` : "");
  }

  /* ───────── Teclado e clique ───────── */
  function apresentarEmTelaCheia() {
    const quiosque = innerWidth >= screen.width && innerHeight >= screen.height;
    if (document.fullscreenElement || quiosque) { visao.fechar(); return; }
    document.documentElement.requestFullscreen()
      .then(() => visao.fechar())
      .catch(() => {
        document.querySelector(".visao-inicio p").textContent = "O navegador não permitiu a tela cheia. Tente pressionar F ou F11.";
      });
  }
  document.getElementById("entrar-tela-cheia").addEventListener("click", apresentarEmTelaCheia);
  const botaoGrade = document.getElementById("abrir-grade");
  botaoGrade.addEventListener("click", () => visao.abrir("lateral"));
  addEventListener("keydown", e => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const k = e.key;
    if (visao.aberta) {
      if (k === "Escape") { e.preventDefault(); visao.fechar(); return; }
      if (k === "v" || k === "V") { e.preventDefault(); visao.abrir("lateral"); return; }
      if (k === "g" || k === "G") { e.preventDefault(); visao.abrir("grade"); return; }
      if (["f", "F", "F5"].includes(k)) { e.preventDefault(); apresentarEmTelaCheia(); return; }
      if (visao.modo === "grade" || (e.target instanceof Element && e.target.closest("#visao") && ["Enter", " "].includes(k))) return;
    }
    if (/^[0-9]$/.test(k)) { digitos += k; return; }
    if (k === "Enter" && digitos) { irPara(parseInt(digitos, 10) - 1); digitos = ""; e.preventDefault(); return; }
    digitos = "";
    if (preto.classList.contains("on") && !["b", "B", "."].includes(k)) { preto.classList.remove("on"); return; }
    switch (k) {
      case "ArrowRight": case "ArrowDown": case "PageDown": case " ": case "Enter": e.preventDefault(); avancar(); break;
      case "ArrowLeft": case "ArrowUp": case "PageUp": case "Backspace": e.preventDefault(); voltar(); break;
      case "Home": irPara(0); break;
      case "End": irPara(telas.length - 1); break;
      case "b": case "B": case ".": preto.classList.toggle("on"); break;
      case "F5": e.preventDefault(); /* falls through */
      case "f": case "F": document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen().catch(() => {}); break;
      case "v": case "V": e.preventDefault(); visao.abrir("lateral"); break;
      case "g": case "G": e.preventDefault(); visao.abrir("grade"); break;
      case "r": case "R": revisao = !revisao; atualizarHud(); break;
    }
  });
  palco.addEventListener("click", e => {
    const area = palco.getBoundingClientRect();
    e.clientX > area.left + area.width / 2 ? avancar() : voltar();
  });

  /* ───────── Início: espera fontes e as imagens das primeiras telas ───────── */
  const [nHash] = location.hash.slice(1).split(".").map(Number);
  const inicio = Math.max(0, (nHash || 1) - 1);
  const primeiras = telas.slice(inicio, inicio + 3).flatMap(t => [...t.el.querySelectorAll("img")]);
  const prontas = Promise.all(primeiras.map(i => i.decode().catch(() => {})));
  Promise.all([document.fonts.ready, Promise.race([prontas, new Promise(r => setTimeout(r, 4000))])]).then(() => {
    requestAnimationFrame(() => { irPara(inicio); visao.abrir("lateral"); });
    // prepara as demais coreografias aos poucos, sem travar a abertura
    let k = 0;
    const preparar = () => { if (k < telas.length) { core(telas[k++]); setTimeout(preparar, 60); } };
    setTimeout(preparar, 1500);
  });
  const dica = document.getElementById("dica");
  const esconderDicaEmTelaCheia = () => {
    // O modo quiosque do Chrome não preenche document.fullscreenElement.
    const quiosque = innerWidth >= screen.width && innerHeight >= screen.height;
    const telaCheia = !!document.fullscreenElement || quiosque;
    dica.classList.toggle("some", telaCheia);
    botaoGrade.hidden = telaCheia;
  };
  addEventListener("fullscreenchange", esconderDicaEmTelaCheia);
  addEventListener("resize", esconderDicaEmTelaCheia);
  esconderDicaEmTelaCheia();

  window.Apresentacao = { irPara, avancar, voltar, telas };
})();
