/**
 * Utilitários para contagem regressiva e fusos horários precisos
 */

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  isReached: boolean;
  totalHoursRemaining: number;
  totalSecondsRemaining: number;
  percentageElapsed: number; // Percentual decorrido desde 21/03/2026 até o reencontro
}

/**
 * Calcula a contagem regressiva exata em relação ao timestamp alvo (UTC)
 */
export function calculateCountdown(targetEpochMs: number, startEpochMs?: number): CountdownState {
  const now = Date.now();
  const diff = targetEpochMs - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMs: 0,
      isReached: true,
      totalHoursRemaining: 0,
      totalSecondsRemaining: 0,
      percentageElapsed: 100,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const totalHoursRemaining = Math.floor(diff / (1000 * 60 * 60));
  const totalSecondsRemaining = Math.floor(diff / 1000);

  // Calcula porcentagem percorrida desde que se conheceram (21 de março de 2026) até o encontro
  const startMs = startEpochMs || new Date("2026-03-21T00:00:00.000Z").getTime();
  const totalDuration = targetEpochMs - startMs;
  const elapsed = now - startMs;
  const percentage = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMs: diff,
    isReached: false,
    totalHoursRemaining,
    totalSecondsRemaining,
    percentageElapsed: parseFloat(percentage.toFixed(1)),
  };
}

/**
 * Retorna horários atuais formatados nos fusos de Lucas (Brasil) e Dai (Canadá)
 */
export function getLiveTimezones(now: Date = new Date()) {
  try {
    const brazilTime = now.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const canadaTime = now.toLocaleTimeString('pt-BR', {
      timeZone: 'America/Toronto',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return {
      brazilTime,
      canadaTime,
    };
  } catch {
    // Fallback caso IANA falhe em ambiente restrito
    const pad = (n: number) => n.toString().padStart(2, '0');
    return {
      brazilTime: `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
      canadaTime: `${pad((now.getHours() - 1 + 24) % 24)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    };
  }
}
