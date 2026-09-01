// Web Audio API ambient sensory sound engine for autism sensory co-regulation
// Supports: Ocean Waves (Breathing LFO), 432Hz Harmonic Drone, and Forest Rain
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let activeSourceNodes: (AudioNode | { stop?: () => void; disconnect: () => void })[] = [];
let lfoTimer: number | null = null;
let isPlaying = false;
let currentSoundType: 'ocean' | 'drone' | 'rain' = 'ocean';

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  return audioCtx;
}

export function initAudio() {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume().catch(() => {});
  }
  return ctx;
}

// Generate a 4-second looping pink/brown noise buffer for natural ocean/rain textures
function createNoiseBuffer(ctx: AudioContext): AudioBuffer {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Brown/Pink filtered noise approximation
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  return buffer;
}

export function setSoundType(type: 'ocean' | 'drone' | 'rain', volumePercent = 40) {
  currentSoundType = type;
  if (isPlaying) {
    stopCalmingSound();
    setTimeout(() => {
      startCalmingSound(volumePercent, type);
    }, 100);
  }
}

export function getSoundType(): 'ocean' | 'drone' | 'rain' {
  return currentSoundType;
}

export function isAudioPlaying(): boolean {
  return isPlaying;
}

export function startCalmingSound(volumePercent: number, soundType?: 'ocean' | 'drone' | 'rain') {
  try {
    const ctx = initAudio();
    if (!ctx) return;

    if (soundType) {
      currentSoundType = soundType;
    }

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // If already playing, just smoothly update volume
    if (isPlaying && masterGain) {
      updateVolume(volumePercent);
      return;
    }

    stopCalmingSound(); // ensure clean slate

    masterGain = ctx.createGain();
    const gainValue = Math.max(0.0001, (volumePercent / 100) * 0.22);
    masterGain.gain.setValueAtTime(gainValue, ctx.currentTime);
    masterGain.connect(ctx.destination);

    if (currentSoundType === 'ocean') {
      // Ocean Waves: Filtered brown noise + slow 4s LFO swell
      const noiseBuffer = createNoiseBuffer(ctx);
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      const waveFilter = ctx.createBiquadFilter();
      waveFilter.type = 'lowpass';
      waveFilter.frequency.setValueAtTime(320, ctx.currentTime);
      waveFilter.Q.setValueAtTime(2.0, ctx.currentTime);

      const waveGain = ctx.createGain();
      waveGain.gain.setValueAtTime(0.3, ctx.currentTime);

      noiseNode.connect(waveFilter);
      waveFilter.connect(waveGain);
      waveGain.connect(masterGain);

      noiseNode.start();
      activeSourceNodes.push(noiseNode, waveFilter, waveGain);

      // Low frequency modulation for rhythmic breathing waves
      let phase = 0;
      lfoTimer = window.setInterval(() => {
        if (!isPlaying || !audioCtx) return;
        phase += 0.05;
        const waveSwell = Math.sin(phase) * 0.5 + 0.5; // 0 to 1
        const targetFreq = 180 + waveSwell * 380;
        try {
          waveFilter.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.4);
          waveGain.gain.setTargetAtTime(0.15 + waveSwell * 0.55, audioCtx.currentTime, 0.4);
        } catch (e) {}
      }, 100);

    } else if (currentSoundType === 'drone') {
      // 432Hz Harmonic Base Drone (Grounding frequencies: 108Hz, 216Hz, 432Hz)
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(350, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);
      filter.connect(masterGain);

      const freqs = [108, 162, 216]; // Root, Fifth, Octave
      freqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        oscGain.gain.setValueAtTime(0.25, ctx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        activeSourceNodes.push(osc, oscGain);
      });
      activeSourceNodes.push(filter);

    } else if (currentSoundType === 'rain') {
      // Gentle Forest Rain: High-pass & Low-pass filtered natural noise
      const noiseBuffer = createNoiseBuffer(ctx);
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = noiseBuffer;
      noiseNode.loop = true;

      const rainFilter = ctx.createBiquadFilter();
      rainFilter.type = 'bandpass';
      rainFilter.frequency.setValueAtTime(650, ctx.currentTime);
      rainFilter.Q.setValueAtTime(0.8, ctx.currentTime);

      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.6, ctx.currentTime);

      noiseNode.connect(rainFilter);
      rainFilter.connect(rainGain);
      rainGain.connect(masterGain);

      noiseNode.start();
      activeSourceNodes.push(noiseNode, rainFilter, rainGain);
    }

    isPlaying = true;
  } catch (e) {
    console.warn('Could not start sensory sound', e);
  }
}

export function stopCalmingSound() {
  try {
    if (lfoTimer !== null) {
      clearInterval(lfoTimer);
      lfoTimer = null;
    }
    if (masterGain && audioCtx) {
      masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.15);
    }
    setTimeout(() => {
      activeSourceNodes.forEach((node) => {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch (err) {}
      });
      activeSourceNodes = [];
      isPlaying = false;
    }, 200);
  } catch (e) {
    isPlaying = false;
  }
}

export function updateVolume(volumePercent: number) {
  if (!masterGain || !audioCtx) return;
  const targetGain = volumePercent > 0 ? (volumePercent / 100) * 0.22 : 0.0001;
  try {
    masterGain.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.1);
  } catch (e) {}
}

export function playSoftChime() {
  try {
    const ctx = initAudio();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();

    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(528, ctx.currentTime); // 528 Hz therapeutic clear frequency
    chimeOsc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);

    chimeGain.gain.setValueAtTime(0.12, ctx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);

    chimeOsc.start();
    chimeOsc.stop(ctx.currentTime + 0.8);
  } catch (e) {}
}
