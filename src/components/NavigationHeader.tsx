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
    { id: 'intake', label: '01 Intake', number: 1 },
    { id: 'scenario-select', label: '02 Scenarios', number: 2 },
    { id: 'waiting-room', label: '03 Waiting Room', number: 3 },
    { id: 'interview', label: '04 VR Rehearsal', number: 4 },
    { id: 'therapist-dashboard', label: '05 Clinician Hub', number: 5 },
    { id: 'debrief', label: '06 Debrief', number: 6 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0d0c0f] border-b-3 border-black px-3 lg:px-6 py-2.5 transition-all shadow-[0_4px_0_#000]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-center">
        {/* Brand identity */}
        <div className="flex items-center justify-between md:justify-start w-full md:w-auto gap-3">
          <button
            onClick={() => onNavigate('title')}
            className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="w-8 h-8 bg-[#e0533c] border-2 border-black shadow-[2px_2px_0px_#000] flex items-center justify-center group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] group-hover:shadow-[3px_3px_0px_#000] transition-all shrink-0">
              <Glasses className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-black text-sm sm:text-base text-white tracking-tight uppercase">
                  NeuroPractice
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.2 bg-[#ffd166] text-black border border-black shadow-[1px_1px_0px_#000] uppercase tracking-wider">
                  VR
                </span>
              </div>
              <p className="text-[9px] font-mono text-[#d6c8c5]/70 hidden sm:block tracking-wide uppercase">
                CLINICAL REHEARSAL OS // V2.4
              </p>
            </div>
          </button>

          {/* Sensory sound quick control on mobile */}
          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={onToggleMute}
              className={`px-2 py-1 border-2 border-black text-[10px] font-mono font-bold transition-all shadow-[2px_2px_0px_#000] ${
                isMuted
                  ? 'text-black bg-[#d6c8c5]'
                  : 'text-black bg-[#ffd166]'
              }`}
              title={isMuted ? 'Unmute Ambient Sound' : 'Mute Ambient Sound'}
            >
              {isMuted ? 'MUTE' : 'AUDIO ON'}
            </button>
          </div>
        </div>

        {/* 6-Step Screen Flow Breadcrumb Switcher (Raw brutalist pills, high contrast) */}
        <nav aria-label="Demo Flow Steps" className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 py-0.5">
          {steps.map((step) => {
            const isActive = currentScreen === step.id;
            return (
              <button
                key={step.id}
                id={`nav-step-${step.id}`}
                onClick={() => onNavigate(step.id)}
                className={`flex items-center gap-1 px-2 sm:px-2.5 py-1 text-[10px] sm:text-xs font-mono font-bold transition-all duration-150 cursor-pointer whitespace-nowrap border-2 border-black ${
                  isActive
                    ? 'bg-[#ffd166] text-black shadow-[3px_3px_0px_#000] -translate-y-0.5'
                    : 'bg-[#1e1a1d] text-[#d6c8c5] hover:bg-[#2e262a] hover:text-white shadow-[1px_1px_0px_#000]'
                }`}
              >
                <span>{step.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Actions & Offline Exporter */}
        <div className="hidden lg:flex items-center justify-center gap-2">
          <button
            onClick={onToggleMute}
            id="header-mute-btn"
            className={`flex items-center gap-1.5 px-2.5 py-1 border-2 border-black text-[10px] font-mono font-bold transition-all cursor-pointer shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[0px_0px_0px_#000] ${
              isMuted
                ? 'bg-[#251f22] text-[#d6c8c5]'
                : 'bg-[#06d6a0] text-black'
            }`}
            title={isMuted ? 'Sensory Ambient Sound: Muted' : 'Sensory Ambient Sound: Active'}
          >
            {isMuted ? <VolumeX className="w-3 h-3 text-[#d6c8c5]" /> : <Volume2 className="w-3 h-3 text-black stroke-[2.5]" />}
            <span>{isMuted ? 'AUDIO: OFF' : 'AUDIO: LIVE'}</span>
          </button>

          <button
            onClick={onResetDemo}
            id="header-reset-btn"
            className="flex items-center gap-1 px-2.5 py-1 border-2 border-black bg-[#1e1a1d] hover:bg-[#2e262a] text-[#d6c8c5] hover:text-white text-[10px] font-mono font-bold shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
            title="Reset Rehearsal to Screen 1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>

          <button
            onClick={downloadOfflineHtml}
            id="header-offline-export-btn"
            className="flex items-center gap-1 px-2.5 py-1 border-2 border-black bg-[#e0533c] hover:bg-[#ff6b52] text-white text-[10px] font-mono font-black shadow-[2px_2px_0px_#000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer uppercase"
            title="Export full offline self-contained HTML file"
          >
            <Download className="w-3 h-3 stroke-[2.5]" />
            <span>HTML EXPORT</span>
          </button>
        </div>
      </div>
    </header>
  );
};

