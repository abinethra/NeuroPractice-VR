// Web Audio API ambient tone and calming sound generator for sensory co-regulation
let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let oscillator1: OscillatorNode | null = null;
let oscillator2: OscillatorNode | null = null;
let filterNode: BiquadFilterNode | null = null;
let isPlaying = false;

export function initAudio() {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
  } catch (err) {
    console.warn('Web Audio not supported in this environment', err);
  }
}

export function startCalmingSound(volumePercent: number) {
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (isPlaying) {
      updateVolume(volumePercent);
      return;
    }

    // Master Gain
    masterGain = audioCtx.createGain();
    const gainValue = Math.max(0.0001, (volumePercent / 100) * 0.15); // soft limit
    masterGain.gain.setValueAtTime(gainValue, audioCtx.currentTime);

    // Warm Low-Pass Filter
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(280, audioCtx.currentTime); // gentle warm frequencies
    filterNode.Q.setValueAtTime(1.5, audioCtx.currentTime);

    // Sine oscillators for gentle ambient drone (432Hz harmonic base - 108Hz / 216Hz)
    oscillator1 = audioCtx.createOscillator();
    oscillator1.type = 'sine';
    oscillator1.frequency.setValueAtTime(108, audioCtx.currentTime); // Grounding warm root

    oscillator2 = audioCtx.createOscillator();
    oscillator2.type = 'sine';
    oscillator2.frequency.setValueAtTime(162, audioCtx.currentTime); // Perfect fifth overtone

    oscillator1.connect(filterNode);
    oscillator2.connect(filterNode);
    filterNode.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    oscillator1.start();
    oscillator2.start();
    isPlaying = true;
  } catch (e) {
    console.warn('Could not start ambient sound', e);
  }
}

export function stopCalmingSound() {
  try {
    if (masterGain && audioCtx) {
      masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
    }
    setTimeout(() => {
      try {
        if (oscillator1) {
          oscillator1.stop();
          oscillator1.disconnect();
          oscillator1 = null;
        }
        if (oscillator2) {
          oscillator2.stop();
          oscillator2.disconnect();
          oscillator2 = null;
        }
        isPlaying = false;
      } catch (err) {
        // ignore cleanup errors
      }
    }, 350);
  } catch (e) {
    isPlaying = false;
  }
}

export function updateVolume(volumePercent: number) {
  if (!masterGain || !audioCtx) return;
  const targetGain = volumePercent > 0 ? (volumePercent / 100) * 0.15 : 0.0001;
  try {
    masterGain.gain.setValueAtTime(targetGain, audioCtx.currentTime);
  } catch (e) {
    // ignore
  }
}

export function playSoftChime() {
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const chimeOsc = audioCtx.createOscillator();
    const chimeGain = audioCtx.createGain();

    chimeOsc.type = 'sine';
    chimeOsc.frequency.setValueAtTime(528, audioCtx.currentTime); // Clear therapeutic bell frequency
    chimeOsc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3);

    chimeGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.8);

    chimeOsc.connect(chimeGain);
    chimeGain.connect(audioCtx.destination);

    chimeOsc.start();
    chimeOsc.stop(audioCtx.currentTime + 0.8);
  } catch (e) {
    // ignore audio chime
  }
}
