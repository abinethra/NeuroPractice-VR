import React, { useState } from 'react';
import { LobbyIllustration } from './VectorIllustrations';
import { SensorySettings } from '../types';
import { 
  Sun, Volume2, VolumeX, Sparkles, ArrowRight, ShieldCheck, 
  HeartHandshake, Eye, Waves, Radio, CloudRain, BellRing, Play, Pause,
  Sliders, Activity, SlidersHorizontal
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  updateVolume, startCalmingSound, stopCalmingSound, 
  setSoundType, getSoundType, isAudioPlaying, playSoftChime 
} from '../utils/audio';

interface WaitingRoomScreenProps {
  onBeginRehearsal: () => void;
  sensorySettings: SensorySettings;
  onUpdateSensory: (newSettings: Partial<SensorySettings>) => void;
}

export const WaitingRoomScreen: React.FC<WaitingRoomScreenProps> = ({
  onBeginRehearsal,
  sensorySettings,
  onUpdateSensory,
}) => {
  const [activeSound, setActiveSound] = useState<'ocean' | 'drone' | 'rain'>(getSoundType());
  const [isPlayingSound, setIsPlayingSound] = useState<boolean>(sensorySettings.volume > 0);

  const handleBrightnessChange = (val: number) => {
    onUpdateSensory({ brightness: val });
  };

  const handleVolumeChange = (val: number) => {
    onUpdateSensory({ volume: val });
    if (val > 0) {
      setIsPlayingSound(true);
      startCalmingSound(val, activeSound);
    } else {
      setIsPlayingSound(false);
      stopCalmingSound();
    }
  };

  const handleSoundTypeSelect = (type: 'ocean' | 'drone' | 'rain') => {
    setActiveSound(type);
    const vol = sensorySettings.volume > 0 ? sensorySettings.volume : 40;
    if (sensorySettings.volume === 0) {
      onUpdateSensory({ volume: vol });
    }
    setIsPlayingSound(true);
    setSoundType(type, vol);
  };

  const toggleSoundPlayback = () => {
    if (isPlayingSound) {
      setIsPlayingSound(false);
      stopCalmingSound();
    } else {
      const vol = sensorySettings.volume > 0 ? sensorySettings.volume : 40;
      onUpdateSensory({ volume: vol });
      setIsPlayingSound(true);
      startCalmingSound(vol, activeSound);
    }
  };

  const handleTestChime = () => {
    playSoftChime();
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between items-stretch">
      {/* Header Context */}
      <div className="mb-4 text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffd166] text-black font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
          <span>03 / 06 SENSORY CALIBRATION</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Acoustic &amp; Luminance Acclimation Lobby
        </h2>
        <p className="text-xs sm:text-sm text-[#d6c8c5] font-mono mt-1">
          ZERO-PRESSURE BUFFER &bull; CALIBRATE SENSORY THRESHOLDS PRIOR TO AVATAR INTERACTION
        </p>
      </div>

      {/* Main Illustration Scene Container with Brutalist Framing */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex-1 min-h-[260px] sm:min-h-[340px] max-h-[400px] w-full overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] bg-[#0d0c0f]"
      >
        {/* SVG Illustrated Lobby Scene */}
        <LobbyIllustration brightness={sensorySettings.brightness} />

        {/* Ambient overlay HUD chips */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          <div className="px-3 py-1 bg-black text-[#ffd166] border-2 border-black font-mono text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_#000] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#06d6a0] animate-pulse" />
            <span>VR LOBBY // LOW-STIM</span>
          </div>
          <div className="px-3 py-1 bg-black text-white border-2 border-black font-mono text-xs font-bold shadow-[2px_2px_0px_#000]">
            LUM: {sensorySettings.brightness}%
          </div>
        </div>

        {/* Calming Tip Badge in corner */}
        <div className="absolute top-4 right-4 hidden md:flex items-center gap-2 px-3 py-1 bg-[#ffd166] text-black border-2 border-black font-mono text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
          <HeartHandshake className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>ZERO TIME CONSTRAINT</span>
        </div>

        {/* Live Audio Visualizer Pill when sound is playing */}
        {isPlayingSound && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black border-2 border-black text-[#06d6a0] font-mono text-xs font-black uppercase shadow-[3px_3px_0px_#000]">
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span className="w-1 bg-[#06d6a0] animate-bounce h-2" />
              <span className="w-1 bg-[#ffd166] animate-bounce h-3.5 delay-100" />
              <span className="w-1 bg-[#e0533c] animate-bounce h-2.5 delay-200" />
            </div>
            <span>
              {activeSound === 'ocean' ? 'OCEAN WAVES' : activeSound === 'drone' ? '432HZ DRONE' : 'FOREST RAIN'} ACTIVE
            </span>
          </div>
        )}
      </motion.div>

      {/* Bottom Sensory Controls & Sound Engine Config (Brutalist Switchboard) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full mt-4 bg-[#181417] border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_#000] flex flex-col gap-5 text-left"
      >
        {/* Sound Selection Chips Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-black">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
            <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
              WEB AUDIO API &bull; SENSORY ACOUSTIC SYNTHESIZER
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              onClick={toggleSoundPlayback}
              id="sound-toggle-play-btn"
              className={`px-3 py-1.5 border-2 border-black text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all ${
                isPlayingSound
                  ? 'bg-[#06d6a0] text-black'
                  : 'bg-[#251f22] text-[#d6c8c5]'
              }`}
            >
              {isPlayingSound ? <Pause className="w-3.5 h-3.5 stroke-[3]" /> : <Play className="w-3.5 h-3.5 stroke-[3]" />}
              <span>{isPlayingSound ? 'PAUSE' : 'PLAY AUDIO'}</span>
            </button>

            {/* Test Soft Chime */}
            <button
              onClick={handleTestChime}
              id="sound-test-chime-btn"
              className="px-3 py-1.5 bg-[#ffd166] hover:bg-[#ffe28a] text-black border-2 border-black text-xs font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
              title="Play 528Hz calming focus chime"
            >
              <BellRing className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>TEST 528HZ CHIME</span>
            </button>
          </div>
        </div>

        {/* Sensory Sound Types (3 options) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <button
            onClick={() => handleSoundTypeSelect('ocean')}
            id="sound-type-ocean-btn"
            className={`p-4 border-3 border-black text-left cursor-pointer flex flex-col justify-between transition-all ${
              activeSound === 'ocean'
                ? 'bg-[#ffd166] text-black shadow-[5px_5px_0px_#000] -translate-y-1'
                : 'bg-[#1e1a1d] text-[#d6c8c5] hover:bg-[#282226] shadow-[2px_2px_0px_#000]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-black text-sm uppercase">Ocean Waves</span>
              <Waves className="w-4 h-4 stroke-[2.5]" />
            </div>
            <p className="font-mono text-[11px] leading-snug">
              4.0s respiratory rhythm LFO pink noise filter
            </p>
          </button>

          <button
            onClick={() => handleSoundTypeSelect('drone')}
            id="sound-type-drone-btn"
            className={`p-4 border-3 border-black text-left cursor-pointer flex flex-col justify-between transition-all ${
              activeSound === 'drone'
                ? 'bg-[#06d6a0] text-black shadow-[5px_5px_0px_#000] -translate-y-1'
                : 'bg-[#1e1a1d] text-[#d6c8c5] hover:bg-[#282226] shadow-[2px_2px_0px_#000]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-black text-sm uppercase">432Hz Harmonic</span>
              <Radio className="w-4 h-4 stroke-[2.5]" />
            </div>
            <p className="font-mono text-[11px] leading-snug">
              Grounding sine drone with subtle overtone warmers
            </p>
          </button>

          <button
            onClick={() => handleSoundTypeSelect('rain')}
            id="sound-type-rain-btn"
            className={`p-4 border-3 border-black text-left cursor-pointer flex flex-col justify-between transition-all ${
              activeSound === 'rain'
                ? 'bg-[#e0533c] text-white shadow-[5px_5px_0px_#000] -translate-y-1'
                : 'bg-[#1e1a1d] text-[#d6c8c5] hover:bg-[#282226] shadow-[2px_2px_0px_#000]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-heading font-black text-sm uppercase">Forest Rain</span>
              <CloudRain className="w-4 h-4 stroke-[2.5]" />
            </div>
            <p className="font-mono text-[11px] leading-snug">
              Broadband stochastic droplet masking soundscape
            </p>
          </button>
        </div>

        {/* Sliders Grid: Brightness & Volume + CTA Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-2">
          {/* Brightness Slider */}
          <div className="lg:col-span-4 bg-[#110e11] p-4 border-2 border-black shadow-[3px_3px_0px_#000]">
            <div className="flex items-center justify-between font-mono text-xs font-black text-[#ffd166] mb-2 uppercase">
              <span className="flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 stroke-[2.5]" />
                <span id="brightness-label">Luminance:</span>
              </span>
              <span className="bg-black text-white px-1.5 py-0.5 border border-black">{sensorySettings.brightness}%</span>
            </div>
            <input
              type="range"
              id="brightness-slider"
              aria-labelledby="brightness-label"
              min="30"
              max="100"
              value={sensorySettings.brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="w-full h-2.5 bg-[#1e1a1d] border border-black appearance-none cursor-pointer accent-[#ffd166]"
            />
            <div className="flex justify-between font-mono text-[9px] text-[#d6c8c5]/70 mt-1 uppercase">
              <span>Dim (30%)</span>
              <span>Mid (65%)</span>
              <span>Full (100%)</span>
            </div>
          </div>

          {/* Sound / Volume Slider */}
          <div className="lg:col-span-4 bg-[#110e11] p-4 border-2 border-black shadow-[3px_3px_0px_#000]">
            <div className="flex items-center justify-between font-mono text-xs font-black text-[#06d6a0] mb-2 uppercase">
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 stroke-[2.5]" />
                <span id="sound-label">Acoustic Gain:</span>
              </span>
              <span className="bg-black text-white px-1.5 py-0.5 border border-black">
                {sensorySettings.volume === 0 ? 'MUTED' : `${sensorySettings.volume}%`}
              </span>
            </div>
            <input
              type="range"
              id="sound-slider"
              aria-labelledby="sound-label"
              min="0"
              max="100"
              value={sensorySettings.volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-full h-2.5 bg-[#1e1a1d] border border-black appearance-none cursor-pointer accent-[#06d6a0]"
            />
            <div className="flex justify-between font-mono text-[9px] text-[#d6c8c5]/70 mt-1 uppercase">
              <span>0% Mute</span>
              <span>40% Gentle</span>
              <span>100% Full</span>
            </div>
          </div>

          {/* "Begin When Ready" Button */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <button
              onClick={onBeginRehearsal}
              id="begin-when-ready-btn"
              className="w-full py-4.5 bg-[#ffd166] hover:bg-[#ffe28a] text-black font-heading font-black text-base uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>ENTER VR REHEARSAL</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

