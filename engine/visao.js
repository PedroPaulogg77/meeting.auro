/* Faixa lateral e grade de miniaturas. Cada prévia usa o mesmo renderizador e a
   mesma coreografia do palco, em um elemento separado e montado sob demanda. */
(() => {
  function criar({ telas, roteiro, irPara, aoMudar }) {
    const painel = document.getElementById("visao");
    const lista = painel.querySelector(".visao-lista");
    const titulo = painel.querySelector(".visao-titulo");
    const voltarFoco = painel.querySelector(".visao-fechar");
    const iniciar = painel.querySelector("#entrar-tela-cheia");
    const itens = [];
    let modo = "lateral";
    let atual = -1;
    let focoAnterior = null;

    const nome = dados => String(dados.modelo === "divisor" ? dados.capitulo.titulo : dados.titulo || dados.sobretitulo || dados.texto || dados.id)
      .replace(/\*/g, "").replace(/\n/g, " ").replace(/\s+/g, " ").trim();

    roteiro.capitulos.forEach(cap => {
      const secao = document.createElement("section");
      secao.className = "visao-capitulo";
      const h = document.createElement("h3");
      h.textContent = `${String(cap.numero).padStart(2, "0")} · ${cap.titulo}`;
      secao.append(h);
      telas.forEach((tela, n) => {
        if (tela.capitulo !== cap) return;
        const botao = document.createElement("button");
        botao.type = "button";
        botao.className = "visao-item";
        botao.dataset.tela = n;
        botao.title = tela.dados.pendente || "";
        botao.setAttribute("aria-label", `Tela ${n + 1}: ${nome(tela.dados)}`);
        const mini = document.createElement("span");
        mini.className = "visao-miniatura";
        const legenda = document.createElement("span");
        legenda.className = "visao-legenda";
        const numero = document.createElement("b");
        numero.textContent = String(n + 1).padStart(2, "0");
        const texto = document.createElement("span");
        texto.textContent = nome(tela.dados);
        legenda.append(numero, texto);
        if (tela.dados.pendente) {
          botao.classList.add("tem-pendencia");
          const marca = document.createElement("span");
          marca.className = "visao-pendente";
          marca.textContent = "●";
          marca.title = tela.dados.pendente;
          legenda.append(marca);
        }
        botao.append(mini, legenda);
        botao.addEventListener("click", () => { irPara(n); if (modo === "grade") fechar(); });
        secao.append(botao);
        itens[n] = { botao, mini, tela, preview: null, core: null };
      });
      lista.append(secao);
    });

    // O design usa uma tela de 1920 × 1080; a prévia preserva exatamente essa
    // geometria e só reduz o resultado, inclusive nas fontes baseadas em cqw.
    const redimensionar = new ResizeObserver(entradas => {
      entradas.forEach(({ target }) => {
        const item = itens[+target.closest("[data-tela]").dataset.tela];
        if (item?.preview) item.preview.style.setProperty("--mini-escala", target.clientWidth / 1920);
      });
    });

    function renomearIds(raiz, n) {
      const ids = new Map();
      raiz.querySelectorAll("[id]").forEach(el => {
        const antigo = el.id;
        const novo = `mini-${n}-${antigo}`;
        ids.set(antigo, novo);
        el.id = novo;
      });
      if (!ids.size) return;
      raiz.querySelectorAll("*").forEach(el => {
        [...el.attributes].forEach(attr => {
          let valor = attr.value.replace(/url\(#([^)]+)\)/g, (t, id) => ids.has(id) ? `url(#${ids.get(id)})` : t);
          if ((attr.name === "href" || attr.name === "xlink:href") && valor.startsWith("#") && ids.has(valor.slice(1))) valor = `#${ids.get(valor.slice(1))}`;
          if (valor !== attr.value) el.setAttribute(attr.name, valor);
        });
      });
    }

    function montar(n) {
      const item = itens[n];
      if (!painel.classList.contains("on") || !item || item.preview) return;
      const t = Telas.render(item.tela.dados, { config: roteiro.config, meta: roteiro.meta });
      if (!t) return;
      // A fonte do vídeo sai antes de o elemento entrar no DOM.
      t.el.querySelectorAll("video").forEach(v => {
        v.preload = "none"; v.removeAttribute("src");
      });
      t.el.classList.add("ativa");
      t.el.classList.remove("dormindo");
      const palcoMini = document.createElement("span");
      palcoMini.className = "visao-palco";
      palcoMini.style.setProperty("--mini-escala", item.mini.clientWidth / 1920);
      palcoMini.append(t.el);
      item.mini.append(palcoMini);
      item.preview = palcoMini;
      redimensionar.observe(item.mini);

      if (t.dados.modelo === "video") {
        const aviso = document.createElement("div");
        aviso.className = "visao-video";
        aviso.textContent = "▶  VÍDEO CONCEITO";
        t.el.querySelector(".au-tela").append(aviso);
      }

      try {
        const c = Coreografia.criar(t);
        item.core = c;
        c.tl.progress(1);
        c.passos.forEach(p => p.progress(1));
        // Algumas telas de mapa iniciam tweens nos callbacks da timeline.
        // Completar essas transições deixa a miniatura no último estado.
        const alvos = [t.el, ...t.el.querySelectorAll("*")];
        new Set(gsap.getTweensOf(alvos).filter(tween => tween.parent === gsap.globalTimeline))
          .forEach(tween => { tween.progress(1); tween.kill(); });
        c.tl.kill(); c.passos.forEach(p => p.kill()); c.loops.forEach(p => p.kill());
      } catch (erro) {
        console.warn("Prévia da tela", n + 1, erro);
      }
      renomearIds(t.el, n);
    }

    function desmontar(n) {
      const item = itens[n];
      if (!item?.preview) return;
      redimensionar.unobserve(item.mini);
      item.core?.tl.kill();
      item.core?.passos.forEach(p => p.kill());
      item.core?.loops.forEach(p => p.kill());
      gsap.killTweensOf([item.preview, ...item.preview.querySelectorAll("*")]);
      item.preview.remove();
      item.preview = null;
      item.core = null;
    }

    const observador = new IntersectionObserver(entradas => {
      entradas.forEach(({ target, isIntersecting }) => {
        const n = +target.dataset.tela;
        if (isIntersecting) montar(n);
        else desmontar(n);
      });
    }, { root: lista, rootMargin: "250px 0px" });
    itens.forEach(item => observador.observe(item.botao));

    function atualizar(n) {
      const anterior = atual;
      atual = n;
      itens.forEach((item, k) => {
        item.botao.classList.toggle("atual", k === n);
        if (k === n) item.botao.setAttribute("aria-current", "true");
        else item.botao.removeAttribute("aria-current");
      });
      if (n !== anterior && painel.classList.contains("on") && modo === "lateral") itens[n].botao.scrollIntoView({ block: "nearest" });
    }
    function abrir(novoModo) {
      if (painel.classList.contains("on") && modo === novoModo) { fechar(); return; }
      if (!painel.classList.contains("on")) focoAnterior = document.activeElement;
      modo = novoModo;
      painel.classList.toggle("grade", modo === "grade");
      painel.classList.toggle("lateral", modo === "lateral");
      document.body.classList.toggle("visao-lateral", modo === "lateral");
      aoMudar();
      titulo.textContent = modo === "grade" ? "Todas as telas" : "Grade de telas";
      painel.classList.add("on");
      painel.setAttribute("aria-hidden", "false");
      if (atual >= 0) itens[atual].botao.scrollIntoView({ block: "center" });
      iniciar.focus();
    }
    function fechar() {
      if (!painel.classList.contains("on")) return;
      painel.classList.remove("on");
      painel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("visao-lateral");
      aoMudar();
      itens.forEach((_, n) => desmontar(n));
      focoAnterior?.focus?.();
    }
    voltarFoco.addEventListener("click", fechar);
    painel.querySelector(".visao-fundo").addEventListener("click", fechar);
    return { abrir, fechar, atualizar, get aberta() { return painel.classList.contains("on"); }, get modo() { return modo; } };
  }
  window.Visao = { criar };
})();
