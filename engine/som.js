/*
  Som das telas de premiação, sintetizado no navegador (Web Audio): rufar de tambor, bumbo, prato,
  explosão, moedas e motor. Não depende de arquivo; volume alto, no nível do vídeo conceito.
  O navegador só libera áudio depois de um clique/tecla — o passador conta como interação.
*/
window.Som = (() => {
  const VOLUME = 1;
  let ctx = null, saida = null, ruidoBuf = null, rolando = [];

  function ac() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -10; comp.ratio.value = 4;
      saida = ctx.createGain(); saida.gain.value = VOLUME;
      saida.connect(comp); comp.connect(ctx.destination);
      ruidoBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
      const d = ruidoBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  const agora = () => ac().currentTime;

  function ruido(t, dur, { tipo = "bandpass", freq = 1800, q = .8, vol = .6, ataque = .002, lista } = {}) {
    const c = ac(), src = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    src.buffer = ruidoBuf; src.loop = true;
    f.type = tipo; f.frequency.value = freq; f.Q.value = q;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + ataque); g.gain.exponentialRampToValueAtTime(.0008, t + dur);
    src.connect(f); f.connect(g); g.connect(saida);
    src.start(t); src.stop(t + dur + .05);
    if (lista) lista.push(src);
    return src;
  }
  function tom(t, dur, { de = 180, ate = 50, onda = "sine", vol = .9, lista } = {}) {
    const c = ac(), o = c.createOscillator(), g = c.createGain();
    o.type = onda; o.frequency.setValueAtTime(de, t); o.frequency.exponentialRampToValueAtTime(Math.max(ate, 1), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0008, t + dur);
    o.connect(g); g.connect(saida); o.start(t); o.stop(t + dur + .05);
    if (lista) lista.push(o);
    return o;
  }

  const caixa = (t, vol = .5, lista) => { ruido(t, .12, { freq: 2200, q: .7, vol, lista }); tom(t, .08, { de: 240, ate: 160, onda: "triangle", vol: vol * .5, lista }); };
  const bumbo = (t, vol = 1) => tom(t, .45, { de: 150, ate: 38, vol });
  const prato = (t, vol = .55) => { ruido(t, 2.6, { tipo: "highpass", freq: 5200, q: .3, vol }); ruido(t, 1.4, { freq: 9000, q: 2, vol: vol * .4 }); };

  // rufar contínuo que acelera e cresce até ser parado (parar()) ou acabar a duração
  function rufar(seg = 15) {
    parar();
    const t0 = agora(), lista = [];
    let t = t0, k = 0;
    while (t < t0 + seg) {
      const p = (t - t0) / seg;
      caixa(t, .18 + .5 * p, lista);
      t += .085 - .05 * p + (k++ % 2 ? .004 : 0);
    }
    rolando = lista;
  }
  function parar() {
    const t = ctx ? ctx.currentTime : 0;
    rolando.forEach(s => { try { s.stop(t + .02); } catch (e) {} });
    rolando = [];
  }

  // explosão de revelação: bumbo + prato + estrondo grave
  function estouro(forca = 1) {
    parar();
    const t = agora();
    bumbo(t, 1 * forca); bumbo(t + .12, .7 * forca);
    prato(t + .02, .6 * forca);
    ruido(t, 1.2, { tipo: "lowpass", freq: 420, q: .5, vol: .9 * forca, ataque: .005 });
  }
  function moedas(n = 14) {
    const t = agora();
    for (let k = 0; k < n; k++) {
      const tk = t + k * .055 + Math.random() * .03, f = 2400 + Math.random() * 1800;
      tom(tk, .22, { de: f, ate: f * .98, onda: "square", vol: .09 });
      tom(tk + .04, .3, { de: f * 1.5, ate: f * 1.48, onda: "sine", vol: .12 });
    }
  }
  function whoosh() { ruido(agora(), .7, { freq: 600, q: 1.2, vol: .5, ataque: .35 }); }
  // ronco de moto subindo de giro
  function motor() {
    const c = ac(), t = c.currentTime, o = c.createOscillator(), o2 = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain();
    o.type = "sawtooth"; o2.type = "square";
    o.frequency.setValueAtTime(38, t); o.frequency.exponentialRampToValueAtTime(140, t + 1.3); o.frequency.exponentialRampToValueAtTime(70, t + 2.4);
    o2.frequency.setValueAtTime(19, t); o2.frequency.exponentialRampToValueAtTime(70, t + 1.3); o2.frequency.exponentialRampToValueAtTime(35, t + 2.4);
    f.type = "lowpass"; f.frequency.value = 900;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.55, t + .15); g.gain.setValueAtTime(.55, t + 1.9); g.gain.exponentialRampToValueAtTime(.001, t + 2.6);
    o.connect(f); o2.connect(f); f.connect(g); g.connect(saida);
    o.start(t); o2.start(t); o.stop(t + 2.7); o2.stop(t + 2.7);
  }

  return { rufar, parar, estouro, moedas, whoosh, motor, bumbo: () => bumbo(agora()) };
})();
