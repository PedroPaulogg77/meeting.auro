/*
  Som das telas de premiação: rufar de tambores e o golpe final (bumbo + prato), gravados em assets/som/.
  Toca por <audio>, então funciona também abrindo o index.html direto do disco (offline).
  Volume no máximo, no nível do vídeo conceito. O navegador só libera áudio depois de um clique/tecla;
  o passador conta como interação.
*/
window.Som = (() => {
  const PASTA = "assets/som/";
  const CURTO = 2.4;                    // duração do rufar curto (crescendo)
  const base = {};
  let rolando = null, corte = null;

  function arquivo(nome) {
    if (!base[nome]) { const a = new Audio(PASTA + nome + ".mp3"); a.preload = "auto"; base[nome] = a; }
    return base[nome];
  }
  ["rufar-curto", "rufar-longo", "final"].forEach(arquivo);

  function tocar(nome, { inicio = 0, loop = false, vol = 1 } = {}) {
    const a = arquivo(nome).cloneNode();
    a.loop = loop; a.volume = Math.min(1, vol);
    const pular = () => { try { a.currentTime = inicio; } catch (e) {} };
    if (inicio) { if (a.readyState >= 1) pular(); else a.addEventListener("loadedmetadata", pular, { once: true }); }
    a.play().catch(() => {});
    return a;
  }
  function apagar(a, dur = .12) {
    if (!a) return;
    const v0 = a.volume, t0 = performance.now();
    const passo = () => {
      const k = (performance.now() - t0) / (dur * 1000);
      if (k >= 1) { a.pause(); return; }
      a.volume = v0 * (1 - k); requestAnimationFrame(passo);
    };
    passo();
  }

  // rufar de tambores: até 2,4 s usa o crescendo (termina no ponto mais forte); acima disso, rufar contínuo
  function rufar(seg = CURTO) {
    parar();
    rolando = seg <= CURTO
      ? tocar("rufar-curto", { inicio: Math.max(0, CURTO - seg) })
      : tocar("rufar-longo", { loop: true, vol: .85 });
    if (seg > CURTO) corte = setTimeout(parar, seg * 1000);
  }
  function parar() {
    clearTimeout(corte); corte = null;
    apagar(rolando); rolando = null;
  }
  // golpe final da revelação: para o rufar e toca bumbo + prato
  function final(forca = 1) {
    parar();
    tocar("final", { vol: forca });
  }

  return { rufar, parar, final, CURTO };
})();
