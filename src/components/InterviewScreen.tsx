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
  const activeDotColor = DIFFICULTY_PALETTE[difficulty] || '#7f3e3b';
  const getDifficultyIcon = () => {
    if (difficulty === 'easy') return <HeartHandshake className="w-3.5 h-3.5 text-[#7f3e3b]" />;
    if (difficulty === 'moderate') return <Briefcase className="w-3.5 h-3.5 text-[#a26f4a]" />;
    return <Zap className="w-3.5 h-3.5 text-[#d6c8c5]" />;
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between text-center items-center">
      {/* Top Header info */}
      <div className="mb-3 flex flex-col items-center justify-center gap-3 text-center w-full">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#a26f4a]">
            <span>Screen 4 of 6</span>
            <span>&bull;</span>
            <span>VR Interactive Simulation ({scenarioMeta.title})</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#d6c8c5] flex items-center justify-center gap-2 mt-1">
            {scenarioId === 'restaurant-ordering' ? (
              <>
                <UtensilsCrossed className="w-6 h-6 text-[#a26f4a]" />
                <span>Restaurant Ordering Rehearsal</span>
              </>
            ) : (
              <>
                <Briefcase className="w-6 h-6 text-[#a26f4a]" />
                <span>Branching Job Interview Rehearsal</span>
              </>
            )}
          </h2>
        </div>

        {/* Difficulty Level Selector + Active Colored Dot & Label */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* Active Difficulty Indicator Badge with specified palette dot */}
          <div 
            id="active-difficulty-indicator"
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-2xl border backdrop-blur-md transition-all duration-300"
            style={{ 
              borderColor: `${activeDotColor}80`,
              backgroundColor: '#1a1618',
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
          <div className="flex items-center justify-center bg-[#1a1618] p-1 rounded-2xl border border-[#7f3e3b]/50 text-xs">
            <button
              onClick={() => handleDifficultyChange('easy')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                difficulty === 'easy'
                  ? 'bg-[#7f3e3b] text-white shadow-md'
                  : 'text-[#d6c8c5]/70 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7f3e3b]" />
              <span>Easy</span>
            </button>
            <button
              onClick={() => handleDifficultyChange('moderate')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                difficulty === 'moderate'
                  ? 'bg-[#a26f4a] text-white shadow-md'
                  : 'text-[#d6c8c5]/70 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#a26f4a]" />
              <span>Moderate</span>
            </button>
            <button
              onClick={() => handleDifficultyChange('hard')}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                difficulty === 'hard'
                  ? 'bg-[#3d2524] text-[#d6c8c5] border border-[#d6c8c5] shadow-md'
                  : 'text-[#d6c8c5]/70 hover:text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d6c8c5]" />
              <span>Hard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Grid */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch my-auto">
        {/* Left: NPC Stage Scene (Desk / Restaurant) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-5 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto min-h-[260px] lg:min-h-[340px] relative rounded-3xl overflow-hidden border-2 border-[#7f3e3b]/50 shadow-2xl bg-[#0f0e10]"
        >
          {scenarioId === 'restaurant-ordering' ? (
            <RestaurantRoomIllustration isSpeaking={isSpeakingAnimation} className="h-full" />
          ) : (
            <InterviewRoomIllustration isSpeaking={isSpeakingAnimation} className="h-full" />
          )}
          
          {/* NPC Status & Tone Overlay */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-[#0f0e10]/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-[#7f3e3b]/60 text-xs text-[#d6c8c5] flex items-center gap-2 shadow-lg whitespace-nowrap">
            <span 
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${isSpeakingAnimation ? 'animate-ping' : ''}`}
              style={{ backgroundColor: activeDotColor }}
            />
            <div className="flex flex-col text-center">
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
            <div className="absolute top-3 right-3 bg-[#1a1618]/90 border border-[#d6c8c5] px-2.5 py-1 rounded-xl text-[11px] font-bold text-[#d6c8c5] backdrop-blur-md flex items-center gap-1.5 shadow-md">
              <Zap className="w-3.5 h-3.5 text-[#d6c8c5]" />
              <span>{scenarioId === 'restaurant-ordering' ? 'Order Mix-Up Mode' : 'Rapid Follow-Up Mode'}</span>
            </div>
          )}
        </motion.div>

        {/* Right: Dialogue Speech Bubble & NPC Follow-up */}
        <div className="lg:col-span-7 flex flex-col gap-3 text-center">
          {/* NPC Speech Bubble */}
          <motion.div
            key={`${scenarioId}-${difficulty}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className="relative bg-[#1a1618] text-[#d6c8c5] rounded-3xl p-5 sm:p-6 shadow-2xl border-2 text-center"
            style={{ borderColor: activeDotColor }}
          >
            <div className="flex flex-wrap items-center justify-center gap-2 mb-2.5 pb-2 border-b border-[#7f3e3b]/30">
              <div className="flex items-center justify-center gap-2">
                <span 
                  className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                  style={{ backgroundColor: activeDotColor }}
                />
                <span 
                  className="text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5"
                  style={{ color: activeDotColor }}
                >
                  {getDifficultyIcon()}
                  <span>{scenarioMeta.roleLabel} Prompt ({difficulty.toUpperCase()})</span>
                </span>
              </div>
              
              {/* NPC Tone Tag */}
              <div className="flex items-center justify-center gap-1.5 bg-[#251f22] px-3 py-0.5 rounded-full text-[11px] font-semibold text-[#d6c8c5]">
                <span>Tone:</span>
                <span className="font-bold" style={{ color: activeDotColor }}>
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
                <p className="text-base sm:text-lg font-semibold text-white leading-relaxed text-center" id="npc-speech-bubble-text">
                  {activeNpcReply ? activeNpcReply : `"${currentScenario.question}"`}
                </p>
              </motion.div>
            </AnimatePresence>

            {activeNpcReply && (
              <div className="mt-3 pt-2.5 border-t border-[#7f3e3b]/30 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-[#d6c8c5]/70 text-center">
                <span className="font-bold flex items-center justify-center gap-1.5" style={{ color: activeDotColor }}>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>NPC Follow-Up Feedback Received</span>
                </span>
                <button
                  onClick={() => {
                    setActiveNpcReply(null);
                    setSelectedOptionId(null);
                  }}
                  className="text-xs text-[#a26f4a] hover:underline flex items-center justify-center gap-1 font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try another answer</span>
                </button>
              </div>
            )}
          </motion.div>

          {/* Social Cue Helper Hint / Context pill */}
          <div className="bg-[#1a1618] rounded-2xl px-4 py-3 border border-[#7f3e3b]/40 flex items-center justify-center text-xs text-[#d6c8c5] text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#a26f4a] shrink-0" />
              <span>
                <strong>NPC Dynamic:</strong> {currentScenario.npcToneDescription}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Response Option Buttons (3 options changing based on difficulty) */}
      <div className="w-full mt-4 pt-2 text-center">
        <div className="flex flex-col items-center justify-center gap-1 mb-3 text-center">
          <label className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#d6c8c5] flex items-center justify-center gap-2 text-center">
            <MessageSquare className="w-4 h-4 text-[#a26f4a]" />
            <span>
              Select Your Response ({difficulty === 'easy' ? 'Longer & Supportive' : (difficulty === 'moderate' ? 'Shorter & Direct' : 'Includes Processing Pause Option')}):
            </span>
          </label>
          <span className="text-xs text-[#d6c8c5]/70 text-center">Click an option to speak in VR</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
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
                className={`text-center p-4 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-between relative shadow-lg ${
                  isSelected
                    ? 'bg-[#251f22] ring-2 ring-[#a26f4a] text-white shadow-xl'
                    : 'bg-[#1a1618] hover:bg-[#251f22] border-[#7f3e3b]/40 text-[#d6c8c5] hover:border-[#a26f4a]'
                } ${isAskForTimeOption && !isSelected ? 'border-[#a26f4a]/70 hover:border-[#a26f4a]' : ''}`}
                style={{
                  borderColor: isSelected ? activeDotColor : undefined,
                  boxShadow: isSelected ? `0 0 15px ${activeDotColor}40` : undefined,
                }}
              >
                <div className="w-full flex flex-col items-center text-center">
                  <div className="flex items-center justify-center mb-2 gap-1.5 text-center">
                    <span 
                      className="text-xs font-extrabold uppercase tracking-wide flex items-center justify-center gap-1 text-center"
                      style={{ color: isAskForTimeOption ? '#a26f4a' : '#d6c8c5' }}
                    >
                      {isAskForTimeOption && <Clock className="w-3.5 h-3.5 text-[#a26f4a]" />}
                      <span>{option.label}</span>
                    </span>
                    {isSelected && (
                      <span 
                        className="w-5 h-5 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0 ml-1"
                        style={{ backgroundColor: activeDotColor }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[#d6c8c5]/90 leading-relaxed text-center">
                    "{option.text}"
                  </p>
                </div>

                {/* Demonstration Tags */}
                <div className="w-full mt-3 pt-2 border-t border-[#7f3e3b]/30 flex flex-wrap items-center justify-center gap-1.5">
                  {option.skillsDemonstrated.slice(0, 3).map((skill, sIdx) => (
                    <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-[#251f22] text-[#d6c8c5]/90 border border-[#7f3e3b]/40 font-medium text-center">
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
            className="w-full mt-4 bg-[#1a1618] border-2 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl text-center"
            style={{ borderColor: activeDotColor }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center mx-auto sm:mx-0">
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold shrink-0"
                style={{ 
                  backgroundColor: `${activeDotColor}25`,
                  border: `1px solid ${activeDotColor}`,
                  color: activeDotColor 
                }}
              >
                <Award className="w-5 h-5" />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-white font-bold text-sm text-center sm:text-left">Response Successfully Logged</h4>
                <p className="text-xs text-[#d6c8c5]/90 text-center sm:text-left">
                  Appropriateness Score: <strong>{selectedOptionObj?.appropriateScore || 10}/10</strong> &bull; Telemetry synced with Clinician Supervision Hub.
                </p>
              </div>
            </div>

            <button
              onClick={onContinueToDashboard}
              id="continue-to-therapist-btn"
              className="w-full sm:w-auto px-7 py-3 rounded-full hover:opacity-95 text-white font-extrabold text-sm shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group shrink-0 border border-[#a26f4a]/50 mx-auto sm:mx-0"
              style={{
                backgroundColor: activeDotColor,
                boxShadow: `0 4px 14px ${activeDotColor}50`
              }}
            >
              <span>Continue to Clinician Hub</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#d6c8c5]" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
