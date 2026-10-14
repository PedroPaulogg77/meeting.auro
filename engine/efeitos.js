/*
  Efeitos de comemoração das telas de premiação (sem arquivos externos): confete, chuva de dinheiro,
  estouro radial e fogos. Tudo acontece numa camada .fx dentro da tela e se apaga sozinho.
  Coordenadas em % do palco (1920×1080); deslocamentos em px do palco.
*/
window.Efeitos = (() => {
  const CORES = ["#dca385", "#f2c9a8", "#b68e75", "#004332", "#68a263", "#ffffff", "#e9c46a"];
  const sorte = (a, b) => a + Math.random() * (b - a);
  const cor = () => CORES[Math.floor(Math.random() * CORES.length)];

  // só roda no palco de verdade (não nas miniaturas da grade)
  const vivo = raiz => raiz && raiz.isConnected && raiz.closest("#palco") && raiz.closest(".tela")?.classList.contains("ativa");

  function camada(raiz) {
    let c = raiz.querySelector(":scope > .fx");
    if (!c) { c = document.createElement("div"); c.className = "fx"; raiz.appendChild(c); }
    return c;
  }
  function peca(c, cls, x, y, css = {}) {
    const el = document.createElement("i");
    el.className = cls;
    Object.assign(el.style, { left: x + "%", top: y + "%" }, css);
    c.appendChild(el);
    return el;
  }

  // centro de um elemento em % do palco
  function centro(raiz, el) {
    const r = raiz.getBoundingClientRect(), b = el.getBoundingClientRect();
    return [((b.left + b.width / 2) - r.left) / r.width * 100, ((b.top + b.height / 2) - r.top) / r.height * 100];
  }

  // confete: dois canhões nos cantos de baixo + uma chuva do alto
  function confete(raiz, { n = 180 } = {}) {
    if (!vivo(raiz)) return;
    const c = camada(raiz);
    for (let k = 0; k < n; k++) {
      const lado = k % 3, x = lado === 0 ? 4 : lado === 1 ? 96 : sorte(10, 90), y = lado === 2 ? -4 : 104;
      const w = sorte(10, 22), el = peca(c, "fx-confete", x, y, { width: w + "px", height: w * sorte(.35, .6) + "px", background: cor() });
      const dir = lado === 0 ? 1 : lado === 1 ? -1 : sorte(-.4, .4);
      const tl = gsap.timeline({ onComplete: () => el.remove() });
      if (lado < 2) tl.to(el, { x: dir * sorte(150, 900), y: -sorte(500, 1000), rotation: sorte(-360, 360), duration: sorte(.7, 1.1), ease: "power2.out" });
      tl.to(el, { x: `+=${sorte(-200, 200)}`, y: `+=${sorte(900, 1400)}`, rotation: `+=${sorte(-720, 720)}`, rotationX: sorte(0, 720),
        duration: sorte(2.4, 4), ease: "power1.in" }, lado < 2 ? ">" : sorte(0, .8));
    }
  }

  // notas de dinheiro e moedas caindo, girando e balançando
  function chuvaDinheiro(raiz, { n = 46, dur = 4 } = {}) {
    if (!vivo(raiz)) return;
    const c = camada(raiz);
    for (let k = 0; k < n; k++) {
      const moeda = k % 4 === 0;
      const el = peca(c, moeda ? "fx-moeda" : "fx-nota", sorte(-4, 100), -12);
      if (!moeda) el.textContent = Math.random() < .5 ? "R$" : "$";
      const s = sorte(.7, 1.25);
      gsap.fromTo(el, { y: 0, rotation: sorte(-40, 40), scale: s },
        { y: sorte(1250, 1500), x: sorte(-220, 220), rotation: `+=${sorte(-540, 540)}`, rotationY: moeda ? 0 : sorte(-180, 180),
          duration: sorte(dur * .7, dur * 1.3), delay: sorte(0, dur * .55), ease: "power1.in", onComplete: () => el.remove() });
    }
  }

  // estouro radial: anel de luz + faíscas saindo de um ponto
  function estouro(raiz, x = 50, y = 50, { n = 44, raio = 520, escala = 1 } = {}) {
    if (!vivo(raiz)) return;
    const c = camada(raiz);
    const anel = peca(c, "fx-anel", x, y);
    gsap.fromTo(anel, { scale: .1, opacity: .9 }, { scale: 6 * escala, opacity: 0, duration: 1.1, ease: "power2.out", onComplete: () => anel.remove() });
    for (let k = 0; k < n; k++) {
      const a = k / n * Math.PI * 2 + sorte(-.08, .08), d = raio * escala * sorte(.45, 1);
      const tam = sorte(8, 18);
      const el = peca(c, "fx-faisca", x, y, { width: tam + "px", height: tam + "px", background: cor() });
      gsap.fromTo(el, { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: Math.cos(a) * d, y: Math.sin(a) * d + sorte(40, 160), scale: .2, opacity: 0, duration: sorte(1, 1.7), ease: "power3.out", onComplete: () => el.remove() });
    }
  }
  const estouroEm = (raiz, el, opc) => { if (vivo(raiz) && el) { const [x, y] = centro(raiz, el); estouro(raiz, x, y, opc); } };

  // fogos: estouros em sequência pelo alto da tela
  function fogos(raiz, { n = 7, dur = 2.6 } = {}) {
    if (!vivo(raiz)) return;
    for (let k = 0; k < n; k++)
      gsap.delayedCall(k * dur / n + sorte(0, .2), () => estouro(raiz, sorte(12, 88), sorte(12, 48), { n: 38, raio: sorte(300, 480) }));
  }

  return { confete, chuvaDinheiro, estouro, estouroEm, fogos, vivo };
})();
