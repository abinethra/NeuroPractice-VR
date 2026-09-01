import React, { useState } from 'react';
import { ScenarioId, IntakeConfig } from '../types';
import { SCENARIO_CATALOG } from '../data/interviewScenarios';
import { ScenarioAvatarIllustration } from './VectorIllustrations';
import { 
  Play, Sparkles, Clock, CheckCircle2, ArrowRight, 
  Info, Compass, ShieldCheck, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { playSoftChime } from '../utils/audio';

interface ScenarioSelectScreenProps {
  intakeConfig: IntakeConfig;
  selectedScenarioId: ScenarioId;
  onSelectScenario: (scenarioId: ScenarioId) => void;
  onProceedToWaitingRoom: () => void;
}

export const ScenarioSelectScreen: React.FC<ScenarioSelectScreenProps> = ({
  intakeConfig,
  selectedScenarioId,
  onSelectScenario,
  onProceedToWaitingRoom,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleCardClick = (scenarioId: ScenarioId, isPlayable: boolean) => {
    if (isPlayable) {
      playSoftChime();
      onSelectScenario(scenarioId);
      setToastMessage(null);
    } else {
      setToastMessage('Part of our post-hackathon roadmap — full library in progress.');
      // Auto-hide toast after 3.5s
      setTimeout(() => {
        setToastMessage((current) => (current === 'Part of our post-hackathon roadmap — full library in progress.' ? null : current));
      }, 3500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-4 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between">
      {/* Toast Notification for Coming Soon cards */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-[#032427] border border-[#F4A261] text-[#FEF3C7] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <Clock className="w-4 h-4 text-[#F4A261] shrink-0" />
            <div className="text-xs font-semibold">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#99F6E4] hover:text-white text-xs ml-2 font-bold cursor-pointer"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Step Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#02C39A]/15 border border-[#00A896] text-[#5EEAD4] text-xs font-bold mb-3 shadow-inner">
            <Compass className="w-3.5 h-3.5" />
            <span>Screen 2 of 5 &bull; Scenario Library</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Choose a Rehearsal Scenario
          </h1>
          <p className="text-sm text-[#99F6E4]/80 leading-relaxed">
            Select an interactive environment calibrated for participant{' '}
            <strong className="text-white font-bold">{intakeConfig.participantName}</strong>. 
            Scenarios provide adaptive social pacing and behavioral feedback.
          </p>
        </div>

        {/* 7 Scenario Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {SCENARIO_CATALOG.map((scenario, index) => {
            const isPlayable = scenario.status === 'playable';
            const isSelected = selectedScenarioId === scenario.id;

            return (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => handleCardClick(scenario.id, isPlayable)}
                id={`scenario-card-${scenario.id}`}
                className={`group relative rounded-2xl p-5 border transition-all duration-200 text-left flex flex-col justify-between ${
                  isPlayable
                    ? isSelected
                      ? 'bg-gradient-to-b from-[#043E44] to-[#022A2E] border-[#02C39A] ring-2 ring-[#02C39A]/30 shadow-xl shadow-[#02C39A]/10 cursor-pointer scale-[1.02]'
                      : 'bg-[#032A2E] hover:bg-[#04383D] border-[#028090]/50 hover:border-[#00A896] shadow-lg cursor-pointer'
                    : 'bg-[#022427]/70 border-[#024F57]/40 opacity-60 hover:opacity-85 cursor-pointer'
                }`}
              >
                {/* Active checkmark / Selection pill */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <ScenarioAvatarIllustration
                      iconType={scenario.iconType}
                      size={48}
                      className={isSelected ? 'ring-2 ring-[#02C39A]' : ''}
                    />
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#5EEAD4] block">
                        {scenario.categoryTag}
                      </span>
                      <h3 className="text-base font-bold text-white group-hover:text-[#CCFBF1] transition-colors flex items-center gap-1.5">
                        <span>{scenario.title}</span>
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div>
                    {isPlayable ? (
                      isSelected ? (
                        <span className="px-2.5 py-1 rounded-full bg-[#02C39A] text-[#022F33] text-[10px] font-black tracking-wide flex items-center gap-1 shadow-sm">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Selected</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full bg-[#02C39A]/15 border border-[#02C39A]/40 text-[#5EEAD4] text-[10px] font-bold">
                          Ready in VR
                        </span>
                      )
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#03343A] border border-[#028090]/40 text-[#94A3B8] text-[10px] font-bold flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        <span>Coming Soon</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Scenario Description */}
                <p className="text-xs text-[#99F6E4]/90 leading-relaxed mb-4">
                  {scenario.description}
                </p>

                {/* Card Footer / Metadata */}
                <div className="pt-3 border-t border-[#028090]/25 flex items-center justify-between text-[11px]">
                  <span className="text-[#99F6E4]/70">
                    Role: <strong className="text-white font-semibold">{scenario.roleLabel} ({scenario.npcName})</strong>
                  </span>

                  {isPlayable ? (
                    <span className="text-[#02C39A] font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Launch</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-[#F4A261] font-semibold text-[10px]">
                      Roadmap Item
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-[#032427]/90 backdrop-blur-md rounded-2xl p-4 border border-[#028090]/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-2xl">
        <div className="flex items-center gap-3 text-xs">
          <div className="w-9 h-9 rounded-xl bg-[#02C39A]/20 border border-[#02C39A] flex items-center justify-center text-[#02C39A] shrink-0 font-black">
            VR
          </div>
          <div>
            <div className="text-[#99F6E4] font-medium">
              Ready for participant <strong className="text-white font-bold">{intakeConfig.participantName}</strong>
            </div>
            <div className="text-white font-bold flex items-center gap-2">
              <span>Selected Scenario:</span>
              <span className="text-[#02C39A]">
                {SCENARIO_CATALOG.find((s) => s.id === selectedScenarioId)?.title || 'Job Interview'}
              </span>
              <span className="text-[#99F6E4]/60">&bull;</span>
              <span className="text-[#5EEAD4] capitalize">{intakeConfig.startingDifficulty} Difficulty</span>
            </div>
          </div>
        </div>

        <button
          onClick={onProceedToWaitingRoom}
          id="proceed-to-lobby-btn"
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#02C39A] hover:bg-[#00A896] text-[#022F33] hover:text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#02C39A]/20 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 group"
        >
          <span>Enter Sensory Lobby (Waiting Room)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
