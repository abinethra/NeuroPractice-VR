import React, { useState } from 'react';
import { DifficultyLevel, IntakeConfig } from '../types';
import { DIFFICULTY_PALETTE } from '../data/interviewScenarios';
import { 
  ClipboardList, Target, User, Sparkles, ArrowRight, 
  CheckCircle2, Sliders, ShieldCheck, HeartHandshake, Briefcase, Zap,
  Compass, Layers, FileText
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

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between items-stretch">
      {/* Top Header Badge */}
      <div className="mb-4 text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffd166] text-black font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
          <span>01 / 06 CLINICIAN DOCKET</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Session Intake &amp; Behavioral Target Configuration
        </h2>
        <p className="text-sm text-[#d6c8c5] mt-1 font-mono">
          CALIBRATE PARTICIPANT PROFILE &bull; SELECT STARTING DIFFICULTY TIER &bull; INITIALIZE VR LOBBY
        </p>
      </div>

      {/* Main Intake Form Container (Brutalist Clinical Spec Sheet) */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full bg-[#181417] border-3 border-black shadow-[6px_6px_0px_#000] p-6 sm:p-8 flex flex-col gap-6"
      >
        {/* Therapist Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b-2 border-black text-xs text-[#d6c8c5] gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
            <span className="font-mono font-black text-white uppercase tracking-widest text-xs">
              SPEC SHEET // PROTOCOL #NP-8821
            </span>
          </div>
          <span className="px-2.5 py-0.5 bg-[#e0533c] text-white border-2 border-black font-mono font-black text-[10px] shadow-[2px_2px_0px_#000] uppercase">
            STATUS: ACTIVE DRAFT
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Participant Info */}
          <div className="space-y-2 flex flex-col">
            <label className="text-xs font-mono font-black uppercase tracking-wider text-[#ffd166] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Participant Name / ID</span>
            </label>
            <input
              type="text"
              id="participant-name-input"
              value={participantName}
              onChange={(e) => setParticipantName(e.target.value)}
              className="w-full px-4 py-3 bg-[#110e11] border-2 border-black text-white font-mono text-sm placeholder-[#d6c8c5]/40 focus:outline-none focus:bg-[#1f191d] focus:border-[#ffd166] shadow-[3px_3px_0px_#000]"
              placeholder="e.g. Rahul K."
              required
            />
          </div>

          {/* Session Goal Dropdown (Required) */}
          <div className="space-y-2 flex flex-col">
            <label className="text-xs font-mono font-black uppercase tracking-wider text-[#ffd166] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Target Behavioral Objective</span>
            </label>
            <div className="relative w-full">
              <select
                id="session-goal-select"
                value={sessionGoal}
                onChange={(e) => setSessionGoal(e.target.value)}
                className="w-full px-4 py-3 bg-[#110e11] border-2 border-black text-white font-mono text-xs sm:text-sm focus:outline-none focus:bg-[#1f191d] focus:border-[#ffd166] shadow-[3px_3px_0px_#000] cursor-pointer appearance-none pr-10"
              >
                {SESSION_GOALS.map((goal, idx) => (
                  <option key={idx} value={goal} className="bg-[#110e11] text-white">
                    {goal}
                  </option>
                ))}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#ffd166] font-bold">
                ▼
              </div>
            </div>
          </div>
        </div>

        {/* Starting Difficulty Selector */}
        <div className="space-y-3 text-left flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label className="text-xs font-mono font-black uppercase tracking-wider text-[#ffd166] flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Select Conversational Difficulty Preset</span>
            </label>
            <span className="font-mono text-xs px-2 py-0.5 bg-black text-white border border-black font-bold">
              ACTIVE: {difficulty.toUpperCase()}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 w-full">
            {/* Easy */}
            <div
              onClick={() => setDifficulty('easy')}
              className={`p-4 border-3 border-black transition-all cursor-pointer flex flex-col justify-between text-left ${
                difficulty === 'easy'
                  ? 'bg-[#06d6a0] text-black shadow-[5px_5px_0px_#000] -translate-y-1'
                  : 'bg-[#1e1a1d] text-[#d6c8c5] hover:bg-[#282226] shadow-[2px_2px_0px_#000]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-heading font-black text-base uppercase ${difficulty === 'easy' ? 'text-black' : 'text-white'}`}>
                  01 Easy
                </span>
                <HeartHandshake className={`w-4 h-4 stroke-[2.5] ${difficulty === 'easy' ? 'text-black' : 'text-[#06d6a0]'}`} />
              </div>
              <p className={`text-xs font-medium leading-snug ${difficulty === 'easy' ? 'text-black' : 'text-[#d6c8c5]/80'}`}>
                NPC is warm &amp; validating. Long response windows with explicit self-regulation options.
              </p>
            </div>

            {/* Moderate */}
            <div
              onClick={() => setDifficulty('moderate')}
              className={`p-4 border-3 border-black transition-all cursor-pointer flex flex-col justify-between text-left ${
                difficulty === 'moderate'
                  ? 'bg-[#ffd166] text-black shadow-[5px_5px_0px_#000] -translate-y-1'
                  : 'bg-[#1e1a1d] text-[#d6c8c5] hover:bg-[#282226] shadow-[2px_2px_0px_#000]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-heading font-black text-base uppercase ${difficulty === 'moderate' ? 'text-black' : 'text-white'}`}>
                  02 Moderate
                </span>
                <Briefcase className={`w-4 h-4 stroke-[2.5] ${difficulty === 'moderate' ? 'text-black' : 'text-[#ffd166]'}`} />
              </div>
              <p className={`text-xs font-medium leading-snug ${difficulty === 'moderate' ? 'text-black' : 'text-[#d6c8c5]/80'}`}>
                NPC is neutral &amp; professional. Standard workplace interview pacing and direct follow-ups.
              </p>
            </div>

            {/* Hard */}
            <div
              onClick={() => setDifficulty('hard')}
              className={`p-4 border-3 border-black transition-all cursor-pointer flex flex-col justify-between text-left ${
                difficulty === 'hard'
                  ? 'bg-[#e0533c] text-white shadow-[5px_5px_0px_#000] -translate-y-1'
                  : 'bg-[#1e1a1d] text-[#d6c8c5] hover:bg-[#282226] shadow-[2px_2px_0px_#000]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`font-heading font-black text-base uppercase ${difficulty === 'hard' ? 'text-white' : 'text-white'}`}>
                  03 Hard
                </span>
                <Zap className={`w-4 h-4 stroke-[2.5] ${difficulty === 'hard' ? 'text-white' : 'text-[#e0533c]'}`} />
              </div>
              <p className={`text-xs font-medium leading-snug ${difficulty === 'hard' ? 'text-white' : 'text-[#d6c8c5]/80'}`}>
                Rapid pacing with unexpected follow-up pivots. Emphasizes asking for thinking time.
              </p>
            </div>
          </div>
        </div>

        {/* Clinical Supervision Strategy Notes */}
        <div className="space-y-2 flex flex-col text-left">
          <label className="text-xs font-mono font-black uppercase tracking-wider text-[#ffd166] flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Therapist Pre-Session Clinical Directives</span>
          </label>
          <textarea
            rows={2}
            value={clinicalNotes}
            onChange={(e) => setClinicalNotes(e.target.value)}
            className="w-full px-4 py-3 bg-[#110e11] border-2 border-black text-white font-mono text-xs sm:text-sm placeholder-[#d6c8c5]/40 focus:outline-none focus:bg-[#1f191d] focus:border-[#ffd166] shadow-[3px_3px_0px_#000] resize-none"
            placeholder="Clinical observation guidance..."
          />
        </div>

        {/* Action Button: Start Session -> Goes to Scenario Select */}
        <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t-2 border-black">
          <div className="flex items-center gap-2 font-mono text-xs text-[#d6c8c5]">
            <ShieldCheck className="w-4 h-4 text-[#06d6a0] stroke-[2.5]" />
            <span>DATA ENCRYPTION ON &bull; PRESET {difficulty.toUpperCase()} READY</span>
          </div>

          <button
            type="submit"
            id="start-session-btn"
            className="px-8 py-4 bg-[#ffd166] hover:bg-[#ffe28a] text-black font-heading font-black text-base uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>NEXT: CHOOSE SCENARIO</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
          </button>
        </div>
      </motion.form>

      {/* Bottom Context Info */}
      <div className="mt-4 flex items-center justify-between font-mono text-xs text-[#d6c8c5]/60 px-1">
        <span>STAGE: INTAKE SPECIFICATION</span>
        <span>NEUROPRACTICE OS</span>
      </div>
    </div>
  );
};

