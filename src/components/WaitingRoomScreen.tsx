import React, { useState } from 'react';
import { LobbyIllustration } from './VectorIllustrations';
import { SensorySettings } from '../types';
import { Sun, Volume2, Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Eye, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { updateVolume, startCalmingSound, stopCalmingSound } from '../utils/audio';

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
  const [breathingStep, setBreathingStep] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');

  const handleBrightnessChange = (val: number) => {
    onUpdateSensory({ brightness: val });
  };

  const handleVolumeChange = (val: number) => {
    onUpdateSensory({ volume: val });
    if (val > 0) {
      startCalmingSound(val);
    } else {
      stopCalmingSound();
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Header Context */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02C39A]">
            <span>Screen 2 of 4</span>
            <span>&bull;</span>
            <span>Sensory Acclimation Lobby</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Sensory Waiting Room
          </h2>
          <p className="text-sm text-[#99F6E4]/80 mt-0.5">
            Calibrate ambient sensory lighting and sound levels to your comfort before entering the interview.
          </p>
        </div>

        {/* Sensory comfort badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#03343A] border border-[#00A896]/50 text-xs text-[#5EEAD4] self-start sm:self-auto">
          <ShieldCheck className="w-4 h-4 text-[#02C39A]" />
          <span>Zero Time-Pressure Reassurance</span>
        </div>
      </div>

      {/* Main Illustration Scene Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative flex-1 min-h-[300px] sm:min-h-[400px] max-h-[460px] w-full rounded-2xl overflow-hidden shadow-2xl border border-[#028090]/40 bg-[#011C1F]"
      >
        {/* CSS/SVG Illustrated Lobby Scene (Window, Plant, Couch with Avatar) */}
        <LobbyIllustration brightness={sensorySettings.brightness} />

        {/* Ambient overlay HUD chips */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          <div className="px-2.5 py-1 rounded-lg bg-[#022F33]/85 backdrop-blur-md border border-[#02C39A]/40 text-xs text-white flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#02C39A] animate-pulse"></span>
            <span>VR Lobby &bull; Low Sensory Stimulation</span>
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-[#022F33]/85 backdrop-blur-md border border-[#028090]/40 text-xs text-[#99F6E4] flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-[#02C39A]" />
            <span>Brightness: {sensorySettings.brightness}%</span>
          </div>
        </div>

        {/* Calming Tip Badge in corner */}
        <div className="absolute top-4 right-4 hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-[#022F33]/85 backdrop-blur-md border border-[#028090]/40 text-xs text-[#CCFBF1]">
          <HeartHandshake className="w-3.5 h-3.5 text-[#02C39A]" />
          <span>Begin whenever you feel completely ready</span>
        </div>
      </motion.div>

      {/* Bottom Sensory Controls & Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mt-5 bg-[#03343A] border border-[#00A896]/60 rounded-2xl p-4 sm:p-5 shadow-xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Brightness Slider */}
          <div className="lg:col-span-4 bg-[#022A2E] p-3.5 rounded-xl border border-[#028090]/40">
            <div className="flex items-center justify-between text-xs font-semibold text-[#CCFBF1] mb-2">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-[#FEF08A]" />
                <span id="brightness-label">Scene Brightness</span>
              </div>
              <span className="font-mono text-[#5EEAD4]">{sensorySettings.brightness}%</span>
            </div>
            <input
              type="range"
              id="brightness-slider"
              aria-labelledby="brightness-label"
              min="30"
              max="100"
              value={sensorySettings.brightness}
              onChange={(e) => handleBrightnessChange(Number(e.target.value))}
              className="w-full h-2 bg-[#044D54] rounded-lg appearance-none cursor-pointer accent-[#02C39A]"
            />
            <div className="flex justify-between text-[10px] text-[#99F6E4]/60 mt-1">
              <span>Dim / Soft</span>
              <span>Balanced</span>
              <span>Bright</span>
            </div>
          </div>

          {/* Sound / Volume Slider */}
          <div className="lg:col-span-4 bg-[#022A2E] p-3.5 rounded-xl border border-[#028090]/40">
            <div className="flex items-center justify-between text-xs font-semibold text-[#CCFBF1] mb-2">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[#02C39A]" />
                <span id="sound-label">Sensory Sound level</span>
              </div>
              <span className="font-mono text-[#5EEAD4]">
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
              className="w-full h-2 bg-[#044D54] rounded-lg appearance-none cursor-pointer accent-[#02C39A]"
            />
            <div className="flex justify-between text-[10px] text-[#99F6E4]/60 mt-1">
              <span>Silent</span>
              <span>432Hz Ambient Drone</span>
              <span>Full</span>
            </div>
          </div>

          {/* "Begin When Ready" Button */}
          <div className="lg:col-span-4 flex items-center justify-end">
            <button
              onClick={onBeginRehearsal}
              id="begin-when-ready-btn"
              className="w-full lg:w-auto px-7 py-3.5 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] hover:text-white font-bold text-base shadow-lg shadow-[#02C39A]/20 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Begin When Ready</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
