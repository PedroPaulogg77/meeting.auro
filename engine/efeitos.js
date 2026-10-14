/*
  Efeitos de revelação das telas de premiação, no tom da marca: brilhos finos em rosé, dourado e branco,
  halo de luz e poeira dourada caindo devagar. Nada de confete colorido: sofisticado, como o resto do AURO.
  Tudo acontece numa camada .fx dentro da tela e se apaga sozinho. Coordenadas em % do palco.
*/
window.Efeitos = (() => {
  const CORES = ["#dca385", "#f2c9a8", "#e8cfa0", "#ffffff", "#b68e75"];
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
  function centro(raiz, el) {
    const r = raiz.getBoundingClientRect(), b = el.getBoundingClientRect();
    return [((b.left + b.width / 2) - r.left) / r.width * 100, ((b.top + b.height / 2) - r.top) / r.height * 100];
  }

  // halo de luz + faíscas finas (traços) que se abrem do ponto e se apagam
  function estouro(raiz, x = 50, y = 50, { n = 34, raio = 460, escala = 1 } = {}) {
    if (!vivo(raiz)) return;
    const c = camada(raiz);
    const halo = peca(c, "fx-halo", x, y);
    gsap.fromTo(halo, { scale: .2, opacity: .85 }, { scale: 3.2 * escala, opacity: 0, duration: 1.6, ease: "power2.out", onComplete: () => halo.remove() });
    const anel = peca(c, "fx-anel", x, y);
    gsap.fromTo(anel, { scale: .1, opacity: .7 }, { scale: 4.5 * escala, opacity: 0, duration: 1.3, ease: "power3.out", onComplete: () => anel.remove() });
    for (let k = 0; k < n; k++) {
      const a = k / n * Math.PI * 2 + sorte(-.1, .1), d = raio * escala * sorte(.5, 1);
      const el = peca(c, "fx-traco", x, y, { background: `linear-gradient(90deg, transparent, ${cor()})`, rotate: (a * 180 / Math.PI) + "deg", width: sorte(40, 90) + "px" });
      gsap.fromTo(el, { x: 0, y: 0, opacity: 1, scaleX: .2 },
        { x: Math.cos(a) * d, y: Math.sin(a) * d, opacity: 0, scaleX: 1, duration: sorte(1.1, 1.6), ease: "power3.out", onComplete: () => el.remove() });
    }
  }
  const estouroEm = (raiz, el, opc) => { if (vivo(raiz) && el) { const [x, y] = centro(raiz, el); estouro(raiz, x, y, opc); } };

  // poeira dourada: pontos de luz que descem devagar cintilando
  function brilho(raiz, { n = 70, dur = 5 } = {}) {
    if (!vivo(raiz)) return;
    const c = camada(raiz);
    for (let k = 0; k < n; k++) {
      const t = sorte(3, 7), el = peca(c, "fx-brilho", sorte(2, 98), sorte(-6, 30), { width: t + "px", height: t + "px", background: cor() });
      gsap.timeline({ delay: sorte(0, dur * .5), onComplete: () => el.remove() })
        .fromTo(el, { opacity: 0, y: 0 }, { opacity: 1, duration: .4 })
        .to(el, { y: sorte(380, 760), x: sorte(-60, 60), duration: sorte(dur * .6, dur), ease: "sine.in" }, 0)
        .to(el, { opacity: .2, duration: .25, repeat: 5, yoyo: true, ease: "sine.inOut" }, .4)
        .to(el, { opacity: 0, duration: .8 }, ">-0.6");
    }
  }

  // nomes antigos mantidos para as telas: tudo vira brilho elegante
  const confete = (raiz, { n = 120 } = {}) => brilho(raiz, { n, dur: 5 });
  const chuvaDinheiro = (raiz, { n = 60, dur = 5 } = {}) => brilho(raiz, { n, dur });

  // fogos discretos: alguns halos com faíscas pelo alto da tela
  function fogos(raiz, { n = 5, dur = 2.4 } = {}) {
    if (!vivo(raiz)) return;
    for (let k = 0; k < n; k++)
      gsap.delayedCall(k * dur / n + sorte(0, .2), () => estouro(raiz, sorte(15, 85), sorte(15, 45), { n: 26, raio: sorte(260, 380), escala: .8 }));
  }

  return { confete, chuvaDinheiro, brilho, estouro, estouroEm, fogos, vivo };
})();
