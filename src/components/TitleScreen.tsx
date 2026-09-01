import React from 'react';
import { Sparkles, ArrowRight, Shield, Activity, Brain, CheckCircle2, Sliders, Monitor } from 'lucide-react';
import { motion } from 'motion/react';

interface TitleScreenProps {
  onStartDemo: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartDemo }) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4 sm:px-6">
      {/* Subtle background ambient graphic accents (Pure SVG vector gradients, no external images) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="300" fill="url(#bgGlow1)" />
          <circle cx="800" cy="600" r="350" fill="url(#bgGlow2)" />
          <defs>
            <radialGradient id="bgGlow1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(300)">
              <stop stopColor="#00A896" stopOpacity="0.4" />
              <stop offset="1" stopColor="#022F33" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="bgGlow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 600) rotate(90) scale(350)">
              <stop stopColor="#02C39A" stopOpacity="0.3" />
              <stop offset="1" stopColor="#022F33" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10 w-full">
        {/* Pitch / Hackathon Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#033E44] border border-[#00A896]/60 text-[#5EEAD4] text-xs sm:text-sm font-semibold mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#02C39A]" />
          <span>Interactive Hackathon Pitch Prototype &bull; No Headset Required</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-5"
        >
          NeuroPractice <span className="text-[#02C39A]">VR</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-2xl text-[#CCFBF1] font-medium max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Immersive social-skills rehearsal for autistic teens &amp; adults
        </motion.p>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <button
            onClick={onStartDemo}
            id="start-demo-btn"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] hover:text-white font-bold text-lg shadow-xl shadow-[#02C39A]/25 hover:shadow-[#00A896]/40 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <span>Start Demo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>

        {/* 3 Core Architecture Pillars (Clinical & Calm Presentation) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left"
        >
          {/* Pillar 1 */}
          <div className="bg-[#03343A]/90 border border-[#028090]/50 rounded-2xl p-5 shadow-lg backdrop-blur-sm hover:border-[#00A896] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#028090]/30 border border-[#02C39A]/40 flex items-center justify-center mb-3.5 text-[#02C39A]">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              Sensory Regulation First
            </h3>
            <p className="text-[#99F6E4]/80 text-sm leading-relaxed">
              Safe waiting environment with customizable lighting and acoustic thresholds to prevent sensory overload before rehearsal.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#03343A]/90 border border-[#028090]/50 rounded-2xl p-5 shadow-lg backdrop-blur-sm hover:border-[#00A896] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#028090]/30 border border-[#02C39A]/40 flex items-center justify-center mb-3.5 text-[#02C39A]">
              <Brain className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              Adaptive Branching Scenarios
            </h3>
            <p className="text-[#99F6E4]/80 text-sm leading-relaxed">
              Tiered conversational difficulty (Easy, Moderate, Hard) with low-stimulation vector avatars that isolate real-world communication skills.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#03343A]/90 border border-[#028090]/50 rounded-2xl p-5 shadow-lg backdrop-blur-sm hover:border-[#00A896] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-[#028090]/30 border border-[#02C39A]/40 flex items-center justify-center mb-3.5 text-[#02C39A]">
              <Monitor className="w-5 h-5" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5 flex items-center gap-2">
              Therapist Supervision Hub
            </h3>
            <p className="text-[#99F6E4]/80 text-sm leading-relaxed">
              Real-time mirrored telemetry, in-session cue controls (Pause, Cue Hint, Ease Off), and quantitative longitudinal progress tracking.
            </p>
          </div>
        </motion.div>

        {/* Rehearsal Flow Preview Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 pt-6 border-t border-[#028090]/30 flex flex-wrap items-center justify-center gap-6 text-xs text-[#99F6E4]/70"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#02C39A]"></span>
            <span>1. Title Overview</span>
          </div>
          <span className="text-[#028090]">&rarr;</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00A896]"></span>
            <span>2. Sensory Lobby</span>
          </div>
          <span className="text-[#028090]">&rarr;</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#028090]"></span>
            <span>3. VR Rehearsal</span>
          </div>
          <span className="text-[#028090]">&rarr;</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5EEAD4]"></span>
            <span>4. Clinician Dashboard</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
