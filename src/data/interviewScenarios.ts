import { DifficultyScenario } from '../types';

export interface DifficultyScenarioExtended extends DifficultyScenario {
  npcTone: string;
  npcToneDescription: string;
  dotColor: string;
  badgeColor: string;
  interviewerAvatarMood: 'warm' | 'neutral' | 'intense';
}

export const DIFFICULTY_PALETTE = {
  easy: '#02C39A',
  moderate: '#028090',
  hard: '#F4A261',
} as const;

export const INTERVIEW_SCENARIOS: Record<string, DifficultyScenarioExtended> = {
  easy: {
    difficulty: 'easy',
    difficultyLabel: 'Easy',
    dotColor: '#02C39A',
    badgeColor: 'text-[#02C39A]',
    npcTone: 'Warm & Encouraging',
    npcToneDescription: 'NPC is warm and supportive, with patient pacing and reassuring feedback.',
    interviewerAvatarMood: 'warm',
    scenarioTitle: 'Guided Collaborative Challenge',
    contextDescription: 'Low pressure • Step-by-step problem solving with plenty of time to respond.',
    question: 'Hi there! It is wonderful to meet you today. Please take all the time you need—there are no trick questions here. Could you share a time you encountered a challenging problem at work or school, and how you worked through it step by step?',
    options: [
      {
        id: 'easy-opt-1',
        label: 'Option A: Step-by-Step Problem Solving (Supportive)',
        text: 'During a collaborative project, our dataset had several missing entries. I felt a bit uncertain at first, but I took a calm breath, created a supportive shared checklist with my partner, and we gently worked through each item together step-by-step to finish comfortably ahead of the deadline.',
        npcReply: 'That is wonderful to hear! Taking a calm breath and supporting your teammate with an organized checklist shows such thoughtful collaboration and methodical problem-solving.',
        clinicianNotes: 'Direct, clear structure with strong emotional self-regulation and peer empathy. Maintained calm pacing throughout.',
        appropriateScore: 10,
        skillsDemonstrated: ['Calm Regulation', 'Methodical Planning', 'Empathetic Teamwork']
      },
      {
        id: 'easy-opt-2',
        label: 'Option B: Proactive & Self-Aware Help Seeking (Longer)',
        text: 'When I was learning our new software tool, I ran into an unexpected error. Instead of feeling overwhelmed, I took a moment to write down exactly what I had tried so far, and then reached out to a senior peer who kindly guided me through the troubleshooting steps.',
        npcReply: 'I really appreciate your self-awareness! Documenting your steps before asking for guidance is so helpful and creates a supportive environment for everyone.',
        clinicianNotes: 'Great demonstration of workplace psychological safety, organized troubleshooting, and self-advocacy.',
        appropriateScore: 9,
        skillsDemonstrated: ['Self-Awareness', 'Help-Seeking', 'Organized Documentation']
      },
      {
        id: 'easy-opt-3',
        label: 'Option C: Gentle Early Clarification (Supportive)',
        text: 'I received initial project guidelines that felt a bit ambiguous. To ensure our whole group felt confident and avoid any last-minute stress, I drafted three gentle clarifying questions and scheduled a quick 5-minute check-in with our supervisor.',
        npcReply: 'That is fantastic! Asking clarifying questions early is one of the best ways to keep projects low-stress and make sure everyone is aligned.',
        clinicianNotes: 'Superb proactive clarification. Demonstrates confidence in requesting clear sensory and instructional parameters.',
        appropriateScore: 10,
        skillsDemonstrated: ['Proactive Clarification', 'Stress Prevention', 'Clear Communication']
      }
    ]
  },
  moderate: {
    difficulty: 'moderate',
    difficultyLabel: 'Moderate',
    dotColor: '#028090',
    badgeColor: 'text-[#028090]',
    npcTone: 'Neutral & Professional',
    npcToneDescription: 'NPC is neutral, concise, and business-focused with standard interview pacing.',
    interviewerAvatarMood: 'neutral',
    scenarioTitle: 'Workflow & Priority Conflict',
    contextDescription: 'Standard workplace tempo • Balances conflicting deliverables and communication styles.',
    question: 'Please describe a challenging problem you encountered in a work or academic setting, and the specific approach you used to resolve it.',
    options: [
      {
        id: 'mod-opt-1',
        label: 'Option A: Objective Criteria Testing',
        text: 'Two teammates disagreed on the deck format. I tested both options on a sample slide to decide using objective criteria.',
        npcReply: 'Understood. Using objective criteria to resolve team indecision is an effective and standard workplace practice.',
        clinicianNotes: 'Concise conflict resolution using objective data. High social efficiency.',
        appropriateScore: 9,
        skillsDemonstrated: ['Objective Compromise', 'Concise Communication', 'Conflict Resolution']
      },
      {
        id: 'mod-opt-2',
        label: 'Option B: Priority Triage Under Scope Shift',
        text: 'When our deadline moved up three days, I reprioritized core deliverables, communicated trade-offs, and shipped on time.',
        npcReply: 'Setting clear expectation boundaries under shifting deadlines is essential for predictable project delivery.',
        clinicianNotes: 'Handled sudden scope compression with crisp triage and boundary communication.',
        appropriateScore: 9,
        skillsDemonstrated: ['Scope Triage', 'Boundary Setting', 'Stress Composure']
      },
      {
        id: 'mod-opt-3',
        label: 'Option C: Structured Hybrid Communication',
        text: 'A colleague preferred verbal syncs while I preferred written briefs. We agreed to a 5-minute kickoff followed by bulleted notes.',
        npcReply: 'A balanced synchronous and asynchronous agreement effectively accommodates different operational preferences.',
        clinicianNotes: 'Clear, professional compromise balancing social and processing preferences.',
        appropriateScore: 10,
        skillsDemonstrated: ['Workplace Diplomacy', 'Self-Advocacy', 'Async Alignment']
      }
    ]
  },
  hard: {
    difficulty: 'hard',
    difficultyLabel: 'Hard',
    dotColor: '#F4A261',
    badgeColor: 'text-[#F4A261]',
    npcTone: 'Rapid Follow-Up & Interruption',
    npcToneDescription: 'NPC interrupts or asks rapid follow-up questions under high conversational pressure.',
    interviewerAvatarMood: 'intense',
    scenarioTitle: 'High-Pressure Crisis & Rapid Follow-Up',
    contextDescription: 'Fast-paced • Interviewer cuts straight to root causes and demands immediate executive composure.',
    question: 'We are on a tight schedule, so let me jump straight to it: during a critical project breakdown where deadlines slipped, why did the failure happen on your watch, and what immediate action did you take on the spot?',
    options: [
      {
        id: 'hard-opt-1',
        label: 'Option A: Ask for a Moment to Think (Self-Regulation)',
        text: 'May I take a brief moment to collect my thoughts? I want to ensure I give you an accurate and structured breakdown of what happened.',
        npcReply: '[Interviewer pauses and nods] Of course. Take your time. Being able to pause and regulate before answering under rapid pressure demonstrates strong executive maturity.',
        clinicianNotes: 'Superb distress tolerance and executive function self-regulation. Resisted pressure impulse to blurt and successfully advocated for cognitive processing time.',
        appropriateScore: 10,
        skillsDemonstrated: ['Distress Tolerance', 'Executive Regulation', 'Cognitive Pacing']
      },
      {
        id: 'hard-opt-2',
        label: 'Option B: Direct Error Ownership & Rapid Fix',
        text: 'When a budget anomaly was flagged two hours before submission, I immediately informed the lead, isolated the spreadsheet formula flaw, and provided a corrected sheet.',
        npcReply: 'Good. Taking immediate ownership without deflection is what isolates and resolves critical path roadblocks quickly.',
        clinicianNotes: 'Factual, non-defensive accountability under high pressure. Maintained composure.',
        appropriateScore: 9,
        skillsDemonstrated: ['Radical Accountability', 'Crisis Composure', 'Root Cause Analysis']
      },
      {
        id: 'hard-opt-3',
        label: 'Option C: Rapid Data-Backed Boundary Defense',
        text: 'When sprint scope surged beyond team capacity, I rapidly pulled velocity metrics to illustrate risk and negotiated a phased release.',
        npcReply: 'Clear data cuts through ambiguity fast. Let us proceed to the next item.',
        clinicianNotes: 'Defended boundaries with empirical facts rather than emotional escalation under rapid pressure.',
        appropriateScore: 9,
        skillsDemonstrated: ['Data-Driven Boundary', 'High-Stakes Negotiation', 'Pacing']
      }
    ]
  }
};
