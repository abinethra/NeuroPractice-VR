import React, { useEffect, useRef, useState } from 'react';
import { InterviewRoomIllustration, RestaurantRoomIllustration } from './VectorIllustrations';
import { DifficultyLevel, SessionExchange, IntakeConfig, ScenarioId } from '../types';
import { SCENARIO_CATALOG } from '../data/interviewScenarios';
import { 
  Pause, Play, Lightbulb, ShieldAlert, CheckCircle2, RotateCcw, 
  Activity, Laptop, Sliders, AlertCircle, BarChart3, Clock, 
  FileText, Download, Sparkles, Check, ChevronRight, ArrowRight,
  AlertTriangle, UtensilsCrossed, Briefcase, Terminal, Zap
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
        colors: ['#ffd166', '#e0533c', '#06d6a0', '#000000'],
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

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5 (Today)'],
        datasets: [
          {
            label: 'Appropriate Responses',
            data: [3, 5, 6, 8, 9],
            backgroundColor: ['#e0533c', '#e0533c', '#ffd166', '#ffd166', '#06d6a0'],
            borderColor: '#000000',
            borderWidth: 2,
            borderRadius: 0,
            borderSkipped: false,
            barThickness: 36,
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
            backgroundColor: '#000000',
            titleColor: '#ffd166',
            bodyColor: '#ffffff',
            borderColor: '#000000',
            borderWidth: 2,
            padding: 10,
            cornerRadius: 0,
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
                family: 'monospace',
                size: 11,
                weight: 'bold',
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
                family: 'monospace',
                size: 11,
              },
            },
            grid: {
              color: '#2a2428',
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
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between items-stretch">
      {/* Header Context */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffd166] text-black font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
            <span>05 / 06 CLINICIAN HUB</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Real-Time Clinical Supervision Console
          </h2>
        </div>

        {/* Live Headset Telemetry Ping */}
        <div className="flex items-center gap-2 bg-[#181417] px-3.5 py-1.5 border-2 border-black font-mono text-xs font-black text-[#06d6a0] shadow-[3px_3px_0px_#000] uppercase">
          <span className="w-2.5 h-2.5 rounded-full bg-[#06d6a0] animate-pulse" />
          <span>HEADSET: CONNECTED (32MS)</span>
        </div>
      </div>

      {/* MONITOR-STYLE FRAME */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full bg-[#181417] border-3 border-black shadow-[8px_8px_0px_#000] p-5 sm:p-6 mb-5 relative text-left"
      >
        {/* Top Bezel / Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b-2 border-black text-xs font-mono gap-2">
          <div className="flex items-center gap-2 text-white font-black uppercase">
            <Terminal className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
            <span>NEUROPRACTICE CLINICIAN CONSOLE v2.4</span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[#d6c8c5]/70">SESSION ID: #NP-8821</span>
            <span className="px-2.5 py-0.5 bg-[#ffd166] text-black font-bold uppercase border border-black shadow-[2px_2px_0px_#000]">
              LIVE: {liveSessionLabel}
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
              className="mb-4 bg-[#ffd166] border-3 border-black p-4 flex items-center gap-3 shadow-[4px_4px_0px_#000] font-mono text-black"
            >
              <AlertCircle className="w-5 h-5 stroke-[2.5] shrink-0" />
              <div>
                <h4 className="font-heading font-black text-sm uppercase">{activeAlert.title}</h4>
                <p className="text-xs font-bold mt-0.5 uppercase">{activeAlert.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Grid: Left (Mirrored VR View + Live Transcript) | Right (Controls + Sliders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Mirrored "VR View" Thumbnail + Live Transcript */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Mirrored "VR View" Thumbnail */}
            <div className="bg-[#110e11] p-3.5 border-2 border-black shadow-[3px_3px_0px_#000]">
              <div className="flex items-center justify-between mb-2 font-mono text-xs">
                <span className="font-black text-white uppercase flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#06d6a0] stroke-[2.5]" />
                  <span>MIRRORED VR PARTICIPANT VIEW</span>
                </span>
                <span className="px-2 py-0.5 bg-black text-[#06d6a0] border border-black text-[10px] font-bold uppercase">
                  {isSessionPaused ? 'PAUSED' : 'STREAMING 1080P'}
                </span>
              </div>

              {/* Reusable mini-scene illustration with pause overlay */}
              <div className="relative h-[160px] sm:h-[180px] overflow-hidden border-2 border-black bg-[#0d0c0f]">
                {activeScenarioId === 'restaurant-ordering' ? (
                  <RestaurantRoomIllustration isThumbnail={true} isSpeaking={!isSessionPaused} />
                ) : (
                  <InterviewRoomIllustration isThumbnail={true} isSpeaking={!isSessionPaused} />
                )}
                
                {isSessionPaused && (
                  <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4 text-center font-mono">
                    <Pause className="w-8 h-8 text-[#ffd166] mb-2 stroke-[3]" />
                    <span className="text-sm font-black text-white uppercase">REHEARSAL PAUSED FOR CO-REGULATION</span>
                    <span className="text-xs text-[#ffd166] mt-1 uppercase">CALM BREATHING AUDIO ACTIVE IN HEADSET</span>
                  </div>
                )}
              </div>
            </div>

            {/* Live Transcript Panel showing the last exchange */}
            <div className="bg-[#110e11] p-4 sm:p-5 border-2 border-black shadow-[3px_3px_0px_#000] flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black font-mono text-xs">
                  <span className="font-black uppercase text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
                    <span>LIVE EXCHANGE TRANSCRIPT</span>
                  </span>
                  <span className="text-[#d6c8c5]/70 font-bold uppercase text-[10px]">
                    {lastExchange?.timestamp || 'JUST NOW'} &bull; {difficulty.toUpperCase()}
                  </span>
                </div>

                {/* Question */}
                <div className="mb-2">
                  <div className="font-mono text-[10px] font-black text-[#ffd166] uppercase">
                    {activeScenarioMeta.roleLabel} ({activeScenarioMeta.npcName}):
                  </div>
                  <p className="font-heading font-black text-sm sm:text-base text-white uppercase mt-0.5 leading-snug">
                    "{lastExchange?.question || (activeScenarioId === 'restaurant-ordering' ? 'What can I get started for you today?' : 'Tell me about a time you faced a difficult problem at work or school.')}"
                  </p>
                </div>

                {/* Long Pause Telemetry Flag */}
                <div className="my-2.5 p-2 bg-[#ffd166] border-2 border-black text-black font-mono flex items-center justify-between text-xs font-black uppercase shadow-[2px_2px_0px_#000]">
                  <div className="flex items-center gap-1.5">
                    <span>⚠</span>
                    <span>LONG PAUSE DETECTED (+4.2S DELAY)</span>
                  </div>
                  <span className="px-1.5 py-0.5 bg-black text-white text-[10px]">
                    DEBRIEF FLAG
                  </span>
                </div>

                {/* Participant Response */}
                <div className="mb-3 bg-[#181417] p-3 border-2 border-black">
                  <div className="font-mono text-[10px] font-black text-[#06d6a0] uppercase">
                    PARTICIPANT RESPONSE ({lastExchange?.userResponseLabel || 'SELECTED RESPONSE'}):
                  </div>
                  <p className="text-xs sm:text-sm text-white mt-0.5 font-medium">
                    "{lastExchange?.userResponseText || 'During a group project, our dataset had missing values. I created a shared checklist to organize entries with my partner, and we submitted on time.'}"
                  </p>
                </div>

                {/* NPC Reply */}
                <div className="mb-2">
                  <div className="font-mono text-[10px] font-black text-[#ffd166] uppercase">NPC FOLLOW-UP FEEDBACK:</div>
                  <p className="text-xs sm:text-sm text-[#d6c8c5] mt-0.5">
                    "{lastExchange?.npcReply || 'Thank you for walking me through that. Breaking down the dataset with a shared checklist demonstrates strong methodical thinking.'}"
                  </p>
                </div>
              </div>

              {/* Clinician Analysis Note */}
              <div className="pt-2.5 mt-2 border-t-2 border-black font-mono text-[11px] text-[#d6c8c5]">
                <strong className="text-[#ffd166] uppercase">CLINICAL EVAL:</strong> {lastExchange?.clinicianNotes || 'Direct, structured communication with zero panic response.'}
              </div>
            </div>
          </div>

          {/* Right Column: In-Headset Controls & Dynamic Difficulty Slider */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Difficulty Slider */}
            <div className="bg-[#110e11] p-4 border-2 border-black shadow-[3px_3px_0px_#000]">
              <div className="flex items-center justify-between font-mono text-xs font-black text-white mb-2 uppercase">
                <div className="flex items-center gap-1.5">
                  <Sliders className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
                  <span>DIFFICULTY LEVEL</span>
                </div>
                <span className="px-2 py-0.5 bg-[#ffd166] text-black border border-black font-black">
                  {difficulty.toUpperCase()}
                </span>
              </div>

              <input
                type="range"
                id="clinician-diff-slider"
                min="1"
                max="3"
                step="1"
                value={diffToNum(difficulty)}
                onChange={(e) => handleDifficultySlider(Number(e.target.value))}
                className="w-full h-2.5 bg-[#181417] border border-black appearance-none cursor-pointer accent-[#ffd166]"
              />

              <div className="flex justify-between font-mono text-[10px] font-black uppercase mt-2">
                <span className={difficulty === 'easy' ? 'text-[#06d6a0]' : 'text-[#d6c8c5]/50'}>1. EASY</span>
                <span className={difficulty === 'moderate' ? 'text-[#ffd166]' : 'text-[#d6c8c5]/50'}>2. MODERATE</span>
                <span className={difficulty === 'hard' ? 'text-[#e0533c]' : 'text-[#d6c8c5]/50'}>3. HARD</span>
              </div>
            </div>

            {/* Four Clinician Control Action Buttons: Pause, Cue Hint, Ease Off, End Session */}
            <div className="bg-[#110e11] p-4 border-2 border-black shadow-[3px_3px_0px_#000]">
              <div className="font-mono text-xs font-black text-white uppercase tracking-wider mb-3">
                TACTICAL CLINICAL INTERVENTIONS
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. Pause */}
                <button
                  onClick={handlePauseToggle}
                  id="action-pause-btn"
                  className={`p-3 border-2 border-black flex flex-col items-center justify-center gap-1.5 font-mono text-xs font-black uppercase transition-all cursor-pointer shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px] ${
                    isSessionPaused
                      ? 'bg-[#ffd166] text-black'
                      : 'bg-[#181417] text-white hover:bg-[#221c21]'
                  }`}
                >
                  {isSessionPaused ? <Play className="w-5 h-5 stroke-[3]" /> : <Pause className="w-5 h-5 text-[#ffd166] stroke-[3]" />}
                  <span>{isSessionPaused ? 'RESUME' : 'PAUSE VR'}</span>
                </button>

                {/* 2. Cue Hint */}
                <button
                  onClick={handleCueHint}
                  id="action-hint-btn"
                  className="p-3 bg-[#181417] hover:bg-[#221c21] text-white border-2 border-black flex flex-col items-center justify-center gap-1.5 font-mono text-xs font-black uppercase transition-all cursor-pointer shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Lightbulb className="w-5 h-5 text-[#ffd166] stroke-[2.5]" />
                  <span>CUE IN-VR HINT</span>
                </button>

                {/* 3. Ease Off */}
                <button
                  onClick={handleEaseOff}
                  id="action-ease-off-btn"
                  className="p-3 bg-[#181417] hover:bg-[#221c21] text-white border-2 border-black flex flex-col items-center justify-center gap-1.5 font-mono text-xs font-black uppercase transition-all cursor-pointer shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <ShieldAlert className="w-5 h-5 text-[#e0533c] stroke-[2.5]" />
                  <span>EASE STIMULUS</span>
                </button>

                {/* 4. End Session */}
                <button
                  onClick={handleEndSession}
                  id="action-end-session-btn"
                  className="p-3 bg-[#06d6a0] hover:bg-[#08e9ae] text-black border-2 border-black flex flex-col items-center justify-center gap-1.5 font-mono text-xs font-black uppercase transition-all cursor-pointer shadow-[3px_3px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <CheckCircle2 className="w-5 h-5 stroke-[3]" />
                  <span>END SESSION</span>
                </button>
              </div>
            </div>

            {/* Quick Session Stats */}
            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="bg-[#110e11] p-3.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-[10px] font-black text-[#d6c8c5]/70 uppercase">REGULATION INDEX</div>
                <div className="text-2xl font-black text-[#06d6a0] mt-0.5">94%</div>
                <div className="text-[10px] text-[#d6c8c5]/60 uppercase">STEADY BASELINE</div>
              </div>
              <div className="bg-[#110e11] p-3.5 border-2 border-black shadow-[3px_3px_0px_#000]">
                <div className="text-[10px] font-black text-[#d6c8c5]/70 uppercase">AVG LATENCY</div>
                <div className="text-2xl font-black text-white mt-0.5">4.2s</div>
                <div className="text-[10px] text-[#d6c8c5]/60 uppercase">DELIBERATE PACING</div>
              </div>
            </div>
          </div>
        </div>

        {/* BAR CHART SECTION (Chart.js): Appropriate responses across 5 mock sessions (3, 5, 6, 8, 9) */}
        <div className="mt-6 pt-5 border-t-2 border-black">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2 font-mono">
                <BarChart3 className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
                <h3 className="font-heading font-black text-base text-white uppercase">
                  Longitudinal Progress Matrix: Appropriate Responses Per Session
                </h3>
              </div>
              <p className="text-xs font-mono text-[#d6c8c5]/80 mt-0.5 uppercase">
                5 SESSIONS SHOWING SOCIAL MASTERY CURVE (3 &rarr; 5 &rarr; 6 &rarr; 8 &rarr; 9)
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs font-black text-black bg-[#ffd166] px-3 py-1 border-2 border-black shadow-[2px_2px_0px_#000] uppercase">
              <Sparkles className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>+200% RETENTION GAIN</span>
            </div>
          </div>

          {/* Canvas Chart Container */}
          <div className="h-[200px] sm:h-[220px] w-full bg-[#110e11] p-3 border-2 border-black shadow-[3px_3px_0px_#000]">
            <canvas ref={chartCanvasRef} id="sessionProgressChart" />
          </div>
        </div>
      </motion.div>

      {/* Bottom Toolbar */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={downloadOfflineHtml}
          id="download-offline-html-bottom-btn"
          className="w-full sm:w-auto px-6 py-4 bg-[#181417] hover:bg-[#251f22] text-[#d6c8c5] hover:text-white border-3 border-black font-heading font-black text-xs sm:text-sm uppercase tracking-wider shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] active:translate-x-[2px] active:translate-y-[2px] flex items-center justify-center gap-2 cursor-pointer transition-all order-2 sm:order-1"
        >
          <Download className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
          <span>DOWNLOAD OFFLINE REPORT (HTML)</span>
        </button>

        <button
          onClick={onProceedToDebrief}
          id="proceed-to-debrief-btn"
          className="w-full sm:w-auto px-8 py-4 bg-[#ffd166] hover:bg-[#ffe28a] text-black font-heading font-black text-sm sm:text-base uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] flex items-center justify-center gap-2 cursor-pointer transition-all order-1 sm:order-2 group"
        >
          <span>PROCEED TO SESSION DEBRIEF</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
        </button>
      </div>

      {/* Session Completed Summary Modal */}
      <AnimatePresence>
        {sessionCompletedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#181417] border-3 border-black p-6 sm:p-8 max-w-lg w-full shadow-[10px_10px_0px_#ffd166] text-left font-mono"
            >
              <div className="w-12 h-12 bg-[#06d6a0] border-2 border-black flex items-center justify-center mb-4 text-black shadow-[3px_3px_0px_#000]">
                <CheckCircle2 className="w-7 h-7 stroke-[3]" />
              </div>

              <h3 className="font-heading text-2xl font-black text-white uppercase tracking-tight mb-2">
                Rehearsal Session Completed
              </h3>
              <p className="text-xs text-[#d6c8c5] mb-6 leading-relaxed uppercase">
                PARTICIPANT COMPLETED SIMULATION WITH <strong className="text-[#06d6a0]">9/10 APPROPRIATE RESPONSES</strong> AND 1 PACING FLAG LOGGED.
              </p>

              <div className="bg-[#110e11] p-4 border-2 border-black mb-6 space-y-2 text-xs">
                <div className="flex justify-between text-[#d6c8c5]">
                  <span>GOAL:</span>
                  <span className="font-bold text-white uppercase text-right max-w-[220px] truncate">
                    {intakeConfig?.sessionGoal || 'Build confidence answering behavioral questions'}
                  </span>
                </div>
                <div className="flex justify-between text-[#d6c8c5]">
                  <span>DIFFICULTY:</span>
                  <span className="font-bold text-[#ffd166] uppercase">{difficulty}</span>
                </div>
                <div className="flex justify-between text-[#d6c8c5]">
                  <span>REGULATION INDEX:</span>
                  <span className="font-bold text-[#06d6a0] uppercase">OPTIMAL (94%)</span>
                </div>
                <div className="flex justify-between text-[#d6c8c5]">
                  <span>FLAGGED MOMENTS:</span>
                  <span className="font-bold text-[#e0533c] uppercase">1 LONG PAUSE (+4.2S)</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 font-heading font-black uppercase text-xs">
                <button
                  onClick={() => setSessionCompletedModal(false)}
                  className="flex-1 py-3.5 bg-[#251f22] hover:bg-[#342a2d] text-[#d6c8c5] border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
                >
                  CLOSE
                </button>
                <button
                  onClick={() => {
                    setSessionCompletedModal(false);
                    onProceedToDebrief();
                  }}
                  className="flex-1 py-3.5 bg-[#ffd166] hover:bg-[#ffe28a] text-black border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>VIEW FULL DEBRIEF</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

