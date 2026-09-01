import { DifficultyScenario, ScenarioDefinition, ScenarioId } from '../types';

export interface DifficultyScenarioExtended extends DifficultyScenario {
  npcTone: string;
  npcToneDescription: string;
  dotColor: string;
  badgeColor: string;
  interviewerAvatarMood: 'warm' | 'neutral' | 'intense';
}

export const DIFFICULTY_PALETTE = {
  easy: '#22c55e', // Grounding Forest Green accent
  moderate: '#a26f4a', // Warm Amber Tan
  hard: '#7f3e3b', // Deep Terracotta Burgundy
} as const;

export const SCENARIO_CATALOG: ScenarioDefinition[] = [
  {
    id: 'job-interview',
    title: 'Job Interview',
    description: 'Answer unexpected questions, read tone, recover from mistakes.',
    status: 'playable',
    categoryTag: 'Professional Rehearsal',
    roleLabel: 'Interviewer',
    npcName: 'Alex',
    iconType: 'briefcase',
  },
  {
    id: 'restaurant-ordering',
    title: 'Restaurant Ordering',
    description: 'Navigate a menu, make small talk, handle a mix-up, and pay.',
    status: 'playable',
    categoryTag: 'Daily Living & Community',
    roleLabel: 'Server',
    npcName: 'Taylor',
    iconType: 'utensils',
  },
  {
    id: 'conflict-conversation',
    title: 'Conflict Conversation',
    description: 'Disagree with a friend or coworker while staying regulated.',
    status: 'coming-soon',
    categoryTag: 'Interpersonal Regulation',
    roleLabel: 'Peer / Colleague',
    npcName: 'Morgan',
    iconType: 'shield-alert',
  },
  {
    id: 'doctors-appointment',
    title: "Doctor's Appointment",
    description: 'Describe symptoms and ask questions in a medical setting.',
    status: 'coming-soon',
    categoryTag: 'Healthcare Advocacy',
    roleLabel: 'Clinician',
    npcName: 'Dr. Patel',
    iconType: 'stethoscope',
  },
  {
    id: 'phone-call',
    title: 'Making a Phone Call',
    description: 'Schedule or reschedule something over the phone without visual cues.',
    status: 'coming-soon',
    categoryTag: 'Auditory & Executive',
    roleLabel: 'Receptionist',
    npcName: 'Sam',
    iconType: 'phone-call',
  },
  {
    id: 'store-help',
    title: 'Asking for Help in a Store',
    description: 'Find an item and ask a stranger for assistance.',
    status: 'coming-soon',
    categoryTag: 'Public Navigation',
    roleLabel: 'Store Associate',
    npcName: 'Jordan',
    iconType: 'shopping-bag',
  },
  {
    id: 'small-talk',
    title: 'Small Talk / Break Room',
    description: 'Navigate casual conversation with coworkers during a break.',
    status: 'coming-soon',
    categoryTag: 'Casual Socialization',
    roleLabel: 'Coworker',
    npcName: 'Chris',
    iconType: 'coffee',
  },
];

