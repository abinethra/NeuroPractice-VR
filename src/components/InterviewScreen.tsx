import React, { useState } from 'react';
import { InterviewRoomIllustration, RestaurantRoomIllustration } from './VectorIllustrations';
import { DifficultyLevel, ResponseOption, ScenarioId, SessionExchange } from '../types';
import { getScenarioData, DIFFICULTY_PALETTE, SCENARIO_CATALOG } from '../data/interviewScenarios';
import { 
  Sparkles, ArrowRight, MessageSquare, CheckCircle2, RotateCcw, 
  Award, HeartHandshake, Briefcase, Zap, HelpCircle, Clock,
  UtensilsCrossed, Compass, Terminal, ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSoftChime } from '../utils/audio';
import { logSessionTelemetry } from '../services/apiService';

interface InterviewScreenProps {
  scenarioId?: ScenarioId;
  difficulty: DifficultyLevel;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
  onRecordExchange: (exchange: SessionExchange) => void;
  onContinueToDashboard: () => void;
}

export const InterviewScreen: React.FC<InterviewScreenProps> = ({
  scenarioId,
  difficulty,
  onSelectDifficulty,
  onRecordExchange,
  onContinueToDashboard,
}) => {
  const safeScenarioId: ScenarioId = scenarioId || 'job-interview';
  const currentScenario = getScenarioData(safeScenarioId, difficulty);
  const scenarioMeta = SCENARIO_CATALOG.find((s) => s.id === safeScenarioId) || SCENARIO_CATALOG[0];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [activeNpcReply, setActiveNpcReply] = useState<string | null>(null);
  const [isSpeakingAnimation, setIsSpeakingAnimation] = useState<boolean>(false);

  const handleDifficultyChange = (newDiff: DifficultyLevel) => {
    onSelectDifficulty(newDiff);
    setSelectedOptionId(null);
    setActiveNpcReply(null);
    setIsSpeakingAnimation(false);
  };

  const handleSelectOption = (option: ResponseOption) => {
    setSelectedOptionId(option.id);
    setIsSpeakingAnimation(true);
    playSoftChime();

    // Trigger NPC reply
    setTimeout(() => {
      setActiveNpcReply(option.npcReply);
      setIsSpeakingAnimation(false);

      // Record this exchange in the live transcript
      const exchange: SessionExchange = {
        id: `exch-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        scenarioId: safeScenarioId,
        scenarioTitle: scenarioMeta.title,
        difficulty: difficulty,
        question: currentScenario.question,
        userResponseLabel: option.label,
        userResponseText: option.text,
        npcReply: option.npcReply,
        clinicianNotes: option.clinicianNotes,
        skillsDemonstrated: option.skillsDemonstrated,
        appropriateScore: option.appropriateScore,
      };
      onRecordExchange(exchange);
      logSessionTelemetry(exchange, 'Rahul K.', 'Social Communication & Executive Pacing');
    }, 450);
  };

  const selectedOptionObj = currentScenario.options.find((opt) => opt.id === selectedOptionId);

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between items-stretch">
      {/* Top Header info */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffd166] text-black font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
            <span>04 / 06 LIVE VR SIMULATION</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
            {scenarioId === 'restaurant-ordering' ? (
              <>
                <UtensilsCrossed className="w-7 h-7 text-[#ffd166] stroke-[2.5]" />
                <span>Restaurant Ordering Matrix</span>
              </>
            ) : (
              <>
                <Briefcase className="w-7 h-7 text-[#ffd166] stroke-[2.5]" />
                <span>Job Interview Dialogue Matrix</span>
              </>
            )}
          </h2>
        </div>

        {/* Difficulty Level Selector */}
        <div className="flex items-center gap-1.5 bg-[#181417] p-1.5 border-3 border-black shadow-[3px_3px_0px_#000]">
          <span className="font-mono text-[10px] font-black uppercase text-[#d6c8c5]/70 px-2">
            LEVEL:
          </span>
          <button
            onClick={() => handleDifficultyChange('easy')}
            className={`px-3 py-1 font-mono text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
              difficulty === 'easy'
                ? 'bg-[#06d6a0] text-black shadow-[2px_2px_0px_#000]'
                : 'bg-[#251f22] text-[#d6c8c5]'
            }`}
          >
            EASY
          </button>
          <button
            onClick={() => handleDifficultyChange('moderate')}
            className={`px-3 py-1 font-mono text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
              difficulty === 'moderate'
                ? 'bg-[#ffd166] text-black shadow-[2px_2px_0px_#000]'
                : 'bg-[#251f22] text-[#d6c8c5]'
            }`}
          >
            MODERATE
          </button>
          <button
            onClick={() => handleDifficultyChange('hard')}
            className={`px-3 py-1 font-mono text-xs font-black uppercase tracking-wider border-2 border-black transition-all cursor-pointer ${
              difficulty === 'hard'
                ? 'bg-[#e0533c] text-white shadow-[2px_2px_0px_#000]'
                : 'bg-[#251f22] text-[#d6c8c5]'
            }`}
          >
            HARD
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch mb-4">
        {/* Left: NPC Stage Scene */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[260px] lg:min-h-[320px] relative overflow-hidden border-3 border-black shadow-[6px_6px_0px_#000] bg-[#0d0c0f]"
        >
          {scenarioId === 'restaurant-ordering' ? (
            <RestaurantRoomIllustration isSpeaking={isSpeakingAnimation} className="h-full" />
          ) : (
            <InterviewRoomIllustration isSpeaking={isSpeakingAnimation} className="h-full" />
          )}
          
          {/* NPC Status & Tone Overlay */}
          <div className="absolute bottom-3 left-3 bg-black border-2 border-black font-mono text-xs font-black uppercase px-3 py-1.5 text-white shadow-[3px_3px_0px_#000] flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isSpeakingAnimation ? 'bg-[#e0533c] animate-ping' : 'bg-[#06d6a0]'}`} />
            <span>{scenarioMeta.npcName} ({scenarioMeta.roleLabel}) &bull; TONE: {currentScenario.npcTone}</span>
          </div>

          {/* Difficulty alert badge */}
          {difficulty === 'hard' && (
            <div className="absolute top-3 right-3 bg-[#e0533c] text-white border-2 border-black font-mono text-[10px] font-black uppercase px-2 py-1 shadow-[2px_2px_0px_#000] flex items-center gap-1">
              <Zap className="w-3 h-3 stroke-[3]" />
              <span>RAPID FOLLOW-UP</span>
            </div>
          )}
        </motion.div>

        {/* Right: Dialogue Speech Bubble & NPC Follow-up */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-3 text-left">
          {/* NPC Speech Bubble */}
          <motion.div
            key={`${scenarioId}-${difficulty}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="relative bg-[#181417] border-3 border-black p-5 sm:p-6 shadow-[6px_6px_0px_#000] flex flex-col justify-between flex-1"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-black font-mono text-xs">
                <span className="font-black uppercase text-[#ffd166] flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>{scenarioMeta.roleLabel} INTERACTION PROMPT</span>
                </span>
                <span className="px-2 py-0.5 bg-black text-[#06d6a0] border border-black font-bold uppercase text-[10px]">
                  DYNAMIC: {currentScenario.npcTone}
                </span>
              </div>

              {/* Core Question Text or Follow-up Reply */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNpcReply ? 'reply' : `${scenarioId}-${difficulty}-question`}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="font-heading font-black text-xl sm:text-2xl text-white uppercase leading-snug tracking-tight" id="npc-speech-bubble-text">
                    {activeNpcReply ? activeNpcReply : `"${currentScenario.question}"`}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {activeNpcReply && (
              <div className="mt-4 pt-3 border-t-2 border-black flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
                <span className="font-black text-[#06d6a0] flex items-center gap-1.5 uppercase">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>NPC FOLLOW-UP FEEDBACK LOGGED</span>
                </span>
                <button
                  onClick={() => {
                    setActiveNpcReply(null);
                    setSelectedOptionId(null);
                  }}
                  className="text-black bg-[#ffd166] hover:bg-[#ffe28a] px-2 py-1 border-2 border-black font-black uppercase text-[11px] flex items-center gap-1 cursor-pointer shadow-[2px_2px_0px_#000]"
                >
                  <RotateCcw className="w-3 h-3 stroke-[2.5]" />
                  <span>RETRY DIALOGUE</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Social Cue Helper Hint */}
          <div className="bg-[#181417] p-3.5 border-2 border-black shadow-[3px_3px_0px_#000] font-mono text-xs text-[#d6c8c5] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ffd166] stroke-[2.5] shrink-0" />
            <span>
              <strong className="text-white uppercase font-bold">BEHAVIORAL DYNAMIC:</strong> {currentScenario.npcToneDescription}
            </span>
          </div>
        </div>
      </div>

      {/* Response Option Buttons */}
      <div className="w-full mt-2 text-left">
        <div className="flex items-center gap-2 mb-3 font-mono text-xs font-black uppercase text-white">
          <MessageSquare className="w-4 h-4 text-[#ffd166] stroke-[2.5]" />
          <span>
            SELECT CANDIDATE RESPONSE &bull; {difficulty.toUpperCase()} CALIBRATION
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentScenario.options.map((option, idx) => {
            const isSelected = selectedOptionId === option.id;
            const isAskForTimeOption = option.id.includes('hard-opt-1') || option.id.includes('rest-hard-opt-2');

            return (
              <motion.button
                key={option.id}
                id={`response-option-${idx + 1}`}
                onClick={() => handleSelectOption(option)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-4 border-3 border-black text-left cursor-pointer flex flex-col justify-between transition-all ${
                  isSelected
                    ? 'bg-[#ffd166] text-black shadow-[6px_6px_0px_#000] -translate-x-1 -translate-y-1'
                    : 'bg-[#181417] text-[#d6c8c5] hover:bg-[#221c21] shadow-[4px_4px_0px_#000]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-black font-mono text-[11px] font-black uppercase">
                    <span className={isSelected ? 'text-black' : isAskForTimeOption ? 'text-[#ffd166]' : 'text-white'}>
                      {option.label}
                    </span>
                    {isSelected && (
                      <span className="px-1.5 py-0.2 bg-black text-[#ffd166] text-[10px]">
                        ✓ CHOSEN
                      </span>
                    )}
                  </div>
                  <p className={`text-xs sm:text-sm font-medium leading-relaxed ${isSelected ? 'text-black font-bold' : 'text-[#d6c8c5]'}`}>
                    "{option.text}"
                  </p>
                </div>

                {/* Demonstration Tags */}
                <div className="mt-3 pt-2.5 border-t-2 border-black flex flex-wrap gap-1">
                  {option.skillsDemonstrated.slice(0, 3).map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className={`text-[9px] font-mono px-1.5 py-0.5 border border-black font-bold uppercase ${
                        isSelected ? 'bg-black text-white' : 'bg-[#251f22] text-[#d6c8c5]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* "Continue to Therapist View" Reveal Banner */}
      <AnimatePresence>
        {activeNpcReply && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.3 }}
            className="w-full mt-4 bg-[#06d6a0] border-3 border-black p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 shadow-[6px_6px_0px_#000]"
          >
            <div className="flex items-center gap-3.5 font-mono text-black text-left">
              <div className="w-10 h-10 bg-black text-[#06d6a0] border-2 border-black flex items-center justify-center font-black shrink-0 text-lg shadow-[2px_2px_0px_#000]">
                ★
              </div>
              <div>
                <h4 className="font-heading font-black text-base uppercase text-black">RESPONSE LOGGED IN VR MATRIX</h4>
                <p className="text-xs font-bold text-black/80 uppercase">
                  SCORE: {selectedOptionObj?.appropriateScore || 10}/10 &bull; TELEMETRY SYNCHRONIZED WITH CLINICIAN HUB
                </p>
              </div>
            </div>

            <button
              onClick={onContinueToDashboard}
              id="continue-to-therapist-btn"
              className="px-8 py-3.5 bg-black hover:bg-[#181417] text-white font-heading font-black text-sm uppercase tracking-wider border-2 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>CONTINUE TO CLINICIAN HUB</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[3]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

