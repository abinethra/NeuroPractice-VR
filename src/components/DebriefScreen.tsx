import React from 'react';
import { DifficultyLevel, IntakeConfig, SessionExchange } from '../types';
import { DIFFICULTY_PALETTE, INTERVIEW_SCENARIOS } from '../data/interviewScenarios';
import { 
  Award, CheckCircle2, AlertTriangle, Target, RotateCcw, Download,
  Sparkles, FileText, User, Activity, Clock, ShieldCheck, ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { downloadOfflineHtml } from '../utils/offlineHtmlGenerator';

interface DebriefScreenProps {
  intakeConfig: IntakeConfig;
  difficulty: DifficultyLevel;
  lastExchange: SessionExchange | null;
  onRestartDemo: () => void;
}

export const DebriefScreen: React.FC<DebriefScreenProps> = ({
  intakeConfig,
  difficulty,
  lastExchange,
  onRestartDemo,
}) => {
  const currentScenario = INTERVIEW_SCENARIOS[difficulty] || INTERVIEW_SCENARIOS.easy;
  const activeDotColor = DIFFICULTY_PALETTE[difficulty] || '#02C39A';

  // Calculate score (out of 10)
  const score = lastExchange?.appropriateScore || (difficulty === 'hard' ? 10 : 9);
  
  // Auto-generate clinical debrief notes based on difficulty and exchange
  const generateDebriefNotes = (): string[] => {
    if (difficulty === 'hard') {
      return [
        'Handled the rapid interruption and follow-up challenge with high executive maturity.',
        'Took extra time on question formulation (+4.2s pause) — discuss pacing and cognitive pause self-advocacy.',
        'Maintained steady composure and factual non-defensive accountability under pressure.'
      ];
    }
    if (difficulty === 'moderate') {
      return [
        'Demonstrated concise communication and balanced synchronous/asynchronous styles.',
        'Brief pause detected before answering — pacing was deliberate and well-regulated.',
        'Effectively negotiated workplace priority trade-offs using objective criteria.'
      ];
    }
    return [
      'Successfully structured the response using calm step-by-step problem-solving.',
      'Slight initial processing pause (+3.8s) before starting response — well-regulated and calm.',
      'Exhibited strong self-awareness and proactive help-seeking without sensory overload.'
    ];
  };

  const debriefNotes = generateDebriefNotes();
  const flaggedCount = 1; // 1 long pause moment detected

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Top Header Badge */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02C39A] mb-1">
          <span>Screen 5 of 5</span>
          <span>&bull;</span>
          <span>Post-Session Clinical Debrief</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
          Session Debrief &amp; Clinical Summary
        </h2>
        <p className="text-sm text-[#99F6E4]/80 mt-1 max-w-2xl">
          Comprehensive post-rehearsal analysis highlighting behavioral goal progress, pacing flags, and clinical discussion takeaways.
        </p>
      </div>

      {/* Main Debrief Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-[#011C1E] rounded-3xl border-2 border-[#028090]/50 shadow-2xl p-5 sm:p-7 flex flex-col gap-6"
      >
        {/* Debrief Top Bar */}
        <div className="flex flex-wrap items-center justify-between pb-3 border-b border-[#028090]/30 text-xs text-[#99F6E4] gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#02C39A]" />
            <span className="font-bold text-white uppercase tracking-wider">Clinical Rehearsal Report</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-slate-400">Participant: {intakeConfig.participantName || 'Jordan M.'}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#02C39A]/20 text-[#5EEAD4] border border-[#02C39A]/40 font-mono text-[11px]">
              STATUS: COMPLETED
            </span>
          </div>
        </div>

        {/* 4 Core Summary Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Tile 1: Session Goal */}
          <div className="bg-[#032A2E] rounded-2xl p-4 border border-[#028090]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#99F6E4]/70 mb-1.5">
              <span className="font-semibold uppercase tracking-wider">Session Goal</span>
              <Target className="w-4 h-4 text-[#02C39A]" />
            </div>
            <div className="text-sm font-bold text-white leading-snug line-clamp-2">
              {intakeConfig.sessionGoal || 'Build confidence answering behavioral questions'}
            </div>
            <div className="mt-2 text-[10px] text-[#02C39A] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Target Addressed
            </div>
          </div>

          {/* Tile 2: Scenario Completed */}
          <div className="bg-[#032A2E] rounded-2xl p-4 border border-[#028090]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#99F6E4]/70 mb-1.5">
              <span className="font-semibold uppercase tracking-wider">Scenario</span>
              <FileText className="w-4 h-4 text-[#028090]" />
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-snug">
                {currentScenario.scenarioTitle}
              </div>
              <div className="text-[11px] font-bold mt-1 flex items-center gap-1.5" style={{ color: activeDotColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeDotColor }} />
                <span>Difficulty: {difficulty.toUpperCase()}</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-[#99F6E4]/70">
              Workplace Behavioral Interview
            </div>
          </div>

          {/* Tile 3: Flagged Moments */}
          <div className="bg-[#032A2E] rounded-2xl p-4 border border-[#F4A261]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#F4A261] mb-1.5">
              <span className="font-semibold uppercase tracking-wider">Flagged Moments</span>
              <AlertTriangle className="w-4 h-4 text-[#F4A261]" />
            </div>
            <div className="text-2xl font-extrabold text-white">
              {flaggedCount} <span className="text-xs font-medium text-[#F4A261]">moment</span>
            </div>
            <div className="mt-2 text-[11px] text-[#F4A261] font-semibold flex items-center gap-1">
              <Clock className="w-3 h-3" /> Long pause detected (+4.2s)
            </div>
          </div>

          {/* Tile 4: Score out of 10 */}
          <div className="bg-[#032A2E] rounded-2xl p-4 border border-[#02C39A]/40 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#02C39A] mb-1.5">
              <span className="font-semibold uppercase tracking-wider">Appropriate Score</span>
              <Award className="w-4 h-4 text-[#02C39A]" />
            </div>
            <div className="text-2xl font-extrabold text-white flex items-baseline gap-1">
              <span className="text-[#02C39A]">{score}</span>
              <span className="text-sm text-slate-400 font-normal">/ 10</span>
            </div>
            <div className="mt-2 text-[10px] text-[#5EEAD4] font-bold">
              High Social Competence
            </div>
          </div>
        </div>

        {/* Auto-Generated Clinician Notes Section */}
        <div className="bg-white text-slate-800 rounded-2xl p-5 shadow-lg border border-slate-100 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#028090]" />
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#028090]">
                Auto-Generated Clinical Debrief Notes
              </h3>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">Session Evaluation</span>
          </div>

          <div className="space-y-2.5">
            {debriefNotes.map((note, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-[#02C39A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{note}</span>
              </div>
            ))}
          </div>

          {/* Last Exchange Excerpt */}
          {lastExchange && (
            <div className="mt-3 pt-3 border-t border-slate-100 bg-[#E6FFFA]/50 p-3.5 rounded-xl border border-[#99F6E4]/60">
              <div className="text-[11px] font-bold text-[#0D9488] uppercase mb-1">
                Recorded Response Excerpt:
              </div>
              <p className="text-xs text-slate-800 italic">
                "{lastExchange.userResponseText}"
              </p>
              <div className="mt-1.5 text-[11px] text-[#028090] font-medium">
                <strong>Clinician Feedback:</strong> {lastExchange.clinicianNotes}
              </div>
            </div>
          )}
        </div>

        {/* Action Toolbar: Restart Demo Button (Prominent here!) & Offline Download */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#028090]/30">
          <button
            onClick={downloadOfflineHtml}
            id="debrief-download-offline-btn"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#032A2E] hover:bg-[#043E44] text-[#CCFBF1] hover:text-white border border-[#028090] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-[#5EEAD4]" />
            <span>Download Offline HTML Report</span>
          </button>

          <button
            onClick={onRestartDemo}
            id="restart-demo-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] hover:text-white font-extrabold text-sm shadow-xl shadow-[#02C39A]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
            <span>Restart Demo (New Session)</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Context Info */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#99F6E4]/60">
        <Sparkles className="w-3.5 h-3.5 text-[#02C39A]" />
        <span>Step 5 of 5: Session Completed &bull; Debriefing &amp; Longitudinal Tracking</span>
      </div>
    </div>
  );
};
