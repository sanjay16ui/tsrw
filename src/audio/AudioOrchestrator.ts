export const AudioOrchestrator = {
  ctx: null as AudioContext | null,
  
  introAudio: Object.assign(new Audio('/AUDIO.mp3'), { crossOrigin: "anonymous" }),
  introAnalyser: null as AnalyserNode | null,
  introData: new Uint8Array(0),
  
  robotAudio: Object.assign(new Audio('/robot_voice.wav'), { crossOrigin: "anonymous" }),
  robotAnalyser: null as AnalyserNode | null,
  robotData: new Uint8Array(0),
  
  initialized: false,
  muted: false,

  introReady: false,
  robotReady: false,
  onReadyChange: null as (() => void) | null,

  preload() {
    this.introAudio.preload = 'auto';
    this.robotAudio.preload = 'auto';

    const checkReady = () => {
      if (this.onReadyChange) this.onReadyChange();
    };

    this.introAudio.addEventListener('canplaythrough', () => {
      this.introReady = true;
      checkReady();
    });
    
    this.robotAudio.addEventListener('canplaythrough', () => {
      this.robotReady = true;
      checkReady();
    });

    // Force load for some browsers
    this.introAudio.load();
    this.robotAudio.load();

    // Fallback if browser caches the event before listener attaches
    if (this.introAudio.readyState >= 3) this.introReady = true;
    if (this.robotAudio.readyState >= 3) this.robotReady = true;
    checkReady();
  },

  isReady() {
    return this.introReady && this.robotReady;
  },

  init() {
    if (this.initialized) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      // Intro Setup
      const introSource = this.ctx.createMediaElementSource(this.introAudio);
      this.introAnalyser = this.ctx.createAnalyser();
      this.introAnalyser.fftSize = 64;
      introSource.connect(this.introAnalyser);
      this.introAnalyser.connect(this.ctx.destination);
      this.introData = new Uint8Array(this.introAnalyser.frequencyBinCount);
      
      // Robot Setup
      const robotSource = this.ctx.createMediaElementSource(this.robotAudio);
      this.robotAnalyser = this.ctx.createAnalyser();
      this.robotAnalyser.fftSize = 64;
      robotSource.connect(this.robotAnalyser);
      this.robotAnalyser.connect(this.ctx.destination);
      this.robotData = new Uint8Array(this.robotAnalyser.frequencyBinCount);

      this.initialized = true;
    } catch (e) {
      console.warn("Audio Context initialization failed", e);
    }
  },

  playIntro() {
    if (!this.initialized) this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
    
    // Prime the robot voice audio element during this user interaction
    // to prevent autoplay block later in the sequence.
    this.robotAudio.volume = 0;
    this.robotAudio.play().then(() => {
      this.robotAudio.pause();
      this.robotAudio.currentTime = 0;
      this.robotAudio.volume = 1;
    }).catch(e => console.warn("Robot voice prime blocked", e));
    
    this.introAudio.pause();
    this.introAudio.currentTime = 0;
    this.introAudio.muted = this.muted;
    this.introAudio.play().catch(e => console.warn("Intro play blocked", e));
  },

  stopIntro() {
    this.introAudio.pause();
  },

  playRobotVoice() {
    if (!this.initialized) this.init();
    if (this.ctx?.state === 'suspended') this.ctx.resume();
    
    this.introAudio.pause();
    this.robotAudio.currentTime = 0;
    this.robotAudio.muted = this.muted;
    this.robotAudio.play().catch(e => console.warn("Robot voice play blocked", e));
  },

  stopRobotVoice() {
    this.robotAudio.pause();
  },
  
  toggleMute() {
    this.muted = !this.muted;
    this.introAudio.muted = this.muted;
    this.robotAudio.muted = this.muted;
    return this.muted;
  },

  getIntroAmplitude() {
    if (!this.introAnalyser || !this.initialized || this.introAudio.paused) return 0;
    this.introAnalyser.getByteFrequencyData(this.introData);
    let sum = 0;
    for (let i = 0; i < this.introData.length; i++) sum += this.introData[i];
    return sum / this.introData.length;
  },

  getRobotAmplitude() {
    if (!this.robotAnalyser || !this.initialized || this.robotAudio.paused) return 0;
    this.robotAnalyser.getByteFrequencyData(this.robotData);
    let sum = 0;
    for (let i = 0; i < this.robotData.length; i++) sum += this.robotData[i];
    return sum / this.robotData.length;
  },

  getCurrentAmplitude() {
    return Math.max(this.getIntroAmplitude(), this.getRobotAmplitude());
  }
};
