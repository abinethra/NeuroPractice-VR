import React from 'react';
import { Sparkles, ArrowRight, Shield, Activity, Brain, CheckCircle2, Sliders, Monitor, Zap, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface TitleScreenProps {
  onStartDemo: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({ onStartDemo }) => {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between py-6 px-4 sm:px-6 w-full max-w-7xl mx-auto">
      {/* Top Ticker Ribbon */}
      <div className="w-full bg-[#ffd166] text-black border-2 border-black font-mono text-[11px] font-black py-1 px-3 shadow-[3px_3px_0px_#000] uppercase tracking-widest flex items-center justify-between mb-8 overflow-hidden">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[#e0533c] animate-ping" />
          <span>NEUROPRACTICE LAB // CLINICAL VR PROTOCOL // V2.4 RUNTIME READY</span>
        </span>
        <span className="hidden sm:inline font-bold">BIOFEEDBACK &bull; SENSORY REGULATION &bull; LOW-STIM AVATARS</span>
      </div>

      {/* Main Editorial Poster Section */}
      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch my-auto">
        {/* Left Massive Editorial Statement (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between text-left">
          <div>
            {/* Stamped Tag */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#1a1618] border-2 border-black text-[#ffd166] text-xs font-mono font-bold uppercase tracking-wider mb-4 shadow-[3px_3px_0px_#000] -rotate-1"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>INTERACTIVE CLINICAL SIMULATION &bull; 6-STAGE ENGINE</span>
            </motion.div>

            {/* Giant Display Title */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="font-heading font-black text-5xl sm:text-7xl md:text-8xl text-white tracking-tighter leading-[0.95] mb-4 uppercase"
            >
              NEURO<br />
              <span className="text-[#ffd166] underline decoration-4 decoration-[#e0533c] underline-offset-8">PRACTICE</span>{' '}
              <span className="inline-block bg-[#e0533c] text-black px-3 py-0.5 border-3 border-black shadow-[4px_4px_0px_#000] rotate-2 align-middle text-4xl sm:text-6xl">
                VR
              </span>
            </motion.h1>

            {/* Manifest Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-base sm:text-xl text-[#d6c8c5] font-medium leading-relaxed max-w-xl mb-8 pl-4 border-l-4 border-[#ffd166]"
            >
              Unapologetic, low-stimulation virtual reality social rehearsal designed specifically for autistic teens &amp; adults. Zero sensory overload. Real-time clinician supervision.
            </motion.p>
          </div>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <button
              onClick={onStartDemo}
              id="start-demo-btn"
              className="px-8 py-4 bg-[#e0533c] hover:bg-[#ff6b52] text-white font-heading font-black text-xl uppercase tracking-wider border-3 border-black shadow-[6px_6px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>LAUNCH SIMULATION</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform stroke-[3]" />
            </button>

            <div className="flex items-center gap-3 px-4 py-3 bg-[#171416] border-2 border-black font-mono text-xs text-[#d6c8c5] shadow-[3px_3px_0px_#000]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#06d6a0] animate-pulse" />
              <span>HARDWARE: DISCONNECTED &bull; BROWSER EMULATION ACTIVE</span>
            </div>
          </motion.div>
        </div>

        {/* Right Asymmetric Specification Grid (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between">
          {/* Spec Card 1: Sensory Regulation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#1c181b] border-3 border-black p-5 shadow-[5px_5px_0px_#000] text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#ffd166] text-black font-mono font-black text-[10px] px-2 py-0.5 border-l-2 border-b-2 border-black">
              STAGE 03
            </div>
            <div className="flex items-center gap-2 mb-2 text-[#ffd166]">
              <Sliders className="w-5 h-5 stroke-[2.5]" />
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                Sensory Calming Engine
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#d6c8c5] leading-relaxed">
              Synthesized 432Hz sine drones, ocean wave loops, and luminance controls allow autonomic regulation prior to social rehearsal.
            </p>
          </motion.div>

          {/* Spec Card 2: Adaptive Scenarios */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-[#1c181b] border-3 border-black p-5 shadow-[5px_5px_0px_#000] text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#06d6a0] text-black font-mono font-black text-[10px] px-2 py-0.5 border-l-2 border-b-2 border-black">
              STAGE 04
            </div>
            <div className="flex items-center gap-2 mb-2 text-[#06d6a0]">
              <Brain className="w-5 h-5 stroke-[2.5]" />
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                Low-Stimulation VR Avatars
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#d6c8c5] leading-relaxed">
              Vectorized interlocutors strip hyper-detailed sensory distractions to focus purely on pragmatics, timing, and response choice.
            </p>
          </motion.div>

          {/* Spec Card 3: Supervision Hub */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-[#1c181b] border-3 border-black p-5 shadow-[5px_5px_0px_#000] text-left relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-[#e0533c] text-white font-mono font-black text-[10px] px-2 py-0.5 border-l-2 border-b-2 border-black">
              STAGE 05
            </div>
            <div className="flex items-center gap-2 mb-2 text-[#e0533c]">
              <Monitor className="w-5 h-5 stroke-[2.5]" />
              <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                Therapist Command Deck
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#d6c8c5] leading-relaxed">
              Real-time mirrored telemetry, in-headset interventions (Pause, Cue Hint, Ease Off), and Chart.js longitudinal mastery tracking.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Process Manifesto Strip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-8 pt-4 border-t-2 border-black grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center"
      >
        {[
          { num: '01', title: 'Intake Specs' },
          { num: '02', title: 'Scenario Matrix' },
          { num: '03', title: 'Waiting Room' },
          { num: '04', title: 'VR Interactive' },
          { num: '05', title: 'Supervision Hub' },
          { num: '06', title: 'Debrief Export' },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-[#171416] border-2 border-black p-2 font-mono text-[11px] shadow-[2px_2px_0px_#000] flex flex-col items-center justify-center text-center"
          >
            <span className="font-black text-[#ffd166] text-xs">{item.num}</span>
            <span className="text-[#d6c8c5] font-bold uppercase">{item.title}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

