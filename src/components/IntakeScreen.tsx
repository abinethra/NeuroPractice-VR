import React, { useState } from 'react';
import { DifficultyLevel, IntakeConfig } from '../types';
import { DIFFICULTY_PALETTE } from '../data/interviewScenarios';
import { 
  ClipboardList, Target, User, Sparkles, ArrowRight, 
  CheckCircle2, Sliders, ShieldCheck, HeartHandshake, Briefcase, Zap,
  Compass, Layers
} from 'lucide-react';
import { motion } from 'motion/react';

interface IntakeScreenProps {
  initialConfig: IntakeConfig;
  onStartSession: (config: IntakeConfig) => void;
}

export const SESSION_GOALS = [
  'Build confidence answering behavioral questions',
  'Practice asking for a moment to think under pressure',
  'Master structured STAR-method technical responses',
  'Navigate unexpected interruptions with composure',
  'Regulate sensory stimulation while communicating'
];

export const IntakeScreen: React.FC<IntakeScreenProps> = ({
  initialConfig,
  onStartSession,
}) => {
  const [participantName, setParticipantName] = useState(initialConfig.participantName || 'Rahul K.');
  const [sessionGoal, setSessionGoal] = useState(initialConfig.sessionGoal || SESSION_GOALS[0]);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(initialConfig.startingDifficulty || 'easy');
  const [clinicalNotes, setClinicalNotes] = useState(
    initialConfig.clinicalNotes || 'Participant benefits from structured pacing and positive reinforcement during initial rehearsal rounds.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartSession({
      participantName,
      sessionGoal,
      startingDifficulty: difficulty,
      clinicalNotes,
      selectedScenarioId: initialConfig.selectedScenarioId || 'job-interview',
    });
  };

  const activeDotColor = DIFFICULTY_PALETTE[difficulty];

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Top Header Badge */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02C39A] mb-1">
          <span>Clinical Intake &amp; Setup</span>
          <span>&bull;</span>
          <span>Pre-Session Calibration</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Therapist Session Intake Configuration
        </h2>
        <p className="text-sm text-[#99F6E4]/80 mt-1 max-w-2xl">
          Configure the clinical objectives, starting difficulty tier, and participant behavioral targets before opening the VR sensory lobby.
        </p>
      </div>

      {/* Main Intake Form Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-[#011C1E] rounded-3xl border-2 border-[#028090]/50 shadow-2xl p-5 sm:p-7 flex flex-col gap-6"
      >
        {/* Therapist Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#028090]/30 text-xs text-[#99F6E4]">
          <div className="flex items-center gap-2">
            <ClipboardList className="w-4 h-4 text-[#02C39A]" />
            <span className="font-bold text-white uppercase tracking-wider">Clinician Intake Form</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#028090]/20 text-[#5EEAD4] border border-[#028090]/40 font-mono text-[11px]">
            Session Ref: #NP-8821
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Participant Info */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5EEAD4] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#02C39A]" />
              <span>Participant Name / ID</span>
            </label>
            <input
              type="text"
              id="participant-name-input"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#032A2E] border border-[#028090]/50 text-white placeholder-[#99F6E4]/40 text-sm focus:outline-none focus:border-[#02C39A] focus:ring-1 focus:ring-[#02C39A]"
              placeholder="e.g. Jordan M."
              required
            />
          </div>

          {/* Session Goal Dropdown (Required) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5EEAD4] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#02C39A]" />
              <span>Primary Session Goal</span>
            </label>
            <div className="relative">
              <select
                id="session-goal-select"
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#032A2E] border border-[#028090]/50 text-white text-sm focus:outline-none focus:border-[#02C39A] focus:ring-1 focus:ring-[#02C39A] cursor-pointer appearance-none pr-10"
              >
                {SESSION_GOALS.map((goal, idx) => (
                  <option key={idx} value={goal} className="bg-[#022F33] text-white">
                    {goal}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#99F6E4]">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Starting Difficulty Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#5EEAD4] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#02C39A]" />
              <span>Starting Difficulty Tier</span>
            </label>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#99F6E4]/70">Selected:</span>
              <span className="font-bold uppercase flex items-center gap-1.5" style={{ color: activeDotColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeDotColor }} />
                {difficulty}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Easy */}
            <div
              onClick={() => setDifficulty('easy')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                difficulty === 'easy'
                  ? 'bg-[#02C39A]/15 border-[#02C39A] ring-1 ring-[#02C39A]'
                  : 'bg-[#032A2E] border-[#028090]/40 hover:border-[#02C39A]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#02C39A]" />
                  <span className="font-extrabold text-sm text-white">Easy</span>
                </div>
                <HeartHandshake className="w-4 h-4 text-[#02C39A]" />
              </div>
              <p className="text-xs text-[#99F6E4]/80 leading-relaxed">
                NPC is warm &amp; supportive; response options are longer with emotional self-regulation cues.
              </p>
            </div>

            {/* Moderate */}
            <div
              onClick={() => setDifficulty('moderate')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                difficulty === 'moderate'
                  ? 'bg-[#028090]/25 border-[#028090] ring-1 ring-[#028090]'
                  : 'bg-[#032A2E] border-[#028090]/40 hover:border-[#028090]/70'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#028090]" />
                  <span className="font-extrabold text-sm text-white">Moderate</span>
                </div>
                <Briefcase className="w-4 h-4 text-[#028090]" />
              </div>
              <p className="text-xs text-[#99F6E4]/80 leading-relaxed">
                NPC is neutral and professional; responses are concise with standard interview pacing.
              </p>
            </div>

            {/* Hard */}
            <div
              onClick={() => setDifficulty('hard')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                difficulty === 'hard'
                  ? 'bg-[#F4A261]/20 border-[#F4A261] ring-1 ring-[#F4A261]'
                  : 'bg-[#032A2E] border-[#028090]/40 hover:border-[#F4A261]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F4A261]" />
                  <span className="font-extrabold text-sm text-white">Hard</span>
                </div>
                <Zap className="w-4 h-4 text-[#F4A261]" />
              </div>
              <p className="text-xs text-[#99F6E4]/80 leading-relaxed">
                NPC interrupts / rapid follow-up; options include "ask for a moment to think".
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Supervision Strategy Notes */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-[#5EEAD4] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#02C39A]" />
            <span>Therapist Pre-Session Notes</span>
          </label>
          <textarea
            rows={2}
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#032A2E] border border-[#028090]/50 text-white placeholder-[#99F6E4]/40 text-xs sm:text-sm focus:outline-none focus:border-[#02C39A] focus:ring-1 focus:ring-[#02C39A] resize-none"
            placeholder="Clinical observation guidance..."
          />
        </div>

        {/* Action Button: Start Session -> Goes to Waiting Room */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#028090]/30">
          <div className="flex items-center gap-2 text-xs text-[#99F6E4]/70">
            <ShieldCheck className="w-4 h-4 text-[#02C39A]" />
            <span>Telemetry calibrated &bull; Proceeding to sensory lobby with <strong>{difficulty.toUpperCase()}</strong> preset</span>
          </div>

          <button
            type="submit"
            id="start-session-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] hover:text-white font-extrabold text-sm shadow-xl shadow-[#02C39A]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Next: Choose Scenario</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.form>

      {/* Bottom Context Info */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#99F6E4]/60">
        <Sparkles className="w-3.5 h-3.5 text-[#02C39A]" />
        <span>Step 1 of 6: Intake Calibration &bull; Pre-session setup</span>
      </div>
    </div>
  );
};
