import React from 'react';
import { ScreenType } from '../types';
import { Sparkles, Glasses, Download, RotateCcw, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { downloadOfflineHtml } from '../utils/offlineHtmlGenerator';

interface NavigationHeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  onResetDemo: () => void;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentScreen,
  onNavigate,
  isMuted,
  onToggleMute,
  onResetDemo,
}) => {
  const steps: { id: ScreenType; label: string; number: number }[] = [
    { id: 'intake', label: 'Intake', number: 1 },
    { id: 'scenario-select', label: 'Scenarios', number: 2 },
    { id: 'waiting-room', label: 'Waiting Room', number: 3 },
    { id: 'interview', label: 'VR Scenario', number: 4 },
    { id: 'therapist-dashboard', label: 'Clinician Hub', number: 5 },
    { id: 'debrief', label: 'Debrief', number: 6 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#022427]/90 backdrop-blur-md border-b border-[#028090]/40 px-4 lg:px-8 py-3 transition-all shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <button
            onClick={() => onNavigate('title')}
            className="flex items-center gap-2.5 group text-left cursor-pointer focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00A896] to-[#028090] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#022F33] rounded-[10px] flex items-center justify-center">
                <Glasses className="w-5 h-5 text-[#02C39A]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-white tracking-tight">NeuroPractice</span>
                <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-[#02C39A]/20 text-[#5EEAD4] border border-[#02C39A]/40 uppercase tracking-wider">
                  VR
                </span>
              </div>
              <p className="text-[11px] text-[#99F6E4]/80 hidden sm:block font-medium">
                Clinical Social-Skills Rehearsal Platform
              </p>
            </div>
          </button>

          {/* Sensory sound quick control */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onToggleMute}
              className={`p-2 rounded-lg border text-xs font-medium transition-colors ${
                isMuted
                  ? 'border-[#028090]/40 text-[#99F6E4]/60 bg-[#032A2E]'
                  : 'border-[#02C39A]/60 text-[#02C39A] bg-[#02C39A]/10'
              }`}
              title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 4-Step Screen Flow Breadcrumb Switcher */}
        <nav aria-label="Demo Flow Steps" className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto max-w-full py-1">
          {steps.map((step) => {
            const isActive = currentScreen === step.id;
            return (
              <button
                key={step.id}
                id={`nav-step-${step.id}`}
                onClick={() => onNavigate(step.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#02C39A] text-[#022F33] shadow-md shadow-[#02C39A]/20 scale-105 font-bold'
                    : 'bg-[#03343A] text-[#99F6E4] hover:bg-[#044850] hover:text-white border border-[#028090]/30'
                }`}
              >
                <span
                  className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                    isActive ? 'bg-[#022F33] text-[#02C39A]' : 'bg-[#022F33]/60 text-[#99F6E4]'
                  }`}
                >
                  {step.number}
                </span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Pitch Actions & Offline Exporter */}
        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={onToggleMute}
            id="header-mute-btn"
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              isMuted
                ? 'border-[#028090]/30 text-[#99F6E4]/70 bg-[#032E34] hover:text-white'
                : 'border-[#02C39A]/60 text-[#02C39A] bg-[#02C39A]/10 shadow-sm'
            }`}
            title={isMuted ? 'Sensory Ambient Sound: Muted' : 'Sensory Ambient Sound: Active'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#02C39A]" />}
            <span>{isMuted ? 'Sound Off' : 'Calm Audio'}</span>
          </button>

          <button
            onClick={onResetDemo}
            id="header-reset-btn"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#028090]/30 text-xs font-medium text-[#99F6E4]/80 hover:text-white hover:bg-[#033B42] transition-colors"
            title="Reset Rehearsal to Screen 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>

          <button
            onClick={downloadOfflineHtml}
            id="header-offline-export-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#028090]/30 hover:bg-[#028090] text-white border border-[#00A896]/60 text-xs font-semibold shadow-sm transition-all cursor-pointer"
            title="Export full offline self-contained HTML file"
          >
            <Download className="w-3.5 h-3.5 text-[#5EEAD4]" />
            <span>Download Offline HTML</span>
          </button>
        </div>
      </div>
    </header>
  );
};
