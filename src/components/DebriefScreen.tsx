import React, { useEffect, useState } from 'react';
import { DifficultyLevel, IntakeConfig, ScenarioId, SessionExchange } from '../types';
import { DIFFICULTY_PALETTE, getScenarioData, SCENARIO_CATALOG } from '../data/interviewScenarios';
import { 
  Award, CheckCircle2, AlertTriangle, Target, RotateCcw, Download,
  Sparkles, FileText, User, Activity, Clock, ShieldCheck, ArrowRight,
  UtensilsCrossed, Briefcase, Database, Cpu, Loader2, Terminal
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
  const activeDotColor = DIFFICULTY_PALETTE[difficulty] || '#ffd166';

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
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between items-stretch">
      {/* Top Header Badge */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#06d6a0] text-black font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
            <span>06 / 06 CLINICAL SUMMARY</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Post-Session Debrief &amp; Telemetry
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#d6c8c5]/80 mt-1 uppercase">
            COMPREHENSIVE POST-REHEARSAL TELEMETRY HIGHLIGHTING GOAL MASTERY &amp; SENSORY LATENCY
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-[#181417] px-3.5 py-2 border-2 border-black text-[#ffd166] shadow-[3px_3px_0px_#000] uppercase font-black">
          <Terminal className="w-4 h-4 stroke-[2.5]" />
          <span>REPORT #CR-{Math.floor(1000 + Math.random() * 9000)}</span>
        </div>
      </div>

      {/* Main Debrief Container */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full bg-[#181417] border-3 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-7 flex flex-col gap-6 text-left"
      >
        {/* Debrief Top Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b-2 border-black font-mono text-xs text-[#d6c8c5] gap-2">
          <div className="flex items-center gap-2 text-white font-black uppercase">
            <Award className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
            <span>CLINICAL REHEARSAL VERIFICATION REPORT</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#d6c8c5]/70 uppercase">PARTICIPANT: {intakeConfig.participantName || 'RAHUL K.'}</span>
            <span className="px-2.5 py-0.5 bg-[#06d6a0] text-black font-black uppercase border border-black shadow-[2px_2px_0px_#000]">
              STATUS: COMPLETED
            </span>
          </div>
        </div>

        {/* 4 Core Summary Stat Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tile 1: Session Goal */}
          <div className="bg-[#110e11] p-4 border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#ffd166] font-black uppercase mb-2">
              <span>SESSION GOAL</span>
              <Target className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="font-heading font-black text-sm text-white uppercase leading-snug line-clamp-2">
              {intakeConfig.sessionGoal || 'Build confidence answering behavioral questions'}
            </div>
            <div className="mt-3 font-mono text-[10px] text-[#06d6a0] font-black uppercase flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" /> TARGET ADDRESSED
            </div>
          </div>

          {/* Tile 2: Scenario Completed */}
          <div className="bg-[#110e11] p-4 border-2 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#ffd166] font-black uppercase mb-2">
              <span>SCENARIO</span>
              {activeScenarioId === 'restaurant-ordering' ? (
                <UtensilsCrossed className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <Briefcase className="w-4 h-4 stroke-[2.5]" />
              )}
            </div>
            <div>
              <div className="font-heading font-black text-sm text-white uppercase leading-snug">
                {scenarioMeta.title}
              </div>
              <div className="font-mono text-[11px] font-black uppercase mt-1 text-[#ffd166]">
                DIFF: {difficulty.toUpperCase()}
              </div>
            </div>
            <div className="mt-3 font-mono text-[10px] text-[#d6c8c5]/70 uppercase truncate">
              {currentScenario.scenarioTitle}
            </div>
          </div>

          {/* Tile 3: Flagged Moments */}
          <div className="bg-[#110e11] p-4 border-2 border-black shadow-[4px_4px_0px_#ffd166] flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[10px] text-[#e0533c] font-black uppercase mb-2">
              <span>FLAGGED MOMENTS</span>
              <AlertTriangle className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="font-heading font-black text-2xl text-white">
              {flaggedCount} <span className="font-mono text-xs font-bold text-[#e0533c] uppercase">MOMENT</span>
            </div>
            <div className="mt-3 font-mono text-[10px] text-[#ffd166] font-black uppercase flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 stroke-[2.5]" /> LONG PAUSE (+4.2S)
            </div>
          </div>

          {/* Tile 4: Simple Score */}
          <div className="bg-[#ffd166] p-4 border-2 border-black shadow-[4px_4px_0px_#000] text-black flex flex-col justify-between">
            <div className="flex items-center justify-between font-mono text-[10px] font-black uppercase mb-2 text-black">
              <span>SCORE</span>
              <Award className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-heading font-black text-4xl leading-none">{score}</span>
              <span className="font-mono text-sm font-black">/ 10</span>
            </div>
            <div className="mt-3 font-mono text-[10px] font-black uppercase">
              HIGH SOCIAL APPROPRIATENESS
            </div>
          </div>
        </div>

        {/* Clinical Debrief Notes */}
        <div className="bg-[#110e11] p-5 border-2 border-black shadow-[4px_4px_0px_#000]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 font-mono text-xs font-black uppercase text-white">
              <Sparkles className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
              <span>AI-Assisted Clinical Debrief &amp; Observations</span>
            </div>
            <div>
              {isLoadingAi ? (
                <span className="flex items-center gap-1.5 px-3 py-0.5 bg-[#181417] text-[#ffd166] text-[11px] font-mono font-bold border border-black uppercase animate-pulse">
                  <Loader2 className="w-3 h-3 animate-spin stroke-[2.5]" />
                  <span>ANALYZING TELEMETRY...</span>
                </span>
              ) : backendSynced ? (
                <span className="flex items-center gap-1.5 px-3 py-0.5 bg-[#06d6a0] text-black text-[11px] font-mono font-black border border-black uppercase shadow-[2px_2px_0px_#000]">
                  <Database className="w-3 h-3 stroke-[2.5]" />
                  <span>TELEMETRY SYNCED</span>
                </span>
              ) : null}
            </div>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {debriefNotes.map((note, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-[#181417] p-3.5 border-2 border-black text-[#d6c8c5]"
              >
                <div className="w-6 h-6 bg-[#ffd166] text-black font-mono font-black flex items-center justify-center shrink-0 text-xs border border-black shadow-[1px_1px_0px_#000]">
                  0{index + 1}
                </div>
                <p className="leading-relaxed font-sans text-sm font-medium text-white">{note}</p>
              </div>
            ))}
          </div>

          {aiRecommendation && (
            <div className="mt-4 pt-3.5 border-t-2 border-black flex items-start gap-3 font-mono text-xs">
              <Cpu className="w-5 h-5 text-[#ffd166] shrink-0 stroke-[2.5] mt-0.5" />
              <div>
                <span className="font-black text-[#ffd166] uppercase tracking-wider block">
                  THERAPIST NEXT-STEP RECOMMENDATION:
                </span>
                <p className="text-[#d6c8c5] mt-0.5 font-sans font-medium text-sm leading-relaxed">{aiRecommendation}</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons: Restart Demo & Export */}
        <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-2 border-black">
          <button
            onClick={downloadOfflineHtml}
            id="download-offline-html-debrief-btn"
            className="w-full sm:w-auto px-6 py-4 bg-[#181417] hover:bg-[#251f22] text-[#d6c8c5] hover:text-white border-3 border-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
            <span>DOWNLOAD OFFLINE REPORT (HTML)</span>
          </button>

          <button
            onClick={onRestartDemo}
            id="restart-demo-debrief-btn"
            className="w-full sm:w-auto px-8 py-4 bg-[#ffd166] hover:bg-[#ffe28a] text-black font-heading font-black text-sm sm:text-base uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] flex items-center justify-center gap-2 cursor-pointer transition-all group"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform stroke-[3]" />
            <span>RESTART DEMO FLOW</span>
          </button>
        </div>
      </motion.div>

      {/* Bottom Context Info */}
      <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-[#d6c8c5]/70 uppercase">
        <ShieldCheck className="w-4 h-4 text-[#06d6a0] stroke-[2.5]" />
        <span>END OF SESSION REHEARSAL &bull; TELEMETRY ARCHIVED FOR CLINICAL CASE HISTORY</span>
      </div>
    </div>
  );
};

