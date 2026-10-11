/*
  ROTEIRO — fonte única de conteúdo da apresentação AURO Taguatinga.

  Tudo o que aparece na tela sai daqui. Para mudar um texto, número, imagem
  ou a ordem das telas, edite este arquivo; o layout e as animações não precisam ser tocados.
  (Na fase 2, este mesmo formato será editado pelo painel online do cliente.)

  Convenções:
    *trecho*      -> destaque em rosé
    \n            -> quebra de linha
    imagens       -> caminho em assets/img sem extensão (ex.: "auro/fachada-01"),
                     ou "vetores/..." para logos e marcas em SVG
    pendente      -> aparece só no modo revisão (tecla R) e no índice (tecla G)
    divisor:false -> o capítulo não abre com tela de divisor
*/
window.ROTEIRO = {
  meta: {
    projeto: "AURO Taguatinga — Meeting de Lançamento",
    versao: "V1",
    atualizado: "2026-10-10",
    proporcao: "16:9",
    assinatura: "Sua família merece esse próximo passo."
  },

  config: {
    exibirValores: false,              // false = preços aparecem mascarados
    mascaraValor: "R$ XXX.XXX",
    linkMateriais: "",                 // vira QR Code nas telas de campanha e encerramento
    linkCanalOficial: "",
    avisoImagens: "Imagens ilustrativas. Os móveis e adornos de decoração não fazem parte do contrato."
  },

  capitulos: [
    /* ───────────────────────── 01 ───────────────────────── */
    {
      id: "abertura", numero: 1, titulo: "Abertura", subtitulo: "Uma nova oportunidade", apresentador: "Marketing", divisor: false,
      telas: [
        {
          id: "abertura", modelo: "hero",
          folhas: "laterais", destaque: true,
          titulo: "Hoje começa uma\n*nova oportunidade.*",
          notas: "Criar expectativa sem revelar o AURO. Texto fixo; só as imagens se movem."
        }
      ]
    },

    /* ───────────────────────── 02 ───────────────────────── */
    {
      id: "taguatinga", numero: 2, titulo: "Taguatinga", subtitulo: "Uma cidade com *força própria*", apresentador: "Marketing",
      telas: [
        {
          id: "taguatinga-abre", modelo: "sequencia",
          imagens: [
            { img: "cidade/aerea-por-do-sol", legenda: "Taguatinga" },
            { img: "cidade/taguatinga-shopping", legenda: "Comércio" },
            { img: "cidade/viaduto-entardecer", legenda: "Movimento" }
          ],
          intervalo: 5,
          sobretitulo: "Taguatinga",
          titulo: "Uma cidade com\n*força própria.*",
          pendente: "Trocar por fotos reais: vista aérea, comércio, ruas movimentadas, convivência."
        },
        {
          id: "taguatinga-historia", modelo: "numeros",
          fundo: { imagens: ["cidade/viaduto-entardecer"], escurecer: 0.72 },
          sobretitulo: "Desde 5 de junho de 1958",
          itens: [
            { valor: "1958", rotulo: "Fundada antes de Brasília", detalhe: "Nasceu para abrigar os pioneiros que construíram a capital." }
          ],
          notas: "Origem indígena do nome: ta'wa-tinga, 'barro branco'. Plano urbano próprio, nunca foi cidade-dormitório."
        },
        {
          id: "taguatinga-numeros", modelo: "numeros",
          fundo: { imagens: ["cidade/aerea-por-do-sol"], escurecer: 0.78 },
          sobretitulo: "Uma cidade que se basta",
          alinhamento: "centro",
          itens: [
            { valor: "220", prefixo: "+", sufixo: "mil", rotulo: "habitantes" },
            { valor: "50", prefixo: "+", sufixo: "%", rotulo: "da população economicamente ativa\nmora e trabalha na cidade" }
          ],
          pendente: "Validar com a Pollianna: 220 mil hab. (PDAD/IPEDF) e +50% moram e trabalham na cidade."
        },
        {
          id: "taguatinga-vida", modelo: "sequencia",
          imagens: [
            { img: "cidade/taguatinga-shopping", legenda: "Comércio" },
            { img: "cidade/hospital-santa-marta", legenda: "Saúde" },
            { img: "cidade/ceub", legenda: "Educação" },
            { img: "cidade/metro-trem", legenda: "Mobilidade" }
          ],
          intervalo: 4,
          titulo: "Quem mora em Taguatinga\n*consome, trabalha, estuda e vive*\ndentro da própria cidade.",
          pendente: "Fotos reais (Feira, Pistão Sul, avenidas comerciais)."
        }
      ]
    },

    /* ───────────────────────── 03 ───────────────────────── */
    {
      id: "mercado", numero: 3, titulo: "O contexto econômico", subtitulo: "Um momento *favorável*", apresentador: "Marketing",
      telas: [
        {
          id: "mercado-manchetes", modelo: "manchetes",
          titulo: "Um momento\n*favorável.*",
          texto: "O DF vende mais, lança mais e o crédito imobiliário bate recordes.",
          itens: [
            { veiculo: "Correio Braziliense", data: "12/09/2026", manchete: "Venda de imóveis novos encerra primeiro semestre em alta no DF", destaque: "+10% vendas · +108% lançamentos" },
            { veiculo: "BM&C News · Abecip", data: "28/05/2026", manchete: "Crédito imobiliário soma R$ 16,98 bilhões em financiamentos em abril e quebra recorde", destaque: "Melhor abril da série histórica" },
            { veiculo: "Agência CBIC", data: "24/08/2026", manchete: "Vendas de imóveis avançam 5,4% no primeiro semestre e MCMV registra participação recorde", destaque: "226,5 mil unidades vendidas no Brasil" },
            { veiculo: "Correio Braziliense", data: "24/02/2026", manchete: "Mercado imobiliário do DF movimentou R$ 4,85 bilhões e valorizou 8% em 2025", destaque: "m² médio: R$ 14,25 mil (+7,9%)" }
          ],
          notas: "Fontes: correiobraziliense.com.br (12/09/2026 e 24/02/2026), bmcnews.com.br (28/05/2026, dados Abecip), cbic.org.br (24/08/2026). Juros ainda altos são o ponto de atenção citado nas matérias."
        },
        {
          id: "mercado-indicadores", modelo: "numeros",
          sobretitulo: "Indicadores 2026",
          alinhamento: "centro",
          itens: [
            { valor: "10", prefixo: "+", sufixo: "%", rotulo: "vendas de imóveis novos\nno DF no 1º semestre", fonte: "Ademi-DF / Sinduscon-DF, set. 2026" },
            { valor: "108", prefixo: "+", sufixo: "%", rotulo: "lançamentos no DF,\nmaior patamar desde 2023", fonte: "Ademi-DF / Sinduscon-DF, set. 2026" },
            { valor: "17,7", prefixo: "+", sufixo: "%", rotulo: "crédito imobiliário (SBPE)\nde janeiro a abril", fonte: "Abecip, maio 2026" }
          ]
        }
      ]
    },

    /* ───────────────────────── 04 ───────────────────────── */
    {
      id: "oportunidade", numero: 4, titulo: "A oportunidade imobiliária", subtitulo: "Taguatinga e a *demanda reprimida*", apresentador: "Marketing",
      telas: [
        {
          id: "oportunidade-mapa-df", modelo: "mapa",
          base: "svg:df",
          sobretitulo: "Distrito Federal",
          etapas: [
            { legenda: "Distrito Federal" },
            { legenda: "Taguatinga: *no centro*\ndo eixo mais populoso do DF", foco: "#ra-taguatinga", zoom: { escala: 1.75 } }
          ],
          fonte: "Mapa: © OpenStreetMap contributors.",
          pendente: "Validar a frase de centralidade."
        },
        {
          id: "oportunidade-escassez", modelo: "numeros",
          fundo: { imagens: ["cidade/aerea-por-do-sol"], escurecer: 0.8 },
          sobretitulo: "Demanda reprimida",
          itens: [
            { valor: "10", prefixo: "+", sufixo: "anos", rotulo: "sem lançamentos na área\nde primeira influência" }
          ],
          texto: "Filhos de famílias tradicionais de Taguatinga foram morar em Águas Claras e Samambaia porque *não havia produto novo* na cidade natal.",
          pendente: "Validar recorte geográfico e período do '+10 anos'. Incluir histórico de vendas da Temazec na região, se houver."
        },
        {
          id: "oportunidade-zoom", modelo: "mapa",
          base: "svg:taguatinga",
          sobretitulo: "Taguatinga",
          etapas: [
            { legenda: "Taguatinga", foco: "#ra-taguatinga" },
            { legenda: "Taguatinga Sul: um setor *consolidado*,\nentre a cidade e o parque", desenhar: ".metro", mostrar: ".estacoes, #pino-terreno", zoom: { alvo: "#pino-terreno", escala: 1.4 } }
          ],
          fonte: "Mapa: © OpenStreetMap contributors.",
          notas: "Pin = lote (link do Google Maps), na margem do Parque Saburo Onoyama (sem marca, antes do vídeo)."
        }
      ]
    },

    /* ───────────────────────── 05 ───────────────────────── */
    {
      id: "regiao", numero: 5, titulo: "A região", subtitulo: "Conexões e *conveniência*", apresentador: "Marketing",
      telas: [
        {
          id: "regiao-vias", modelo: "mapa",
          base: "camadas:taguatinga",
          ocultar: [26, 28],
          pulsar: [23],
          legendaLado: "direita",
          etapas: [
            { legenda: "Tudo o que importa\n*a poucos minutos*" },
            { legenda: "Metrô, comércio, escolas\ne o *parque ao lado*", mostrar: ".p23", zoom: { x: 61, y: 64, escala: 1.3 } }
          ],
          fonte: "Mapa ilustrativo.",
          notas: "Mapa do designer (mapa taguantinga auro.ai): fundo ampliado 4x no Magnific, etiquetas animadas uma a uma. Para atualizar: ferramentas/camadas_mapas.py.",
        },
        {
          id: "regiao-entorno", modelo: "lista",
          sobretitulo: "A região",
          titulo: "Tudo ao seu redor",
          categorias: [
            { nome: "Mobilidade", img: "cidade/estacao-taguatinga", itens: [["Estação Taguatinga Sul", "4 min"], ["Pistão Sul", "3 min"], ["Av. Samdu Sul", "3 min"], ["Praça do Relógio", "11 min"]] },
            { nome: "Educação", img: "cidade/leonardo-da-vinci", itens: [["Escola Classe", "1 min"], ["Escola infantil", "3 min"], ["C. E. Leonardo da Vinci", "5 min"], ["Universidade CEUB", "6 min"], ["Univ. Católica", "12 min"]] },
            { nome: "Saúde", img: "cidade/hospital-santa-marta", itens: [["Drogaria Martini", "3 min"], ["Hospital Santa Marta", "7 min"], ["Hospital Santa Lúcia", "9 min"]] },
            { nome: "Compras", img: "cidade/taguatinga-shopping", itens: [["Supermercado Ideal", "3 min"], ["Assaí Atacadista", "7 min"], ["Taguatinga Shopping", "8 min"], ["Alameda Shopping", "9 min"]] },
            { nome: "Lazer", img: "cidade/parque-passarela", itens: [["Parque Ecológico", "3 min"], ["Ironberg Brasília", "6 min"]] }
          ],
          fonte: "Tempos do caderno técnico AURO."
        },
        {
          id: "regiao-metro", modelo: "mapa",
          base: "camadas:metro",
          etapas: [
            { legenda: "Do endereço ao metrô" },
            { legenda: "Estação *Taguatinga Sul*", desenhar: "#rota", mostrar: ".p00" }
          ],
          fonte: "Mapa ilustrativo.",
          notas: "Mapa do designer (mapa metro.ai): fundo ampliado 4x no Magnific; a rota é desenhada e o cartão 8 min / 600 m entra depois.",
        }
      ]
    },

    /* ───────────────────────── 06 ───────────────────────── */
    {
      id: "verde", numero: 6, titulo: "O valor do verde", subtitulo: "A cidade por perto. *O verde também.*", apresentador: "Marketing",
      telas: [
        {
          id: "verde-abre", modelo: "hero",
          fundo: { video: "verde-sensorial.mp4", imagens: ["cidade/parque-passarela"] },
          titulo: "A cidade por perto.\n*O verde também.*",
          pendente: "Vídeo IA sensorial (plano fechado, folhas, luz, balanço). Salvar como assets/video/verde-sensorial.mp4."
        },
        {
          id: "verde-parque", modelo: "painel",
          img: "cidade/parque-passarela",
          sobretitulo: "Parque Ecológico Saburo Onoyama",
          titulo: "O antigo\n*“Vai Quem Quer”*",
          texto: "Mata nativa, nascentes e clima mais fresco. Um refúgio verde dentro da cidade, na memória afetiva de Taguatinga Sul.",
          pendente: "Fotos reais do parque (ou IA a partir de referência real)."
        },
        {
          id: "verde-valorizacao", modelo: "numeros",
          fundo: { imagens: ["cidade/parque-passarela"], escurecer: 0.82 },
          sobretitulo: "Verde também é valorização",
          layout: "destaque", destaques: 1,
          itens: [
            { valor: "12", sufixo: "%", rotulo: "acima do valor de mercado para imóveis\na até 200 m do Parque Ecológico de Águas Claras", fonte: "Instituto Brasília Ambiental, via Correio Braziliense (23/02/2024)" },
            { valor: "8 a 20", sufixo: "%", rotulo: "de valorização para imóveis vizinhos\na parques naturais (estudos internacionais)", fonte: "Crompton (2001), compilado por Univ. of Washington — Green Cities: Good Health" }
          ],
          notas: "A nota da TMZC fala em 20–30%, mas não há fonte sólida para esse intervalo. A notícia AutImob (Goiânia, 20–23% de frente para parques) não teve a fonte confirmada; usar só se validada.",
          pendente: "Validar com a Pollianna qual dado usar."
        }
      ]
    },

    /* ───────────────────────── 07 ───────────────────────── */
    {
      id: "realizacao", numero: 7, titulo: "Quem realiza", subtitulo: "Solidez para *esse lançamento*", apresentador: "Marketing",
      telas: [
        {
          id: "realizacao-grupo", modelo: "grupo",
          sobretitulo: "Quem realiza",
          logo: "vetores/marcas/grupo-atyva-branco",
          empresas: [
            { img: "vetores/marcas/antares-branco", anos: "38" },
            { img: "vetores/marcas/temazec-grupo-branco", anos: "16" },
            { img: "vetores/marcas/yuta-branco", anos: "6" },
            { img: "vetores/marcas/vnc-branco", anos: "3" },
            { img: "vetores/marcas/arqo-branco", anos: "2" }
          ],
          itens: [
            { valor: "16", palavra: "Anos", rotulo: "de mercado imobiliário" },
            { valor: "18", palavra: "Empreendimentos", rotulo: "entregues com sucesso" },
            { valor: "30", prefixo: "+", palavra: "Projetos", rotulo: "em desenvolvimento" },
            { valor: "1.100", prefixo: "+", palavra: "Unidades", rotulo: "em construção em 2026" }
          ],
          pendente: "Divergência: caderno diz +30 projetos, institucional diz +40. Números da Temazec."
        },
        {
          id: "realizacao-parceiros", modelo: "realizacao",
          sobretitulo: "Realização",
          logos: [
            { img: "vetores/marcas/temazec-branco", rotulo: "Construção e incorporação" },
            { img: "vetores/marcas/soberana-branco", rotulo: "Participação" },
            { img: "vetores/marcas/caixa-branco", rotulo: "Financiamento" }
          ]
        }
      ]
    },

    /* ───────────────────────── 08 ───────────────────────── */
    {
      id: "video", numero: 8, titulo: "Vídeo conceito", subtitulo: "O ápice", apresentador: "Marketing", divisor: false,
      telas: [
        {
          id: "video-conceito", modelo: "video",
          src: "video-conceito.mp4",
          som: true,
          pendente: "Vídeo conceito (cliente envia). Salvar como assets/video/video-conceito.mp4. Testar áudio no local."
        }
      ]
    },

    /* ───────────────────────── 09 ───────────────────────── */
    {
      id: "auro", numero: 9, titulo: "AURO", logo: true, subtitulo: "A cidade de um lado. A natureza do outro.\n*Sua vida no centro de tudo.*", apresentador: "Marketing",
      telas: [
        { id: "auro-aerea", modelo: "galeria", img: "auro/implantacao-entrada", aviso: "Imagem gerada por IA, meramente ilustrativa." },
        { id: "auro-fachada-01", modelo: "galeria", img: "auro/fachada-01", rotulo: "Fachada", frase: "Um projeto contemporâneo\n*sem abrir mão de qualidade de vida.*" },
        { id: "auro-fachada-02", modelo: "galeria", img: "auro/fachada-02", rotulo: "Arquitetura", frase: "Arquitetura que *valoriza*\ncada detalhe." },
        { id: "auro-fachada-03", modelo: "galeria", img: "auro/fachada-03", rotulo: "Fachada", frase: "*Viver bem.*" },
        { id: "auro-voo", modelo: "galeria", img: "auro/voo-de-passaro", rotulo: "Lazer em varanda elevada", frase: "Mais verde no horizonte.\n*Mais espaço para respirar.*" },
        { id: "auro-piscina", modelo: "galeria", img: "lazer/piscina", rotulo: "Piscina de borda infinita", frase: "Com *vista para o parque.*" },
        { id: "auro-varanda", modelo: "galeria", img: "lazer/varanda-elevada-01", rotulo: "Lazer em varanda elevada", frase: "O verde *como horizonte.*" }
      ]
    },

    /* ───────────────────────── 10 ───────────────────────── */
    {
      id: "produto", numero: 10, titulo: "O produto", subtitulo: "Números e *tipologias*", apresentador: "Marketing",
      telas: [
        {
          id: "produto-tipologia", modelo: "tipologia",
          metragem: "de 48 a 63,50 m²",
          cobertura: "110 m²",
          rotuloCobertura: "Penthouse",
          selo: "Com suíte e varanda*",
          apoio: "*Ambientes integrados* pensados para uma rotina\nmais funcional e maior valorização de cada m²",
          aviso: "*Confira as unidades com varanda."
        },
        {
          id: "produto-numeros", modelo: "numeros",
          fundo: { imagens: ["auro/fachada-02"], escurecer: 0.8 },
          sobretitulo: "AURO em números",
          layout: "destaque", destaques: 3,
          itens: [
            { valor: "96", rotulo: "apartamentos" },
            { valor: "2 e 3", rotulo: "quartos com suíte" },
            { valor: "48 a 63,50", sufixo: "m²", rotulo: "privativos" },
            { valor: "110", sufixo: "m²", rotulo: "penthouses" },
            { valor: "1", rotulo: "torre" },
            { valor: "10", rotulo: "pavimentos + térreo\n+ subsolo" },
            { valor: "2", rotulo: "elevadores" },
            { valor: "3.000", sufixo: "m²", rotulo: "de terreno" }
          ],
          pendente: "Confirmar vagas de garagem para incluir."
        }
      ]
    },

    /* ───────────────────────── 11 ───────────────────────── */
    {
      id: "lazer", numero: 11, titulo: "Lazer e experiência", subtitulo: "Mais de *30 itens* para viver bem", apresentador: "Marketing",
      telas: [
        { id: "lazer-lobby-01", modelo: "galeria", grupo: "Chegar", img: "lazer/lobby-01", rotulo: "Lobby", frase: "Chegar bem\n*começa antes de entrar em casa.*", credito: "Arquitetura e interiores: Liê Arquitetas" },
        { id: "lazer-lobby-02", modelo: "galeria", grupo: "Chegar", img: "lazer/lobby-02", rotulo: "Lobby" },

        { id: "lazer-piscina-borda", modelo: "galeria", grupo: "Respirar", img: "lazer/piscina-borda-01", rotulo: "Piscina de borda infinita", frase: "Um pouco de *férias*\nno meio da semana." },
        { id: "lazer-varanda", modelo: "galeria", grupo: "Respirar", img: "lazer/varanda-elevada-02", rotulo: "Lazer em varanda elevada" },
        { id: "lazer-firepit", modelo: "galeria", grupo: "Respirar", img: "lazer/lounge-firepit", rotulo: "Lounge externo e fire pit" },
        { id: "lazer-praca", modelo: "galeria", grupo: "Respirar", img: "lazer/praca-convivencia", rotulo: "Praça de convivência", frase: "Um refúgio urbano para\n*aproveitar melhor o tempo.*" },

        { id: "lazer-gourmet", modelo: "galeria", grupo: "Conviver", img: "lazer/espaco-gourmet", rotulo: "Espaço gourmet", frase: "As melhores histórias são contadas\n*ao redor de uma mesa.*" },
        { id: "lazer-gourmet-estar", modelo: "galeria", grupo: "Conviver", img: "lazer/estar-gourmet", rotulo: "Espaço gourmet" },
        { id: "lazer-churrasqueira", modelo: "galeria", grupo: "Conviver", img: "lazer/churrasqueira", rotulo: "Churrasqueira" },
        { id: "lazer-festas", modelo: "galeria", grupo: "Conviver", img: "lazer/salao-festas", rotulo: "Salão de festas", frase: "Para comemorar o agora\n*e tudo que ainda vem pela frente.*" },
        { id: "lazer-jogos", modelo: "galeria", grupo: "Conviver", img: "lazer/salao-jogos", rotulo: "Salão de jogos" },

        { id: "lazer-academia", modelo: "galeria", grupo: "Cuidar", img: "lazer/academia", rotulo: "Academia", frase: "*Corpo* em movimento.\n*Mente* em equilíbrio." },
        { id: "lazer-quadra", modelo: "galeria", grupo: "Cuidar", img: "lazer/miniquadra", rotulo: "Miniquadra poliesportiva" },
        { id: "lazer-playground", modelo: "galeria", grupo: "Cuidar", img: "lazer/playground", rotulo: "Playground" },
        { id: "lazer-pet", modelo: "galeria", grupo: "Cuidar", img: "lazer/pet-place", rotulo: "Pet place", frase: "Vai fazer parte\n*da sua rotina.*" },

        { id: "lazer-coworking", modelo: "galeria", grupo: "Trabalhar", img: "lazer/coworking-01", rotulo: "Coworking / Office" },
        { id: "lazer-podcast", modelo: "galeria", grupo: "Trabalhar", img: "lazer/podcast-lab", rotulo: "Podcast lab" },

        { id: "lazer-minimercado", modelo: "galeria", grupo: "Ganhar tempo", img: "lazer/minimercado", rotulo: "Minimercado", frase: "Comodidades para\n*facilitar o seu dia a dia.*" },
        { id: "lazer-delivery", modelo: "galeria", grupo: "Ganhar tempo", img: "lazer/delivery", rotulo: "Delivery e smart locker" },
        { id: "lazer-bike", modelo: "galeria", grupo: "Ganhar tempo", img: "lazer/bicicletario", rotulo: "Bicicletário com bike stop e wash" },
        { id: "lazer-eletrico", modelo: "galeria", grupo: "Ganhar tempo", img: "lazer/vaga-carro-eletrico", rotulo: "Recarga para carro elétrico", frase: "O *futuro* também\nprecisa de uma vaga." },

        {
          id: "lazer-total", modelo: "numeros",
          fundo: { imagens: ["plantas/implantacao-terreo"], escurecer: 0.86 },
          itens: [{ valor: "30", prefixo: "+", rotulo: "itens de lazer e segurança" }],
          fonte: "Relação do caderno técnico (31 itens na implantação)."
        }
      ]
    },

    /* ───────────────────────── 12 ───────────────────────── */
    {
      id: "plantas", numero: 12, titulo: "Plantas", subtitulo: "2 e 3 quartos *com suíte*", apresentador: "Marketing",
      telas: [
        { id: "planta-tipo-1", modelo: "planta", img: "plantas/tipo-1", tipo: "Tipo 1", quartos: "2", suite: true, varanda: false, area: "51,30 m²", unidades: "101 a 901 · 106 a 906 · 1001 e 1004" },
        { id: "planta-tipo-2", modelo: "planta", img: "plantas/tipo-2", tipo: "Tipo 2", quartos: "2", suite: true, varanda: true, area: "48,74 a 49,13 m²", unidades: "102 a 902 · 105 a 905 · 107 a 907 · 110 a 910" },
        { id: "planta-tipo-3", modelo: "planta", img: "plantas/tipo-3", tipo: "Tipo 3", quartos: "3", suite: true, varanda: true, area: "63,50 m²", unidades: "103 a 903 · 104 a 904 · 108 a 908 · 109 a 909" },
        { id: "planta-tipo-4", modelo: "planta", img: "plantas/tipo-4-cobertura", tipo: "Tipo 4 · Cobertura", quartos: "3", suite: true, varanda: true, area: "110 m²", unidades: "1002 · 1003 · 1005 · 1006", pendente: "Confirmar se a cobertura tem varanda/terraço." },

        { id: "interior-sala-cozinha", modelo: "galeria", img: "interiores/sala-cozinha", rotulo: "Sala com cozinha integrada", frase: "Ambientes integrados\npara uma rotina *mais funcional.*" },
        { id: "interior-sala-tv", modelo: "galeria", img: "interiores/sala-tv", rotulo: "Sala" },
        { id: "interior-jantar", modelo: "galeria", img: "interiores/sala-jantar", rotulo: "Sala de jantar" },
        { id: "interior-cozinha", modelo: "galeria", img: "interiores/cozinha", rotulo: "Cozinha" },
        { id: "interior-quarto", modelo: "galeria", img: "interiores/quarto-01", rotulo: "Quarto" },
        { id: "interior-suite", modelo: "galeria", img: "interiores/suite", rotulo: "Suíte" },
        { id: "interior-banheiro", modelo: "galeria", img: "interiores/banheiro-suite", rotulo: "Banheiro da suíte" }
      ]
    },

    /* ───────────────────────── 13 ───────────────────────── */
    {
      id: "publico", numero: 13, titulo: "Para quem é o AURO", subtitulo: "Diferenciais e *argumentos*", apresentador: "Marketing",
      telas: [
        {
          id: "publico-rostos", modelo: "rostos",
          titulo: "Para quem\né o *AURO*",
          pessoas: [
            { img: "pessoas/perfil-familias", perfil: "Famílias", pos: "52% 50%" },
            { img: "pessoas/perfil-casais", perfil: "Casais", pos: "52% 40%" },
            { img: "pessoas/perfil-singles", perfil: "Singles", pos: "44% 40%" },
            { img: "pessoas/perfil-upgrade", perfil: "Upgrade", pos: "50% 50%" },
            { img: "pessoas/perfil-novos-comecos", perfil: "Novos começos", pos: "58% 40%" },
            { img: "pessoas/perfil-filhos-taguatinga", perfil: "Filhos de Taguatinga", pos: "50% 60%" },
            { img: "pessoas/perfil-investidores", perfil: "Investidores", pos: "48% 30%" }
          ],
          notas: "Fotos do banco Magnific (originais em FOTOS MAGNIFIC/)."
        },
        {
          id: "publico-diferenciais", modelo: "icones",
          titulo: "Detalhes que fazem\n*toda a diferença*",
          itens: [
            { icone: "fachada-contemporanea", texto: "Fachada contemporânea", sub: "com esquadrias anodizadas em preto fosco" },
            { icone: "varandas-privativas", texto: "Varandas privativas" },
            { icone: "projeto-arquitetonico", texto: "Arquitetura e interiores", sub: "Liê Arquitetas" },
            { icone: "piso-laminado", texto: "Piso laminado" },
            { icone: "paisagismo", texto: "Paisagismo exuberante" },
            { icone: "ar-condicionado", texto: "Infraestrutura para ar-condicionado" },
            { icone: "lazer-completo", texto: "Lazer completo", sub: "conceito home club" },
            { icone: "iluminacao-ventilacao", texto: "Iluminação e ventilação natural" },
            { icone: "mobilidade-urbana", texto: "Mobilidade urbana" },
            { icone: "acessibilidade", texto: "Acessibilidade de ponta a ponta" },
            { icone: "eficiencia-sustentabilidade", texto: "Eficiência e sustentabilidade" },
            { icone: "seguranca-tecnologia", texto: "Segurança e tecnologia" }
          ]
        },
        {
          id: "publico-argumentos", modelo: "argumentos",
          fundo: { imagens: ["auro/fachada-03"] },
          itens: [
            { palavra: "Localização", texto: "Metrô a 600 m · Pistão Sul a 3 min" },
            { palavra: "Verde", texto: "À margem do Parque Ecológico" },
            { palavra: "Lazer", texto: "+30 itens, piscina de borda infinita" },
            { palavra: "Oportunidade", texto: "Produto novo, pouca oferta na região" }
          ],
          fechamento: "Por que *não*\ncomprar o AURO?",
          pendente: "Validar argumentos de escassez/valorização antes de apresentar como fato.",
          notas: "Os argumentos entram sozinhos. Um clique abre a pergunta final; é a última fala do Marketing antes do Comercial."
        }
      ]
    },

    /* ───────────────────────── 14 ───────────────────────── */
    {
      id: "condicoes", numero: 14, titulo: "Condições comerciais", subtitulo: "Como transformar *interesse em venda*", apresentador: "Comercial",
      telas: [
        {
          id: "condicoes-preco", modelo: "numeros",
          fundo: { imagens: ["auro/fachada-01"], escurecer: 0.84 },
          sobretitulo: "Condições de lançamento",
          layout: "destaque", destaques: 1,
          itens: [
            { valor: "399.900", prefixo: "R$", rotulo: "a partir de", preco: true },
            { valor: "20", prefixo: "R$", sufixo: "mil", rotulo: "entrada a partir de", preco: true }
          ],
          aviso: "[Rodapé legal: condições sujeitas a análise de crédito e disponibilidade.]",
          pendente: "Valores mascarados (config.exibirValores). Confirmar valores, taxas e rodapé legal."
        },
        {
          id: "condicoes-financiamento", modelo: "numeros",
          fundo: { imagens: ["auro/fachada-02"], escurecer: 0.86 },
          sobretitulo: "Financiamento",
          alinhamento: "centro",
          itens: [
            { valor: "420", sufixo: "meses", rotulo: "de prazo" },
            { valor: "95", sufixo: "%", rotulo: "do saldo financiado" }
          ],
          aviso: "[Rodapé legal.]",
          pendente: "Confirmar prazo e percentual."
        },
        {
          id: "condicoes-especial", modelo: "hero",
          sobretitulo: "Exclusivo para o meeting",
          titulo: "*[Condição especial]*",
          pendente: "Condição especial do meeting (se houver). Se não houver, remover esta tela."
        }
      ]
    },

    /* ───────────────────────── 15 ───────────────────────── */
    {
      id: "campanha", numero: 15, titulo: "Plano de ação", subtitulo: "Campanha e *cronograma*", apresentador: "Comercial",
      telas: [
        {
          id: "campanha-moto", modelo: "campanha",
          img: "",
          sobretitulo: "Campanha de incentivo",
          titulo: "Venda e concorra\na *uma moto.*",
          itens: ["[Regra 1: meta]", "[Regra 2: ranking]", "[Regra 3: período]"],
          qr: "linkMateriais",
          qrLegenda: "Materiais e regulamento",
          pendente: "Imagem da moto, regras, metas e link do QR Code."
        },
        {
          id: "campanha-cronograma", modelo: "linha-do-tempo",
          titulo: "Próximos passos",
          etapas: [
            { nome: "Meeting", data: "hoje" },
            { nome: "Aquecimento", data: "[data]" },
            { nome: "Captação", data: "[data]" },
            { nome: "Pré-lançamento", data: "[data]" },
            { nome: "Evento", data: "[data]" },
            { nome: "Lançamento", data: "[data]" },
            { nome: "Sustentação", data: "[data]" }
          ],
          atual: 0,
          qr: "linkMateriais",
          pendente: "Datas do cronograma e link do QR Code."
        }
      ]
    },

    /* ───────────────────────── 16 ───────────────────────── */
    {
      id: "encerramento", numero: 16, titulo: "A oportunidade começa agora", subtitulo: "", apresentador: "Comercial", divisor: false,
      telas: [
        {
          id: "encerramento", modelo: "encerramento",
          fundo: { imagens: ["auro/fachada-01"] },
          titulo: "A oportunidade\n*começa agora.*",
          assinatura: "Sua família merece esse próximo passo.",
          qr: "linkMateriais",
          qrLegenda: "Tabela e materiais",
          pendente: "Link do QR Code (testar leitura no telão)."
        }
      ]
    }
  ]
};
