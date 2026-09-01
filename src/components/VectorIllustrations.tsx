import React from 'react';

// Palette constants matching the provided image:
// #0f0e10 (Obsidian background)
// #7f3e3b (Warm terracotta / burgundy)
// #a26f4a (Warm amber tan / bronze)
// #002e00 (Deep grounding forest green)
// #d6c8c5 (Rose cream soft highlight tint)
export const COLORS = {
  bgDark: '#0f0e10',
  terracotta: '#7f3e3b',
  terracottaDark: '#502321',
  terracottaBright: '#9b4d49',
  amberTan: '#a26f4a',
  amberTanLight: '#c28b64',
  forestGreen: '#002e00',
  forestGreenAccent: '#22c55e',
  creamTint: '#d6c8c5',
  cardDark: '#1a1618',
  cardBorder: '#3d2524',
  avatarTone: '#d6c8c5',
  avatarBody: '#7f3e3b',
  npcTone: '#d6c8c5',
  npcBody: '#3d2524',
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

      {/* Head: Simple minimalist circle shape */}
      <circle cx="100" cy="55" r="24" fill={tone} />
      
      {/* Calm visual focus indicator / soft eye level guide */}
      <rect x="92" y="52" width="16" height="3.5" rx="1.75" fill="#7f3e3b" fillOpacity="0.4" />

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
        stroke="#d6c8c5"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeOpacity="0.5"
      />

      {/* Subtle posture dynamics */}
      {posture === 'speaking' && (
        <circle cx="100" cy="115" r="4" fill="#a26f4a" fillOpacity="0.8" />
      )}
    </g>
  );
};

