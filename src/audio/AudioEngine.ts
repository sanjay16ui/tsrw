export const AudioEngine = {
  audio: new Audio('/AUDIO.mp3'),
  analyser: null as AnalyserNode | null,
  dataArray: new Uint8Array(0),
  initialized: false,

  init() {
    if (this.initialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const source = ctx.createMediaElementSource(this.audio);
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 64;
      source.connect(this.analyser);
      this.analyser.connect(ctx.destination);
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.initialized = true;
    } catch (e) {
      console.warn("Audio Context initialization failed", e);
    }
  },

  play() {
    if (!this.initialized) this.init();
    this.audio.play().catch(e => console.warn("Audio play blocked", e));
  },

  pause() {
    this.audio.pause();
  },

  getAmplitude() {
    if (!this.analyser || !this.initialized) return 0;
    this.analyser.getByteFrequencyData(this.dataArray);
    let sum = 0;
    for (let i = 0; i < this.dataArray.length; i++) {
      sum += this.dataArray[i];
    }
    return sum / this.dataArray.length; // 0 to 255
  }
};
