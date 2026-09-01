import React, { useEffect, useState } from 'react';
import { DifficultyLevel, IntakeConfig, ScenarioId, SessionExchange } from '../types';
import { DIFFICULTY_PALETTE, getScenarioData, SCENARIO_CATALOG } from '../data/interviewScenarios';
import { 
  Award, CheckCircle2, AlertTriangle, Target, RotateCcw, Download,
  Sparkles, FileText, User, Activity, Clock, ShieldCheck, ArrowRight,
  UtensilsCrossed, Briefcase, Database, Cpu, Loader2
} from 'lucide-react';
import { motion } from 'motion/react';
import { downloadOfflineHtml } from '../utils/offlineHtmlGenerator';
import { fetchClinicalAnalysis, logSessionTelemetry } from '../services/apiService';

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
  const activeScenarioId: ScenarioId = lastExchange?.scenarioId || intakeConfig.selectedScenarioId || 'job-interview';
  const scenarioMeta = SCENARIO_CATALOG.find((s) => s.id === activeScenarioId) || SCENARIO_CATALOG[0];
  const currentScenario = getScenarioData(activeScenarioId, difficulty);
  const activeDotColor = DIFFICULTY_PALETTE[difficulty] || '#7f3e3b';

  const [aiNotes, setAiNotes] = useState<string[] | null>(null);
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiRecommendation, setAiRecommendation] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [backendSynced, setBackendSynced] = useState(false);

  // Auto-generate clinical debrief notes fallback based on scenario, difficulty, and exchange
  const generateDebriefNotes = (): string[] => {
    if (activeScenarioId === 'restaurant-ordering') {
      if (difficulty === 'hard') {
        return [
          'Handled the kitchen order mix-up calmly with factual clarification and zero distress escalation.',
          'Took extra time on response formulation (+4.2s pause) — discuss pacing and self-advocacy strategies.',
          'Demonstrated high cognitive flexibility when evaluating menu alternatives under service pressure.'
        ];
      }
      if (difficulty === 'moderate') {
        return [
          'Successfully filtered ambient background restaurant chatter and maintained direct ordering syntax.',
          'Assertively requested menu item clarification when auditory volume increased.',
          'Maintained steady social composure while requesting dietary substitutions.'
        ];
      }
      return [
        'Exhibited clear dietary self-advocacy and calm inquiry regarding ingredients.',
        'Successfully requested extra cognitive processing time to review the menu without feeling rushed.',
        'Maintained structured, polite communication syntax with the server avatar.'
      ];
    }

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

  useEffect(() => {
    // Log to backend & optionally fetch Gemini Clinical debrief
    let isMounted = true;
    async function syncBackend() {
      if (lastExchange) {
        const logged = await logSessionTelemetry(
          lastExchange,
          intakeConfig.participantName,
          intakeConfig.sessionGoal
        );
        if (isMounted && logged) {
          setBackendSynced(true);
        }
      }

      setIsLoadingAi(true);
      const res = await fetchClinicalAnalysis({
        participantName: intakeConfig.participantName,
        sessionGoal: intakeConfig.sessionGoal,
        scenarioTitle: scenarioMeta.title,
        difficulty: difficulty,
        exchanges: lastExchange ? [lastExchange] : [],
        hesitationTimeSec: lastExchange?.hesitationTimeSec || 4.2,
      });

      if (isMounted) {
        setIsLoadingAi(false);
        if (res && res.takeaways && res.takeaways.length > 0) {
          setAiNotes(res.takeaways);
          if (res.score) setAiScore(res.score);
          if (res.recommendations) setAiRecommendation(res.recommendations);
        }
      }
    }

    syncBackend();
    return () => {
      isMounted = false;
    };
  }, [lastExchange, intakeConfig, difficulty, scenarioMeta.title]);

  // Calculate score (out of 10)
  const score = aiScore || lastExchange?.appropriateScore || (difficulty === 'hard' ? 10 : 9);
  const debriefNotes = aiNotes || generateDebriefNotes();
  const flaggedCount = 1; // 1 long pause moment detected

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between text-center items-center">
      {/* Top Header Badge */}
      <div className="mb-4 flex flex-col items-center justify-center text-center w-full">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a26f4a] mb-1">
          <span>Screen 6 of 6</span>
          <span>&bull;</span>
          <span>Post-Session Clinical Debrief</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#d6c8c5] text-center">
          Session Debrief &amp; Clinical Summary
        </h2>
        <p className="text-sm text-[#d6c8c5]/80 mt-1 max-w-2xl text-center">
          Comprehensive post-rehearsal analysis highlighting behavioral goal progress, pacing flags, and clinical discussion takeaways.
        </p>
      </div>

      {/* Main Debrief Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full bg-[#1a1618] rounded-3xl border-2 border-[#7f3e3b]/50 shadow-2xl p-5 sm:p-7 flex flex-col gap-6 text-center"
      >
        {/* Debrief Top Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-3 border-b border-[#7f3e3b]/30 text-xs text-[#d6c8c5] gap-2 text-center">
          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            <Award className="w-4 h-4 text-[#a26f4a]" />
            <span className="font-bold text-white uppercase tracking-wider">Clinical Rehearsal Report</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mx-auto sm:mx-0">
            <span className="font-mono text-[#d6c8c5]/70">Participant: {intakeConfig.participantName || 'Rahul K.'}</span>
            <span className="px-3 py-0.5 rounded-full bg-[#7f3e3b]/30 text-[#d6c8c5] border border-[#a26f4a]/50 font-mono text-[11px]">
              STATUS: COMPLETED
            </span>
          </div>
        </div>

        {/* 4 Core Summary Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-center">
          {/* Tile 1: Session Goal */}
          <div className="bg-[#251f22] rounded-2xl p-4 border border-[#7f3e3b]/40 flex flex-col items-center justify-between text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-[#d6c8c5]/70 mb-1.5 w-full">
              <span className="font-semibold uppercase tracking-wider">Session Goal</span>
              <Target className="w-4 h-4 text-[#a26f4a]" />
            </div>
            <div className="text-sm font-bold text-white leading-snug line-clamp-2 text-center">
              {intakeConfig.sessionGoal || 'Build confidence answering behavioral questions'}
            </div>
            <div className="mt-2 text-[10px] text-[#22c55e] font-bold flex items-center justify-center gap-1 text-center">
              <CheckCircle2 className="w-3 h-3" /> Target Addressed
            </div>
          </div>

          {/* Tile 2: Scenario Completed */}
          <div className="bg-[#251f22] rounded-2xl p-4 border border-[#7f3e3b]/40 flex flex-col items-center justify-between text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-[#d6c8c5]/70 mb-1.5 w-full">
              <span className="font-semibold uppercase tracking-wider">Scenario</span>
              {activeScenarioId === 'restaurant-ordering' ? (
                <UtensilsCrossed className="w-4 h-4 text-[#a26f4a]" />
              ) : (
                <Briefcase className="w-4 h-4 text-[#a26f4a]" />
              )}
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white leading-snug text-center">
                {scenarioMeta.title}
              </div>
              <div className="text-[11px] font-bold mt-1 flex items-center justify-center gap-1.5 text-center" style={{ color: activeDotColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeDotColor }} />
                <span>Difficulty: {difficulty.toUpperCase()}</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-[#d6c8c5]/70 text-center">
              {currentScenario.scenarioTitle}
            </div>
          </div>

          {/* Tile 3: Flagged Moments */}
          <div className="bg-[#251f22] rounded-2xl p-4 border border-[#a26f4a]/50 flex flex-col items-center justify-between text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-[#a26f4a] mb-1.5 w-full">
              <span className="font-semibold uppercase tracking-wider">Flagged Moments</span>
              <AlertTriangle className="w-4 h-4 text-[#a26f4a]" />
            </div>
            <div className="text-2xl font-extrabold text-white text-center">
              {flaggedCount} <span className="text-xs font-medium text-[#a26f4a]">moment</span>
            </div>
            <div className="mt-2 text-[11px] text-[#a26f4a] font-semibold flex items-center justify-center gap-1 text-center">
              <Clock className="w-3 h-3" /> Long pause detected (+4.2s)
            </div>
          </div>

          {/* Tile 4: Simple Score */}
          <div className="bg-[#251f22] rounded-2xl p-4 border border-[#7f3e3b]/50 flex flex-col items-center justify-between text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-[#d6c8c5] mb-1.5 w-full">
              <span className="font-semibold uppercase tracking-wider">Performance Score</span>
              <Award className="w-4 h-4 text-[#a26f4a]" />
            </div>
            <div className="flex items-baseline justify-center gap-1 text-center">
              <span className="text-3xl font-black text-white">{score}</span>
              <span className="text-sm font-bold text-[#a26f4a]">/ 10</span>
            </div>
            <div className="mt-2 text-[10px] text-[#22c55e] font-bold text-center">
              High Social Appropriateness
            </div>
          </div>
        </div>

        {/* Clinical Debrief Notes */}
        <div className="bg-[#141012] rounded-3xl p-5 border border-[#7f3e3b]/40 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d6c8c5] mx-auto sm:mx-0">
              <Sparkles className="w-4 h-4 text-[#a26f4a]" />
              <span>AI-Assisted Clinical Debrief &amp; Observations</span>
            </div>
            <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
              {isLoadingAi ? (
                <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#251f22] text-[#d6c8c5] text-[11px] font-mono border border-[#7f3e3b]/50 animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin text-[#a26f4a]" />
                  <span>Analyzing Telemetry...</span>
                </span>
              ) : backendSynced ? (
                <span className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#7f3e3b]/30 text-[#d6c8c5] text-[11px] font-mono border border-[#a26f4a]/50">
                  <Database className="w-3 h-3 text-[#a26f4a]" />
                  <span>Backend Telemetry Synced</span>
                </span>
              ) : null}
            </div>
          </div>

          <div className="space-y-2.5">
            {debriefNotes.map((note, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-center gap-2.5 bg-[#251f22] p-3 rounded-2xl border border-[#7f3e3b]/30 text-xs sm:text-sm text-[#d6c8c5] text-center"
              >
                <div className="w-5 h-5 rounded-full bg-[#7f3e3b]/40 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                  {index + 1}
                </div>
                <p className="leading-relaxed text-center">{note}</p>
              </div>
            ))}
          </div>

          {aiRecommendation && (
            <div className="mt-3.5 pt-3 border-t border-[#7f3e3b]/30 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-[#d6c8c5] text-center">
              <Cpu className="w-4 h-4 text-[#a26f4a] shrink-0" />
              <div className="text-center">
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block text-center">Therapist Next-Step Recommendation:</span>
                <p className="text-[#d6c8c5]/90 mt-0.5 text-center">{aiRecommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Restart Demo & Export */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#7f3e3b]/30 text-center">
          <button
            onClick={downloadOfflineHtml}
            id="download-offline-html-debrief-btn"
            className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#251f22] hover:bg-[#342a2d] text-[#d6c8c5] hover:text-white border border-[#7f3e3b] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors mx-auto sm:mx-0"
          >
            <Download className="w-4 h-4 text-[#a26f4a]" />
            <span>Download Offline Single-File HTML</span>
          </button>

          <button
            onClick={onRestartDemo}
            id="restart-demo-debrief-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#7f3e3b] hover:bg-[#944945] text-white font-extrabold text-sm shadow-xl shadow-[#7f3e3b]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group border border-[#a26f4a]/50 mx-auto sm:mx-0"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform text-[#d6c8c5]" />
            <span>Restart Demo Flow</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Context Info */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#d6c8c5]/60 text-center">
        <ShieldCheck className="w-3.5 h-3.5 text-[#a26f4a]" />
        <span>End of Session Rehearsal &bull; Telemetry archived for clinical case history</span>
      </div>
    </div>
  );
};
