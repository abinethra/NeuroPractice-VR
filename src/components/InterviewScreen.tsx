import React, { useState } from 'react';
import { InterviewRoomIllustration, RestaurantRoomIllustration } from './VectorIllustrations';
import { DifficultyLevel, ResponseOption, ScenarioId, SessionExchange } from '../types';
import { getScenarioData, DIFFICULTY_PALETTE, SCENARIO_CATALOG } from '../data/interviewScenarios';
import { 
  Sparkles, ArrowRight, MessageSquare, CheckCircle2, RotateCcw, 
  Award, HeartHandshake, Briefcase, Zap, HelpCircle, Clock,
  UtensilsCrossed, Compass
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

  // Active difficulty color and tone icon
  const activeDotColor = DIFFICULTY_PALETTE[difficulty] || '#02C39A';
  const getDifficultyIcon = () => {
    if (difficulty === 'easy') return <HeartHandshake className="w-3.5 h-3.5 text-[#02C39A]" />;
    if (difficulty === 'moderate') return <Briefcase className="w-3.5 h-3.5 text-[#028090]" />;
    return <Zap className="w-3.5 h-3.5 text-[#F4A261]" />;
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Top Header info */}
      <div className="mb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#02C39A]">
            <span>Screen 4 of 6</span>
            <span>&bull;</span>
            <span>VR Interactive Simulation ({scenarioMeta.title})</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            {scenarioId === 'restaurant-ordering' ? (
              <>
                <UtensilsCrossed className="w-6 h-6 text-[#02C39A]" />
                <span>Restaurant Ordering Rehearsal</span>
              </>
            ) : (
              <>
                <Briefcase className="w-6 h-6 text-[#02C39A]" />
                <span>Branching Job Interview Rehearsal</span>
              </>
            )}
          </h2>
        </div>

        {/* Difficulty Level Selector + Active Colored Dot & Label */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Active Difficulty Indicator Badge with specified palette dot */}
          <div 
            id="active-difficulty-indicator"
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md transition-all duration-300"
            style={{ 
              borderColor: `${activeDotColor}60`,
              backgroundColor: `${activeDotColor}15`,
            }}
          >
            <span 
              className="w-2.5 h-2.5 rounded-full shadow-sm animate-pulse shrink-0" 
              style={{ backgroundColor: activeDotColor }}
            />
            <span 
              className="text-xs font-extrabold tracking-wide uppercase"
              style={{ color: activeDotColor }}
            >
              {difficulty} Mode
            </span>
          </div>

          {/* Difficulty Switcher Tabs */}
          <div className="flex items-center bg-[#022A2E] p-1 rounded-xl border border-[#028090]/40 text-xs">
            <button
              onClick={() => handleDifficultyChange('easy')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                difficulty === 'easy'
                  ? 'bg-[#02C39A] text-[#022F33] shadow-md'
                  : 'text-[#99F6E4] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#02C39A]" />
              <span>Easy</span>
            </button>
            <button
              onClick={() => handleDifficultyChange('moderate')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                difficulty === 'moderate'
                  ? 'bg-[#028090] text-white shadow-md'
                  : 'text-[#99F6E4] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#028090]" />
              <span>Moderate</span>
            </button>
            <button
              onClick={() => handleDifficultyChange('hard')}
              className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                difficulty === 'hard'
                  ? 'bg-[#F4A261] text-[#0F172A] shadow-md'
                  : 'text-[#99F6E4] hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#F4A261]" />
              <span>Hard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch my-auto">
        {/* Left: NPC Stage Scene (Desk / Restaurant) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[260px] lg:min-h-[340px] relative rounded-3xl overflow-hidden border-2 border-[#028090]/50 shadow-2xl"
        >
          {scenarioId === 'restaurant-ordering' ? (
            <RestaurantRoomIllustration isSpeaking={isSpeakingAnimation} className="h-full" />
          ) : (
            <InterviewRoomIllustration isSpeaking={isSpeakingAnimation} className="h-full" />
          )}
          
          {/* NPC Status & Tone Overlay */}
          <div className="absolute bottom-3 left-3 bg-[#022427]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[#028090]/40 text-xs text-[#CCFBF1] flex items-center gap-2 shadow-lg">
            <span 
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${isSpeakingAnimation ? 'animate-ping' : ''}`}
              style={{ backgroundColor: activeDotColor }}
            />
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {scenarioMeta.npcName} &bull; {scenarioMeta.roleLabel}
              </span>
              <span className="text-[10px]" style={{ color: activeDotColor }}>
                Tone: {currentScenario.npcTone}
              </span>
            </div>
          </div>

          {/* Hard mode alert badge */}
          {difficulty === 'hard' && (
            <div className="absolute top-3 right-3 bg-[#F4A261]/20 border border-[#F4A261] px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#F4A261] backdrop-blur-md flex items-center gap-1.5 animate-pulse">
              <Zap className="w-3.5 h-3.5" />
              <span>{scenarioId === 'restaurant-ordering' ? 'Order Mix-Up Mode' : 'Rapid Follow-Up Mode'}</span>
            </div>
          )}
        </motion.div>

        {/* Right: Dialogue Speech Bubble & NPC Follow-up */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* NPC Speech Bubble */}
          <motion.div
            key={`${scenarioId}-${difficulty}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="relative bg-white text-[#0F172A] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl border-2"
            style={{ borderColor: activeDotColor }}
          >
            {/* Speech bubble tail */}
            <div className="hidden lg:block absolute -left-3 top-10 w-0 h-0 border-t-8 border-t-transparent border-r-[14px] border-r-white border-b-8 border-b-transparent"></div>

            <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: activeDotColor }}
                />
                <span 
                  className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5"
                  style={{ color: difficulty === 'hard' ? '#D97706' : (difficulty === 'moderate' ? '#028090' : '#0D9488') }}
                >
                  {getDifficultyIcon()}
                  <span>{scenarioMeta.roleLabel} Prompt ({difficulty.toUpperCase()})</span>
                </span>
              </div>
              
              {/* NPC Tone Tag */}
              <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-slate-700">
                <span>Tone:</span>
                <span className="font-bold" style={{ color: difficulty === 'hard' ? '#D97706' : (difficulty === 'moderate' ? '#028090' : '#0D9488') }}>
                  {currentScenario.npcTone}
                </span>
              </div>
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
                <p className="text-base sm:text-lg font-semibold text-slate-800 leading-relaxed" id="npc-speech-bubble-text">
                  {activeNpcReply ? activeNpcReply : `"${currentScenario.question}"`}
                </p>
              </motion.div>
            </AnimatePresence>

            {activeNpcReply && (
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-bold flex items-center gap-1.5" style={{ color: activeDotColor }}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>NPC Follow-Up Feedback Received</span>
                </span>
                <button
                  onClick={() => {
                    setActiveNpcReply(null);
                    setSelectedOptionId(null);
                  }}
                  className="text-xs text-[#028090] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try another answer</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Social Cue Helper Hint / Context pill */}
          <div className="bg-[#03343A] rounded-xl px-4 py-2.5 border border-[#028090]/40 flex items-center justify-between text-xs text-[#99F6E4]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#02C39A] shrink-0" />
              <span>
                <strong>NPC Dynamic:</strong> {currentScenario.npcToneDescription}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Response Option Buttons (3 options changing based on difficulty) */}
      <div className="mt-4 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5EEAD4] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#02C39A]" />
            <span>
              Select Your Response ({difficulty === 'easy' ? 'Longer & Supportive' : (difficulty === 'moderate' ? 'Shorter & Direct' : 'Includes Processing Pause Option')}):
            </span>
          </label>
          <span className="text-xs text-[#99F6E4]/70">Click an option to speak in VR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                className={`text-left p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between relative shadow-md ${
                  isSelected
                    ? 'bg-[#00A896]/20 ring-2 text-white shadow-lg'
                    : 'bg-[#03343A] hover:bg-[#04454C] border-[#028090]/40 text-[#CCFBF1] hover:border-[#00A896]'
                } ${isAskForTimeOption && !isSelected ? 'border-[#F4A261]/60 hover:border-[#F4A261]' : ''}`}
                style={{
                  borderColor: isSelected ? activeDotColor : undefined,
                  boxShadow: isSelected ? `0 0 15px ${activeDotColor}40` : undefined,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 gap-1.5">
                    <span 
                      className="text-xs font-extrabold uppercase tracking-wide flex items-center gap-1"
                      style={{ color: isAskForTimeOption ? '#F4A261' : '#5EEAD4' }}
                    >
                      {isAskForTimeOption && <Clock className="w-3.5 h-3.5 text-[#F4A261]" />}
                      <span>{option.label}</span>
                    </span>
                    {isSelected && (
                      <span 
                        className="w-5 h-5 rounded-full text-[#022F33] flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ backgroundColor: activeDotColor }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                    "{option.text}"
                  </p>
                </div>

                {/* Demonstration Tags */}
                <div className="mt-3 pt-2 border-t border-[#028090]/30 flex flex-wrap gap-1.5">
                  {option.skillsDemonstrated.slice(0, 3).map((skill, sIdx) => (
                    <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-[#022A2E] text-[#99F6E4] border border-[#028090]/40 font-medium">
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
            className="mt-4 bg-gradient-to-r from-[#024F57] to-[#03383E] border rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
            style={{ borderColor: activeDotColor }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center font-bold"
                style={{ 
                  backgroundColor: `${activeDotColor}20`,
                  border: `1px solid ${activeDotColor}60`,
                  color: activeDotColor 
                }}
              >
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Response Successfully Logged</h4>
                <p className="text-xs text-[#99F6E4]/90">
                  Appropriateness Score: <strong>{selectedOptionObj?.appropriateScore || 10}/10</strong> &bull; Telemetry synced with Clinician Supervision Hub.
                </p>
              </div>
            </div>

            <button
              onClick={onContinueToDashboard}
              id="continue-to-therapist-btn"
              className="w-full sm:w-auto px-6 py-3 rounded-full hover:opacity-95 text-[#022F33] font-bold text-sm shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group shrink-0"
              style={{
                backgroundColor: activeDotColor,
                color: difficulty === 'hard' ? '#0F172A' : '#022F33',
                boxShadow: `0 4px 14px ${activeDotColor}40`
              }}
            >
              <span>Continue to Therapist View</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
