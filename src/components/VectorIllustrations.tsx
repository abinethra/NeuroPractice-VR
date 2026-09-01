import React from 'react';

// Common palette constants
export const COLORS = {
  bgDark: '#022F33',
  tealDark: '#024F57',
  tealAccent: '#028090',
  tealBright: '#00A896',
  mint: '#02C39A',
  mintSoft: '#A7F3D0',
  cream: '#F4F9F9',
  slateText: '#1E293B',
  sofaColor: '#164E63',
  cushionColor: '#0E7490',
  plantGreen: '#10B981',
  plantDark: '#047857',
  potTerra: '#D97706',
  avatarTone: '#99F6E4',
  avatarBody: '#0D9488',
  npcTone: '#CBD5E1',
  npcBody: '#334155'
};

export const SimpleAvatar: React.FC<{
  tone?: string;
  bodyColor?: string;
  scale?: number;
  posture?: 'neutral' | 'speaking' | 'listening';
  className?: string;
}> = ({
  tone = COLORS.avatarTone,
  bodyColor = COLORS.avatarBody,
  scale = 1,
  posture = 'neutral',
  className = ''
}) => {
  return (
    <g transform={`scale(${scale})`} className={className}>
      {/* Subtle sensory aura / calm glow */}
      <circle cx="100" cy="55" r="32" fill={tone} fillOpacity="0.15" />

      {/* Head: Simple minimalist circle shape, clean, no detailed facial clutter */}
      <circle cx="100" cy="55" r="24" fill={tone} />
      
      {/* Calm visual focus indicator / soft eye level guide */}
      <rect x="92" y="52" width="16" height="3.5" rx="1.75" fill="#0F766E" fillOpacity="0.4" />

      {/* Neck */}
      <rect x="94" y="76" width="12" height="12" rx="4" fill={tone} />

      {/* Torso / Rounded Body Shape */}
      <path
        d="M 68 125 C 68 94, 80 84, 100 84 C 120 84, 132 94, 132 125 L 130 148 C 130 152, 70 152, 70 148 Z"
        fill={bodyColor}
      />

      {/* Shoulders / Collar detail */}
      <path
        d="M 86 86 L 100 102 L 114 86"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.4"
      />

      {/* Subtle posture dynamics */}
      {posture === 'speaking' && (
        <circle cx="100" cy="115" r="4" fill="#5EEAD4" fillOpacity="0.8" />
      )}
    </g>
  );
};

