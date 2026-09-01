export type ScreenType = 'title' | 'waiting-room' | 'interview' | 'therapist-dashboard';

export type DifficultyLevel = 'easy' | 'moderate' | 'hard';

export interface ResponseOption {
  id: string;
  label: string;
  text: string;
  npcReply: string;
  clinicianNotes: string;
  appropriateScore: number; // e.g. 1-10
  skillsDemonstrated: string[];
}

export interface DifficultyScenario {
  difficulty: DifficultyLevel;
  difficultyLabel: string;
  scenarioTitle: string;
  contextDescription: string;
  question: string;
  options: ResponseOption[];
}

export interface SessionExchange {
  id: string;
  timestamp: string;
  difficulty: DifficultyLevel;
  question: string;
  userResponseLabel: string;
  userResponseText: string;
  npcReply: string;
  clinicianNotes: string;
  skillsDemonstrated: string[];
}

export interface SensorySettings {
  brightness: number; // 30 - 100
  volume: number; // 0 - 100
  ambientSoundActive: boolean;
  soundType: 'ocean' | 'chimes' | 'white-noise' | 'rain';
}

export interface TherapistActionAlert {
  id: string;
  type: 'pause' | 'cue_hint' | 'ease_off' | 'end_session';
  title: string;
  message: string;
  timestamp: string;
}
