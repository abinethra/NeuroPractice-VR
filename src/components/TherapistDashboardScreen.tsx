import React, { useEffect, useRef, useState } from 'react';
import { InterviewRoomIllustration } from './VectorIllustrations';
import { DifficultyLevel, SessionExchange } from '../types';
import { 
  Pause, Play, Lightbulb, ShieldAlert, CheckCircle2, RotateCcw, 
  Activity, Laptop, Sliders, AlertCircle, BarChart3, Clock, 
  FileText, Download, Sparkles, Check, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Chart from 'chart.js/auto';
import confetti from 'canvas-confetti';
import { downloadOfflineHtml } from '../utils/offlineHtmlGenerator';

interface TherapistDashboardScreenProps {
  difficulty: DifficultyLevel;
  onUpdateDifficulty: (diff: DifficultyLevel) => void;
  lastExchange: SessionExchange | null;
  onRestartDemo: () => void;
}

export const TherapistDashboardScreen: React.FC<TherapistDashboardScreenProps> = ({
  difficulty,
  onUpdateDifficulty,
  lastExchange,
  onRestartDemo,
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
        colors: ['#02C39A', '#00A896', '#028090', '#CCFBF1'],
      });
    } catch (e) {
      // confetti fallback
    }
  };

  // Initialize Chart.js with the exact mock data specified in user prompt:
  // "bar chart showing 'appropriate responses per session' across 5 mock sessions, trending upward (3, 5, 6, 8, 9)"
  useEffect(() => {
    if (!chartCanvasRef.current) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = chartCanvasRef.current.getContext('2d');
    if (!ctx) return;

    // Create gradient fill for bar chart
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#02C39A');
    gradient.addColorStop(1, '#028090');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5 (Today)'],
        datasets: [
          {
            label: 'Appropriate Responses',
            data: [3, 5, 6, 8, 9],
            backgroundColor: gradient,
            hoverBackgroundColor: '#00A896',
            borderColor: '#5EEAD4',
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
            backgroundColor: '#022427',
            titleColor: '#CCFBF1',
            bodyColor: '#FFFFFF',
            borderColor: '#02C39A',
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
              color: '#99F6E4',
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
              color: '#99F6E4',
              font: {
                family: 'system-ui, sans-serif',
                size: 11,
              },
            },
            grid: {
              color: 'rgba(2, 128, 144, 0.25)',
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
    <div className="max-w-6xl mx-auto py-4 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Header Context */}
      <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02C39A]">
            <span>Screen 4 of 4</span>
            <span>&bull;</span>
            <span>Therapist Real-Time Supervision Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Clinician Supervision Dashboard
          </h2>
        </div>

        {/* Live Headset Telemetry Ping */}
        <div className="flex items-center gap-2 bg-[#032A2E] px-3 py-1.5 rounded-xl border border-[#028090]/50 text-xs text-[#99F6E4]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#02C39A] animate-pulse"></span>
          <span>Participant Headset: <strong>Connected (32ms latency)</strong></span>
        </div>
      </div>

      {/* LAPTOP / MONITOR-STYLE FRAME */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-[#011C1E] rounded-3xl border-4 border-[#03343A] shadow-2xl p-4 sm:p-6 mb-5 relative"
      >
        {/* Laptop Top Bezel / Status Bar */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#028090]/30 text-xs text-[#99F6E4]/70">
          <div className="flex items-center gap-2">
            <Laptop className="w-4 h-4 text-[#02C39A]" />
            <span className="font-semibold text-white">NeuroPractice Clinician Console v2.4</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">Session ID: #NP-8821</span>
            <span className="px-2 py-0.5 rounded bg-[#02C39A]/20 text-[#5EEAD4] font-mono text-[11px] border border-[#02C39A]/30">
              LIVE TELEMETRY
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
              className="mb-4 bg-[#024F57] border-l-4 border-[#02C39A] rounded-xl p-3.5 flex items-start gap-3 shadow-lg"
            >
              <AlertCircle className="w-5 h-5 text-[#02C39A] shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-white text-xs sm:text-sm font-bold">{activeAlert.title}</h4>
                <p className="text-[#CCFBF1] text-xs mt-0.5">{activeAlert.description}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dashboard Grid: Left (Mirrored VR View + Live Transcript) | Right (Controls + Sliders) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Mirrored "VR View" Thumbnail + Live Transcript */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Mirrored "VR View" Thumbnail */}
            <div className="bg-[#032A2E] rounded-2xl p-3.5 border border-[#028090]/40">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#02C39A]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Mirrored VR Participant View (Thumbnail)
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#022427] text-[#99F6E4] font-medium border border-[#028090]/30">
                  {isSessionPaused ? 'PAUSED' : 'STREAMING 1080p'}
                </span>
              </div>

              {/* Reusable mini-scene illustration with pause overlay */}
              <div className="relative h-[160px] sm:h-[180px] rounded-xl overflow-hidden border border-[#00A896]/30">
                <InterviewRoomIllustration isThumbnail={true} isSpeaking={!isSessionPaused} />
                
                {isSessionPaused && (
                  <div className="absolute inset-0 bg-[#022F33]/85 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
                    <Pause className="w-8 h-8 text-[#02C39A] mb-2" />
                    <span className="text-sm font-bold text-white">Rehearsal Paused for Co-Regulation</span>
                    <span className="text-xs text-[#99F6E4] mt-1">Calm breathing audio active in participant headset</span>
                  </div>
                )}
              </div>
            </div>

            {/* Live Transcript Panel showing the last exchange */}
            <div className="bg-white text-slate-800 rounded-2xl p-4 sm:p-5 shadow-lg border border-slate-100 flex-1">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#028090]" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#028090]">
                    Live Exchange Transcript
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  {lastExchange?.timestamp || 'Just now'} &bull; Difficulty: {difficulty.toUpperCase()}
                </span>
              </div>

              {/* Question */}
              <div className="mb-3">
                <div className="text-[11px] font-bold text-slate-500 uppercase">Interviewer (NPC):</div>
                <p className="text-xs sm:text-sm font-semibold text-slate-800 mt-0.5">
                  "{lastExchange?.question || 'Tell me about a time you faced a difficult problem at work or school.'}"
                </p>
              </div>

              {/* Participant Response */}
              <div className="mb-3 bg-[#E6FFFA] p-3 rounded-xl border border-[#99F6E4]">
                <div className="text-[11px] font-bold text-[#0D9488] uppercase">
                  Participant Response ({lastExchange?.userResponseLabel || 'Selected Response'}):
                </div>
                <p className="text-xs sm:text-sm text-slate-800 mt-0.5 italic">
                  "{lastExchange?.userResponseText || 'During a group project, our dataset had missing values. I created a shared checklist to organize entries with my partner, and we submitted on time.'}"
                </p>
              </div>

              {/* NPC Reply */}
              <div className="mb-2">
                <div className="text-[11px] font-bold text-slate-500 uppercase">NPC Follow-Up Feedback:</div>
                <p className="text-xs sm:text-sm text-slate-700 mt-0.5">
                  "{lastExchange?.npcReply || 'Thank you for walking me through that. Breaking down the dataset with a shared checklist demonstrates strong methodical thinking.'}"
                </p>
              </div>

              {/* Clinician Analysis Note */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium text-[#028090]">
                  <strong>Clinical Note:</strong> {lastExchange?.clinicianNotes || 'Direct, structured communication with zero panic response.'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: In-Headset Controls & Dynamic Difficulty Slider */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Difficulty Slider */}
            <div className="bg-[#03343A] rounded-2xl p-4 border border-[#00A896]/50">
              <div className="flex items-center justify-between text-xs font-bold text-white mb-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#02C39A]" />
                  <span>Real-Time Difficulty Adjustment</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#022A2E] text-xs font-mono font-bold border border-[#028090]/40">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ 
                      backgroundColor: difficulty === 'easy' ? '#02C39A' : (difficulty === 'moderate' ? '#028090' : '#F4A261') 
                    }} 
                  />
                  <span style={{ 
                    color: difficulty === 'easy' ? '#02C39A' : (difficulty === 'moderate' ? '#028090' : '#F4A261') 
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
                className="w-full h-2.5 bg-[#022A2E] rounded-lg appearance-none cursor-pointer accent-[#02C39A]"
              />

              <div className="flex justify-between text-[11px] font-bold text-[#99F6E4]/80 mt-2.5 px-1">
                <span className={`flex items-center gap-1 ${difficulty === 'easy' ? 'text-[#02C39A] font-extrabold' : 'text-[#99F6E4]/70'}`}>
                  <span className="w-2 h-2 rounded-full bg-[#02C39A]" /> 1. Easy
                </span>
                <span className={`flex items-center gap-1 ${difficulty === 'moderate' ? 'text-[#028090] font-extrabold' : 'text-[#99F6E4]/70'}`}>
                  <span className="w-2 h-2 rounded-full bg-[#028090]" /> 2. Moderate
                </span>
                <span className={`flex items-center gap-1 ${difficulty === 'hard' ? 'text-[#F4A261] font-extrabold' : 'text-[#99F6E4]/70'}`}>
                  <span className="w-2 h-2 rounded-full bg-[#F4A261]" /> 3. Hard
                </span>
              </div>
            </div>

            {/* Four Clinician Control Action Buttons: Pause, Cue Hint, Ease Off, End Session */}
            <div className="bg-[#03343A] rounded-2xl p-4 border border-[#00A896]/50">
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                In-Headset Clinical Interventions
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. Pause */}
                <button
                  onClick={handlePauseToggle}
                  id="action-pause-btn"
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                    isSessionPaused
                      ? 'bg-[#02C39A] text-[#022F33] border-[#02C39A]'
                      : 'bg-[#022A2E] hover:bg-[#033F45] text-white border-[#028090]/50'
                  }`}
                >
                  {isSessionPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5 text-[#FEF08A]" />}
                  <span>{isSessionPaused ? 'Resume Session' : 'Pause Rehearsal'}</span>
                </button>

                {/* 2. Cue Hint */}
                <button
                  onClick={handleCueHint}
                  id="action-hint-btn"
                  className="p-3 rounded-xl bg-[#022A2E] hover:bg-[#033F45] text-white border border-[#028090]/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer hover:border-[#00A896]"
                >
                  <Lightbulb className="w-5 h-5 text-[#5EEAD4]" />
                  <span>Cue In-VR Hint</span>
                </button>

                {/* 3. Ease Off */}
                <button
                  onClick={handleEaseOff}
                  id="action-ease-off-btn"
                  className="p-3 rounded-xl bg-[#022A2E] hover:bg-[#033F45] text-white border border-[#028090]/50 flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer hover:border-[#00A896]"
                >
                  <ShieldAlert className="w-5 h-5 text-[#93C5FD]" />
                  <span>Ease Off Stimulus</span>
                </button>

                {/* 4. End Session */}
                <button
                  onClick={handleEndSession}
                  id="action-end-session-btn"
                  className="p-3 rounded-xl bg-[#024F57] hover:bg-[#00A896] text-white border border-[#02C39A]/60 flex flex-col items-center justify-center gap-1.5 text-xs font-bold transition-all cursor-pointer shadow-md"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#02C39A] group-hover:text-white" />
                  <span>End Session</span>
                </button>
              </div>
            </div>

            {/* Quick Session Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#022A2E] p-3 rounded-xl border border-[#028090]/30 text-center">
                <div className="text-[10px] font-bold text-[#99F6E4]/70 uppercase">Emotional Stability</div>
                <div className="text-xl font-extrabold text-[#02C39A] mt-0.5">94%</div>
                <div className="text-[10px] text-[#99F6E4]/60">Steady baseline</div>
              </div>
              <div className="bg-[#022A2E] p-3 rounded-xl border border-[#028090]/30 text-center">
                <div className="text-[10px] font-bold text-[#99F6E4]/70 uppercase">Avg Response Time</div>
                <div className="text-xl font-extrabold text-white mt-0.5">4.2s</div>
                <div className="text-[10px] text-[#99F6E4]/60">Thoughtful pacing</div>
              </div>
            </div>
          </div>
        </div>

        {/* SIMPLE BAR CHART SECTION (Chart.js): Appropriate responses across 5 mock sessions (3, 5, 6, 8, 9) */}
        <div className="mt-6 pt-5 border-t border-[#028090]/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-[#02C39A]" />
                <h3 className="text-sm font-bold text-white">
                  Longitudinal Progress: Appropriate Responses Per Session
                </h3>
              </div>
              <p className="text-xs text-[#99F6E4]/80 mt-0.5">
                5 mock sessions showing upward social-skill mastery trend (3 &rarr; 5 &rarr; 6 &rarr; 8 &rarr; 9)
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-[#5EEAD4] bg-[#032A2E] px-3 py-1 rounded-lg border border-[#028090]/40 self-start sm:self-auto">
              <Sparkles className="w-3.5 h-3.5 text-[#02C39A]" />
              <span>+200% Skill Retention Gain</span>
            </div>
          </div>

          {/* Canvas Chart Container */}
          <div className="h-[200px] sm:h-[220px] w-full bg-[#022427] rounded-xl p-3 border border-[#028090]/30">
            <canvas ref={chartCanvasRef} id="sessionProgressChart"></canvas>
          </div>
        </div>
      </motion.div>

      {/* Bottom Pitch Toolbar: Restart Demo / Standalone Offline Download */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          onClick={onRestartDemo}
          id="restart-demo-bottom-btn"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#03343A] hover:bg-[#044850] text-[#CCFBF1] hover:text-white border border-[#028090] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Rehearsal Demo (Screen 1)</span>
        </button>

        <button
          onClick={downloadOfflineHtml}
          id="download-offline-html-bottom-btn"
          className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] hover:text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#02C39A]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Download Offline Single-File HTML</span>
        </button>
      </div>

      {/* Session Completed Summary Modal */}
      <AnimatePresence>
        {sessionCompletedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#022427]/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#011F22] border-2 border-[#02C39A] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#02C39A]/20 border border-[#02C39A] flex items-center justify-center mx-auto mb-4 text-[#02C39A]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-extrabold text-white mb-2">Rehearsal Session Logged</h3>
              <p className="text-sm text-[#99F6E4]/90 mb-6 leading-relaxed">
                Participant completed the mock workplace interview with <strong>9/10 appropriate responses</strong> and zero sensory overload flags.
              </p>

              <div className="bg-[#032A2E] p-4 rounded-2xl border border-[#028090]/40 text-left mb-6 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Scenario Difficulty:</span>
                  <span className="font-bold text-[#5EEAD4] uppercase">{difficulty}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Sensory Regulation Index:</span>
                  <span className="font-bold text-[#02C39A]">Optimal (94%)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Communication Competence:</span>
                  <span className="font-bold text-white">Mastery Achieved</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setSessionCompletedModal(false)}
                  className="flex-1 py-3 rounded-full bg-[#03343A] hover:bg-[#044850] text-[#CCFBF1] font-bold text-xs transition-colors cursor-pointer"
                >
                  Close Summary
                </button>
                <button
                  onClick={() => {
                    setSessionCompletedModal(false);
                    onRestartDemo();
                  }}
                  className="flex-1 py-3 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] font-bold text-xs transition-colors cursor-pointer"
                >
                  Run Demo Again
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