// WAITING ROOM LOBBY ILLUSTRATION
export const LobbyIllustration: React.FC<{
  brightness: number;
  className?: string;
}> = ({ brightness, className = '' }) => {
  // Brightness factor: 0.35 to 1.0
  const lightFactor = Math.max(0.35, brightness / 100);

  return (
    <div
      className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${className}`}
      style={{
        filter: `brightness(${lightFactor})`,
      }}
    >
      <svg
        viewBox="0 0 800 480"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="wallGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#033F45" />
            <stop offset="100%" stopColor="#022F33" />
          </linearGradient>

          <linearGradient id="floorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B4F55" />
            <stop offset="100%" stopColor="#04272A" />
          </linearGradient>

          <linearGradient id="windowSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="50%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#E0E7FF" />
          </linearGradient>

          <linearGradient id="sunBeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFBEB" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="plantLeaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Back Wall */}
        <rect x="0" y="0" width="800" height="340" fill="url(#wallGradient)" />

        {/* Sensory Ambient Acoustic Slat Accent Wall */}
        <g opacity="0.15">
          {Array.from({ length: 24 }).map((_, i) => (
            <rect key={i} x={20 + i * 14} y="30" width="6" height="260" rx="3" fill="#A7F3D0" />
          ))}
        </g>

        {/* Flooring */}
        <polygon points="0,340 800,340 800,480 0,480" fill="url(#floorGradient)" />
        <line x1="0" y1="340" x2="800" y2="340" stroke="#00A896" strokeWidth="2.5" strokeOpacity="0.4" />

        {/* Soft Rug Under Couch */}
        <ellipse cx="490" cy="405" rx="190" ry="48" fill="#04454C" fillOpacity="0.8" />
        <ellipse cx="490" cy="405" rx="175" ry="40" fill="#055B64" fillOpacity="0.5" />

        {/* WINDOW - Calm Scenic View */}
        <g id="window-view">
          {/* Window Frame Base */}
          <rect x="70" y="55" width="220" height="240" rx="20" fill="#0A3C42" stroke="#028090" strokeWidth="4" />
          {/* Glass Pane */}
          <rect x="80" y="65" width="200" height="220" rx="14" fill="url(#windowSky)" />

          {/* Calming Geometric Hills & Cloud */}
          <ellipse cx="140" cy="245" rx="75" ry="40" fill="#059669" fillOpacity="0.75" />
          <ellipse cx="230" cy="255" rx="90" ry="50" fill="#047857" fillOpacity="0.9" />
          <circle cx="180" cy="115" r="24" fill="#FEF08A" fillOpacity="0.85" />
          <ellipse cx="130" cy="120" rx="30" ry="12" fill="#FFFFFF" fillOpacity="0.8" />
          <ellipse cx="220" cy="140" rx="36" ry="14" fill="#FFFFFF" fillOpacity="0.7" />

          {/* Window Mullions */}
          <line x1="180" y1="65" x2="180" y2="285" stroke="#024F57" strokeWidth="4" />
          <line x1="80" y1="175" x2="280" y2="175" stroke="#024F57" strokeWidth="4" />

          {/* Sunlight Ray */}
          <polygon points="120,65 280,65 520,380 260,380" fill="url(#sunBeam)" />
        </g>

        {/* POTTED PLANT (Fiddle Leaf / Monstera) */}
        <g id="lobby-plant">
          {/* Pot */}
          <polygon points="310,395 350,395 344,440 316,440" fill="#D97706" />
          <ellipse cx="330" cy="395" rx="20" ry="5" fill="#B45309" />
          <rect x="306" y="390" width="48" height="6" rx="3" fill="#F59E0B" />

          {/* Stems & Leaves */}
          <path d="M 330 395 Q 315 310 285 270" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 330 395 Q 345 320 370 280" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 330 395 Q 330 300 325 240" stroke="#047857" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Vector Leaves */}
          <path d="M 285 270 C 265 260, 260 290, 285 305 C 310 290, 305 260, 285 270 Z" fill="url(#plantLeaf)" />
          <path d="M 370 280 C 350 270, 350 300, 370 315 C 395 300, 390 270, 370 280 Z" fill="url(#plantLeaf)" />
          <path d="M 325 240 C 300 230, 305 265, 325 280 C 345 265, 350 230, 325 240 Z" fill="url(#plantLeaf)" />
          <path d="M 305 325 C 285 320, 290 345, 305 355 C 325 345, 325 320, 305 325 Z" fill="url(#plantLeaf)" />
          <path d="M 350 335 C 335 330, 340 355, 350 365 C 365 355, 365 330, 350 335 Z" fill="url(#plantLeaf)" />
        </g>

        {/* COUCH / SOFA */}
        <g id="lobby-couch">
          {/* Couch Backrest */}
          <rect x="400" y="240" width="270" height="90" rx="16" fill="#0C4A50" stroke="#028090" strokeWidth="2.5" />
          
          {/* Back Cushions */}
          <rect x="412" y="248" width="118" height="74" rx="12" fill="#0E5E67" />
          <rect x="538" y="248" width="118" height="74" rx="12" fill="#0E5E67" />

          {/* Seated Avatar on Couch */}
          <g transform="translate(425, 175)">
            {/* Avatar Sitting Comfortably */}
            {/* Head */}
            <circle cx="50" cy="30" r="26" fill={COLORS.avatarTone} />
            {/* Subtle serene eyes */}
            <rect x="40" y="28" width="18" height="3" rx="1.5" fill="#0D9488" fillOpacity="0.6" />

            {/* Neck */}
            <rect x="44" y="52" width="12" height="10" rx="3" fill={COLORS.avatarTone} />

            {/* Torso */}
            <path
              d="M 18 105 C 18 68, 30 60, 50 60 C 70 60, 82 68, 82 105 L 80 120 C 80 125, 20 125, 20 120 Z"
              fill={COLORS.avatarBody}
            />
            {/* Collar */}
            <path d="M 38 62 L 50 76 L 62 62" stroke="#CCFBF1" strokeWidth="2" strokeLinecap="round" fill="none" />

            {/* Resting Hands / Forearms in lap */}
            <ellipse cx="50" cy="115" rx="18" ry="7" fill={COLORS.avatarTone} />
          </g>

          {/* Seat Cushion Layer */}
          <rect x="390" y="325" width="290" height="42" rx="12" fill="#00A896" stroke="#02C39A" strokeWidth="2" />
          {/* Armrests */}
          <rect x="382" y="280" width="28" height="85" rx="12" fill="#083E44" stroke="#028090" strokeWidth="2" />
          <rect x="660" y="280" width="28" height="85" rx="12" fill="#083E44" stroke="#028090" strokeWidth="2" />

          {/* Wooden Couch Legs */}
          <line x1="410" y1="367" x2="400" y2="400" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
          <line x1="660" y1="367" x2="670" y2="400" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Minimalist Coffee Table & Mug */}
        <g id="table-mug">
          {/* Table Surface */}
          <ellipse cx="690" cy="405" rx="45" ry="16" fill="#0F766E" stroke="#2DD4BF" strokeWidth="2" />
          {/* Table Leg */}
          <line x1="690" y1="415" x2="690" y2="445" stroke="#D97706" strokeWidth="4" />
          <ellipse cx="690" cy="445" rx="20" ry="6" fill="#92400E" />

          {/* Warm Tea Mug */}
          <rect x="682" y="386" width="14" height="14" rx="3" fill="#F8FAFC" />
          <path d="M 696 389 Q 700 393 696 397" stroke="#F8FAFC" strokeWidth="2" fill="none" />
          {/* Steam */}
          <path d="M 686 382 Q 688 376 686 370" stroke="#E2E8F0" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
          <path d="M 692 380 Q 694 374 692 368" stroke="#E2E8F0" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
        </g>

        {/* Calm framed minimalist poster on wall */}
        <g id="framed-poster">
          <rect x="670" y="70" width="90" height="120" rx="8" fill="#042F34" stroke="#00A896" strokeWidth="3" />
          <rect x="678" y="78" width="74" height="104" rx="4" fill="#0B474D" />
          {/* Calming abstract geometric shapes */}
          <circle cx="715" cy="115" r="22" fill="#02C39A" fillOpacity="0.7" />
          <polygon points="695,155 735,155 715,120" fill="#028090" />
          <line x1="688" y1="162" x2="742" y2="162" stroke="#CCFBF1" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

// INTERVIEW ROOM ILLUSTRATION (Used in Screen 3 & Screen 4 VR Thumbnail)
export const InterviewRoomIllustration: React.FC<{
  isSpeaking?: boolean;
  isThumbnail?: boolean;
  className?: string;
}> = ({ isSpeaking = false, isThumbnail = false, className = '' }) => {
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#022A2E] ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="officeWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#04383E" />
            <stop offset="100%" stopColor="#02272B" />
          </linearGradient>

          <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F766E" />
            <stop offset="100%" stopColor="#0A4C46" />
          </linearGradient>

          <linearGradient id="deskBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#064E3B" />
            <stop offset="100%" stopColor="#022C23" />
          </linearGradient>

          <linearGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>

        {/* Office Wall */}
        <rect x="0" y="0" width="800" height="380" fill="url(#officeWall)" />

        {/* Soft Modern Office Acoustic Wall Paneling */}
        <g opacity="0.12">
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={30 + i * 42} y="40" width="24" height="260" rx="8" fill="#5EEAD4" />
          ))}
        </g>

        {/* Office Window (Soft Cityline Silhouette) */}
        <g id="office-window">
          <rect x="520" y="50" width="220" height="200" rx="14" fill="#042528" stroke="#00A896" strokeWidth="3" />
          {/* Sky pane */}
          <rect x="528" y="58" width="204" height="184" rx="8" fill="#084C53" />
          {/* Geometric buildings */}
          <rect x="545" y="120" width="30" height="120" fill="#053338" />
          <rect x="585" y="90" width="40" height="150" fill="#042C30" />
          <rect x="635" y="135" width="35" height="105" fill="#053338" />
          <rect x="680" y="110" width="35" height="130" fill="#04282C" />
          {/* Calming glow in window */}
          <circle cx="605" cy="90" r="14" fill="#99F6E4" fillOpacity="0.4" />
        </g>

        {/* Small Desk Plant on Credenza */}
        <g id="credenza">
          <rect x="60" y="240" width="130" height="100" rx="6" fill="#032D31" stroke="#028090" strokeWidth="2" />
          {/* Pot */}
          <polygon points="100,225 130,225 125,240 105,240" fill="#CA8A04" />
          <circle cx="115" cy="205" r="16" fill="#10B981" />
          <circle cx="102" cy="215" r="12" fill="#059669" />
          <circle cx="128" cy="215" r="12" fill="#059669" />
        </g>

        {/* NPC INTERVIEWER AVATAR */}
        <g id="interviewer-avatar" transform="translate(320, 110)">
          {/* Subtle speaking pulse if active */}
          {isSpeaking && (
            <circle cx="80" cy="65" r="46" fill="#02C39A" fillOpacity="0.18">
              <animate attributeName="r" values="40;52;40" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Head (Simple circle shape style, clean, calm) */}
          <circle cx="80" cy="65" r="34" fill={COLORS.npcTone} />

          {/* Attentive, reassuring eye line (minimalist, low stimulation) */}
          <rect x="68" y="62" width="24" height="4" rx="2" fill="#475569" fillOpacity="0.75" />

          {/* Neck */}
          <rect x="72" y="96" width="16" height="16" rx="4" fill={COLORS.npcTone} />

          {/* Blazer / Rounded Body */}
          <path
            d="M 32 195 C 32 120, 50 108, 80 108 C 110 108, 128 120, 128 195 Z"
            fill={COLORS.npcBody}
          />

          {/* Shirt & Tie / Professional Collar */}
          <polygon points="80,110 65,150 95,150" fill="#F8FAFC" />
          <polygon points="80,120 74,175 80,185 86,175" fill="#028090" />
          {/* Blazer Lapels */}
          <path d="M 50 115 L 75 165 L 70 195" stroke="#1E293B" strokeWidth="3" fill="none" />
          <path d="M 110 115 L 85 165 L 90 195" stroke="#1E293B" strokeWidth="3" fill="none" />
        </g>

        {/* Floor */}
        <polygon points="0,380 800,380 800,500 0,500" fill="#021C1E" />
        <line x1="0" y1="380" x2="800" y2="380" stroke="#00A896" strokeWidth="2" strokeOpacity="0.4" />

        {/* INTERVIEW DESK */}
        <g id="interview-desk">
          {/* Desk Base Front Panel */}
          <polygon points="120,335 680,335 720,470 80,470" fill="url(#deskBase)" stroke="#024F57" strokeWidth="2" />
          
          {/* Decorative Inset Plate */}
          <polygon points="180,355 620,355 650,450 150,450" fill="#032724" fillOpacity="0.7" />

          {/* Desk Surface Tabletop */}
          <polygon points="90,305 710,305 740,340 60,340" fill="url(#deskTop)" stroke="#2DD4BF" strokeWidth="2.5" />

          {/* Modern Laptop on Desk (Facing Interviewer) */}
          <g id="desk-laptop" transform="translate(480, 275)">
            {/* Laptop Backscreen */}
            <polygon points="20,5 90,5 95,45 15,45" fill="url(#laptopGrad)" stroke="#475569" strokeWidth="1.5" />
            <polygon points="24,8 86,8 90,42 20,42" fill="#0F172A" />
            {/* Logo on Laptop lid */}
            <circle cx="55" cy="25" r="4" fill="#00A896" />
            {/* Base */}
            <polygon points="5,45 105,45 115,55 -5,55" fill="#64748B" />
          </g>

          {/* Notepad and Pen */}
          <g id="notepad" transform="translate(230, 310)">
            <polygon points="0,0 45,-5 55,20 10,25" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
            <line x1="8" y1="5" x2="38" y2="2" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="42" y2="9" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Pen */}
            <line x1="45" y1="2" x2="62" y2="18" stroke="#00A896" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Water Tumbler */}
          <g id="water-glass" transform="translate(190, 298)">
            <polygon points="4,0 18,0 16,22 6,22" fill="#E0F2FE" fillOpacity="0.6" stroke="#BAE6FD" strokeWidth="1" />
            <polygon points="6,6 16,6 15,20 7,20" fill="#38BDF8" fillOpacity="0.4" />
          </g>
        </g>

        {/* Live Speaking Waves if Active */}
        {isSpeaking && !isThumbnail && (
          <g id="speaking-visualizer" transform="translate(400, 75)">
            <rect x="-30" y="-12" width="60" height="24" rx="12" fill="#042F33" fillOpacity="0.85" stroke="#02C39A" strokeWidth="1.5" />
            <circle cx="-16" cy="0" r="3" fill="#02C39A">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="4" fill="#00A896">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="16" cy="0" r="3" fill="#02C39A">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
};
