import confetti from 'canvas-confetti';

/**
 * Dispara uma chuva elegante de corações e partículas românticas
 */
export function triggerRomanticHearts(x = 0.5, y = 0.6) {
  const count = 35;
  const defaults = {
    origin: { x, y },
    disableForReducedMotion: true,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Partículas com formato de coração e tons românticos aveludados
  const romanticColors = ['#e890a5', '#b53360', '#f4d2db', '#df829d', '#ffd1dc', '#ffffff'];

  fire(0.25, {
    spread: 30,
    startVelocity: 35,
    colors: romanticColors,
    shapes: ['circle'],
    scalar: 1.2,
  });

  fire(0.2, {
    spread: 60,
    colors: romanticColors,
    scalar: 1.4,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.9,
    colors: romanticColors,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.5,
    colors: romanticColors,
  });
}

export function triggerReunionCelebration() {
  const duration = 4 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#f4a6be', '#e25582', '#fff0f5', '#e6c280', '#d84a75'];

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 40 * (timeLeft / duration);
    confetti({
      particleCount,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 250);
}

/**
 * Explosão festiva grandiosa para o momento do FELIZ ANIVERSÁRIO!
 */
export function triggerBirthdayBlast() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const colors = ['#f43f5e', '#be123c', '#fb7185', '#fda4af', '#f59e0b', '#fbbf24', '#ffffff'];

  // Explosão central imediata
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    scalar: 1.2
  });

  const interval: ReturnType<typeof setInterval> = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 35 * (timeLeft / duration);

    // Chuva dos dois lados alternada
    confetti({
      particleCount,
      angle: 60,
      spread: 70,
      origin: { x: 0.1, y: 0.65 },
      colors,
    });
    confetti({
      particleCount,
      angle: 120,
      spread: 70,
      origin: { x: 0.9, y: 0.65 },
      colors,
    });
  }, 220);
}
