import React from 'react';
import { Sparkles, ArrowRight, Shield, Activity, Brain, CheckCircle2, Sliders, Monitor } from 'lucide-react';
import { motion } from 'motion/react';

interface TitleScreenProps {
  onStartDemo: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartDemo }) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-4 sm:px-6">
      {/* Subtle background ambient graphic accents (Pure SVG vector gradients) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
        <svg className="w-full h-full" viewBox="0 0 1000 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="300" fill="url(#bgGlow1)" />
          <circle cx="800" cy="600" r="350" fill="url(#bgGlow2)" />
          <defs>
            <radialGradient id="bgGlow1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(300)">
              <stop stopColor="#7f3e3b" stopOpacity="0.45" />
              <stop offset="1" stopColor="#0f0e10" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="bgGlow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(800 600) rotate(90) scale(350)">
              <stop stopColor="#a26f4a" stopOpacity="0.35" />
              <stop offset="1" stopColor="#0f0e10" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="relative max-w-4xl mx-auto text-center z-10 w-full">
        {/* Hero Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a1618] border border-[#7f3e3b]/70 text-[#d6c8c5] text-xs sm:text-sm font-semibold mb-6 shadow-md"
        >
          <Sparkles className="w-4 h-4 text-[#a26f4a]" />
          <span>Interactive Clinical Simulation &bull; Web Audio Sensory Support</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight mb-5"
        >
          NeuroPractice <span className="text-[#a26f4a]">VR</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-2xl text-[#d6c8c5] font-medium max-w-2xl mx-auto leading-relaxed mb-8"
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
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-[#7f3e3b] hover:bg-[#944945] text-white font-extrabold text-lg shadow-2xl shadow-[#7f3e3b]/40 hover:shadow-[#a26f4a]/50 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer group border border-[#a26f4a]/50"
          >
            <span>Start Demo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-[#d6c8c5]" />
          </button>
        </motion.div>

        {/* 3 Core Architecture Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 text-center"
        >
          {/* Pillar 1 */}
          <div className="bg-[#1a1618] border border-[#7f3e3b]/40 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-sm hover:border-[#a26f4a] transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-2xl bg-[#7f3e3b]/30 border border-[#a26f4a]/50 flex items-center justify-center mb-3.5 text-[#d6c8c5]">
              <Sliders className="w-5 h-5 text-[#a26f4a]" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5 flex items-center justify-center gap-2">
              Sensory Regulation First
            </h3>
            <p className="text-[#d6c8c5]/80 text-sm leading-relaxed text-center">
              Calming waiting room with ocean waves, 432Hz drones, and custom brightness to regulate arousal before entering rehearsal.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="bg-[#1a1618] border border-[#7f3e3b]/40 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-sm hover:border-[#a26f4a] transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-2xl bg-[#7f3e3b]/30 border border-[#a26f4a]/50 flex items-center justify-center mb-3.5 text-[#d6c8c5]">
              <Brain className="w-5 h-5 text-[#a26f4a]" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5 flex items-center justify-center gap-2">
              Adaptive Branching Scenarios
            </h3>
            <p className="text-[#d6c8c5]/80 text-sm leading-relaxed text-center">
              Tiered conversational difficulty (Easy, Moderate, Hard) with low-stimulation vector avatars that isolate real-world communication skills.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="bg-[#1a1618] border border-[#7f3e3b]/40 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-sm hover:border-[#a26f4a] transition-all flex flex-col items-center text-center">
            <div className="w-10 h-10 rounded-2xl bg-[#7f3e3b]/30 border border-[#a26f4a]/50 flex items-center justify-center mb-3.5 text-[#d6c8c5]">
              <Monitor className="w-5 h-5 text-[#a26f4a]" />
            </div>
            <h3 className="text-white font-bold text-base mb-1.5 flex items-center justify-center gap-2">
              Therapist Supervision Hub
            </h3>
            <p className="text-[#d6c8c5]/80 text-sm leading-relaxed text-center">
              Real-time mirrored telemetry, in-session cue controls (Pause, Cue Hint, Ease Off), and quantitative longitudinal progress tracking.
            </p>
          </div>
        </motion.div>

        {/* Rehearsal Flow Preview Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-10 pt-6 border-t border-[#7f3e3b]/30 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-[#d6c8c5]/70"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7f3e3b]" />
            <span>1. Intake</span>
          </div>
          <span className="text-[#a26f4a]">&rarr;</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#a26f4a]" />
            <span>2. Scenarios</span>
          </div>
          <span className="text-[#a26f4a]">&rarr;</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#d6c8c5]" />
            <span>3. Waiting Room</span>
          </div>
          <span className="text-[#a26f4a]">&rarr;</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7f3e3b]" />
            <span>4. VR Rehearsal</span>
          </div>
          <span className="text-[#a26f4a]">&rarr;</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#a26f4a]" />
            <span>5. Clinician Hub</span>
          </div>
          <span className="text-[#a26f4a]">&rarr;</span>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            <span>6. Debrief</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
