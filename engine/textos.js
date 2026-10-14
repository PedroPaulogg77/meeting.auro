/*
  Textos editáveis pela planilha (Google Planilhas), aplicados ao ROTEIRO antes das telas serem montadas.

  A planilha tem uma linha por texto, com a coluna "TEXTO NOVO" e o "Código" (ex.: "campanha-meta-1|titulo").
  Só troca textos que já existem; célula vazia = mantém o texto do roteiro. Layout e animações não mudam.

  De onde vêm os textos:
    • Site (http/https) com config.planilhaTextos preenchido: lê a planilha ao vivo (até 4 s).
      Se falhar, usa a cópia salva em conteudo/textos-planilha.js.
    • Aberto do disco (file://, o evento): usa só a cópia salva — nada muda sem querer na hora.
      A cópia é atualizada pelo atalho "ATUALIZAR TEXTOS.bat" (precisa de internet uma vez).
    • ?textos=fixos na URL ignora a planilha ao vivo.

  Proteções: códigos desconhecidos são ignorados; números (valores, vendas, anos) só aceitam números,
  senão o texto atual fica. O modo revisão (tecla R) lista o que veio da planilha e avisa textos longos.
*/
window.TextosPlanilha = (() => {
  const R = window.ROTEIRO;
  const estado = { origem: "roteiro", quando: "", aplicados: [], ignorados: [] };

  // CSV com aspas, "" escapado e quebras de linha dentro das células
  function lerCsv(texto) {
    const linhas = []; let linha = [], campo = "", aspas = false;
    for (let i = 0; i < texto.length; i++) {
      const c = texto[i];
      if (aspas) {
        if (c === '"') { if (texto[i + 1] === '"') { campo += '"'; i++; } else aspas = false; }
        else campo += c;
      } else if (c === '"') aspas = true;
      else if (c === ",") { linha.push(campo); campo = ""; }
      else if (c === "\n" || c === "\r") {
        if (c === "\r" && texto[i + 1] === "\n") i++;
        linha.push(campo); linhas.push(linha); linha = []; campo = "";
      } else campo += c;
    }
    if (campo || linha.length) { linha.push(campo); linhas.push(linha); }
    return linhas;
  }
  const norma = s => String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "").trim().toUpperCase();

  // pares { chave, novo } a partir do CSV (acha o cabeçalho pelos nomes das colunas)
  function pares(csvTexto) {
    const linhas = lerCsv(csvTexto);
    const ic = linhas.findIndex(l => l.some(c => norma(c).startsWith("CODIGO")) && l.some(c => norma(c) === "TEXTO NOVO"));
    if (ic < 0) throw new Error("planilha sem as colunas TEXTO NOVO e Código");
    const cab = linhas[ic].map(norma), kc = cab.findIndex(c => c.startsWith("CODIGO")), kn = cab.indexOf("TEXTO NOVO");
    return linhas.slice(ic + 1).map(l => ({ chave: (l[kc] || "").trim(), novo: l[kn] || "" })).filter(p => p.chave && p.novo.trim());
  }

  // "tela|blocos.0.titulo" ou "cap:capitulo|titulo" -> { obj, k }
  function localizar(chave) {
    const [dono, caminho] = chave.split("|");
    if (!dono || !caminho) return null;
    let obj;
    if (dono.startsWith("cap:")) obj = R.capitulos.find(c => c.id === dono.slice(4));
    else for (const c of R.capitulos) { obj = c.telas.find(t => t.id === dono); if (obj) break; }
    if (!obj) return null;
    const partes = caminho.split(".");
    for (let i = 0; i < partes.length - 1; i++) { obj = obj[partes[i]]; if (obj == null || typeof obj !== "object") return null; }
    return { obj, k: partes[partes.length - 1] };
  }
  const numerico = v => /^[\d.,]+$/.test(String(v).trim());

  function aplicar(lista) {
    lista.forEach(({ chave, novo }) => {
      const alvo = localizar(chave);
      if (!alvo || typeof alvo.obj[alvo.k] !== "string") { estado.ignorados.push({ chave, motivo: "código não encontrado" }); return; }
      const atual = alvo.obj[alvo.k], texto = novo.replace(/\r\n?/g, "\n").replace(/\\n/g, "\n").trim();
      if (numerico(atual) && !numerico(texto)) { estado.ignorados.push({ chave, motivo: "esperava só números" }); return; }
      if (texto === atual) return;
      alvo.obj[alvo.k] = texto;
      estado.aplicados.push({ chave, de: atual, para: texto });
    });
  }

  // endereços de leitura, em ordem: exportação CSV da aba (crua, sem adivinhar tipos) e, de reserva, a consulta gviz
  function linksCsv(link) {
    const id = (String(link).match(/\/spreadsheets\/d\/([\w-]+)/) || [])[1];
    if (!id) return [link];   // já é um link de CSV
    const gid = (String(link).match(/[#&?]gid=(\d+)/) || [])[1];
    const gviz = `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:csv&headers=0&sheet=${encodeURIComponent("Textos")}`;
    return gid ? [`https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`, gviz] : [gviz];
  }
  async function baixar(url, ms) {
    const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), ms);
    try {
      const resp = await fetch(url + (url.includes("?") ? "&" : "?") + `_=${Date.now()}`, { cache: "no-store", signal: ctrl.signal });
      if (!resp.ok) throw new Error("HTTP " + resp.status);
      return pares(await resp.text());
    } finally { clearTimeout(t); }
  }

  function usarCopia() {
    const c = window.TEXTOS_PLANILHA;
    if (!c || !c.csv) return;
    try { aplicar(pares(c.csv)); estado.origem = "cópia salva"; estado.quando = c.baixadoEm || ""; }
    catch (e) { console.warn("Textos: cópia salva inválida", e); }
  }

  async function carregar() {
    const link = R.config.planilhaTextos;
    const aoVivo = link && /^https?:/.test(location.protocol) && !/[?&]textos=fixos/.test(location.search);
    if (aoVivo) {
      const inicio = Date.now();
      for (const url of linksCsv(link)) {
        try {
          aplicar(await baixar(url, Math.max(800, 4000 - (Date.now() - inicio))));
          estado.origem = "planilha ao vivo"; estado.quando = new Date().toLocaleTimeString("pt-BR");
          return estado;
        } catch (e) { console.warn("Textos: falha ao ler", url, e); }
      }
      console.warn("Textos: planilha ao vivo indisponível, usando a cópia salva.");
    }
    usarCopia();
    return estado;
  }

  const pronto = carregar().catch(e => { console.warn("Textos:", e); return estado; });

  // para o modo revisão: o que mudou nesta tela e se passou do tamanho original
  function daTela(id) {
    return estado.aplicados.filter(a => a.chave.split("|")[0] === id).map(a => {
      const n = [...a.para].length, base = [...a.de].length;
      const lim = numerico(a.de) ? Infinity : base <= 40 ? Math.max(Math.ceil(base * 1.25), base + 6) : Math.ceil(base * 1.15);
      return { ...a, longo: n > lim };
    });
  }

  return { pronto, estado, daTela, pares, lerCsv };
})();
