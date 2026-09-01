import { SessionExchange, DifficultyLevel, ScenarioId } from '../types';

export interface HealthStatus {
  status: string;
  service: string;
  version: string;
  hasApiKey: boolean;
  totalSessionsArchived: number;
}

export interface NpcReplyResult {
  npcReply: string;
  toneFeedback: string;
  source: string;
}

export interface ClinicalAnalysisResult {
  score: number;
  takeaways: string[];
  recommendations: string;
  source: string;
}

/**
 * Check backend health & Gemini status
 */
export async function checkBackendHealth(): Promise<HealthStatus | null> {
  try {
    const res = await fetch('/api/health');
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('Backend offline or unreachable, using client offline mode:', e);
    return null;
  }
}

/**
 * Log session telemetry record to backend storage
 */
export async function logSessionTelemetry(exchange: SessionExchange, participantName: string, sessionGoal: string): Promise<boolean> {
  try {
    const res = await fetch('/api/sessions/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: exchange.id,
        timestamp: exchange.timestamp,
        participantName,
        sessionGoal,
        scenarioId: exchange.scenarioId,
        scenarioTitle: exchange.scenarioTitle,
        difficulty: exchange.difficulty,
        question: exchange.question,
        userAnswerLabel: exchange.userResponseLabel,
        userAnswerText: exchange.userResponseText,
        npcResponse: exchange.npcReply,
        hesitationTimeSec: exchange.hesitationTimeSec || 4.2,
        longPauseFlagged: exchange.longPauseFlagged ?? true,
        score: exchange.appropriateScore,
        clinicalNotes: [exchange.clinicianNotes],
      }),
    });
    return res.ok;
  } catch (e) {
    console.warn('Failed to log telemetry to backend:', e);
    return false;
  }
}

/**
 * Request real-time dynamic AI NPC response
 */
export async function fetchNpcReply(params: {
  scenarioId: ScenarioId;
  scenarioTitle: string;
  difficulty: DifficultyLevel;
  promptQuestion: string;
  userResponse: string;
  npcName: string;
  roleLabel: string;
}): Promise<NpcReplyResult | null> {
  try {
    const res = await fetch('/api/ai/npc-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('Failed to fetch AI NPC reply from backend:', e);
    return null;
  }
}

/**
 * Request AI-powered clinical debrief analysis
 */
export async function fetchClinicalAnalysis(params: {
  participantName: string;
  sessionGoal: string;
  scenarioTitle: string;
  difficulty: DifficultyLevel;
  exchanges: SessionExchange[];
  hesitationTimeSec?: number;
}): Promise<ClinicalAnalysisResult | null> {
  try {
    const res = await fetch('/api/ai/clinical-analysis', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('Failed to fetch AI Clinical Analysis from backend:', e);
    return null;
  }
}
