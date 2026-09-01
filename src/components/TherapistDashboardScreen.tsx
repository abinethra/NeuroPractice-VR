import React, { useEffect, useRef, useState } from 'react';
import { InterviewRoomIllustration, RestaurantRoomIllustration } from './VectorIllustrations';
import { DifficultyLevel, SessionExchange, IntakeConfig, ScenarioId } from '../types';
import { SCENARIO_CATALOG } from '../data/interviewScenarios';
import { 
  Pause, Play, Lightbulb, ShieldAlert, CheckCircle2, RotateCcw, 
  Activity, Laptop, Sliders, AlertCircle, BarChart3, Clock, 
  FileText, Download, Sparkles, Check, ChevronRight, ArrowRight,
  AlertTriangle, UtensilsCrossed, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Chart from 'chart.js/auto';
import confetti from 'canvas-confetti';
import { downloadOfflineHtml } from '../utils/offlineHtmlGenerator';

interface TherapistDashboardScreenProps {
  difficulty: DifficultyLevel;
  onUpdateDifficulty: (diff: DifficultyLevel) => void;
  lastExchange: SessionExchange | null;
  onProceedToDebrief: () => void;
  intakeConfig?: IntakeConfig;
}

export const TherapistDashboardScreen: React.FC<TherapistDashboardScreenProps> = ({
  difficulty,
  onUpdateDifficulty,
  lastExchange,
  onProceedToDebrief,
  intakeConfig,
}) => {
  const chartCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  const [isSessionPaused, setIsSessionPaused] = useState(false);
  const [activeAlert, setActiveAlert] = useState<{
    title: string;
    description: string;
    type: 'pause' | 'hint' | 'ease' | 'end';
  } | null>(null);

  const [sessionCompletedModal, setSessionCompletedModal] = useState(false);

  const activeScenarioId: ScenarioId = lastExchange?.scenarioId || intakeConfig?.selectedScenarioId || 'job-interview';
  const activeScenarioMeta = SCENARIO_CATALOG.find((s) => s.id === activeScenarioId) || SCENARIO_CATALOG[0];
  const participantName = intakeConfig?.participantName || 'Rahul K.';
  const liveSessionLabel = `${activeScenarioMeta.title} \u00B7 ${participantName}`;

  // Difficulty numeric mapping for slider: 1 = easy, 2 = moderate, 3 = hard
  const diffToNum = (d: DifficultyLevel): number => {
    if (d === 'easy') return 1;
    if (d === 'moderate') return 2;
    return 3;
  };
  const numToDiff = (n: number): DifficultyLevel => {
    if (n === 1) return 'easy';
    if (n === 2) return 'moderate';
    return 'hard';
  };

  const handleDifficultySlider = (val: number) => {
    const newDiff = numToDiff(val);
    onUpdateDifficulty(newDiff);
    triggerAlert('Difficulty Adjusted', `In-headset conversational complexity set to ${newDiff.toUpperCase()}`, 'ease');
  };

  const triggerAlert = (title: string, description: string, type: 'pause' | 'hint' | 'ease' | 'end') => {
    setActiveAlert({ title, description, type });
    setTimeout(() => {
      setActiveAlert((curr) => (curr?.title === title ? null : curr));
    }, 4000);
  };

  const handlePauseToggle = () => {
    const nextState = !isSessionPaused;
    setIsSessionPaused(nextState);
    if (nextState) {
      triggerAlert(
        'VR Session Paused',
        'Headset viewport gently frozen with a calming breathe graphic to allow co-regulation.',
        'pause'
      );
    } else {
      triggerAlert('VR Session Resumed', 'Participant returned to live interview stage.', 'pause');
    }
  };

  const handleCueHint = () => {
    triggerAlert(
      'Visual Prompt Cued in Headset',
      'Sent cue: "Remember the STAR method (Situation, Task, Action, Result) & take a steady breath."',
      'hint'
    );
  };

  const handleEaseOff = () => {
    triggerAlert(
      'Sensory & Speed Eased Off',
      'Reduced avatar gaze intensity and lengthened response timeout from 15s to 30s.',
      'ease'
    );
  };

  const handleEndSession = () => {
    setSessionCompletedModal(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#7f3e3b', '#a26f4a', '#d6c8c5', '#002e00'],
      });
    } catch (e) {
      // confetti fallback
    }
  };

  // Initialize Chart.js with upward trending mock data: (3, 5, 6, 8, 9)
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    // Create gradient fill matching palette
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#7f3e3b');
    gradient.addColorStop(1, '#a26f4a');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5 (Today)'],
        datasets: [
          {
            label: 'Appropriate Responses',
            data: [3, 5, 6, 8, 9],
            backgroundColor: gradient,
            hoverBackgroundColor: '#944945',
            borderColor: '#d6c8c5',
            borderWidth: 1.5,
            borderRadius: 8,
            borderSkipped: false,
            barThickness: 32,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: '#1a1618',
            titleColor: '#d6c8c5',
            bodyColor: '#ffffff',
            borderColor: '#7f3e3b',
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: (context) => `Appropriate Responses: ${context.parsed.y} / 10`,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#d6c8c5',
              font: {
                family: 'system-ui, sans-serif',
                size: 11,
                weight: 600,
              },
            },
          },
          y: {
            beginAtZero: true,
            max: 10,
            ticks: {
              stepSize: 2,
              color: '#d6c8c5',
              font: {
                family: 'system-ui, sans-serif',
                size: 11,
              },
            },
            grid: {
              color: 'rgba(127, 62, 59, 0.25)',
            },
          },
        },
      },
    });

    chartInstanceRef.current = chart;

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between text-center items-center">
      {/* Header Context */}
      <div className="mb-3 flex flex-col items-center justify-center gap-2 text-center w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a26f4a]">
            <span>Screen 5 of 6</span>
            <span>&bull;</span>
            <span>Therapist Real-Time Supervision Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#d6c8c5] text-center mt-1">
            Clinician Supervision Dashboard
          </h2>
        </div>

        {/* Live Headset Telemetry Ping */}
        <div className="flex items-center justify-center gap-2 bg-[#1a1618] px-3.5 py-1.5 rounded-2xl border border-[#7f3e3b]/60 text-xs text-[#d6c8c5] shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] animate-pulse" />
          <span>Participant Headset: <strong>Connected (32ms latency)</strong></span>
        </div>
      </div>

      {/* MONITOR-STYLE FRAME */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-[#1a1618] rounded-3xl border-2 border-[#7f3e3b]/50 shadow-2xl p-4 sm:p-6 mb-5 relative text-center"
      >
        {/* Top Bezel / Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-[#7f3e3b]/30 text-xs text-[#d6c8c5]/70 gap-2 text-center">
          <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
            <Laptop className="w-4 h-4 text-[#a26f4a]" />
            <span className="font-semibold text-white">NeuroPractice Clinician Console v2.4</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mx-auto sm:mx-0">
            <span className="hidden sm:inline">Session ID: #NP-8821</span>
            <span className="px-3 py-1 rounded-full bg-[#7f3e3b]/30 text-[#d6c8c5] font-mono text-[11px] border border-[#a26f4a]/50 font-bold flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#a26f4a] animate-pulse" />
              <span>LIVE SESSION: {liveSessionLabel}</span>
            </span>
          </div>
        </div>

        {/* Active Toast Alert for Clinician Interventions */}
        <AnimatePresence>
          {activeAlert && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4 bg-[#251f22] border-l-4 border-[#a26f4a] rounded-2xl p-3.5 flex items-center justify-center text-center gap-3 shadow-lg"
            >
              <AlertCircle className="w-5 h-5 text-[#a26f4a] shrink-0" />
              <div className="text-center">
                <h4 className="text-white text-xs sm:text-sm font-bold text-center">{activeAlert.title}</h4>
                <p className="text-[#d6c8c5] text-xs mt-0.5 text-center">{activeAlert.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Grid: Left (Mirrored VR View + Live Transcript) | Right (Controls + Sliders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Mirrored "VR View" Thumbnail + Live Transcript */}
          <div className="lg:col-span-7 flex flex-col gap-4 text-center">
            {/* Mirrored "VR View" Thumbnail */}
            <div className="bg-[#251f22] rounded-3xl p-3.5 border border-[#7f3e3b]/40 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-2 gap-2 text-center">
                <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
                  <Activity className="w-4 h-4 text-[#a26f4a]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider text-center">
                    Mirrored VR Participant View ({activeScenarioMeta.title})
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1a1618] text-[#d6c8c5] font-medium border border-[#7f3e3b]/30 mx-auto sm:mx-0">
                  {isSessionPaused ? 'PAUSED' : 'STREAMING 1080p'}
                </span>
              </div>

              {/* Reusable mini-scene illustration with pause overlay */}
              <div className="relative h-[160px] sm:h-[180px] rounded-2xl overflow-hidden border border-[#7f3e3b]/40 bg-[#0f0e10]">
                {activeScenarioId === 'restaurant-ordering' ? (
                  <RestaurantRoomIllustration isThumbnail={true} isSpeaking={!isSessionPaused} />
                ) : (
                  <InterviewRoomIllustration isThumbnail={true} isSpeaking={!isSessionPaused} />
                )}
                
                {isSessionPaused && (
                  <div className="absolute inset-0 bg-[#0f0e10]/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                    <Pause className="w-8 h-8 text-[#a26f4a] mb-2" />
                    <span className="text-sm font-bold text-white">Rehearsal Paused for Co-Regulation</span>
                    <span className="text-xs text-[#d6c8c5] mt-1">Calm breathing audio active in participant headset</span>
                  </div>
                )}
              </div>
            </div>

            {/* Live Transcript Panel showing the last exchange */}
            <div className="bg-[#251f22] text-[#d6c8c5] rounded-3xl p-4 sm:p-5 shadow-lg border border-[#7f3e3b]/40 flex-1 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-between pb-2 mb-3 border-b border-[#7f3e3b]/30 gap-1 text-center">
                <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
                  <FileText className="w-4 h-4 text-[#a26f4a]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#d6c8c5]">
                    Live Exchange Transcript ({activeScenarioMeta.title})
                  </span>
                </div>
                <span className="text-[11px] text-[#d6c8c5]/60 font-mono mx-auto sm:mx-0">
                  {lastExchange?.timestamp || 'Just now'} &bull; Difficulty: {difficulty.toUpperCase()}
                </span>
              </div>

              {/* Question */}
              <div className="mb-2 text-center">
                <div className="text-[11px] font-bold text-[#a26f4a] uppercase text-center">
                  {activeScenarioMeta.roleLabel} ({activeScenarioMeta.npcName}):
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 text-center">
                  "{lastExchange?.question || (activeScenarioId === 'restaurant-ordering' ? 'What can I get started for you today?' : 'Tell me about a time you faced a difficult problem at work or school.')}"
                </p>
              </div>

              {/* Long Pause Telemetry Flag */}
              <div className="my-2.5 px-3 py-2 rounded-xl bg-[#1a1618] border border-[#a26f4a] text-[#d6c8c5] flex flex-col sm:flex-row items-center justify-center gap-2 text-xs font-semibold shadow-xs text-center">
                <div className="flex items-center justify-center gap-2 text-[#a26f4a]">
                  <span className="text-sm font-bold">⚠</span>
                  <span className="font-bold">Flag: long pause detected</span>
                  <span className="text-[11px] text-[#d6c8c5]/70 font-normal hidden sm:inline">(+4.2s delay before response formulation)</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#7f3e3b]/30 text-[#d6c8c5] border border-[#a26f4a]/50 uppercase tracking-wider">
                  Debrief Flag
                </span>
              </div>

              {/* Participant Response */}
              <div className="mb-3 bg-[#1a1618] p-3 rounded-2xl border border-[#7f3e3b]/50 text-center">
                <div className="text-[11px] font-bold text-[#d6c8c5] uppercase text-center">
                  Participant Response ({lastExchange?.userResponseLabel || 'Selected Response'}):
                </div>
                <p className="text-xs sm:text-sm text-white mt-0.5 italic text-center">
                  "{lastExchange?.userResponseText || 'During a group project, our dataset had missing values. I created a shared checklist to organize entries with my partner, and we submitted on time.'}"
                </p>
              </div>

              {/* NPC Reply */}
              <div className="mb-2 text-center">
                <div className="text-[11px] font-bold text-[#a26f4a] uppercase text-center">NPC Follow-Up Feedback:</div>
                <p className="text-xs sm:text-sm text-[#d6c8c5]/90 mt-0.5 text-center">
                  "{lastExchange?.npcReply || 'Thank you for walking me through that. Breaking down the dataset with a shared checklist demonstrates strong methodical thinking.'}"
                </p>
              </div>

              {/* Clinician Analysis Note */}
              <div className="pt-2 border-t border-[#7f3e3b]/30 flex items-center justify-center text-[11px] text-[#d6c8c5]/70 text-center">
                <span className="font-medium text-[#d6c8c5] text-center">
                  <strong className="text-[#a26f4a]">Clinical Note:</strong> {lastExchange?.clinicianNotes || 'Direct, structured communication with zero panic response.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: In-Headset Controls & Dynamic Difficulty Slider */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-center">
            {/* Difficulty Slider */}
            <div className="bg-[#251f22] rounded-3xl p-4 border border-[#7f3e3b]/40 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-bold text-white mb-2 gap-2 text-center">
                <div className="flex items-center justify-center gap-2 mx-auto sm:mx-0">
                  <Sliders className="w-4 h-4 text-[#a26f4a]" />
                  <span>Real-Time Difficulty Adjustment</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1a1618] text-xs font-mono font-bold border border-[#7f3e3b]/50 mx-auto sm:mx-0">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ 
                      backgroundColor: difficulty === 'easy' ? '#7f3e3b' : (difficulty === 'moderate' ? '#a26f4a' : '#d6c8c5') 
                    }} 
                  />
                  <span style={{ 
                    color: difficulty === 'easy' ? '#d6c8c5' : (difficulty === 'moderate' ? '#a26f4a' : '#d6c8c5') 
                  }}>
                    {difficulty.toUpperCase()}
                  </span>
                </div>
              </div>

              <input
                type="range"
                id="clinician-diff-slider"
                min="1"
                max="3"
                step="1"
                value={diffToNum(difficulty)}
                onChange={(e) => handleDifficultySlider(Number(e.target.value))}
                className="w-full h-2.5 bg-[#141012] rounded-lg appearance-none cursor-pointer accent-[#7f3e3b]"
              />

              <div className="flex justify-between text-[11px] font-bold text-[#d6c8c5]/80 mt-2.5 px-1">
                <span className={`flex items-center gap-1 ${difficulty === 'easy' ? 'text-[#d6c8c5] font-extrabold' : 'text-[#d6c8c5]/60'}`}>
                  <span className="w-2 h-2 rounded-full bg-[#7f3e3b]" /> 1. Easy
                </span>
                <span className={`flex items-center gap-1 ${difficulty === 'moderate' ? 'text-[#a26f4a] font-extrabold' : 'text-[#d6c8c5]/60'}`}>
                  <span className="w-2 h-2 rounded-full bg-[#a26f4a]" /> 2. Moderate
                </span>
                <span className={`flex items-center gap-1 ${difficulty === 'hard' ? 'text-[#d6c8c5] font-extrabold' : 'text-[#d6c8c5]/60'}`}>
                  <span className="w-2 h-2 rounded-full bg-[#d6c8c5]" /> 3. Hard
                </span>
              </div>
            </div>

            {/* Four Clinician Control Action Buttons: Pause, Cue Hint, Ease Off, End Session */}
            <div className="bg-[#251f22] rounded-3xl p-4 border border-[#7f3e3b]/40 text-center">
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-3 text-center">
                In-Headset Clinical Interventions
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. Pause */}
                <button
                  onClick={handlePauseToggle}
                  id="action-pause-btn"
                  className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isSessionPaused
                      ? 'bg-[#7f3e3b] text-white border-[#a26f4a]'
                      : 'bg-[#1a1618] hover:bg-[#2e2326] text-white border-[#7f3e3b]/50'
                  }`}
                >
                  {isSessionPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5 text-[#a26f4a]" />}
                  <span>{isSessionPaused ? 'Resume Session' : 'Pause Rehearsal'}</span>
                </button>

                {/* 2. Cue Hint */}
                <button
                  onClick={handleCueHint}
                  id="action-hint-btn"
                  className="p-3 rounded-2xl bg-[#1a1618] hover:bg-[#2e2326] text-white border border-[#7f3e3b]/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer hover:border-[#a26f4a]"
                >
                  <Lightbulb className="w-5 h-5 text-[#a26f4a]" />
                  <span>Cue In-VR Hint</span>
                </button>

                {/* 3. Ease Off */}
                <button
                  onClick={handleEaseOff}
                  id="action-ease-off-btn"
                  className="p-3 rounded-2xl bg-[#1a1618] hover:bg-[#2e2326] text-white border border-[#7f3e3b]/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer hover:border-[#a26f4a]"
                >
                  <ShieldAlert className="w-5 h-5 text-[#d6c8c5]" />
                  <span>Ease Off Stimulus</span>
                </button>

                {/* 4. End Session */}
                <button
                  onClick={handleEndSession}
                  id="action-end-session-btn"
                  className="p-3 rounded-2xl bg-[#7f3e3b] hover:bg-[#944945] text-white border border-[#a26f4a]/60 flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#d6c8c5]" />
                  <span>End Session</span>
                </button>
              </div>
            </div>

            {/* Quick Session Stats */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-[#251f22] p-3.5 rounded-2xl border border-[#7f3e3b]/30 text-center">
                <div className="text-[10px] font-bold text-[#d6c8c5]/70 uppercase text-center">Emotional Stability</div>
                <div className="text-xl font-extrabold text-[#22c55e] mt-0.5 text-center">94%</div>
                <div className="text-[10px] text-[#d6c8c5]/60 text-center">Steady baseline</div>
              </div>
              <div className="bg-[#251f22] p-3.5 rounded-2xl border border-[#7f3e3b]/30 text-center">
                <div className="text-[10px] font-bold text-[#d6c8c5]/70 uppercase text-center">Avg Response Time</div>
                <div className="text-xl font-extrabold text-white mt-0.5 text-center">4.2s</div>
                <div className="text-[10px] text-[#d6c8c5]/60 text-center">Thoughtful pacing</div>
              </div>
            </div>
          </div>
        </div>

        {/* BAR CHART SECTION (Chart.js): Appropriate responses across 5 mock sessions (3, 5, 6, 8, 9) */}
        <div className="mt-6 pt-5 border-t border-[#7f3e3b]/30 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mb-3 text-center">
            <div className="text-center sm:text-left mx-auto sm:mx-0">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <BarChart3 className="w-4 h-4 text-[#a26f4a]" />
                <h3 className="text-sm font-bold text-white text-center">
                  Longitudinal Progress: Appropriate Responses Per Session
                </h3>
              </div>
              <p className="text-xs text-[#d6c8c5]/80 mt-0.5 text-center sm:text-left">
                5 mock sessions showing upward social-skill mastery trend (3 &rarr; 5 &rarr; 6 &rarr; 8 &rarr; 9)
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#d6c8c5] bg-[#251f22] px-3.5 py-1.5 rounded-xl border border-[#7f3e3b]/40 mx-auto sm:mx-0">
              <Sparkles className="w-3.5 h-3.5 text-[#a26f4a]" />
              <span>+200% Skill Retention Gain</span>
            </div>
          </div>

          {/* Canvas Chart Container */}
          <div className="h-[200px] sm:h-[220px] w-full bg-[#141012] rounded-2xl p-3 border border-[#7f3e3b]/30">
            <canvas ref={chartCanvasRef} id="sessionProgressChart" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Pitch Toolbar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-center">
        <button
          onClick={downloadOfflineHtml}
          id="download-offline-html-bottom-btn"
          className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-[#1a1618] hover:bg-[#251f22] text-[#d6c8c5] hover:text-white border border-[#7f3e3b] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors order-2 sm:order-1 mx-auto sm:mx-0"
        >
          <Download className="w-4 h-4 text-[#a26f4a]" />
          <span>Download Offline Single-File HTML</span>
        </button>

        <button
          onClick={onProceedToDebrief}
          id="proceed-to-debrief-btn"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#7f3e3b] hover:bg-[#944945] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#7f3e3b]/30 flex items-center justify-center gap-2 cursor-pointer transition-all order-1 sm:order-2 group border border-[#a26f4a]/50 mx-auto sm:mx-0"
        >
          <span>Proceed to Session Debrief</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#d6c8c5]" />
        </button>
      </div>

      {/* Session Completed Summary Modal */}
      <AnimatePresence>
        {sessionCompletedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0f0e10]/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1618] border-2 border-[#7f3e3b] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#7f3e3b]/30 border border-[#a26f4a] flex items-center justify-center mx-auto mb-4 text-[#d6c8c5]">
                <CheckCircle2 className="w-8 h-8 text-[#a26f4a]" />
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">Rehearsal Session Completed</h3>
              <p className="text-sm text-[#d6c8c5]/90 mb-6 leading-relaxed">
                Participant finished the behavioral rehearsal scenario with <strong>9/10 appropriate responses</strong> and 1 pacing flag logged.
              </p>

              <div className="bg-[#251f22] p-4 rounded-2xl border border-[#7f3e3b]/40 text-center mb-6 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Session Goal:</span>
                  <span className="font-bold text-white text-right max-w-[220px] truncate">
                    {intakeConfig?.sessionGoal || 'Build confidence answering behavioral questions'}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Scenario Difficulty:</span>
                  <span className="font-bold text-[#a26f4a] uppercase">{difficulty}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Sensory Regulation Index:</span>
                  <span className="font-bold text-[#22c55e]">Optimal (94%)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Flagged Moments:</span>
                  <span className="font-bold text-[#a26f4a]">1 Long Pause (+4.2s)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSessionCompletedModal(false)}
                  className="flex-1 py-3.5 rounded-full bg-[#251f22] hover:bg-[#342a2d] text-[#d6c8c5] font-bold text-xs transition-colors cursor-pointer border border-[#7f3e3b]/50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSessionCompletedModal(false);
                    onProceedToDebrief();
                  }}
                  className="flex-1 py-3.5 rounded-full bg-[#7f3e3b] hover:bg-[#944945] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-lg border border-[#a26f4a]/50"
                >
                  <span>View Full Debrief</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d6c8c5]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
