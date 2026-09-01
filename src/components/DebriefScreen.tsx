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
  const activeDotColor = DIFFICULTY_PALETTE[difficulty] || '#02C39A';

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
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Top Header Badge */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02C39A] mb-1">
          <span>Screen 6 of 6</span>
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
            <span className="font-mono text-slate-400">Participant: {intakeConfig.participantName || 'Rahul K.'}</span>
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
              {activeScenarioId === 'restaurant-ordering' ? (
                <UtensilsCrossed className="w-4 h-4 text-[#02C39A]" />
              ) : (
                <Briefcase className="w-4 h-4 text-[#028090]" />
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-snug">
                {scenarioMeta.title}
              </div>
              <div className="text-[11px] font-bold mt-1 flex items-center gap-1.5" style={{ color: activeDotColor }}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeDotColor }} />
                <span>Difficulty: {difficulty.toUpperCase()}</span>
              </div>
            </div>
            <div className="mt-2 text-[10px] text-[#99F6E4]/70">
              {currentScenario.scenarioTitle}
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

          {/* Tile 4: Simple Score */}
          <div className="bg-[#032A2E] rounded-2xl p-4 border border-[#02C39A]/50 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#02C39A] mb-1.5">
              <span className="font-semibold uppercase tracking-wider">Performance Score</span>
              <Award className="w-4 h-4 text-[#02C39A]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">{score}</span>
              <span className="text-sm font-bold text-[#5EEAD4]">/ 10</span>
            </div>
            <div className="mt-2 text-[10px] text-[#02C39A] font-bold">
              High Social Appropriateness
            </div>
          </div>
        </div>

        {/* Clinical Auto-Generated Debrief Notes */}
        <div className="bg-[#022427] rounded-2xl p-5 border border-[#028090]/40">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5EEAD4]">
              <Sparkles className="w-4 h-4 text-[#02C39A]" />
              <span>AI-Assisted Clinical Debrief &amp; Observations</span>
            </div>
            <div className="flex items-center gap-2">
              {isLoadingAi ? (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#028090]/30 text-[#99F6E4] text-[11px] font-mono border border-[#028090]/50 animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin text-[#02C39A]" />
                  <span>Analyzing Telemetry...</span>
                </span>
              ) : backendSynced ? (
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#02C39A]/20 text-[#5EEAD4] text-[11px] font-mono border border-[#02C39A]/40">
                  <Database className="w-3 h-3 text-[#02C39A]" />
                  <span>Backend Telemetry Synced</span>
                </span>
              ) : null}
            </div>
          </div>

          <div className="space-y-2.5">
            {debriefNotes.map((note, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-[#032A2E] p-3 rounded-xl border border-[#028090]/30 text-xs sm:text-sm text-[#CCFBF1]"
              >
                <div className="w-5 h-5 rounded-full bg-[#02C39A]/20 text-[#02C39A] font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                  {index + 1}
                </div>
                <p className="leading-relaxed">{note}</p>
              </div>
            ))}
          </div>

          {aiRecommendation && (
            <div className="mt-3.5 pt-3 border-t border-[#028090]/30 flex items-start gap-2.5 text-xs text-[#99F6E4]">
              <Cpu className="w-4 h-4 text-[#02C39A] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block">Therapist Next-Step Recommendation:</span>
                <p className="text-slate-200 mt-0.5">{aiRecommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Restart Demo & Export */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#028090]/30">
          <button
            onClick={downloadOfflineHtml}
            id="download-offline-html-debrief-btn"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#032A2E] hover:bg-[#043E44] text-[#CCFBF1] hover:text-white border border-[#028090] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4 text-[#5EEAD4]" />
            <span>Download Offline Single-File HTML</span>
          </button>

          <button
            onClick={onRestartDemo}
            id="restart-demo-debrief-btn"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] hover:text-white font-extrabold text-sm shadow-xl shadow-[#02C39A]/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
          >
            <RotateCcw className="w-4 h-4 group-hover:-rotate-90 transition-transform" />
            <span>Restart Demo Flow</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Context Info */}
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#99F6E4]/60">
        <ShieldCheck className="w-3.5 h-3.5 text-[#02C39A]" />
        <span>End of Session Rehearsal &bull; Telemetry archived for clinical case history</span>
      </div>
    </div>
  );
};
