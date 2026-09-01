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
            className="fixed top-20 right-4 sm:right-8 z-50 bg-[#1a1618] border border-[#a26f4a] text-[#d6c8c5] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md"
          >
            <Clock className="w-4 h-4 text-[#a26f4a] shrink-0" />
            <div className="text-xs font-semibold">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-[#d6c8c5] hover:text-white text-xs ml-2 font-bold cursor-pointer"
            >
              &times;
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Step Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1a1618] border border-[#7f3e3b]/60 text-[#a26f4a] text-xs font-bold mb-3 shadow-inner">
            <Compass className="w-3.5 h-3.5" />
            <span>Screen 2 of 6 &bull; Scenario Library</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Choose a Rehearsal Scenario
          </h1>
          <p className="text-sm text-[#d6c8c5]/80 leading-relaxed">
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
                className={`group relative rounded-3xl p-5 border-2 transition-all duration-200 text-center flex flex-col items-center justify-between ${
                  isPlayable
                    ? isSelected
                      ? 'bg-gradient-to-b from-[#2a1d20] to-[#1a1618] border-[#a26f4a] ring-2 ring-[#7f3e3b]/50 shadow-2xl shadow-[#7f3e3b]/20 cursor-pointer scale-[1.02]'
                      : 'bg-[#1a1618] hover:bg-[#251f22] border-[#7f3e3b]/40 hover:border-[#a26f4a] shadow-lg cursor-pointer'
                    : 'bg-[#141012] border-[#3d2524]/40 opacity-60 hover:opacity-85 cursor-pointer'
                }`}
              >
                {/* Status Badge at Top */}
                <div className="mb-2">
                  {isPlayable ? (
                    isSelected ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#7f3e3b] text-white text-[10px] font-black tracking-wide flex items-center gap-1 shadow-sm">
                        <CheckCircle2 className="w-3 h-3 text-[#d6c8c5]" />
                        <span>Selected</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#7f3e3b]/20 border border-[#a26f4a]/50 text-[#d6c8c5] text-[10px] font-bold">
                        Ready in VR
                      </span>
                    )
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-[#141012] border border-[#7f3e3b]/30 text-[#d6c8c5]/50 text-[10px] font-bold flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5 text-[#a26f4a]" />
                      <span>Coming Soon</span>
                    </span>
                  )}
                </div>

                {/* Avatar and Scenario Title */}
                <div className="flex flex-col items-center justify-center gap-2 mb-3 text-center">
                  <ScenarioAvatarIllustration
                    iconType={scenario.iconType}
                    size={52}
                    className={isSelected ? 'ring-2 ring-[#a26f4a]' : ''}
                  />
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#a26f4a] block text-center">
                      {scenario.categoryTag}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-[#d6c8c5] transition-colors flex items-center justify-center gap-1.5 text-center">
                      <span>{scenario.title}</span>
                    </h3>
                  </div>
                </div>

                {/* Scenario Description */}
                <p className="text-xs text-[#d6c8c5]/90 leading-relaxed mb-4 text-center">
                  {scenario.description}
                </p>

                {/* Card Footer / Metadata */}
                <div className="w-full pt-3 border-t border-[#7f3e3b]/25 flex flex-col sm:flex-row items-center justify-center gap-2 text-[11px] text-center">
                  <span className="text-[#d6c8c5]/70 text-center">
                    Role: <strong className="text-white font-semibold">{scenario.roleLabel} ({scenario.npcName})</strong>
                  </span>

                  {isPlayable ? (
                    <span className="text-[#a26f4a] font-bold flex items-center justify-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Launch</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  ) : (
                    <span className="text-[#d6c8c5]/50 font-semibold text-[10px]">
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
      <div className="bg-[#1a1618]/95 backdrop-blur-md rounded-3xl p-4 border-2 border-[#7f3e3b]/40 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 shadow-2xl text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-center mx-auto sm:mx-0">
          <div className="w-10 h-10 rounded-2xl bg-[#7f3e3b]/30 border border-[#a26f4a] flex items-center justify-center text-[#d6c8c5] shrink-0 font-black">
            VR
          </div>
          <div className="text-center sm:text-left">
            <div className="text-[#d6c8c5] font-medium text-center sm:text-left">
              Ready for participant <strong className="text-white font-bold">{intakeConfig.participantName}</strong>
            </div>
            <div className="text-white font-bold flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              <span>Selected Scenario:</span>
              <span className="text-[#a26f4a]">
                {SCENARIO_CATALOG.find((s) => s.id === selectedScenarioId)?.title || 'Job Interview'}
              </span>
              <span className="text-[#d6c8c5]/40">&bull;</span>
              <span className="text-[#d6c8c5] capitalize">{intakeConfig.startingDifficulty} Difficulty</span>
            </div>
          </div>
        </div>

        <button
          onClick={onProceedToWaitingRoom}
          id="proceed-to-lobby-btn"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#7f3e3b] hover:bg-[#944945] text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-[#7f3e3b]/30 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 group border border-[#a26f4a]/50 mx-auto sm:mx-0"
        >
          <span>Enter Sensory Lobby (Waiting Room)</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#d6c8c5]" />
        </button>
      </div>
    </div>
  );
};