// WAITING ROOM LOBBY ILLUSTRATION
export const LobbyIllustration: React.FC<{
  brightness: number;
  className?: string;
}> = ({ brightness, className = '' }) => {
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
            <stop offset="0%" stopColor="#241a1c" />
            <stop offset="100%" stopColor="#141012" />
          </linearGradient>

          <linearGradient id="floorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a1d1e" />
            <stop offset="100%" stopColor="#0f0e10" />
          </linearGradient>

          <linearGradient id="windowSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6c8c5" />
            <stop offset="50%" stopColor="#a26f4a" />
            <stop offset="100%" stopColor="#3d2220" />
          </linearGradient>

          <linearGradient id="sunBeam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#d6c8c5" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#d6c8c5" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="plantLeaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a26f4a" />
            <stop offset="100%" stopColor="#002e00" />
          </linearGradient>
        </defs>

        {/* Back Wall */}
        <rect x="0" y="0" width="800" height="340" fill="url(#wallGradient)" />

        {/* Sensory Ambient Acoustic Slat Accent Wall */}
        <g opacity="0.18">
          {Array.from({ length: 24 }).map((_, i) => (
            <rect key={i} x={20 + i * 14} y="30" width="6" height="260" rx="3" fill="#a26f4a" />
          ))}
        </g>

        {/* Flooring */}
        <polygon points="0,340 800,340 800,480 0,480" fill="url(#floorGradient)" />
        <line x1="0" y1="340" x2="800" y2="340" stroke="#7f3e3b" strokeWidth="2.5" strokeOpacity="0.4" />

        {/* Soft Rug Under Couch */}
        <ellipse cx="490" cy="405" rx="190" ry="48" fill="#1e1618" fillOpacity="0.9" />
        <ellipse cx="490" cy="405" rx="175" ry="40" fill="#2a1d20" fillOpacity="0.6" stroke="#7f3e3b" strokeWidth="1" strokeOpacity="0.3" />

        {/* WINDOW - Calm Scenic View */}
        <g id="window-view">
          {/* Window Frame Base */}
          <rect x="70" y="55" width="220" height="240" rx="20" fill="#1a1416" stroke="#7f3e3b" strokeWidth="4" />
          {/* Glass Pane */}
          <rect x="80" y="65" width="200" height="220" rx="14" fill="url(#windowSky)" />

          {/* Calming Geometric Hills & Cloud */}
          <ellipse cx="140" cy="245" rx="75" ry="40" fill="#002e00" fillOpacity="0.8" />
          <ellipse cx="230" cy="255" rx="90" ry="50" fill="#22c55e" fillOpacity="0.35" />
          <circle cx="180" cy="115" r="24" fill="#d6c8c5" fillOpacity="0.9" />
          <ellipse cx="130" cy="120" rx="30" ry="12" fill="#ffffff" fillOpacity="0.5" />
          <ellipse cx="220" cy="140" rx="36" ry="14" fill="#ffffff" fillOpacity="0.4" />

          {/* Window Mullions */}
          <line x1="180" y1="65" x2="180" y2="285" stroke="#3d2524" strokeWidth="4" />
          <line x1="80" y1="175" x2="280" y2="175" stroke="#3d2524" strokeWidth="4" />

          {/* Sunlight Ray */}
          <polygon points="120,65 280,65 520,380 260,380" fill="url(#sunBeam)" />
        </g>

        {/* POTTED PLANT */}
        <g id="lobby-plant">
          {/* Pot */}
          <polygon points="310,395 350,395 344,440 316,440" fill="#7f3e3b" />
          <ellipse cx="330" cy="395" rx="20" ry="5" fill="#502321" />
          <rect x="306" y="390" width="48" height="6" rx="3" fill="#a26f4a" />

          {/* Stems & Leaves */}
          <path d="M 330 395 Q 315 310 285 270" stroke="#002e00" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 330 395 Q 345 320 370 280" stroke="#002e00" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 330 395 Q 330 300 325 240" stroke="#002e00" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Leaves */}
          <path d="M 285 270 C 265 260, 260 290, 285 305 C 310 290, 305 260, 285 270 Z" fill="url(#plantLeaf)" />
          <path d="M 370 280 C 350 270, 350 300, 370 315 C 395 300, 390 270, 370 280 Z" fill="url(#plantLeaf)" />
          <path d="M 325 240 C 300 230, 305 265, 325 280 C 345 265, 350 230, 325 240 Z" fill="url(#plantLeaf)" />
          <path d="M 305 325 C 285 320, 290 345, 305 355 C 325 345, 325 320, 305 325 Z" fill="url(#plantLeaf)" />
          <path d="M 350 335 C 335 330, 340 355, 350 365 C 365 355, 365 330, 350 335 Z" fill="url(#plantLeaf)" />
        </g>

        {/* COUCH / SOFA */}
        <g id="lobby-couch">
          {/* Couch Backrest */}
          <rect x="400" y="240" width="270" height="90" rx="16" fill="#2d1c1e" stroke="#7f3e3b" strokeWidth="2.5" />
          
          {/* Back Cushions */}
          <rect x="412" y="248" width="118" height="74" rx="12" fill="#3a2527" />
          <rect x="538" y="248" width="118" height="74" rx="12" fill="#3a2527" />

          {/* Seated Avatar on Couch */}
          <g transform="translate(425, 175)">
            <circle cx="50" cy="30" r="26" fill={COLORS.avatarTone} />
            <rect x="40" y="28" width="18" height="3" rx="1.5" fill="#7f3e3b" fillOpacity="0.6" />
            <rect x="44" y="52" width="12" height="10" rx="3" fill={COLORS.avatarTone} />
            <path
              d="M 18 105 C 18 68, 30 60, 50 60 C 70 60, 82 68, 82 105 L 80 120 C 80 125, 20 125, 20 120 Z"
              fill={COLORS.avatarBody}
            />
            <path d="M 38 62 L 50 76 L 62 62" stroke="#d6c8c5" strokeWidth="2" strokeLinecap="round" fill="none" />
            <ellipse cx="50" cy="115" rx="18" ry="7" fill={COLORS.avatarTone} />
          </g>

          {/* Seat Cushion Layer */}
          <rect x="390" y="325" width="290" height="42" rx="12" fill="#7f3e3b" stroke="#a26f4a" strokeWidth="2" />
          {/* Armrests */}
          <rect x="382" y="280" width="28" height="85" rx="12" fill="#241517" stroke="#7f3e3b" strokeWidth="2" />
          <rect x="660" y="280" width="28" height="85" rx="12" fill="#241517" stroke="#7f3e3b" strokeWidth="2" />

          {/* Wooden Couch Legs */}
          <line x1="410" y1="367" x2="400" y2="400" stroke="#a26f4a" strokeWidth="5" strokeLinecap="round" />
          <line x1="660" y1="367" x2="670" y2="400" stroke="#a26f4a" strokeWidth="5" strokeLinecap="round" />
        </g>

        {/* Minimalist Coffee Table & Mug */}
        <g id="table-mug">
          {/* Table Surface */}
          <ellipse cx="690" cy="405" rx="45" ry="16" fill="#3a2527" stroke="#a26f4a" strokeWidth="2" />
          <line x1="690" y1="415" x2="690" y2="445" stroke="#a26f4a" strokeWidth="4" />
          <ellipse cx="690" cy="445" rx="20" ry="6" fill="#1c1213" />

          {/* Warm Tea Mug */}
          <rect x="682" y="386" width="14" height="14" rx="3" fill="#d6c8c5" />
          <path d="M 696 389 Q 700 393 696 397" stroke="#d6c8c5" strokeWidth="2" fill="none" />
          {/* Steam */}
          <path d="M 686 382 Q 688 376 686 370" stroke="#d6c8c5" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
          <path d="M 692 380 Q 694 374 692 368" stroke="#d6c8c5" strokeWidth="1.5" strokeOpacity="0.6" fill="none" />
        </g>

        {/* Calm framed minimalist poster on wall */}
        <g id="framed-poster">
          <rect x="670" y="70" width="90" height="120" rx="8" fill="#1a1416" stroke="#7f3e3b" strokeWidth="3" />
          <rect x="678" y="78" width="74" height="104" rx="4" fill="#2d1c1e" />
          <circle cx="715" cy="115" r="22" fill="#a26f4a" fillOpacity="0.8" />
          <polygon points="695,155 735,155 715,120" fill="#7f3e3b" />
          <line x1="688" y1="162" x2="742" y2="162" stroke="#d6c8c5" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

// INTERVIEW ROOM ILLUSTRATION (Screen 4 simulation)
export const InterviewRoomIllustration: React.FC<{
  isSpeaking?: boolean;
  isThumbnail?: boolean;
  className?: string;
}> = ({ isSpeaking = false, isThumbnail = false, className = '' }) => {
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#141012] ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="officeWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#251a1d" />
            <stop offset="100%" stopColor="#151012" />
          </linearGradient>

          <linearGradient id="deskTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2527" />
            <stop offset="100%" stopColor="#29181a" />
          </linearGradient>

          <linearGradient id="deskBase" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1f1416" />
            <stop offset="100%" stopColor="#100b0d" />
          </linearGradient>

          <linearGradient id="laptopGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2e30" />
            <stop offset="100%" stopColor="#1c1618" />
          </linearGradient>
        </defs>

        {/* Office Wall */}
        <rect x="0" y="0" width="800" height="380" fill="url(#officeWall)" />

        {/* Soft Modern Office Wall Paneling */}
        <g opacity="0.14">
          {Array.from({ length: 18 }).map((_, i) => (
            <rect key={i} x={30 + i * 42} y="40" width="24" height="260" rx="8" fill="#a26f4a" />
          ))}
        </g>

        {/* Office Window */}
        <g id="office-window">
          <rect x="520" y="50" width="220" height="200" rx="14" fill="#141012" stroke="#7f3e3b" strokeWidth="3" />
          <rect x="528" y="58" width="204" height="184" rx="8" fill="#24191b" />
          <rect x="545" y="120" width="30" height="120" fill="#191113" />
          <rect x="585" y="90" width="40" height="150" fill="#150e10" />
          <rect x="635" y="135" width="35" height="105" fill="#191113" />
          <rect x="680" y="110" width="35" height="130" fill="#150e10" />
          <circle cx="605" cy="90" r="14" fill="#d6c8c5" fillOpacity="0.4" />
        </g>

        {/* Small Plant */}
        <g id="credenza">
          <rect x="60" y="240" width="130" height="100" rx="6" fill="#1c1315" stroke="#7f3e3b" strokeWidth="2" />
          <polygon points="100,225 130,225 125,240 105,240" fill="#a26f4a" />
          <circle cx="115" cy="205" r="16" fill="#002e00" />
          <circle cx="102" cy="215" r="12" fill="#22c55e" fillOpacity="0.6" />
          <circle cx="128" cy="215" r="12" fill="#22c55e" fillOpacity="0.6" />
        </g>

        {/* NPC INTERVIEWER AVATAR */}
        <g id="interviewer-avatar" transform="translate(320, 110)">
          {isSpeaking && (
            <circle cx="80" cy="65" r="46" fill="#7f3e3b" fillOpacity="0.25">
              <animate attributeName="r" values="40;52;40" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
          )}

          <circle cx="80" cy="65" r="34" fill={COLORS.npcTone} />
          <rect x="68" y="62" width="24" height="4" rx="2" fill="#7f3e3b" fillOpacity="0.75" />
          <rect x="72" y="96" width="16" height="16" rx="4" fill={COLORS.npcTone} />

          <path
            d="M 32 195 C 32 120, 50 108, 80 108 C 110 108, 128 120, 128 195 Z"
            fill="#3a2527"
          />

          <polygon points="80,110 65,150 95,150" fill="#d6c8c5" />
          <polygon points="80,120 74,175 80,185 86,175" fill="#7f3e3b" />
          <path d="M 50 115 L 75 165 L 70 195" stroke="#1c1214" strokeWidth="3" fill="none" />
          <path d="M 110 115 L 85 165 L 90 195" stroke="#1c1214" strokeWidth="3" fill="none" />
        </g>

        {/* Floor */}
        <polygon points="0,380 800,380 800,500 0,500" fill="#0f0e10" />
        <line x1="0" y1="380" x2="800" y2="380" stroke="#7f3e3b" strokeWidth="2" strokeOpacity="0.4" />

        {/* INTERVIEW DESK */}
        <g id="interview-desk">
          <polygon points="120,335 680,335 720,470 80,470" fill="url(#deskBase)" stroke="#3d2524" strokeWidth="2" />
          <polygon points="180,355 620,355 650,450 150,450" fill="#140d0f" fillOpacity="0.8" />
          <polygon points="90,305 710,305 740,340 60,340" fill="url(#deskTop)" stroke="#a26f4a" strokeWidth="2.5" />

          {/* Laptop on Desk */}
          <g id="desk-laptop" transform="translate(480, 275)">
            <polygon points="20,5 90,5 95,45 15,45" fill="url(#laptopGrad)" stroke="#503538" strokeWidth="1.5" />
            <polygon points="24,8 86,8 90,42 20,42" fill="#0f0e10" />
            <circle cx="55" cy="25" r="4" fill="#a26f4a" />
            <polygon points="5,45 105,45 115,55 -5,55" fill="#3a2527" />
          </g>

          {/* Notepad and Pen */}
          <g id="notepad" transform="translate(230, 310)">
            <polygon points="0,0 45,-5 55,20 10,25" fill="#d6c8c5" stroke="#a26f4a" strokeWidth="1" />
            <line x1="8" y1="5" x2="38" y2="2" stroke="#7f3e3b" strokeWidth="1.5" />
            <line x1="12" y1="12" x2="42" y2="9" stroke="#7f3e3b" strokeWidth="1.5" />
            <line x1="45" y1="2" x2="62" y2="18" stroke="#7f3e3b" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Water Tumbler */}
          <g id="water-glass" transform="translate(190, 298)">
            <polygon points="4,0 18,0 16,22 6,22" fill="#d6c8c5" fillOpacity="0.5" stroke="#d6c8c5" strokeWidth="1" />
            <polygon points="6,6 16,6 15,20 7,20" fill="#a26f4a" fillOpacity="0.4" />
          </g>
        </g>

        {/* Live Speaking Waves if Active */}
        {isSpeaking && !isThumbnail && (
          <g id="speaking-visualizer" transform="translate(400, 75)">
            <rect x="-30" y="-12" width="60" height="24" rx="12" fill="#1a1416" fillOpacity="0.9" stroke="#a26f4a" strokeWidth="1.5" />
            <circle cx="-16" cy="0" r="3" fill="#7f3e3b">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="4" fill="#a26f4a">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="16" cy="0" r="3" fill="#7f3e3b">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
};

// RESTAURANT ORDERING SCENE ILLUSTRATION
export const RestaurantRoomIllustration: React.FC<{
  isSpeaking?: boolean;
  isThumbnail?: boolean;
  className?: string;
}> = ({ isSpeaking = false, isThumbnail = false, className = '' }) => {
  return (
    <div className={`relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-[#141012] ${className}`}>
      <svg
        viewBox="0 0 800 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cafeWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#251a1d" />
            <stop offset="100%" stopColor="#151012" />
          </linearGradient>

          <linearGradient id="warmLampGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d6c8c5" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#d6c8c5" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="cafeTableTop" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3d2527" />
            <stop offset="100%" stopColor="#29181a" />
          </linearGradient>

          <linearGradient id="menuGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7f3e3b" />
            <stop offset="100%" stopColor="#502321" />
          </linearGradient>
        </defs>

        {/* Cafe Back Wall */}
        <rect x="0" y="0" width="800" height="380" fill="url(#cafeWall)" />

        {/* Ambient Warm Pendant Lamp Light Cone */}
        <polygon points="400,0 260,340 540,340" fill="url(#warmLampGlow)" />
        <line x1="400" y1="0" x2="400" y2="55" stroke="#a26f4a" strokeWidth="2.5" />
        <ellipse cx="400" cy="58" rx="28" ry="10" fill="#1c1214" stroke="#7f3e3b" strokeWidth="2" />
        <circle cx="400" cy="62" r="8" fill="#d6c8c5" />

        {/* Cafe Menu Chalkboard in Background */}
        <g id="chalkboard">
          <rect x="520" y="55" width="220" height="170" rx="10" fill="#141012" stroke="#7f3e3b" strokeWidth="3" />
          <rect x="530" y="65" width="200" height="150" rx="6" fill="#0f0e10" />
          <text x="630" y="90" fill="#d6c8c5" fontSize="13" fontWeight="bold" textAnchor="middle" letterSpacing="2">
            DAILY SPECIALS
          </text>
          <line x1="560" y1="100" x2="700" y2="100" stroke="#a26f4a" strokeWidth="1.5" strokeDasharray="3,3" />
          <rect x="550" y="115" width="100" height="5" rx="2.5" fill="#a26f4a" fillOpacity="0.6" />
          <rect x="670" y="115" width="40" height="5" rx="2.5" fill="#d6c8c5" fillOpacity="0.8" />
          <rect x="550" y="132" width="115" height="5" rx="2.5" fill="#a26f4a" fillOpacity="0.6" />
          <rect x="670" y="132" width="40" height="5" rx="2.5" fill="#d6c8c5" fillOpacity="0.8" />
          <rect x="550" y="150" width="85" height="5" rx="2.5" fill="#a26f4a" fillOpacity="0.6" />
          <rect x="670" y="150" width="40" height="5" rx="2.5" fill="#d6c8c5" fillOpacity="0.8" />
        </g>

        {/* Counter */}
        <g id="espresso-counter">
          <rect x="60" y="180" width="160" height="160" rx="8" fill="#1c1315" stroke="#7f3e3b" strokeWidth="2" />
          <ellipse cx="100" cy="172" rx="12" ry="5" fill="#d6c8c5" />
          <rect x="90" y="172" width="20" height="14" rx="3" fill="#d6c8c5" />
          <ellipse cx="140" cy="172" rx="12" ry="5" fill="#d6c8c5" />
          <rect x="130" y="172" width="20" height="14" rx="3" fill="#d6c8c5" />
          <ellipse cx="180" cy="172" rx="12" ry="5" fill="#d6c8c5" />
          <rect x="170" y="172" width="20" height="14" rx="3" fill="#d6c8c5" />
          <circle cx="100" cy="155" r="4" fill="#d6c8c5" fillOpacity="0.4" />
          <circle cx="140" cy="150" r="5" fill="#d6c8c5" fillOpacity="0.4" />
        </g>

        {/* SERVER NPC AVATAR */}
        <g id="server-avatar" transform="translate(320, 105)">
          {isSpeaking && (
            <circle cx="80" cy="65" r="46" fill="#7f3e3b" fillOpacity="0.25">
              <animate attributeName="r" values="40;52;40" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.05;0.3" dur="2s" repeatCount="indefinite" />
            </circle>
          )}

          <circle cx="80" cy="65" r="34" fill={COLORS.npcTone} />
          <rect x="68" y="62" width="24" height="4" rx="2" fill="#7f3e3b" fillOpacity="0.75" />
          <rect x="72" y="96" width="16" height="16" rx="4" fill={COLORS.npcTone} />

          <path
            d="M 32 195 C 32 120, 50 108, 80 108 C 110 108, 128 120, 128 195 Z"
            fill="#7f3e3b"
          />

          <path
            d="M 52 140 L 108 140 L 114 195 L 46 195 Z"
            fill="#1c1214"
          />
          <line x1="56" y1="140" x2="68" y2="108" stroke="#1c1214" strokeWidth="4" />
          <line x1="104" y1="140" x2="92" y2="108" stroke="#1c1214" strokeWidth="4" />

          <rect x="86" y="148" width="18" height="8" rx="2" fill="#d6c8c5" />
          <rect x="88" y="151" width="14" height="2" rx="1" fill="#7f3e3b" />

          <g transform="translate(110, 150)">
            <rect x="0" y="0" width="22" height="32" rx="3" fill="#1c1214" stroke="#a26f4a" strokeWidth="1" />
            <rect x="3" y="4" width="16" height="24" rx="2" fill="#d6c8c5" />
            <line x1="6" y1="8" x2="16" y2="8" stroke="#7f3e3b" strokeWidth="1" />
            <line x1="6" y1="13" x2="16" y2="13" stroke="#7f3e3b" strokeWidth="1" />
            <line x1="6" y1="18" x2="14" y2="18" stroke="#7f3e3b" strokeWidth="1" />
            <line x1="18" y1="2" x2="24" y2="14" stroke="#a26f4a" strokeWidth="2" strokeLinecap="round" />
          </g>
        </g>

        {/* Floor */}
        <polygon points="0,380 800,380 800,500 0,500" fill="#0f0e10" />
        <line x1="0" y1="380" x2="800" y2="380" stroke="#7f3e3b" strokeWidth="2" strokeOpacity="0.4" />

        {/* RESTAURANT TABLE */}
        <g id="dining-table">
          <polygon points="260,345 540,345 580,480 220,480" fill="#1a1113" stroke="#3d2524" strokeWidth="2" />
          <polygon points="90,305 710,305 740,345 60,345" fill="url(#cafeTableTop)" stroke="#a26f4a" strokeWidth="2.5" />

          {/* Menu Booklet */}
          <g id="table-menu" transform="translate(480, 275)">
            <polygon points="15,8 90,0 100,50 20,55" fill="url(#menuGrad)" stroke="#a26f4a" strokeWidth="1.5" />
            <polygon points="20,12 85,5 92,46 25,50" fill="#d6c8c5" />
            <text x="54" y="32" fill="#502321" fontSize="10" fontWeight="bold" textAnchor="middle">MENU</text>
            <line x1="32" y1="38" x2="76" y2="38" stroke="#7f3e3b" strokeWidth="1" />
          </g>

          {/* Tall Water Glass */}
          <g id="table-water-glass" transform="translate(230, 290)">
            <polygon points="4,0 20,0 18,32 6,32" fill="#d6c8c5" fillOpacity="0.6" stroke="#d6c8c5" strokeWidth="1.5" />
            <polygon points="6,8 18,8 17,30 7,30" fill="#a26f4a" fillOpacity="0.4" />
            <rect x="8" y="14" width="6" height="6" fill="#ffffff" fillOpacity="0.8" rx="1" />
            <rect x="11" y="22" width="5" height="5" fill="#ffffff" fillOpacity="0.8" rx="1" />
            <circle cx="5" cy="2" r="5" fill="#d6c8c5" stroke="#a26f4a" strokeWidth="1" />
          </g>

          {/* Fork, Knife */}
          <g id="cutlery" transform="translate(160, 315)">
            <rect x="0" y="0" width="30" height="20" rx="3" fill="#d6c8c5" stroke="#a26f4a" strokeWidth="1" />
            <line x1="8" y1="3" x2="8" y2="17" stroke="#7f3e3b" strokeWidth="1.5" />
            <line x1="22" y1="3" x2="22" y2="17" stroke="#7f3e3b" strokeWidth="1.5" />
          </g>

          {/* Condiment Shakers */}
          <g id="shakers" transform="translate(380, 295)">
            <rect x="0" y="5" width="12" height="18" rx="3" fill="#d6c8c5" stroke="#a26f4a" strokeWidth="1" />
            <rect x="2" y="2" width="8" height="4" rx="1" fill="#7f3e3b" />
            <rect x="16" y="5" width="12" height="18" rx="3" fill="#3a2527" stroke="#a26f4a" strokeWidth="1" />
            <rect x="18" y="2" width="8" height="4" rx="1" fill="#d6c8c5" />
          </g>
        </g>

        {/* Live Speaking Indicator */}
        {isSpeaking && !isThumbnail && (
          <g id="speaking-visualizer" transform="translate(400, 75)">
            <rect x="-30" y="-12" width="60" height="24" rx="12" fill="#1a1416" fillOpacity="0.9" stroke="#a26f4a" strokeWidth="1.5" />
            <circle cx="-16" cy="0" r="3" fill="#7f3e3b">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="0" cy="0" r="4" fill="#a26f4a">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="16" cy="0" r="3" fill="#7f3e3b">
              <animate attributeName="opacity" values="0.3;1;0.3" dur="0.8s" repeatCount="indefinite" />
            </circle>
          </g>
        )}
      </svg>
    </div>
  );
};

// SCENARIO CARD AVATAR
export const ScenarioAvatarIllustration: React.FC<{
  iconType: string;
  className?: string;
  size?: number;
}> = ({ iconType, className = '', size = 56 }) => {
  return (
    <div 
      className={`relative rounded-full flex items-center justify-center shrink-0 shadow-md ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="avatarCircleBg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3a2527" />
            <stop offset="100%" stopColor="#1c1214" />
          </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="48" fill="url(#avatarCircleBg)" stroke="#7f3e3b" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="40" fill="#a26f4a" fillOpacity="0.12" />

        <circle cx="50" cy="38" r="15" fill="#d6c8c5" />
        <path
          d="M 26 82 C 26 62, 36 56, 50 56 C 64 56, 74 62, 74 82 Z"
          fill="#7f3e3b"
        />

        {iconType === 'briefcase' && (
          <g transform="translate(36, 62)">
            <rect x="0" y="4" width="28" height="18" rx="3" fill="#a26f4a" />
            <path d="M 8 4 L 8 1 L 20 1 L 20 4" stroke="#d6c8c5" strokeWidth="1.5" fill="none" />
            <line x1="14" y1="10" x2="14" y2="15" stroke="#0f0e10" strokeWidth="2" />
          </g>
        )}

        {iconType === 'utensils' && (
          <g transform="translate(36, 60)">
            <polygon points="6,0 22,0 26,22 2,22" fill="#a26f4a" />
            <circle cx="14" cy="8" r="3" fill="#0f0e10" />
            <line x1="10" y1="12" x2="18" y2="12" stroke="#0f0e10" strokeWidth="1.5" />
          </g>
        )}

        {iconType === 'shield-alert' && (
          <g transform="translate(38, 62)">
            <path d="M 12 0 L 24 4 L 24 14 C 24 20, 12 24, 12 24 C 12 24, 0 20, 0 14 L 0 4 Z" fill="#7f3e3b" />
            <line x1="12" y1="6" x2="12" y2="14" stroke="#d6c8c5" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="18" r="1.5" fill="#d6c8c5" />
          </g>
        )}

        {iconType === 'stethoscope' && (
          <g transform="translate(38, 60)">
            <rect x="0" y="4" width="24" height="18" rx="4" fill="#a26f4a" />
            <line x1="12" y1="8" x2="12" y2="18" stroke="#d6c8c5" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="7" y1="13" x2="17" y2="13" stroke="#d6c8c5" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}

        {iconType === 'phone-call' && (
          <g transform="translate(38, 62)">
            <circle cx="12" cy="12" r="11" fill="#7f3e3b" />
            <path d="M 7 9 C 7 14, 10 17, 15 17 L 17 15 L 14 12 L 13 13 C 11 12, 10 11, 9 9 L 10 8 L 7 5 Z" fill="#d6c8c5" />
          </g>
        )}

        {iconType === 'shopping-bag' && (
          <g transform="translate(38, 60)">
            <rect x="2" y="6" width="20" height="18" rx="2" fill="#a26f4a" />
            <path d="M 7 6 C 7 1, 17 1, 17 6" stroke="#d6c8c5" strokeWidth="2" fill="none" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="#0f0e10" strokeWidth="1.5" />
          </g>
        )}

        {iconType === 'coffee' && (
          <g transform="translate(38, 60)">
            <rect x="2" y="6" width="18" height="16" rx="3" fill="#7f3e3b" />
            <path d="M 20 9 C 24 9, 24 17, 20 17" stroke="#7f3e3b" strokeWidth="2" fill="none" />
            <path d="M 6 2 Q 8 4 6 6" stroke="#d6c8c5" strokeWidth="1.2" fill="none" />
            <path d="M 12 2 Q 14 4 12 6" stroke="#d6c8c5" strokeWidth="1.2" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
};
