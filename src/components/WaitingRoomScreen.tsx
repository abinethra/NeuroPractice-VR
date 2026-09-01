import React, { useState } from 'react';
import { LobbyIllustration } from './VectorIllustrations';
import { SensorySettings } from '../types';
import { 
  Sun, Volume2, VolumeX, Sparkles, ArrowRight, ShieldCheck, 
  HeartHandshake, Eye, Waves, Radio, CloudRain, BellRing, Play, Pause 
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
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between text-center items-center">
      {/* Header Context */}
      <div className="mb-4 flex flex-col items-center justify-center gap-2 text-center w-full">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a26f4a]">
          <span>Screen 3 of 6</span>
          <span>&bull;</span>
          <span>Sensory Acclimation Lobby</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#d6c8c5] text-center">
          Sensory Waiting Room
        </h2>
        <p className="text-sm text-[#d6c8c5]/80 mt-0.5 max-w-2xl text-center">
          Calibrate ambient lighting, choose your acoustic sensory frequency, and adjust volume to your comfort.
        </p>

        {/* Sensory comfort badge */}
        <div className="flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1a1618] border border-[#7f3e3b]/60 text-xs text-[#d6c8c5] shadow-sm mt-1">
          <ShieldCheck className="w-4 h-4 text-[#a26f4a]" />
          <span>Zero Time-Pressure Environment</span>
        </div>
      </div>

      {/* Main Illustration Scene Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex-1 min-h-[280px] sm:min-h-[380px] max-h-[440px] w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#7f3e3b]/40 bg-[#0f0e10]"
      >
        {/* SVG Illustrated Lobby Scene */}
        <LobbyIllustration brightness={sensorySettings.brightness} />

        {/* Ambient overlay HUD chips */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          <div className="px-3 py-1 rounded-xl bg-[#0f0e10]/90 backdrop-blur-md border border-[#7f3e3b]/60 text-xs text-[#d6c8c5] flex items-center gap-1.5 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#a26f4a] animate-pulse" />
            <span>VR Lobby &bull; Low Sensory Stimulation</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-[#0f0e10]/90 backdrop-blur-md border border-[#a26f4a]/50 text-xs text-[#d6c8c5]/90 flex items-center gap-1.5 shadow-md">
            <Eye className="w-3.5 h-3.5 text-[#a26f4a]" />
            <span>Lighting: {sensorySettings.brightness}%</span>
          </div>
        </div>

        {/* Calming Tip Badge in corner */}
        <div className="absolute top-4 right-4 hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0f0e10]/90 backdrop-blur-md border border-[#7f3e3b]/60 text-xs text-[#d6c8c5] shadow-md">
          <HeartHandshake className="w-3.5 h-3.5 text-[#a26f4a]" />
          <span>Begin whenever you feel completely ready</span>
        </div>

        {/* Live Audio Visualizer Pill when sound is playing */}
        {isPlayingSound && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0f0e10]/90 backdrop-blur-md border border-[#a26f4a]/60 text-xs text-[#d6c8c5] shadow-lg">
            <div className="flex items-end gap-0.5 h-3.5 w-4">
              <span className="w-1 bg-[#a26f4a] rounded-full animate-bounce h-2" />
              <span className="w-1 bg-[#7f3e3b] rounded-full animate-bounce h-3.5 delay-100" />
              <span className="w-1 bg-[#d6c8c5] rounded-full animate-bounce h-2.5 delay-200" />
            </div>
            <span className="capitalize font-semibold text-[11px]">
              {activeSound === 'ocean' ? 'Ocean Waves' : activeSound === 'drone' ? '432Hz Drone' : 'Forest Rain'} Active
            </span>
          </div>
        )}
      </motion.div>

      {/* Bottom Sensory Controls & Sound Engine Config */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="w-full mt-4 bg-[#1a1618] border-2 border-[#7f3e3b]/50 rounded-3xl p-4 sm:p-5 shadow-2xl flex flex-col gap-4 text-center"
      >
        {/* Sound Selection Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#7f3e3b]/30">
          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            <Sparkles className="w-4 h-4 text-[#a26f4a]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#d6c8c5]">
              Calming Sensory Sound Generator (Web Audio API)
            </span>
          </div>

          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            {/* Play/Pause Button */}
            <button
              onClick={toggleSoundPlayback}
              id="sound-toggle-play-btn"
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isPlayingSound
                  ? 'bg-[#7f3e3b] text-white border-[#a26f4a] shadow-md'
                  : 'bg-[#251f22] text-[#d6c8c5] border-[#7f3e3b]/50 hover:border-[#a26f4a]'
              }`}
            >
              {isPlayingSound ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#a26f4a]" />}
              <span>{isPlayingSound ? 'Pause Audio' : 'Play Audio'}</span>
            </button>

            {/* Test Soft Chime */}
            <button
              onClick={handleTestChime}
              id="sound-test-chime-btn"
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#251f22] hover:bg-[#342a2d] text-[#d6c8c5] border border-[#7f3e3b]/50 hover:border-[#a26f4a] flex items-center gap-1.5 transition-all cursor-pointer"
              title="Play 528Hz calming focus chime"
            >
              <BellRing className="w-3.5 h-3.5 text-[#a26f4a]" />
              <span>Test Soft Chime</span>
            </button>
          </div>
        </div>

        {/* Sensory Sound Types (3 options) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => handleSoundTypeSelect('ocean')}
            id="sound-type-ocean-btn"
            className={`p-3 rounded-2xl border transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 ${
              activeSound === 'ocean'
                ? 'bg-[#7f3e3b]/30 border-[#a26f4a] ring-1 ring-[#a26f4a] text-white'
                : 'bg-[#251f22] border-[#7f3e3b]/30 text-[#d6c8c5]/80 hover:border-[#a26f4a]/60'
            }`}
          >
            <div className={`p-2 rounded-xl ${activeSound === 'ocean' ? 'bg-[#7f3e3b] text-white' : 'bg-[#1a1618] text-[#a26f4a]'}`}>
              <Waves className="w-4 h-4" />
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-[#d6c8c5] text-center">Ocean Waves</div>
              <div className="text-[10px] text-[#d6c8c5]/60 text-center">4s breathing rhythm LFO</div>
            </div>
          </button>

          <button
            onClick={() => handleSoundTypeSelect('drone')}
            id="sound-type-drone-btn"
            className={`p-3 rounded-2xl border transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 ${
              activeSound === 'drone'
                ? 'bg-[#7f3e3b]/30 border-[#a26f4a] ring-1 ring-[#a26f4a] text-white'
                : 'bg-[#251f22] border-[#7f3e3b]/30 text-[#d6c8c5]/80 hover:border-[#a26f4a]/60'
            }`}
          >
            <div className={`p-2 rounded-xl ${activeSound === 'drone' ? 'bg-[#7f3e3b] text-white' : 'bg-[#1a1618] text-[#a26f4a]'}`}>
              <Radio className="w-4 h-4" />
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-[#d6c8c5] text-center">432Hz Ambient Drone</div>
              <div className="text-[10px] text-[#d6c8c5]/60 text-center">Harmonic grounding chord</div>
            </div>
          </button>

          <button
            onClick={() => handleSoundTypeSelect('rain')}
            id="sound-type-rain-btn"
            className={`p-3 rounded-2xl border transition-all text-center cursor-pointer flex flex-col items-center justify-center gap-2 ${
              activeSound === 'rain'
                ? 'bg-[#7f3e3b]/30 border-[#a26f4a] ring-1 ring-[#a26f4a] text-white'
                : 'bg-[#251f22] border-[#7f3e3b]/30 text-[#d6c8c5]/80 hover:border-[#a26f4a]/60'
            }`}
          >
            <div className={`p-2 rounded-xl ${activeSound === 'rain' ? 'bg-[#7f3e3b] text-white' : 'bg-[#1a1618] text-[#a26f4a]'}`}>
              <CloudRain className="w-4 h-4" />
            </div>
            <div className="text-center">
              <div className="text-xs font-bold text-[#d6c8c5] text-center">Forest Rain</div>
              <div className="text-[10px] text-[#d6c8c5]/60 text-center">Soft natural noise filtering</div>
            </div>
          </button>
        </div>

        {/* Sliders Grid: Brightness & Volume */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center pt-1 text-center">
          {/* Brightness Slider */}
          <div className="lg:col-span-4 bg-[#251f22] p-3.5 rounded-2xl border border-[#7f3e3b]/40 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#d6c8c5] mb-2">
              <Sun className="w-4 h-4 text-[#a26f4a]" />
              <span id="brightness-label">Scene Brightness:</span>
              <span className="font-mono text-[#a26f4a] font-bold">{sensorySettings.brightness}%</span>
            </div>
            <input
              type="range"
              id="brightness-slider"
              aria-labelledby="brightness-label"
              min="30"
              max="100"
              value={sensorySettings.brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="w-full h-2 bg-[#141012] rounded-lg appearance-none cursor-pointer accent-[#7f3e3b]"
            />
            <div className="flex justify-between text-[10px] text-[#d6c8c5]/60 mt-1">
              <span>Dim / Soft</span>
              <span>Balanced</span>
              <span>Bright</span>
            </div>
          </div>

          {/* Sound / Volume Slider */}
          <div className="lg:col-span-4 bg-[#251f22] p-3.5 rounded-2xl border border-[#7f3e3b]/40 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#d6c8c5] mb-2">
              <Volume2 className="w-4 h-4 text-[#a26f4a]" />
              <span id="sound-label">Sensory Volume:</span>
              <span className="font-mono text-[#a26f4a] font-bold">
                {sensorySettings.volume === 0 ? 'Muted' : `${sensorySettings.volume}%`}
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
              className="w-full h-2 bg-[#141012] rounded-lg appearance-none cursor-pointer accent-[#7f3e3b]"
            />
            <div className="flex justify-between text-[10px] text-[#d6c8c5]/60 mt-1">
              <span>Mute (0%)</span>
              <span>Subtle (40%)</span>
              <span>Full (100%)</span>
            </div>
          </div>

          {/* "Begin When Ready" Button */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <button
              onClick={onBeginRehearsal}
              id="begin-when-ready-btn"
              className="w-full py-4 rounded-full bg-[#7f3e3b] hover:bg-[#944945] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-[#7f3e3b]/30 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group border border-[#a26f4a]/50"
            >
              <span>Begin When Ready</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#d6c8c5]" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