export const ALL_SCENARIOS_DATA: Record<ScenarioId, Record<string, DifficultyScenarioExtended>> = {
  'job-interview': {
    easy: {
      difficulty: 'easy',
      difficultyLabel: 'Easy',
      dotColor: '#22c55e',
      badgeColor: 'text-[#22c55e]',
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
      dotColor: '#a26f4a',
      badgeColor: 'text-[#a26f4a]',
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
      dotColor: '#7f3e3b',
      badgeColor: 'text-[#7f3e3b]',
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
  },
  'restaurant-ordering': {
    easy: {
      difficulty: 'easy',
      difficultyLabel: 'Easy',
      dotColor: '#22c55e',
      badgeColor: 'text-[#22c55e]',
      npcTone: 'Patient & Welcoming (Menu Suggestions)',
      npcToneDescription: 'Server is patient, friendly, and happy to offer menu suggestions with zero rush.',
      interviewerAvatarMood: 'warm',
      scenarioTitle: 'Guided Menu Navigation & Ordering',
      contextDescription: 'Low sensory demand • Server gives patient guidance and walks through dietary options comfortably.',
      question: 'Hi there! Welcome in. Take all the time you need with the menu—I am happy to walk through our specials or answer any questions whenever you are ready. What can I get started for you today?',
      options: [
        {
          id: 'rest-easy-opt-1',
          label: 'Option A: Ask for a Recommendation & Dietary Check',
          text: 'Thank you! Could you tell me what you recommend for a light dish? Also, could you clarify if the pasta sauce has any dairy or nuts in it?',
          npcReply: 'Of course! Our lemon herb roasted chicken is light and delightful. And for the pasta, our marinara is 100% dairy and nut-free. I will gladly make a special note for the kitchen!',
          clinicianNotes: 'Clear self-advocacy and dietary clarification stated calmly without rushing.',
          appropriateScore: 10,
          skillsDemonstrated: ['Dietary Self-Advocacy', 'Polite Inquiry', 'Sensory Comfort']
        },
        {
          id: 'rest-easy-opt-2',
          label: 'Option B: Request Extra Processing Time for Menu Selection',
          text: 'Everything looks wonderful! May I have about two more minutes to look over the menu before placing our order?',
          npcReply: 'Take all the time you need! No rush at all. I will bring over fresh ice waters and check back in a couple of minutes.',
          clinicianNotes: 'Excellent boundary-setting and executive pacing. Successfully reduced sensory and decision pressure.',
          appropriateScore: 10,
          skillsDemonstrated: ['Executive Pacing', 'Boundary Setting', 'Stress Prevention']
        },
        {
          id: 'rest-easy-opt-3',
          label: 'Option C: Direct Structured Order with Polite Modifiers',
          text: 'I would like to order the grilled vegetable panini with a side salad and sparkling water with lemon, please.',
          npcReply: 'Sounds delicious! Grilled vegetable panini, side garden salad, and sparkling water with lemon. I will get that placed for you right away.',
          clinicianNotes: 'Crisp, polite order syntax with clear structured sequencing.',
          appropriateScore: 10,
          skillsDemonstrated: ['Structured Ordering', 'Polite Communication', 'Clear Syntax']
        }
      ]
    },
    moderate: {
      difficulty: 'moderate',
      difficultyLabel: 'Moderate',
      dotColor: '#a26f4a',
      badgeColor: 'text-[#a26f4a]',
      npcTone: 'Neutral & Efficient (Ambient Noise)',
      npcToneDescription: 'Background noise in café; server is professional, neutral, and direct.',
      interviewerAvatarMood: 'neutral',
      scenarioTitle: 'Standard Dining Tempo & Noise Filtering',
      contextDescription: 'Lively dining room tempo • Background ambient chatter with neutral, direct server communication.',
      question: 'Hi, thanks for your patience while we wiped the table down. The café is a bit lively right now. Are you ready to order, or do you need another minute?',
      options: [
        {
          id: 'rest-mod-opt-1',
          label: 'Option A: Efficient Standard Order Under Ambient Chatter',
          text: 'We are ready, thank you. I will have the turkey avocado club on sourdough with herbal iced tea.',
          npcReply: 'Great. Turkey avocado club on sourdough with iced tea. Coming right up for you.',
          clinicianNotes: 'Effective communication despite ambient auditory distractions and lively restaurant tempo.',
          appropriateScore: 9,
          skillsDemonstrated: ['Auditory Filtering', 'Direct Ordering', 'Social Efficiency']
        },
        {
          id: 'rest-mod-opt-2',
          label: 'Option B: Requesting Clarification in a Loud Setting',
          text: 'I could not hear the daily soup special over the room noise—could you repeat the soup option one more time, please?',
          npcReply: 'Sure thing—it is our roasted tomato bisque with fresh basil. Would you like a cup or a bowl?',
          clinicianNotes: 'Assertive self-advocacy to overcome auditory masking in a noisy public space.',
          appropriateScore: 10,
          skillsDemonstrated: ['Assertive Clarification', 'Auditory Advocacy', 'Active Listening']
        },
        {
          id: 'rest-mod-opt-3',
          label: 'Option C: Substitution Request with Clear Confirmation',
          text: 'May I substitute roasted potatoes instead of french fries with the veggie burger, please?',
          npcReply: 'Roasted potatoes instead of fries—not a problem at all. That will be ready in about 12 minutes.',
          clinicianNotes: 'Polite, direct modification request with clear verbal confirmation.',
          appropriateScore: 9,
          skillsDemonstrated: ['Polite Modification', 'Concise Syntax', 'Social Composure']
        }
      ]
    },
    hard: {
      difficulty: 'hard',
      difficultyLabel: 'Hard',
      dotColor: '#7f3e3b',
      badgeColor: 'text-[#7f3e3b]',
      npcTone: 'Rushed Follow-Up & Order Mix-Up',
      npcToneDescription: 'Server is in a rush due to high volume, and a ticket mix-up requires quick polite resolution.',
      interviewerAvatarMood: 'intense',
      scenarioTitle: 'Order Mix-Up & High-Pace Service Recovery',
      contextDescription: 'High pressure • Order mix-up requires composure, polite correction, and quick verification under rushed service.',
      question: 'Sorry for the rush—we have a line out the door and your ticket got mixed up in the kitchen. Did you order the spicy shrimp bowl or the tofu noodle salad? We need to verify immediately so I can refire it.',
      options: [
        {
          id: 'rest-hard-opt-1',
          label: 'Option A: Politely Point Out the Order Mistake & Reaffirm',
          text: 'No problem at all, I understand things get busy. I originally ordered the mild vegetable noodle bowl without spicy peppers. Here is the receipt ticket to help verify.',
          npcReply: '[Server pauses, exhales, and checks ticket] Thank you for your patience and for showing me the ticket. I apologize for the mix-up—I will personally prioritize your vegetable noodle bowl right away.',
          clinicianNotes: 'Outstanding distress tolerance and de-escalation. Addressed service error calmly with factual evidence without becoming overwhelmed.',
          appropriateScore: 10,
          skillsDemonstrated: ['Distress Tolerance', 'De-escalation', 'Factual Problem Solving']
        },
        {
          id: 'rest-hard-opt-2',
          label: 'Option B: Request a Calm Pause to Clarify the Mix-Up',
          text: 'Let us take a quick second so we do not mix it up again. I ordered the grilled chicken wrap with dressing on the side. Could you please double-check that with the kitchen?',
          npcReply: 'You are right, let me slow down for a second. Grilled chicken wrap, dressing on the side. I am updating your ticket in the kitchen right now.',
          clinicianNotes: 'Exceptional executive control. Regulated the fast interaction tempo and restored clear communication.',
          appropriateScore: 10,
          skillsDemonstrated: ['Tempo Regulation', 'Executive Control', 'Assertive Composure']
        },
        {
          id: 'rest-hard-opt-3',
          label: 'Option C: Flexible Alternative Selection Under Time Pressure',
          text: 'If the kitchen is backed up on my original dish, I am happy to take the soup and salad combo if that is faster to prepare.',
          npcReply: 'That is very kind of you. The soup and salad can be out in under 3 minutes. I will discount your meal for the inconvenience.',
          clinicianNotes: 'High cognitive flexibility and adaptive problem-solving in a public retail scenario.',
          appropriateScore: 9,
          skillsDemonstrated: ['Cognitive Flexibility', 'Empathetic Problem Solving', 'Pacing']
        }
      ]
    }
  },
  'conflict-conversation': {} as any,
  'doctors-appointment': {} as any,
  'phone-call': {} as any,
  'store-help': {} as any,
  'small-talk': {} as any,
};

export const INTERVIEW_SCENARIOS = ALL_SCENARIOS_DATA['job-interview'];

export function getScenarioData(scenarioId: ScenarioId, difficulty: string): DifficultyScenarioExtended {
  const scenarioGroup = ALL_SCENARIOS_DATA[scenarioId] || ALL_SCENARIOS_DATA['job-interview'];
  return scenarioGroup[difficulty] || scenarioGroup['easy'];
}
