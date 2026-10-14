/*
  Som das telas de premiação: rufar de tambores e o golpe final (bumbo + prato), gravados em assets/som/.
  Toca por <audio>, então funciona também abrindo o index.html direto do disco (offline).
  Volume no máximo, no nível do vídeo conceito. O navegador só libera áudio depois de um clique/tecla;
  o passador conta como interação.

  rufar-tensao.mp3  crescendo de 5,5 s que termina no ponto mais forte (as revelações cortam nele)
  rufar-longo.wav   rufar contínuo e nivelado, em loop sem emenda (WAV: o MP3 deixaria um clique a cada volta)
  final.mp3         bumbo + prato
*/
window.Som = (() => {
  const PASTA = "assets/som/";
  const TENSAO = 5.5;
  const base = {};
  let rolando = null, corte = null, rampa = 0;

  function arquivo(nome) {
    if (!base[nome]) { const a = new Audio(PASTA + nome); a.preload = "auto"; base[nome] = a; }
    return base[nome];
  }
  ["rufar-tensao.mp3", "rufar-longo.wav", "final.mp3"].forEach(arquivo);

  function tocar(nome, { inicio = 0, loop = false, vol = 1 } = {}) {
    const a = arquivo(nome).cloneNode();
    a.loop = loop; a.volume = Math.min(1, vol);
    const pular = () => { try { a.currentTime = inicio; } catch (e) {} };
    if (inicio) { if (a.readyState >= 1) pular(); else a.addEventListener("loadedmetadata", pular, { once: true }); }
    a.play().catch(() => {});
    return a;
  }
  // muda o volume aos poucos (curva suave); usada para crescer o rufar e para apagar sem estalo
  function volume(a, ate, seg, depois) {
    const id = ++rampa, v0 = a.volume, t0 = performance.now();
    const passo = () => {
      if (a.paused && !depois) return;
      const k = Math.min(1, (performance.now() - t0) / (seg * 1000));
      a.volume = Math.max(0, Math.min(1, v0 + (ate - v0) * (k * k * (3 - 2 * k))));
      if (k < 1) requestAnimationFrame(passo); else if (depois) depois();
    };
    passo();
    return id;
  }

  /* rufar de tambores
     seg ≤ 5,5: crescendo que termina exatamente no fim dos "seg" segundos (é cortado pelo golpe final)
     seg > 5,5: rufar contínuo; com crescer, o volume sobe de "de" até 1 nesse tempo (tensão do preço) */
  function rufar(seg = TENSAO, { crescer = 0, de = .35 } = {}) {
    parar(0);
    if (seg <= TENSAO) {
      rolando = tocar("rufar-tensao.mp3", { inicio: Math.max(0, TENSAO - seg) });
      return;
    }
    rolando = tocar("rufar-longo.wav", { loop: true, vol: crescer ? de : .9 });
    if (crescer) volume(rolando, 1, crescer);
    corte = setTimeout(() => parar(.8), seg * 1000);
  }
  function parar(fade = .12) {
    clearTimeout(corte); corte = null;
    const a = rolando; rolando = null;
    if (!a) return;
    if (!fade) { a.pause(); return; }
    volume(a, 0, fade, () => a.pause());
  }
  // golpe final da revelação: corta o rufar e toca bumbo + prato
  function final(forca = 1) {
    parar(.05);
    tocar("final.mp3", { vol: forca });
  }

  return { rufar, parar, final, TENSAO };
})();
