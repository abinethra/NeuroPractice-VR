import React, { useState } from 'react';
import { ScenarioId, IntakeConfig } from '../types';
import { SCENARIO_CATALOG } from '../data/interviewScenarios';
import { ScenarioAvatarIllustration } from './VectorIllustrations';
import { 
  Play, Sparkles, Clock, CheckCircle2, ArrowRight, 
  Info, Compass, ShieldCheck, ChevronRight, Bookmark, Flame
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
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 min-h-[calc(100vh-80px)] flex flex-col justify-between items-stretch">
      {/* Toast Notification for Coming Soon cards */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-20 right-4 sm:right-8 z-50 bg-[#ffd166] border-3 border-black text-black px-4 py-3 shadow-[5px_5px_0px_#000] flex items-center gap-3 font-mono"
          >
            <Clock className="w-4 h-4 stroke-[2.5] shrink-0" />
            <div className="text-xs font-black uppercase">{toastMessage}</div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-black hover:bg-black hover:text-white px-1.5 py-0.5 border border-black text-xs font-black cursor-pointer ml-2"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        {/* Step Header */}
        <div className="text-left mb-6">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#ffd166] text-black font-mono text-xs font-black uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] mb-2">
            <span>02 / 06 SCENARIO MATRIX</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Select Rehearsal Simulation Environment
          </h1>
          <p className="text-xs sm:text-sm text-[#d6c8c5] font-mono mt-1">
            TARGET: <span className="text-[#ffd166] font-bold uppercase">{intakeConfig.participantName}</span> &bull; DIFFICULTY: <span className="text-[#06d6a0] font-bold uppercase">{intakeConfig.startingDifficulty}</span> &bull; 7 ENVIRONMENT MODULES
          </p>
        </div>

        {/* 7 Scenario Cards Grid - Editorial Studio Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
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
                className={`group relative p-5 border-3 border-black transition-all duration-150 flex flex-col justify-between text-left cursor-pointer ${
                  isPlayable
                    ? isSelected
                      ? 'bg-[#1e191d] shadow-[7px_7px_0px_#ffd166] -translate-x-1 -translate-y-1'
                      : 'bg-[#181417] hover:bg-[#221c21] shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000]'
                    : 'bg-[#120f12] opacity-65 hover:opacity-85 shadow-[3px_3px_0px_#000]'
                }`}
              >
                {/* Status Bar */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b-2 border-black">
                  <span className="font-mono text-[10px] font-black uppercase text-[#ffd166]">
                    {scenario.categoryTag}
                  </span>

                  {isPlayable ? (
                    isSelected ? (
                      <span className="px-2 py-0.5 bg-[#ffd166] text-black border-2 border-black text-[10px] font-mono font-black uppercase shadow-[2px_2px_0px_#000]">
                        ✓ SELECTED
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-[#06d6a0] text-black border-2 border-black text-[10px] font-mono font-black uppercase shadow-[1px_1px_0px_#000]">
                        READY IN VR
                      </span>
                    )
                  ) : (
                    <span className="px-2 py-0.5 bg-[#251f22] text-[#d6c8c5]/60 border border-black text-[10px] font-mono font-bold uppercase">
                      ROADMAP
                    </span>
                  )}
                </div>

                {/* Avatar and Scenario Title */}
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="border-2 border-black shadow-[2px_2px_0px_#000] shrink-0 bg-[#0d0c0f]">
                    <ScenarioAvatarIllustration
                      iconType={scenario.iconType}
                      size={48}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-white group-hover:text-[#ffd166] transition-colors uppercase leading-tight">
                      {scenario.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#d6c8c5]/70 mt-0.5">
                      Interlocutor: <strong className="text-white font-bold">{scenario.npcName}</strong> ({scenario.roleLabel})
                    </p>
                  </div>
                </div>

                {/* Scenario Description */}
                <p className="text-xs text-[#d6c8c5] font-medium leading-relaxed mb-4">
                  {scenario.description}
                </p>

                {/* Card Footer */}
                <div className="pt-3 border-t-2 border-black flex items-center justify-between font-mono text-[11px]">
                  <span className="text-[#d6c8c5]/60">
                    DIFFICULTY: <span className="text-[#ffd166] uppercase">{intakeConfig.startingDifficulty}</span>
                  </span>

                  {isPlayable ? (
                    <span className="font-black text-[#ffd166] flex items-center gap-1 group-hover:translate-x-1 transition-transform uppercase">
                      <span>DEPLOY</span>
                      <ChevronRight className="w-4 h-4 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="text-[#d6c8c5]/40 font-bold uppercase">
                      LOCKED
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-[#181417] border-3 border-black p-5 shadow-[6px_6px_0px_#000] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-3.5 font-mono text-left">
          <div className="w-10 h-10 bg-[#e0533c] border-2 border-black text-white font-black flex items-center justify-center shadow-[2px_2px_0px_#000] shrink-0 text-sm">
            VR
          </div>
          <div>
            <div className="text-xs text-[#d6c8c5]">
              PARTICIPANT: <strong className="text-white font-black uppercase">{intakeConfig.participantName}</strong>
            </div>
            <div className="text-xs text-white font-black flex flex-wrap items-center gap-1.5 mt-0.5">
              <span>SELECTED:</span>
              <span className="text-[#ffd166] uppercase">
                {SCENARIO_CATALOG.find((s) => s.id === selectedScenarioId)?.title || 'Job Interview'}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={onProceedToWaitingRoom}
          id="proceed-to-lobby-btn"
          className="px-8 py-4 bg-[#ffd166] hover:bg-[#ffe28a] text-black font-heading font-black text-sm sm:text-base uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#000] transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <span>PROCEED TO SENSORY WAITING ROOM</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[3]" />
        </button>
      </div>
    </div>
  );
};

