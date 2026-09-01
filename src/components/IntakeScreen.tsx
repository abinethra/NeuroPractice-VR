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
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between text-center items-center">
      {/* Top Header Badge */}
      <div className="mb-4 text-center flex flex-col items-center">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a26f4a] mb-1">
          <span>Clinical Intake &amp; Setup</span>
          <span>&bull;</span>
          <span>Screen 1 of 6</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#d6c8c5] text-center">
          Therapist Session Intake Configuration
        </h2>
        <p className="text-sm text-[#d6c8c5]/80 mt-1 max-w-2xl text-center">
          Configure clinical objectives, starting difficulty tier, and participant behavioral targets before opening the VR sensory lobby.
        </p>
      </div>

      {/* Main Intake Form Container */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full bg-[#1a1618] rounded-3xl border-2 border-[#7f3e3b]/50 shadow-2xl p-5 sm:p-7 flex flex-col gap-6 text-center"
      >
        {/* Therapist Header Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-3 border-b border-[#7f3e3b]/30 text-xs text-[#d6c8c5] gap-2">
          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            <ClipboardList className="w-4 h-4 text-[#a26f4a]" />
            <span className="font-bold text-white uppercase tracking-wider">Clinician Intake Form</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#7f3e3b]/30 text-[#d6c8c5] border border-[#a26f4a]/40 font-mono text-[11px] mx-auto sm:mx-0">
            Session Ref: #NP-8821
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-center">
          {/* Participant Info */}
          <div className="space-y-2 flex flex-col items-center text-center">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d6c8c5] flex items-center justify-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#a26f4a]" />
              <span>Participant Name / ID</span>
            </label>
            <input
              type="text"
              id="participant-name-input"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full text-center px-4 py-2.5 rounded-xl bg-[#251f22] border border-[#7f3e3b]/50 text-white placeholder-[#d6c8c5]/40 text-sm focus:outline-none focus:border-[#a26f4a] focus:ring-1 focus:ring-[#a26f4a]"
              placeholder="e.g. Jordan M."
              required
            />
          </div>

          {/* Session Goal Dropdown (Required) */}
          <div className="space-y-2 flex flex-col items-center text-center">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d6c8c5] flex items-center justify-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#a26f4a]" />
              <span>Primary Session Goal</span>
            </label>
            <div className="relative w-full">
              <select
                id="session-goal-select"
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                className="w-full text-center px-4 py-2.5 rounded-xl bg-[#251f22] border border-[#7f3e3b]/50 text-white text-sm focus:outline-none focus:border-[#a26f4a] focus:ring-1 focus:ring-[#a26f4a] cursor-pointer appearance-none pr-10"
              >
                {SESSION_GOALS.map((goal, idx) => (
                  <option key={idx} value={goal} className="bg-[#1a1618] text-white">
                    {goal}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#d6c8c5]/70">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Starting Difficulty Selector */}
        <div className="space-y-2.5 text-center flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
            <label className="text-xs font-bold uppercase tracking-wider text-[#d6c8c5] flex items-center justify-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#a26f4a]" />
              <span>Starting Difficulty Tier</span>
            </label>
            <div className="flex items-center justify-center gap-1.5 text-xs">
              <span className="text-[#d6c8c5]/70">(Selected:</span>
              <span className="font-bold uppercase flex items-center gap-1" style={{ color: activeDotColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeDotColor }} />
                {difficulty}
              </span>
              <span className="text-[#d6c8c5]/70">)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            {/* Easy */}
            <div
              onClick={() => setDifficulty('easy')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                difficulty === 'easy'
                  ? 'bg-[#7f3e3b]/30 border-[#a26f4a] ring-1 ring-[#a26f4a]'
                  : 'bg-[#251f22] border-[#7f3e3b]/40 hover:border-[#a26f4a]/60'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7f3e3b]" />
                <span className="font-extrabold text-sm text-white">Easy</span>
                <HeartHandshake className="w-4 h-4 text-[#a26f4a]" />
              </div>
              <p className="text-xs text-[#d6c8c5]/80 leading-relaxed text-center">
                NPC is warm &amp; supportive; response options are longer with emotional self-regulation cues.
              </p>
            </div>

            {/* Moderate */}
            <div
              onClick={() => setDifficulty('moderate')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                difficulty === 'moderate'
                  ? 'bg-[#a26f4a]/25 border-[#a26f4a] ring-1 ring-[#a26f4a]'
                  : 'bg-[#251f22] border-[#7f3e3b]/40 hover:border-[#a26f4a]/70'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#a26f4a]" />
                <span className="font-extrabold text-sm text-white">Moderate</span>
                <Briefcase className="w-4 h-4 text-[#a26f4a]" />
              </div>
              <p className="text-xs text-[#d6c8c5]/80 leading-relaxed text-center">
                NPC is neutral and professional; responses are concise with standard interview pacing.
              </p>
            </div>

            {/* Hard */}
            <div
              onClick={() => setDifficulty('hard')}
              className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center ${
                difficulty === 'hard'
                  ? 'bg-[#7f3e3b]/40 border-[#d6c8c5] ring-1 ring-[#d6c8c5]'
                  : 'bg-[#251f22] border-[#7f3e3b]/40 hover:border-[#d6c8c5]/60'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#d6c8c5]" />
                <span className="font-extrabold text-sm text-white">Hard</span>
                <Zap className="w-4 h-4 text-[#d6c8c5]" />
              </div>
              <p className="text-xs text-[#d6c8c5]/80 leading-relaxed text-center">
                NPC interrupts / rapid follow-up; options include "ask for a moment to think".
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Supervision Strategy Notes */}
        <div className="space-y-2 flex flex-col items-center text-center">
          <label className="text-xs font-bold uppercase tracking-wider text-[#d6c8c5] flex items-center justify-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#a26f4a]" />
            <span>Therapist Pre-Session Notes</span>
          </label>
          <textarea
            rows={2}
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            className="w-full text-center px-4 py-2.5 rounded-xl bg-[#251f22] border border-[#7f3e3b]/50 text-white placeholder-[#d6c8c5]/40 text-xs sm:text-sm focus:outline-none focus:border-[#a26f4a] focus:ring-1 focus:ring-[#a26f4a] resize-none"
            placeholder="Clinical observation guidance..."
          />
        </div>

        {/* Action Button: Start Session -> Goes to Scenario Select */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-[#7f3e3b]/30">
          <div className="flex items-center justify-center gap-2 text-xs text-[#d6c8c5]/70 text-center">
            <ShieldCheck className="w-4 h-4 text-[#a26f4a]" />
            <span>Telemetry calibrated &bull; Proceeding with <strong>{difficulty.toUpperCase()}</strong> preset</span>
          </div>

          <button
            type="submit"
            id="start-session-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#7f3e3b] hover:bg-[#944945] text-white font-extrabold text-sm shadow-xl shadow-[#7f3e3b]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group border border-[#a26f4a]/50 mx-auto"
          >
            <span>Next: Choose Scenario</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#d6c8c5]" />
          </button>
        </div>
      </motion.form>

      {/* Bottom Context Info */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#d6c8c5]/60 text-center">
        <Sparkles className="w-3.5 h-3.5 text-[#a26f4a]" />
        <span>Step 1 of 6: Intake Calibration &bull; Pre-session setup</span>
      </div>
    </div>
  );
};
