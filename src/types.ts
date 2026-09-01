export type ScreenType = 'title' | 'intake' | 'scenario-select' | 'waiting-room' | 'interview' | 'therapist-dashboard' | 'debrief';

export type DifficultyLevel = 'easy' | 'moderate' | 'hard';

export type ScenarioId = 
  | 'job-interview'
  | 'restaurant-ordering'
  | 'conflict-conversation'
  | 'doctors-appointment'
  | 'phone-call'
  | 'store-help'
  | 'small-talk';

export interface ScenarioDefinition {
  id: ScenarioId;
  title: string;
  description: string;
  status: 'playable' | 'coming-soon';
  categoryTag: string;
  roleLabel: string;
  npcName: string;
  iconType: string;
}

export interface IntakeConfig {
  participantName: string;
  sessionGoal: string;
  startingDifficulty: DifficultyLevel;
  clinicalNotes: string;
  selectedScenarioId: ScenarioId;
}

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
  scenarioId?: ScenarioId;
  scenarioTitle?: string;
  difficulty: DifficultyLevel;
  question: string;
  userResponseLabel: string;
  userResponseText: string;
  npcReply: string;
  clinicianNotes: string;
  skillsDemonstrated: string[];
  appropriateScore?: number;
  flaggedPauseSeconds?: number;
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

