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
          id: "espera", modelo: "flores",
          notas: "Tela de espera: fica no ar como fundo do show (Melhores do Mundo). Os ramos brotam e revelam o logo; depois o logo respira devagar sem parar."
        },
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
          id: "taguatinga-abre", modelo: "hero",
          fundo: { imagens: ["cidade/viaduto-entardecer"], escurecer: .5 },
          sobretitulo: "Taguatinga",
          titulo: "Uma cidade com\n*força própria.*"
        },
        {
          id: "taguatinga-historia", modelo: "numeros",
          fundo: { imagens: ["cidade/historica-aerea"], escurecer: 0.62 },
          sobretitulo: "Desde 5 de junho de 1958",
          aviso: "Foto histórica de Taguatinga.",
          itens: [
            { valor: "1958", rotulo: "Fundada antes de Brasília", detalhe: "Nasceu para abrigar os pioneiros que construíram a capital." }
          ],
          notas: "Origem indígena do nome: ta'wa-tinga, 'barro branco'. Plano urbano próprio, nunca foi cidade-dormitório."
        },
        {
          id: "taguatinga-numeros", modelo: "numeros",
          fundo: { imagens: ["cidade/praca-relogio"], escurecer: 0.74 },
          sobretitulo: "Uma cidade que se basta",
          alinhamento: "centro",
          itens: [
            { valor: "220", prefixo: "+", sufixo: "mil", rotulo: "habitantes" },
            { valor: "50", prefixo: "+", sufixo: "%", rotulo: "da população economicamente ativa\nmora e trabalha na cidade" }
          ],
          fonte: "Fontes: IBGE (habitantes) · matéria enviada pela TMZC (+50% moram e trabalham na cidade).",
          pendente: "Confirmar a fonte do 220 mil (IBGE) e o nome/data da matéria dos 50% (Pollianna)."
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
          pendente: "Cliente pediu uma foto que valorize mais o Taguatinga Shopping (enviar a foto; hoje é o detalhe da fachada com palmeira)."
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
          id: "mercado-intencao", modelo: "grafico", tipo: "linha",
          sobretitulo: "Intenção de compra",
          titulo: "A intenção de compra de imóveis\n*no maior nível da série*",
          nota: "*52%* em jun/26, a máxima histórica: 3 pontos acima do mesmo período de 2025.",
          serie: [["2019", 43], ["2020", 46], ["Mai/21", 42], ["Set/21", 39], ["Nov/21", 37], ["Fev/22", 38], ["Mai/22", 35], ["Set/22", 33], ["Nov/22", 31],
            ["Fev/23", 35], ["Jun/23", 37], ["Ago/23", 39], ["Nov/23", 37], ["Mar/24", 41], ["Jun/24", 48], ["Set/24", 46], ["Nov/24", 45], ["Mar/25", 44],
            ["Jun/25", 49], ["Set/25", 48], ["Nov/25", 50], ["Mar/26", 49], ["Jun/26", 52]],
          destaques: [0, 8, 14, 22], media: 43, margem: 2, escala: [26, 56],
          fonte: "Brain Inteligência Estratégica. Margem de erro de ±2 pontos percentuais."
        },
        {
          id: "mercado-motivacoes", modelo: "grafico", tipo: "barras",
          sobretitulo: "Motivações para compra",
          titulo: "Por que as pessoas\n*compram imóvel*",
          grupos: [
            { nome: "Transição", total: 64, itens: [["Sair do aluguel", 37], ["Sair da casa dos pais", 15], ["Mudança de localidade", 9], ["Casamento", 2], ["Separação", 1]] },
            { nome: "Upgrade", total: 20, itens: [["Mais espaço", 14], ["Mais benefícios", 3], ["Imóvel mais novo", 3]] },
            { nome: "Investimento", total: 13, itens: [["Locação", 12], ["Revenda", 1]] },
            { nome: "Outros", total: 3, itens: [["Imóvel para familiar", 2], ["Residência menor", 1]] }
          ],
          fonte: "Brain Inteligência Estratégica."
        },
        {
          id: "mercado-indicadores", modelo: "numeros",
          sobretitulo: "Indicadores 2026",
          alinhamento: "centro",
          itens: [
            { valor: "10", prefixo: "+", sufixo: "%", rotulo: "vendas de imóveis novos\nno DF no 1º semestre", fonte: "Ademi-DF / Sinduscon-DF, set. 2026" },
            { valor: "108", prefixo: "+", sufixo: "%", rotulo: "lançamentos no DF,\nmaior patamar desde 2023", fonte: "Ademi-DF / Sinduscon-DF, set. 2026" },
            { valor: "17,7", prefixo: "+", sufixo: "%", rotulo: "crédito imobiliário (SBPE)\nde janeiro a abril", fonte: "Abecip, maio 2026" }
          ],
          notas: "Fontes: +10% vendas e +108% lançamentos no DF no 1º semestre de 2026 — Ademi-DF / Sinduscon-DF (Correio Braziliense, 12/09/2026). +17,7% de crédito SBPE de jan. a abr. — Abecip (maio/2026)."
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
          fundo: { imagens: ["cidade/aerea-entardecer"], escurecer: 0.74 },
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
            { legenda: "", mostrar: ".p23", zoom: { x: 61, y: 64, escala: 1.6 }, imediato: true },
            { legenda: "Tudo o que importa\n*a poucos minutos*", zoom: { escala: 1 } }
          ],
          fonte: "Mapa ilustrativo.",
          notas: "Começa aproximado no AURO e abre para a visão ampla, onde fica (não volta ao detalhe). Mapa do designer; para atualizar: ferramentas/camadas_mapas.py."
        },
        {
          id: "regiao-entorno", modelo: "lista",
          sobretitulo: "A região",
          titulo: "Tudo ao seu redor",
          categorias: [
            { nome: "Mobilidade", img: "cidade/estacao-taguatinga", itens: [["Estação Taguatinga Sul", "4 min"], ["Pistão Sul", "3 min"], ["Av. Samdu Sul", "3 min"], ["Praça do Relógio", "11 min"]] },
            { nome: "Educação", img: "cidade/leonardo-da-vinci", itens: [["Escola Classe", "1 min"], ["Escola infantil", "3 min"], ["C. E. Leonardo da Vinci", "5 min"], ["Universidade CEUB", "6 min"], ["Univ. Católica", "12 min"]] },
            { nome: "Bem-estar", img: "cidade/hospital-santa-marta", itens: [["Drogaria Martini", "3 min"], ["UBS 5 (Taguatinga Sul)", ""], ["Smart Fit", "3 min"], ["Bluefit", "5 min"], ["Ironberg", "6 min"], ["Hospital Santa Marta", "7 min"], ["Hospital Santa Lúcia", "9 min"]] },
            { nome: "Compras", img: "cidade/taguatinga-shopping", itens: [["Supermercado Ideal", "3 min"], ["Assaí Atacadista", "7 min"], ["Taguatinga Shopping", "8 min"], ["Alameda Shopping", "9 min"]] },
            { nome: "Lazer", img: "cidade/parque-trilha", itens: [["Parque Ecológico", "3 min"], ["Feira livre da QSD", ""], ["Taguapark", ""], ["Clube Portuguesa", "10 min"]] }
          ],
          fonte: "Tempos do caderno técnico AURO e da TMZC.",
          pendente: "Foto do Taguatinga Shopping (cliente pediu trocar). Tempos da UBS 5, da Feira da QSD e do Taguapark."
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
          fundo: { video: "verde-sensorial.mp4", imagens: ["cidade/parque-trilha"] },
          titulo: "A cidade por perto.\n*O verde também.*",
          pendente: "Vídeo IA sensorial (plano fechado, folhas, luz, balanço). Salvar como assets/video/verde-sensorial.mp4."
        },
        {
          id: "verde-parque", modelo: "painel",
          img: "cidade/parque-piscina",
          sobretitulo: "Parque Ecológico Saburo Onoyama",
          titulo: "O antigo\n*“Vai Quem Quer”*",
          texto: "Mata nativa, nascentes e clima mais fresco. Um refúgio verde dentro da cidade, na memória afetiva de Taguatinga Sul.",
        },
        {
          id: "verde-valorizacao", modelo: "numeros",
          fundo: { imagens: ["cidade/parque-trilha"], escurecer: 0.8 },
          sobretitulo: "Verde também é valorização",
          layout: "destaque", destaques: 1,
          itens: [
            { valor: "20 a 32", sufixo: "%", rotulo: "de valorização para imóveis\nvizinhos a parques naturais", fonte: "University of Washington — Green Cities: Good Health (Economics). depts.washington.edu/hhwb/Print_Economics.html" }
          ]
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
          logoDados: "vetores/marcas/temazec-verde",
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
          src4k: "video-conceito.4k.mp4",
          som: true,
          notas: "FINALIZADO V3 (1min49). Full HD no site e no ZIP; a versão 4K fica só na pasta do evento. Testar o áudio no local."
        }
      ]
    },

    /* ───────────────────────── 09 ───────────────────────── */
    {
      id: "auro", numero: 9, titulo: "AURO", logo: true, chamadaMenor: true, subtitulo: "A cidade de um lado.\nA natureza do outro.\n*Sua vida no centro de tudo.*", apresentador: "Marketing",
      telas: [
        { id: "auro-aerea", modelo: "galeria", img: "auro/implantacao-entrada", aviso: "Imagem gerada por IA, meramente ilustrativa." },
        { id: "auro-fachada-01", modelo: "galeria", img: "auro/fachada-01", rotulo: "Fachada", frase: "Um projeto contemporâneo\n*sem abrir mão de qualidade de vida.*" },
        { id: "auro-fachada-02", modelo: "galeria", img: "auro/fachada-02", semZoom: true, rotulo: "Fachada", frase: "Arquitetura que *valoriza*\ncada detalhe." },
        { id: "auro-fachada-03", modelo: "galeria", img: "auro/fachada-03", rotulo: "Embasamento", frase: "*Viver bem.*" },
      ]
    },

    /* ───────────────────────── 10 ───────────────────────── */
    {
      id: "produto", numero: 10, titulo: "O produto", subtitulo: "Números e *tipologias*", apresentador: "Marketing",
      telas: [
        {
          id: "produto-tipologia", modelo: "tipologia",
          metragem: "48,7 a 63,5 m² privativos",
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
            { valor: "48,7 a 63,5", sufixo: "m²", rotulo: "privativos" },
            { valor: "110", sufixo: "m²", rotulo: "penthouses" },
            { valor: "1", rotulo: "torre" },
            { valor: "10", rotulo: "pavimentos + térreo\n+ subsolo" },
            { valor: "XXX", sufixo: "m²", rotulo: "de área de lazer" },
            { valor: "3.000", sufixo: "m²", rotulo: "de terreno" }
          ],
          pendente: "Metragem da área de lazer (XXX m²). Confirmar vagas de garagem."
        }
      ]
    },

    /* ───────────────────────── 11 ───────────────────────── */
    {
      id: "lazer", numero: 11, titulo: "Lazer e experiência", subtitulo: "Mais de *30 itens* para viver bem", apresentador: "Marketing",
      telas: [
        { id: "lazer-lobby-01", modelo: "galeria", grupo: "Chegar", img: "lazer/lobby-01", rotulo: "Lobby", frase: "Chegar bem\n*começa antes de entrar em casa.*", credito: "Arquitetura e interiores: Liê Arquitetas" },
        { id: "lazer-lobby-02", modelo: "galeria", grupo: "Chegar", img: "lazer/lobby-02", rotulo: "Lobby" },

        { id: "lazer-podcast", modelo: "galeria", grupo: "Trabalhar", img: "lazer/podcast-lab", rotulo: "Podcast lab" },
        { id: "lazer-coworking", modelo: "galeria", grupo: "Trabalhar", img: "lazer/coworking-01", rotulo: "Coworking / Office" },

        { id: "lazer-jogos", modelo: "galeria", grupo: "Conviver", img: "lazer/salao-jogos", rotulo: "Salão de jogos" },
        { id: "lazer-academia", modelo: "galeria", grupo: "Cuidar", img: "lazer/academia", rotulo: "Academia", frase: "*Corpo* em movimento.\n*Mente* em equilíbrio." },
        { id: "lazer-gourmet", modelo: "galeria", grupo: "Conviver", img: "lazer/espaco-gourmet", rotulo: "Espaço gourmet", frase: "As melhores histórias são contadas\n*ao redor de uma mesa.*" },
        { id: "lazer-festas", modelo: "galeria", grupo: "Conviver", img: "lazer/salao-festas", rotulo: "Salão de festas", frase: "Para comemorar o agora\n*e tudo que ainda vem pela frente.*" },

        { id: "lazer-varanda", modelo: "galeria", grupo: "Respirar", img: "auro/voo-de-passaro", rotulo: "Área de lazer em varanda elevada", frase: "Mais verde no horizonte.\n*Mais espaço para respirar.*" },
        { id: "lazer-piscina-borda", modelo: "galeria", grupo: "Respirar", img: "lazer/piscina", semZoom: true, rotulo: "Piscina com borda infinita", frase: "Um pouco de *férias*\nno meio da semana." },
        { id: "lazer-firepit", modelo: "galeria", grupo: "Respirar", img: "lazer/praca-convivencia", semZoom: true, rotulo: "Lounge externo e fire pit", frase: "Um refúgio urbano para\n*aproveitar melhor o tempo.*" },

        { id: "lazer-quadra", modelo: "galeria", grupo: "Brincar", img: "lazer/miniquadra", rotulo: "Miniquadra poliesportiva" },
        { id: "lazer-churrasqueira", modelo: "galeria", grupo: "Conviver", img: "lazer/churrasqueira", rotulo: "Churrasqueira" },
        { id: "lazer-playground", modelo: "galeria", grupo: "Brincar", img: "lazer/playground", rotulo: "Playground" },

        { id: "lazer-minimercado", modelo: "galeria", grupo: "Conveniência e serviço", img: "lazer/minimercado", rotulo: "Mini market", frase: "Comodidades para\n*facilitar o seu dia a dia.*" },
        { id: "lazer-delivery", modelo: "galeria", grupo: "Conveniência e serviço", img: "lazer/delivery", rotulo: "Delivery e smart locker" },
        { id: "lazer-bike", modelo: "galeria", grupo: "Conveniência e serviço", img: "lazer/bicicletario", rotulo: "Bicicletário com bike stop e wash" },
        { id: "lazer-eletrico", modelo: "galeria", grupo: "Conveniência e serviço", img: "lazer/vaga-carro-eletrico", rotulo: "Recarga para carro elétrico", frase: "O *futuro* também\nprecisa de uma vaga." },
        { id: "lazer-pet", modelo: "galeria", grupo: "Conveniência e serviço", img: "lazer/pet-place", rotulo: "Pet place", frase: "Vai fazer parte\n*da sua rotina.*" },

        {
          id: "lazer-total", modelo: "itens",
          numero: { valor: "30", prefixo: "+", rotulo: "itens de lazer,\ncomodidade e segurança" },
          titulo: "Espaços que acolhem\ntodos os momentos da vida",
          itens: ["Piscina com borda infinita", "Deck molhado", "Deck seco", "Sunset Lounge", "Miniquadra Poliesportiva", "Pool Lounge",
            "Bicicletário com Bike Stop | Wash", "Churrasqueira", "Firepit", "Playground",
            "Vagas para Carro Elétrico", "Banheiros PCD - Masc. e Fem.", "Mini Market", "Espaço Gourmet", "Salão de festas", "Academia",
            "Sala de Jogos", "Elevadores", "Lixeira", "Lobby",
            "Office / Coworking / Podcast Lab", "Área técnica", "Smart Locker", "Banheiro funcionários", "Guarita / Delivery",
            "Central GLP", "Pet Place", "Uber Stop", "Lixeira - Coleta Seletiva", "Escada de emergência", "Entrada e saída de veículos"],
          notas: "Nomes do book atualizado. O +30 entra no centro e vai para a esquerda enquanto a lista (31 itens da implantação) aparece à direita."
        }
      ]
    },

    /* ───────────────────────── 12 ───────────────────────── */
    {
      id: "plantas", numero: 12, titulo: "Espaço para a vida acontecer do seu jeito", subtitulo: "2 e 3 quartos *com suíte*", apresentador: "Marketing",
      telas: [
        { id: "interior-sala-cozinha", modelo: "galeria", img: "interiores/sala-cozinha", rotulo: "Sala com cozinha integrada", frase: "Ambientes integrados\npara uma rotina *mais funcional.*" },
        { id: "interior-sala-tv", modelo: "galeria", img: "interiores/sala-tv", rotulo: "Sala" },
        { id: "interior-jantar", modelo: "galeria", img: "interiores/sala-jantar", rotulo: "Sala de jantar" },
        { id: "interior-cozinha", modelo: "galeria", img: "interiores/cozinha", rotulo: "Cozinha" },
        { id: "interior-quarto", modelo: "galeria", img: "interiores/quarto-01", rotulo: "Quarto" },
        { id: "interior-suite", modelo: "galeria", img: "interiores/suite", rotulo: "Suíte" },
        { id: "interior-banheiro", modelo: "galeria", img: "interiores/banheiro-suite", rotulo: "Banheiro da suíte" },

        { id: "planta-tipo-1", modelo: "planta", img: "plantas/tipo-1", chave: "plantas/chave-1", tipo: "Planta tipo 1", quartos: "2", suite: true, varanda: false, area: "51,30 m²", unidades: "101 a 901 · 106 a 906 · 1001 e 1004" },
        { id: "planta-tipo-2", modelo: "planta", img: "plantas/tipo-2", chave: "plantas/chave-2", tipo: "Planta tipo 2", quartos: "2", suite: true, varanda: true, area: "48,74 a 49,13 m²", unidades: "102 a 902 · 105 a 905 · 107 a 907 · 110 a 910" },
        { id: "planta-tipo-3", modelo: "planta", img: "plantas/tipo-3", chave: "plantas/chave-3", tipo: "Planta tipo 3", quartos: "3", suite: true, varanda: true, area: "63,50 m²", unidades: "103 a 903 · 104 a 904 · 108 a 908 · 109 a 909" },
        { id: "planta-tipo-4", modelo: "planta", img: "plantas/tipo-4", chave: "plantas/chave-4", tipo: "Planta tipo 4 · Cobertura", quartos: "3", suite: true, varanda: true, area: "110 m²", unidades: "1002 · 1003 · 1005 · 1006", pendente: "Confirmar se a cobertura tem varanda/terraço." }
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
            { img: "pessoas/perfil-downsizing", perfil: "Downsizing", pos: "40% 30%" },
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
          fechamento: "Por que comprar\no *AURO*?",
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
            { valor: "399.900", prefixo: "R$", rotulo: "a partir de" }
          ],
          aviso: "[Rodapé legal: condições sujeitas a análise de crédito e disponibilidade.]",
          pendente: "Confirmar rodapé legal."
        },
        {
          id: "condicoes-tabela", modelo: "tabela",
          sobretitulo: "Tabela de lançamento",
          titulo: "Valores",
          colunas: ["Unidade", "Tipologia", "Área privativa", "Valor"],
          linhas: [
            ["[ Unidade ]", "[ Tipologia ]", "[ m² ]", ""],
            ["[ Unidade ]", "[ Tipologia ]", "[ m² ]", ""],
            ["[ Unidade ]", "[ Tipologia ]", "[ m² ]", ""],
            ["[ Unidade ]", "[ Tipologia ]", "[ m² ]", ""],
            ["[ Unidade ]", "[ Tipologia ]", "[ m² ]", ""]
          ],
          aviso: "Valores sujeitos a alteração sem aviso prévio.",
          pendente: "Preencher as 5 linhas da tabela (unidade, tipologia, área e valor)."
        },
        {
          id: "condicoes-financiamento", modelo: "numeros",
          fundo: { imagens: ["auro/fachada-02"], escurecer: 0.86 },
          sobretitulo: "Financiamento",
          alinhamento: "centro",
          itens: [
            { valor: "420", sufixo: "meses", rotulo: "de prazo" },
            { valor: "90", prefixo: "até", sufixo: "%", rotulo: "do saldo financiado" }
          ],
          pendente: "Confirmar prazo."
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
          id: "campanha-chamada", modelo: "blocos", impacto: true,
          sobretitulo: "Campanha de lançamento",
          titulo: "Venda mais.\n*Ganhe mais.*",
          texto: "Três oportunidades de premiação para transformar performance em grandes recompensas.",
          blocos: [
            { rotulo: "01", titulo: "Ação Pastas", valor: "R$ 500", texto: "por pasta aprovada e convertida" },
            { rotulo: "02", titulo: "Bateu a meta?", valor: "30 · 50 · 70", texto: "vendas · prêmios progressivos" },
            { rotulo: "03", titulo: "Cashback Turbinado Ouro", valor: "R$ 2.500", texto: "R$ 5 mil de margem na tabela\nsem desconto = prêmio" }
          ]
        },
        {
          id: "campanha-pastas", modelo: "blocos", seta: true,
          sobretitulo: "01 · Ação Pastas",
          titulo: "*R$ 500* por pasta\naprovada e convertida",
          blocos: [
            { rotulo: "Etapa 1", titulo: "Pasta aprovada", texto: "dentro do período da campanha\n15/10 a 06/11" },
            { rotulo: "Etapa 2", titulo: "Convertida em venda", texto: "no lançamento" },
            { rotulo: "Prêmio", titulo: "R$ 500", texto: "por pasta aprovada\ne convertida em venda", destaque: true }
          ],
          rodape: "O prêmio depende das duas etapas: aprovação da pasta no período da campanha e conversão em venda no lançamento."
        },
        {
          id: "campanha-meta-1", modelo: "meta",
          sobretitulo: "02 · Premiação por metas",
          nome: "Meta 1", vendas: "30",
          chamada: "Ao atingir 30 vendas, o participante concorre ao sorteio de:",
          premios: [
            { titulo: "R$ 500", sub: "por venda" },
            { titulo: "Fim de semana no Tauá", sub: "com acompanhante" },
            { titulo: "iPhone 18 Pro Max", sub: "Sorteio", destaque: true }
          ],
          notas: "Cada clique libera um prêmio. O iPhone explode por último."
        },
        {
          id: "campanha-meta-2", modelo: "meta",
          sobretitulo: "02 · Premiação por metas",
          nome: "Meta 2", vendas: "50",
          chamada: "Ao atingir 50 vendas, a premiação será:",
          premios: [
            { titulo: "R$ 700", sub: "por venda" },
            { titulo: "Fim de semana no Tauá", sub: "com acompanhante" },
            { titulo: "iPhone 18", sub: "1 aparelho" },
            { titulo: "iPhone 18 Pro Max", sub: "+ o iPhone 18", destaque: true }
          ],
          notas: "Cada clique libera um prêmio."
        },
        {
          id: "campanha-falso-fim", modelo: "hero",
          folhas: "laterais", destaque: true,
          titulo: "E essas foram\n*as metas.*",
          notas: "Fingir que os prêmios acabaram. Pausa... e o próximo clique revela a Meta 3."
        },
        {
          id: "campanha-meta-3", modelo: "meta",
          sobretitulo: "Ainda não acabou",
          nome: "Meta 3", vendas: "70",
          chamada: "Ao atingir 70 vendas, a premiação será:",
          premios: [
            { titulo: "R$ 1.000", sub: "por venda" },
            { titulo: "Viagem para o Rio de Janeiro", sub: "com acompanhante · 4 dias" },
            { titulo: "Honda CB 500 Hornet", sub: "A moto", destaque: true }
          ],
          notas: "A moto explode por último.",
          pendente: "Foto da Honda CB 500 Hornet (opcional: entra dentro do card do prêmio)."
        },
        {
          id: "campanha-cashback", modelo: "blocos", seta: true,
          sobretitulo: "03 · Cashback Turbinado Ouro",
          titulo: "Sem desconto,\n*o prêmio é seu.*",
          blocos: [
            { rotulo: "Na tabela", titulo: "R$ 5 mil", texto: "de margem para negociar\no fechamento" },
            { rotulo: "Sem desconto", titulo: "Margem preservada", texto: "a venda fecha sem\nconceder desconto" },
            { rotulo: "Prêmio", titulo: "R$ 2.500", texto: "para o corretor", destaque: true }
          ],
          rodape: "Premiação de R$ 2.500 para vendas realizadas sem desconto, usando a condição do Cashback Turbinado Ouro."
        },
        {
          id: "campanha-resumo", modelo: "soma",
          sobretitulo: "Resumo da premiação",
          titulo: "Quanto você pode ganhar\n*além da comissão*",
          linhas: [
            { rotulo: "Pastas", valor: "500,00" },
            { rotulo: "Premiação por venda", valor: "1.000,00" },
            { rotulo: "Cashback", valor: "2.500,00" },
            { rotulo: "Comissão*", valor: "6.500,00", aprox: true }
          ],
          total: { rotulo: "Remuneração total de 1 venda", valor: "10.500,00" },
          nota: "*De acordo com as políticas de cada imobiliária."
        },
        {
          id: "campanha-moto-eletrica", modelo: "blocos",
          sobretitulo: "Para os clientes",
          titulo: "+1 moto elétrica\n*sorteada no Dia D*",
          texto: "Entre os clientes que comprarem no Dia D, na Avant Première (14/11).",
          blocos: [
            { titulo: "2 quartos", valor: "1 cupom" },
            { titulo: "3 quartos", valor: "2 cupons" },
            { titulo: "Coberturas", valor: "3 cupons", destaque: true }
          ]
        },
        {
          id: "campanha-cronograma", modelo: "linha-do-tempo",
          titulo: "Próximos passos",
          etapas: [
            { nome: "Meeting", data: "14/10" },
            { nome: "Treinamentos de produto", data: "15 a 23/10" },
            { nome: "Open decorado", data: "19/10" },
            { nome: "1ª rodada de negócios", data: "31/10" },
            { nome: "2ª rodada de negócios", data: "07/11" },
            { nome: "Avant Première", data: "14/11 · cliente concorre à moto elétrica" },
            { nome: "Abertura de vendas", data: "15/11" }
          ],
          atual: 0,
          qr: "linkMateriais",
          pendente: "Link do QR Code."
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
