/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenType, DifficultyLevel, SessionExchange, SensorySettings, IntakeConfig, ScenarioId } from './types';
import { NavigationHeader } from './components/NavigationHeader';
import { TitleScreen } from './components/TitleScreen';
import { IntakeScreen } from './components/IntakeScreen';
import { ScenarioSelectScreen } from './components/ScenarioSelectScreen';
import { WaitingRoomScreen } from './components/WaitingRoomScreen';
import { InterviewScreen } from './components/InterviewScreen';
import { TherapistDashboardScreen } from './components/TherapistDashboardScreen';
import { DebriefScreen } from './components/DebriefScreen';
import { motion, AnimatePresence } from 'motion/react';
import { startCalmingSound, stopCalmingSound, updateVolume } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('title');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [selectedScenarioId, setSelectedScenarioId] = useState<ScenarioId>('job-interview');
  const [lastExchange, setLastExchange] = useState<SessionExchange | null>(null);

  const [intakeConfig, setIntakeConfig] = useState<IntakeConfig>({
    participantName: 'Rahul K.',
    sessionGoal: 'Build confidence answering behavioral questions',
    startingDifficulty: 'easy',
    clinicalNotes: 'Participant benefits from structured pacing and positive reinforcement during initial rehearsal rounds.',
    selectedScenarioId: 'job-interview',
  });

  const [sensorySettings, setSensorySettings] = useState<SensorySettings>({
    brightness: 90,
    volume: 35,
    ambientSoundActive: false,
    soundType: 'ocean',
  });

  const [isMuted, setIsMuted] = useState<boolean>(true);

  const handleUpdateSensory = (newSettings: Partial<SensorySettings>) => {
    setSensorySettings((prev) => {
      const updated = { ...prev, ...newSettings };
      if (!isMuted && updated.volume > 0) {
        updateVolume(updated.volume);
      }
      return updated;
    });
  };

  const handleToggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    if (!nextMute && sensorySettings.volume > 0) {
      startCalmingSound(sensorySettings.volume, sensorySettings.soundType);
    } else {
      stopCalmingSound();
    }
  };

  const handleStartSessionFromIntake = (config: IntakeConfig) => {
    setIntakeConfig(config);
    setDifficulty(config.startingDifficulty);
    setCurrentScreen('scenario-select');
  };

  const handleSelectScenario = (scenarioId: ScenarioId) => {
    setSelectedScenarioId(scenarioId);
    setIntakeConfig((prev) => ({ ...prev, selectedScenarioId: scenarioId }));
  };

  const handleRecordExchange = (exchange: SessionExchange) => {
    setLastExchange(exchange);
  };

  const handleResetDemo = () => {
    setCurrentScreen('title');
    setDifficulty('easy');
    setSelectedScenarioId('job-interview');
  };

  return (
    <div className="min-h-screen bg-[#0f0e10] text-[#d6c8c5] flex flex-col font-sans selection:bg-[#7f3e3b] selection:text-white">
      {/* Top Clinical Navigation Bar */}
      <NavigationHeader
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onResetDemo={handleResetDemo}
      />

      {/* Main Screen Container with Smooth Transitions */}
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-x-hidden w-full">
        <AnimatePresence mode="wait">
          {currentScreen === 'title' && (
            <motion.div
              key="title"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <TitleScreen onStartDemo={() => setCurrentScreen('intake')} />
            </motion.div>
          )}

          {currentScreen === 'intake' && (
            <motion.div
              key="intake"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <IntakeScreen
                initialConfig={intakeConfig}
                onStartSession={handleStartSessionFromIntake}
              />
            </motion.div>
          )}

          {currentScreen === 'scenario-select' && (
            <motion.div
              key="scenario-select"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <ScenarioSelectScreen
                intakeConfig={intakeConfig}
                selectedScenarioId={selectedScenarioId}
                onSelectScenario={handleSelectScenario}
                onProceedToWaitingRoom={() => setCurrentScreen('waiting-room')}
              />
            </motion.div>
          )}

          {currentScreen === 'waiting-room' && (
            <motion.div
              key="waiting-room"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <WaitingRoomScreen
                sensorySettings={sensorySettings}
                onUpdateSensory={handleUpdateSensory}
                onBeginRehearsal={() => setCurrentScreen('interview')}
              />
            </motion.div>
          )}

          {currentScreen === 'interview' && (
            <motion.div
              key={`interview-${selectedScenarioId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <InterviewScreen
                scenarioId={selectedScenarioId}
                difficulty={difficulty}
                onSelectDifficulty={(newDiff) => setDifficulty(newDiff)}
                onRecordExchange={handleRecordExchange}
                onContinueToDashboard={() => setCurrentScreen('therapist-dashboard')}
              />
            </motion.div>
          )}

          {currentScreen === 'therapist-dashboard' && (
            <motion.div
              key="therapist-dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <TherapistDashboardScreen
                difficulty={difficulty}
                onUpdateDifficulty={(newDiff) => setDifficulty(newDiff)}
                lastExchange={lastExchange}
                onProceedToDebrief={() => setCurrentScreen('debrief')}
                intakeConfig={intakeConfig}
              />
            </motion.div>
          )}

          {currentScreen === 'debrief' && (
            <motion.div
              key="debrief"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="w-full flex-1 flex flex-col items-center justify-center"
            >
              <DebriefScreen
                intakeConfig={intakeConfig}
                difficulty={difficulty}
                lastExchange={lastExchange}
                onRestartDemo={handleResetDemo}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
