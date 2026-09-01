import React from 'react';
import { ScreenType } from '../types';
import { Sparkles, Glasses, Download, RotateCcw, Volume2, VolumeX, ShieldCheck, Activity } from 'lucide-react';
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
    <header className="sticky top-0 z-50 bg-[#0f0e10]/95 backdrop-blur-md border-b border-[#7f3e3b]/50 px-3 lg:px-6 py-2.5 transition-all shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-center">
        {/* Brand identity */}
        <div className="flex items-center justify-center gap-2.5 w-full md:w-auto">
          <button
            onClick={() => onNavigate('title')}
            className="flex items-center justify-center gap-2 group text-center cursor-pointer focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7f3e3b] to-[#a26f4a] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <div className="w-full h-full bg-[#1a1618] rounded-[10px] flex items-center justify-center">
                <Glasses className="w-4 h-4 text-[#d6c8c5]" />
              </div>
            </div>
            <div className="text-left sm:text-center">
              <div className="flex items-center justify-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">NeuroPractice</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#7f3e3b]/30 text-[#d6c8c5] border border-[#a26f4a]/50 uppercase tracking-wider">
                  VR
                </span>
              </div>
              <p className="text-[10px] text-[#d6c8c5]/70 hidden sm:block font-medium text-center">
                Clinical Social-Skills Rehearsal Platform
              </p>
            </div>
          </button>

          {/* Sensory sound quick control on mobile */}
          <div className="flex items-center gap-1.5 md:hidden ml-auto">
            <button
              onClick={onToggleMute}
              className={`p-1.5 rounded-xl border text-[10px] font-medium transition-colors ${
                isMuted
                  ? 'border-[#7f3e3b]/40 text-[#d6c8c5]/60 bg-[#1a1618]'
                  : 'border-[#a26f4a]/80 text-[#d6c8c5] bg-[#7f3e3b]/30'
              }`}
              title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#a26f4a]" />}
            </button>
          </div>
        </div>

        {/* 6-Step Screen Flow Breadcrumb Switcher (No Scroll, Compact, Centered) */}
        <nav aria-label="Demo Flow Steps" className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 py-0.5">
          {steps.map((step) => {
            const isActive = currentScreen === step.id;
            return (
              <button
                key={step.id}
                id={`nav-step-${step.id}`}
                onClick={() => onNavigate(step.id)}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#7f3e3b] text-white shadow-md shadow-[#7f3e3b]/40 font-bold border border-[#a26f4a]'
                    : 'bg-[#1a1618] text-[#d6c8c5] hover:bg-[#251f22] hover:text-white border border-[#7f3e3b]/40'
                }`}
              >
                <span
                  className={`w-3.5 h-3.5 rounded-full text-[9px] flex items-center justify-center font-bold shrink-0 ${
                    isActive ? 'bg-[#1a1618] text-[#d6c8c5]' : 'bg-[#0f0e10] text-[#d6c8c5]/70'
                  }`}
                >
                  {step.number}
                </span>
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Actions & Offline Exporter */}
        <div className="hidden lg:flex items-center justify-center gap-1.5">
          <button
            onClick={onToggleMute}
            id="header-mute-btn"
            className={`flex items-center gap-1 px-2.5 py-1 rounded-xl border text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer ${
              isMuted
                ? 'border-[#7f3e3b]/40 text-[#d6c8c5]/60 bg-[#1a1618] hover:text-white'
                : 'border-[#a26f4a] text-[#d6c8c5] bg-[#7f3e3b]/30 shadow-sm'
            }`}
            title={isMuted ? 'Sensory Ambient Sound: Muted' : 'Sensory Ambient Sound: Active'}
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3 text-[#a26f4a]" />}
            <span>{isMuted ? 'Sound Off' : 'Calm Audio'}</span>
          </button>

          <button
            onClick={onResetDemo}
            id="header-reset-btn"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl border border-[#7f3e3b]/40 text-[10px] sm:text-[11px] font-medium text-[#d6c8c5]/80 hover:text-white hover:bg-[#251f22] transition-colors cursor-pointer"
            title="Reset Rehearsal to Screen 1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Restart</span>
          </button>

          <button
            onClick={downloadOfflineHtml}
            id="header-offline-export-btn"
            className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#7f3e3b]/40 hover:bg-[#7f3e3b] text-white border border-[#a26f4a]/60 text-[10px] sm:text-[11px] font-semibold shadow-sm transition-all cursor-pointer"
            title="Export full offline self-contained HTML file"
          >
            <Download className="w-3 h-3 text-[#d6c8c5]" />
            <span>Offline HTML</span>
          </button>
        </div>
      </div>
    </header>
  );
};
