/**
 * CONFIGURAÇÃO DO PRESENTE DE LUCAS PARA DAIANE ("DAI")
 * 
 * Todas as informações, fotos, textos e datas estão centralizadas aqui.
 * Lucas pode alterar facilmente qualquer item sem precisar mexer na lógica do código.
 */

export interface PhotoMemory {
  id: number;
  order: number; // Ordem cronológica / lógica definida por Lucas (1, 2, 3...)
  title: string;
  caption: string;
  note: string;
  url: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface SiteConfig {
  // Pessoas
  recipientName: string;
  recipientNickname: string;
  senderName: string;

  // Destaque de Aniversário e Foto de Casal
  birthdayCouplePhoto: string;
  birthdayTributeTitle: string;
  birthdayTributeMessage: string;

  // Frases da Narrativa Interativa ("Clicar e Andar")
  storyPhrases: {
    introGreeting: string;
    introSub: string;
    metTitle: string;
    metText: string;
    momentsIntro: string;
    momentsSub: string;
    birthdayTeaser: string;
    reunionPromise: string;
  };

  // Datas Históricas
  metDate: {
    display: string; // 21/03/2026
    timestamp: string; // ISO format
    title: string;
    description: string;
  };

  birthdayDate: {
    display: string; // 21/09
    timestamp: string;
    title: string;
    subtitle: string;
    celebrationText: string;
  };

  // Encontro / Reencontro Principal
  reunion: {
    dateDisplay: string; // 24.10.2026
    timeDisplay: string; // 09:19
    dateTimeISO: string; // Data ISO completa para cálculo no countdown
    timezone: string; // Timezone IANA, ex: America/Toronto
    timezoneLabel: string; // Rótulo amigável do fuso
    brazilTimeDisplay: string; // Ex: 10:19h (Horário de Brasília)
    canadaTimeDisplay: string; // Ex: 09:19h (Horário local Canadá)
    targetEpochMs: number; // Timestamp UTC pré-calculado para consistência global
    arrivalCity: string;
    departureCity: string;
    distanceKm: number;
  };

  // Passagem Aérea
  flightTicket: {
    airline: string;
    flightNumber: string;
    passengerName: string;
    originCode: string;
    originCity: string;
    originCountry: string;
    destinationCode: string;
    destinationCity: string;
    destinationCountry: string;
    date: string;
    boardingTime: string;
    arrivalTime: string;
    seat: string;
    gate: string;
    classType: string;
    ticketImageUrl: string; // Foto real da passagem aérea quando Lucas fornecer
    ticketNote: string;
  };

  // Carta Digital
  letter: {
    greeting: string;
    paragraphs: string[];
    closing: string;
    signature: string;
    postScript?: string;
  };

  // Trilha Sonora
  audio: {
    title: string;
    artist: string;
    customAudioUrl?: string; // Se Lucas tiver um link MP3 direto
    useAmbientGenerator: boolean; // Usa gerador de piano/celesta ambiente suave caso não haja mp3
  };

  // 12 Fotografias do Casal
  photos: PhotoMemory[];

  // Mensagens Especiais
  easterEgg: {
    buttonLabel: string;
    secretTitle: string;
    secretMessage: string;
  };
}

/**
 * Cálculo robusto da data-alvo:
 * 24 de outubro de 2026 às 09:19h (EDT no Canadá = UTC-4).
 * Em UTC: 2026-10-24T13:19:00.000Z
 * No Brasil (BRT = UTC-3): 10:19h
 */
export const TARGET_REUNION_DATE = new Date("2026-10-24T13:19:00.000Z");

export const siteConfig: SiteConfig = {
  recipientName: "Daiane",
  recipientNickname: "Dai",
  senderName: "Lucas",

  // Foto de Casal de Destaque no Clímax do Aniversário
  birthdayCouplePhoto: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop",
  birthdayTributeTitle: "Feliz Aniversário, Meu Amor! 🎉🎂✨",
  birthdayTributeMessage: "Hoje é o seu dia, Dai! O dia em que o mundo ganhou o sorriso mais lindo e eu ganhei a pessoa que transformou a minha vida. Celebramos a sua vida, a sua luz e exatamente 6 meses desde aquele 21 de março inesquecível. Que o seu novo ciclo seja radiante, cheio de paz, saúde e conquistas aí no Canadá. Eu tenho um orgulho infinito de você!",

  // Frases da Narrativa Interativa ("Clicar e Andar")
  storyPhrases: {
    introGreeting: "Hoje é um dia muito especial...",
    introSub: "E eu preparei algo para você ir descobrindo passo a passo, do jeitinho que a nossa história merece.",
    metTitle: "Desde que a gente se conheceu...",
    metText: "21 de março de 2026. Aquele instante em que nossos caminhos se cruzaram e tudo começou a fazer sentido.",
    momentsIntro: "Foram momentos incríveis vivendo cada detalhe...",
    momentsSub: "Cada risada boba, cada conversa até tarde, cada memória que a gente construiu...",
    birthdayTeaser: "E agora... chegamos ao coração deste dia tão importante.",
    reunionPromise: "E com a melhor promessa de todas: em breve a gente está junto!"
  },

  // 21 de Março de 2026: Quando se conheceram
  metDate: {
    display: "21 de março de 2026",
    timestamp: "2026-03-21T00:00:00.000Z",
    title: "O Dia em que Nossos Caminhos se Cruzaram",
    description: "21.03.2026 — O instante em que minha vida ganhou um novo norte e meu coração encontrou o seu."
  },

  // 21 de Setembro: Aniversário da Dai + 6 Meses Juntos
  birthdayDate: {
    display: "21 de setembro",
    timestamp: "2026-09-21T00:00:00.000Z",
    title: "Feliz Aniversário, Meu Amor",
    subtitle: "21.09 — O seu dia e exatamente 6 meses desde o nosso primeiro instante",
    celebrationText: "Hoje celebramos a sua vida, a sua luz e os seis meses mais intensos e verdadeiros da minha história. A distância pode colocar um oceano entre nós agora, mas meu pensamento acorda e vai dormir com você aí no Canadá."
  },

  // 24 de Outubro de 2026 às 09:19: O Reencontro
  reunion: {
    dateDisplay: "24 de outubro de 2026",
    timeDisplay: "09:19h",
    dateTimeISO: "2026-10-24T13:19:00.000Z",
    timezone: "America/Toronto",
    timezoneLabel: "Horário local no Canadá (EDT / UTC-4)",
    brazilTimeDisplay: "10:19h (Brasília)",
    canadaTimeDisplay: "09:19h (Canadá)",
    targetEpochMs: TARGET_REUNION_DATE.getTime(),
    arrivalCity: "Canadá",
    departureCity: "Brasil",
    distanceKm: 8150,
  },

  // Informações da Passagem Aérea
  flightTicket: {
    airline: "Voo do Reencontro Airlines",
    flightNumber: "LC-2410",
    passengerName: "DAIANE (DAI) & LUCAS",
    originCode: "BRA",
    originCity: "Brasil",
    originCountry: "🇧🇷",
    destinationCode: "CAN",
    destinationCity: "Canadá",
    destinationCountry: "🇨🇦",
    date: "24 OUT 2026",
    boardingTime: "09:19",
    arrivalTime: "09:19",
    seat: "01A • Ao Seu Lado",
    gate: "O Seu Coração",
    classType: "Amor Sem Limites",
    ticketImageUrl: "", // Slot reservado para a foto da passagem que Lucas fornecer
    ticketNote: "Dessa vez a saudade tem destino, data e hora marcada. A passagem já está emitida, e tudo o que me separa de você é uma contagem de segundos."
  },

  // Carta Emocional para Dai
  letter: {
    greeting: "Querida Dai,",
    paragraphs: [
      "Eu queria poder colocar em palavras o quanto você faz falta aqui todos os dias. Quando você partiu para o Canadá, o mundo pareceu ficar um pouco mais silencioso por aqui, mas a certeza do que construímos só se tornou maior e mais forte.",
      "Hoje, 21 de setembro, é o seu aniversário. É o dia de celebrar a mulher incrível, forte, doce e encantadora que você é. E é impossível não sorrir ao perceber que hoje fazemos exatamente 6 meses juntos desde aquele 21 de março que mudou tudo para mim. Seis meses que provaram que o amor não depende de fusos horários ou de fronteiras.",
      "Eu não posso diminuir fisicamente os mais de 8 mil quilômetros que nos separam agora, mas posso prometer uma coisa: eu conto cada segundo que falta para essa distância virar abraço.",
      "Essa contagem regressiva não é só um relógio na tela. É cada batimento ansioso, cada mensagem de bom dia que atravessa o fuso, cada plano que desenhamos juntos. Falta pouco, meu amor.",
      "No dia 24 de outubro, às 09:19h, o avião pousa, o cronômetro zera e a saudade finalmente perde para nós dois."
    ],
    closing: "Com todo o meu amor, hoje e em todos os segundos até te abraçar,",
    signature: "Lucas",
    postScript: "P.S.: Feliz aniversário, minha princesa. Guarda um abraço bem demorado pra mim aí no Canadá."
  },

  // Áudio
  audio: {
    title: "Melodia para Dai",
    artist: "Lucas & Dai",
    useAmbientGenerator: true,
  },

  // 12 Fotografias Reservadas (com imagens conceituais românticas que podem ser substituídas pelas fotos reais)
  photos: [
    {
      id: 1,
      order: 1,
      title: "O Primeiro Sorriso",
      caption: "O instante em que percebi que meu coração já tinha dona.",
      note: "21.03.2026 — Onde tudo começou",
      url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "portrait"
    },
    {
      id: 2,
      order: 2,
      title: "Aquele Olhar",
      caption: "Seus olhos têm a calma que eu sempre procurei no mundo.",
      note: "Lembrança viva",
      url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "square"
    },
    {
      id: 3,
      order: 3,
      title: "Mãos Dadas",
      caption: "Mesmo com o oceano no meio, nossas mãos continuam entrelaçadas.",
      note: "Conexão inquebrável",
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "landscape"
    },
    {
      id: 4,
      order: 4,
      title: "A Risada Mais Bonita",
      caption: "Ouvir você rir é o meu som favorito no planeta inteiro.",
      note: "Pura alegria",
      url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "portrait"
    },
    {
      id: 5,
      order: 5,
      title: "Tardes com Você",
      caption: "Qualquer café ou conversa simples vira eterno ao seu lado.",
      note: "Dias inesquecíveis",
      url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "square"
    },
    {
      id: 6,
      order: 6,
      title: "O Abraço de Despedida",
      caption: "Não foi um adeus, foi apenas o início da maior contagem regressiva da minha vida.",
      note: "Até logo, Canadá",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "portrait"
    },
    {
      id: 7,
      order: 7,
      title: "Chamadas de Vídeo e Fuso",
      caption: "A tela diminui a falta, mas só me dá mais certeza de que quero você por perto.",
      note: "Brasil ⇄ Canadá",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "landscape"
    },
    {
      id: 8,
      order: 8,
      title: "O Pôr do Sol Compartilhado",
      caption: "É o mesmo sol que se põe aqui no Brasil e aquece você aí no Canadá.",
      note: "Sob o mesmo céu",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "portrait"
    },
    {
      id: 9,
      order: 9,
      title: "A Sua Força",
      caption: "Tenho tanto orgulho da mulher corajosa e determinada que você é aí fora.",
      note: "Minha inspiração",
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "square"
    },
    {
      id: 10,
      order: 10,
      title: "Planos para o Futuro",
      caption: "Cada passo que dou tem como destino construir uma vida com você.",
      note: "Para sempre",
      url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "landscape"
    },
    {
      id: 11,
      order: 11,
      title: "O Sorriso que Ilumina",
      caption: "Nenhum frio do Canadá é capaz de apagar o calor que você carrega.",
      note: "Minha luz",
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "portrait"
    },
    {
      id: 12,
      order: 12,
      title: "Quase Lá",
      caption: "O próximo registro dessa galeria será nós dois abraçados no aeroporto.",
      note: "24.10.2026 — O Reencontro",
      url: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=900&auto=format&fit=crop",
      aspectRatio: "portrait"
    },
  ],

  // Detalhe Surpresa
  easterEgg: {
    buttonLabel: "Mais uma coisa, Dai...",
    secretTitle: "A Promessa Mais Bonita",
    secretMessage: "Você foi a melhor coisa que me aconteceu em 2026. Obrigado por esses 6 meses inesquecíveis, por segurar a minha mão mesmo com quilômetros de distância e por me fazer a pessoa mais feliz do mundo. Guarda o meu melhor beijo para o dia 24 de outubro às 09:19h. Eu te amo daqui até o Canadá e além."
  }
};
