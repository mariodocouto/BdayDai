/**
 * Gerador de trilha sonora ambiente suave (Piano/Celesta romântico)
 * Utiliza a Web Audio API nativa do navegador, garantindo:
 * - 0 dependência de arquivos externos protegidos por direitos autorais
 * - Carregamento instantâneo sem buffering
 * - Volume suave e harmonias românticas relaxantes
 * - Suporte também para carregar áudio customizado caso Lucas insira um arquivo
 */

class RomanticAmbientPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private masterGain: GainNode | null = null;
  private customAudio: HTMLAudioElement | null = null;

  // Escala pentatônica romântica suave em Ré Maior / Si Menor (tons quentes e confortantes)
  private notes = [
    146.83, // D3
    220.00, // A3
    293.66, // D4
    329.63, // E4
    369.99, // F#4
    440.00, // A4
    493.88, // B4
    554.37, // C#5
    587.33, // D5
    659.25, // E5
    739.99, // F#5
    880.00, // A5
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
  }

  public togglePlay(customUrl?: string): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play(customUrl);
      return true;
    }
  }

  public play(customUrl?: string) {
    if (customUrl && customUrl.trim() !== '') {
      if (!this.customAudio) {
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.play().catch(e => console.warn("Audio play blocked by browser:", e));
      this.isPlaying = true;
      return;
    }

    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.playAmbientPattern();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playAmbientPattern = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    // Toca uma nota ou arpejo suave
    const noteCount = Math.random() > 0.4 ? 2 : 1;
    for (let i = 0; i < noteCount; i++) {
      const noteIndex = Math.floor(Math.random() * this.notes.length);
      const freq = this.notes[noteIndex];
      const delay = i * 0.28;
      this.playPluck(freq, delay);
    }

    // Intervalo suave e orgânico entre 1.6s e 3.4s
    const nextInterval = 1600 + Math.random() * 1800;
    this.timerId = window.setTimeout(this.playAmbientPattern, nextInterval);
  };

  private playPluck(freq: number, delaySeconds: number) {
    if (!this.ctx || !this.masterGain) return;

    const t = this.ctx.currentTime + delaySeconds;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Filtro passa-baixa para dar calor aveludado analógico
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1400, t);
    filter.frequency.exponentialRampToValueAtTime(350, t + 2.8);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);

    // Envelope suave de sino/piano: ataque sutil, decaimento longo e aconchegante
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 3.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(t);
    osc.stop(t + 3.3);
  }
}

export const ambientPlayer = new RomanticAmbientPlayer();
