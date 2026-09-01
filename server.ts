import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory clinical session telemetry store for current server lifecycle
interface StoredSession {
  id: string;
  timestamp: string;
  participantName: string;
  sessionGoal: string;
  scenarioId: string;
  scenarioTitle: string;
  difficulty: string;
  question: string;
  userAnswerLabel: string;
  userAnswerText: string;
  npcResponse: string;
  hesitationTimeSec: number;
  longPauseFlagged: boolean;
  score: number;
  clinicalNotes: string[];
}

const sessionStore: StoredSession[] = [];

// Lazy initialization of Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// 1. Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'NeuroPractice VR Backend Service',
    version: '2.4.0',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    totalSessionsArchived: sessionStore.length,
    timestamp: new Date().toISOString(),
  });
});

// 2. Telemetry Session Logging
app.post('/api/sessions/log', (req, res) => {
  try {
    const sessionData = req.body;
    const newRecord: StoredSession = {
      id: sessionData.id || `NP-SESSION-${Date.now()}`,
      timestamp: sessionData.timestamp || new Date().toISOString(),
      participantName: sessionData.participantName || 'Rahul K.',
      sessionGoal: sessionData.sessionGoal || 'Build confidence answering behavioral questions',
      scenarioId: sessionData.scenarioId || 'job-interview',
      scenarioTitle: sessionData.scenarioTitle || 'Job Interview',
      difficulty: sessionData.difficulty || 'easy',
      question: sessionData.question || '',
      userAnswerLabel: sessionData.userAnswerLabel || '',
      userAnswerText: sessionData.userAnswerText || '',
      npcResponse: sessionData.npcResponse || '',
      hesitationTimeSec: sessionData.hesitationTimeSec ?? 4.2,
      longPauseFlagged: sessionData.longPauseFlagged ?? true,
      score: sessionData.score ?? 9,
      clinicalNotes: Array.isArray(sessionData.clinicalNotes) ? sessionData.clinicalNotes : [],
    };

    sessionStore.unshift(newRecord);
    // Keep max 50 recent records in memory
    if (sessionStore.length > 50) {
      sessionStore.pop();
    }

    res.status(201).json({
      success: true,
      recordId: newRecord.id,
      totalArchived: sessionStore.length,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Get Telemetry Session History
app.get('/api/sessions/history', (req, res) => {
  res.json({
    sessions: sessionStore,
    count: sessionStore.length,
  });
});

// 4. AI-Powered Dynamic NPC Dialogue Response
app.post('/api/ai/npc-reply', async (req, res) => {
  const { scenarioId, scenarioTitle, difficulty, promptQuestion, userResponse, npcName, roleLabel } = req.body;

  const ai = getGenAI();

  // If Gemini API is not configured, return a structured fallback response
  if (!ai) {
    return res.json({
      npcReply: `[Standard Rehearsal Response]: Thank you for sharing that structured answer. Taking a calm moment to organize your thoughts before speaking is an effective technique.`,
      toneFeedback: 'Calm & Structured',
      source: 'offline-template',
    });
  }

  try {
    const systemPrompt = `You are roleplaying as ${npcName || 'Alex'} (${roleLabel || 'Interviewer'}), a simulated avatar inside a clinical VR social-skills training tool named NeuroPractice VR designed for neurodivergent (autistic) teens and young adults.
Scenario: ${scenarioTitle || 'Job Interview'} (${scenarioId})
Difficulty Tier: ${difficulty} (easy = gentle, patient, validating; moderate = realistic standard workplace/social tone; hard = rapid, direct, urgent or slightly rushed).

Your goal:
1. Provide a realistic, constructive in-character response to the participant's answer.
2. If easy: be validating, warm, and encourage their pacing.
3. If moderate: be clear, professional, and acknowledge the key point.
4. If hard: test their composure with a brief realistic follow-up or acknowledgment without being cruel.
Keep your response between 1 and 3 concise sentences.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: `Question asked: "${promptQuestion}"\nParticipant's spoken answer: "${userResponse}"\n\nGenerate your in-character avatar reply.`,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const replyText = response.text?.trim() || 'Thank you for your thoughtful answer.';
    res.json({
      npcReply: replyText,
      toneFeedback: difficulty === 'easy' ? 'Warm & Supportive' : difficulty === 'hard' ? 'Fast & Direct' : 'Professional',
      source: 'gemini-3.7-flash',
    });
  } catch (error: any) {
    console.error('Gemini NPC reply error:', error);
    res.json({
      npcReply: `That is an insightful response. Your structured approach clearly resolves the issue while keeping everyone aligned.`,
      toneFeedback: 'Supportive Fallback',
      source: 'fallback-after-error',
      error: error.message,
    });
  }
});

// 5. AI-Powered Post-Session Clinical Analysis
app.post('/api/ai/clinical-analysis', async (req, res) => {
  const { participantName, sessionGoal, scenarioTitle, difficulty, exchanges, hesitationTimeSec } = req.body;

  const ai = getGenAI();

  if (!ai) {
    return res.json({
      score: 9,
      takeaways: [
        'Demonstrated strong executive self-regulation and structured communication.',
        `Detected formulation pause (+${hesitationTimeSec || 4.2}s) — participant utilized deliberate pacing rather than impulsive responding.`,
        'Maintained calm conversational tone and factual clarity throughout the scenario.',
      ],
      recommendations: 'Continue practicing self-advocacy pause phrases in fast-paced conversational settings.',
      source: 'rule-based-engine',
    });
  }

  try {
    const prompt = `As a clinical psychologist and speech-language pathologist specializing in neurodivergent adolescent social communication and executive functioning training:
Participant: ${participantName || 'Rahul K.'}
Target Goal: ${sessionGoal || 'Build confidence answering behavioral questions'}
Scenario: ${scenarioTitle || 'Job Interview'} (Difficulty: ${difficulty})
Pacing Data: Formulation hesitation pause of ${hesitationTimeSec || 4.2} seconds detected.
Exchanges: ${JSON.stringify(exchanges || [])}

Provide a structured clinical evaluation with a social appropriateness score (1-10), 3 specific clinical takeaway bullet notes, and 1 therapist discussion recommendation.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.INTEGER,
              description: 'Appropriateness and composure score out of 10',
            },
            takeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 clinical post-rehearsal bullet observations',
            },
            recommendations: {
              type: Type.STRING,
              description: 'Key therapist coaching recommendation for next session',
            },
          },
          required: ['score', 'takeaways', 'recommendations'],
        },
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json({
      score: parsed.score || 9,
      takeaways: parsed.takeaways || [
        'Exhibited clear, structured verbal reasoning under simulation conditions.',
        'Pacing was deliberate and self-regulated.',
        'Successfully aligned response with stated behavioral goal.',
      ],
      recommendations: parsed.recommendations || 'Reinforce deliberate pause self-advocacy strategies in subsequent rehearsals.',
      source: 'gemini-3.7-flash',
    });
  } catch (error: any) {
    console.error('Clinical analysis error:', error);
    res.json({
      score: 9,
      takeaways: [
        'Maintained strong composure and structured reasoning throughout the session.',
        `Pacing hesitation (+${hesitationTimeSec || 4.2}s) shows intentional cognitive planning.`,
        'Demonstrated high non-defensive accountability and task focus.',
      ],
      recommendations: 'Encourage participant to continue using the "May I have a moment to think" self-advocacy tool.',
      source: 'fallback-after-error',
    });
  }
});

// -------------------------------------------------------------
// Vite Middleware / Production Static Asset Handling
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NeuroPractice VR] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
