// Helper to generate and download a self-contained offline single HTML backup
export function downloadOfflineHtml() {
  const offlineHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NeuroPractice VR - Standalone Offline Backup</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Calibri, Roboto, sans-serif; }
    body { background-color: #022F33; color: #F8FAFC; min-height: 100vh; display: flex; flex-direction: column; }
    header { background: #032427; border-bottom: 1px solid #028090; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.25rem; color: #02C39A; }
    .nav-tabs { display: flex; gap: 8px; }
    .nav-tab { background: #04383D; border: 1px solid #00A896; color: #CCFBF1; padding: 6px 14px; border-radius: 9999px; cursor: pointer; font-size: 0.85rem; font-weight: 600; }
    .nav-tab.active { background: #02C39A; color: #022F33; font-weight: 700; }
    main { flex: 1; padding: 24px; max-width: 1100px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; justify-content: center; }
    .screen { display: none; }
    .screen.active { display: block; }
    .card { background: #FFFFFF; color: #0F172A; border-radius: 20px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    .btn-primary { background: #02C39A; color: #022F33; font-weight: 700; padding: 12px 28px; border-radius: 9999px; border: none; cursor: pointer; font-size: 1rem; transition: transform 0.15s, background 0.15s; }
    .btn-primary:hover { background: #00A896; color: #FFFFFF; transform: translateY(-1px); }
    .btn-outline { background: #04383E; color: #99F6E4; border: 1.5px solid #028090; padding: 10px 20px; border-radius: 12px; cursor: pointer; font-weight: 600; margin: 6px 0; text-align: left; width: 100%; font-size: 0.95rem; }
    .btn-outline:hover { background: #028090; color: #FFFFFF; }
    .slider-container { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
    input[type=range] { accent-color: #02C39A; flex: 1; }
    .svg-frame { border-radius: 16px; overflow: hidden; background: #011E21; box-shadow: 0 8px 24px rgba(0,0,0,0.4); margin-bottom: 16px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <header>
    <div class="brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#02C39A" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      NeuroPractice VR (Offline Backup)
    </div>
    <div class="nav-tabs">
      <button class="nav-tab active" onclick="showScreen('title')">1. Title</button>
      <button class="nav-tab" onclick="showScreen('waiting')">2. Waiting Room</button>
      <button class="nav-tab" onclick="showScreen('interview')">3. VR Interview</button>
      <button class="nav-tab" onclick="showScreen('dashboard')">4. Clinician View</button>
    </div>
  </header>

  <main>
    <!-- SCREEN 1: TITLE -->
    <div id="screen-title" class="screen active" style="text-align: center; max-width: 650px; margin: 0 auto;">
      <div style="background: rgba(2,195,154,0.1); border: 1px solid #00A896; display: inline-block; padding: 6px 16px; border-radius: 9999px; color: #5EEAD4; font-size: 0.85rem; font-weight: 600; margin-bottom: 20px;">
        Hackathon Interactive Pitch Prototype
      </div>
      <h1 style="font-size: 2.75rem; color: #CCFBF1; margin-bottom: 14px; font-weight: 800; letter-spacing: -0.5px;">NeuroPractice VR</h1>
      <p style="font-size: 1.2rem; color: #99F6E4; line-height: 1.6; margin-bottom: 30px;">
        Immersive social-skills rehearsal for autistic teens & adults
      </p>
      <button class="btn-primary" onclick="showScreen('waiting')">Start Demo &rarr;</button>
    </div>

    <!-- SCREEN 2: WAITING ROOM -->
    <div id="screen-waiting" class="screen">
      <div class="svg-frame" id="lobby-viewport" style="max-height: 420px; transition: filter 0.2s;">
        <svg viewBox="0 0 800 450" style="width: 100%; display: block;">
          <rect width="800" height="340" fill="#033F45"/>
          <polygon points="0,340 800,340 800,450 0,450" fill="#0A4C52"/>
          <rect x="80" y="60" width="200" height="220" rx="16" fill="#93C5FD" stroke="#028090" stroke-width="4"/>
          <ellipse cx="140" cy="245" rx="70" ry="35" fill="#10B981"/>
          <circle cx="180" cy="115" r="22" fill="#FEF08A"/>
          <!-- Plant -->
          <polygon points="310,380 345,380 340,420 315,420" fill="#D97706"/>
          <circle cx="330" cy="320" r="30" fill="#10B981"/>
          <!-- Couch & Avatar -->
          <rect x="420" y="250" width="260" height="110" rx="16" fill="#0C4A50" stroke="#00A896" stroke-width="2"/>
          <rect x="410" y="320" width="280" height="40" rx="10" fill="#00A896"/>
          <circle cx="480" cy="210" r="24" fill="#99F6E4"/>
          <path d="M 455 285 C 455 250, 465 240, 480 240 C 495 240, 505 250, 505 285 Z" fill="#0D9488"/>
        </svg>
      </div>
      <div class="card" style="background: #032E33; border: 1px solid #00A896; color: #E2E8F0; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px;">
        <div style="flex: 1; min-width: 200px;">
          <label style="font-size: 0.85rem; font-weight: 600; color: #5EEAD4;">Scene Brightness</label>
          <div class="slider-container">
            <input type="range" min="30" max="100" value="100" oninput="document.getElementById('lobby-viewport').style.filter = 'brightness(' + (this.value/100) + ')'">
          </div>
        </div>
        <div style="flex: 1; min-width: 200px;">
          <label style="font-size: 0.85rem; font-weight: 600; color: #5EEAD4;">Sensory Audio Comfort</label>
          <div class="slider-container">
            <input type="range" min="0" max="100" value="40">
          </div>
        </div>
        <button class="btn-primary" onclick="showScreen('interview')">Begin When Ready &rarr;</button>
      </div>
    </div>

    <!-- SCREEN 3: INTERVIEW -->
    <div id="screen-interview" class="screen">
      <div class="svg-frame" style="max-height: 280px;">
        <svg viewBox="0 0 800 360" style="width: 100%; display: block;">
          <rect width="800" height="280" fill="#04383E"/>
          <polygon points="0,280 800,280 800,360 0,360" fill="#021C1E"/>
          <!-- NPC Avatar -->
          <circle cx="400" cy="110" r="32" fill="#CBD5E1"/>
          <path d="M 355 220 C 355 160, 370 148, 400 148 C 430 148, 445 160, 445 220 Z" fill="#334155"/>
          <!-- Desk -->
          <polygon points="120,230 680,230 720,340 80,340" fill="#0F766E"/>
        </svg>
      </div>

      <div class="card" style="margin-bottom: 16px; border: 2px solid #02C39A;" id="interviewer-bubble-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #028090; text-transform: uppercase;" id="prompt-header-label">
            <span id="prompt-dot" style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #02C39A; margin-right: 6px;"></span>
            <span id="prompt-title">Interviewer Prompt (EASY)</span>
          </div>
          <div id="tone-badge" style="font-size: 0.75rem; background: #F1F5F9; padding: 2px 8px; border-radius: 9999px; font-weight: 700; color: #02C39A;">
            Tone: Warm & Encouraging
          </div>
        </div>
        <div id="npc-speech" style="font-size: 1.1rem; font-weight: 600; color: #0F172A; line-height: 1.5;">
          "Hi there! It is wonderful to meet you today. Please take all the time you need—there are no trick questions here. Could you share a time you encountered a challenging problem at work or school, and how you worked through it step by step?"
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
        <div id="active-diff-pill" style="display: flex; align-items: center; gap: 6px; background: rgba(2,195,154,0.15); border: 1px solid #02C39A; padding: 4px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; color: #02C39A;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #02C39A;"></span>
          <span id="active-diff-text">Active: Easy (Warm & Supportive)</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="nav-tab active" id="diff-easy" onclick="setDiff('easy')" style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #02C39A; display: inline-block;"></span> Easy
          </button>
          <button class="nav-tab" id="diff-mod" onclick="setDiff('moderate')" style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #028090; display: inline-block;"></span> Moderate
          </button>
          <button class="nav-tab" id="diff-hard" onclick="setDiff('hard')" style="display: flex; align-items: center; gap: 6px;">
            <span style="width: 8px; height: 8px; border-radius: 50%; background: #F4A261; display: inline-block;"></span> Hard
          </button>
        </div>
      </div>

      <div id="options-container">
        <!-- Rendered via JS -->
      </div>

      <div id="continue-section" style="display: none; margin-top: 16px; text-align: right;">
        <button class="btn-primary" onclick="showScreen('dashboard')">Continue to Therapist View &rarr;</button>
      </div>
    </div>

    <!-- SCREEN 4: DASHBOARD -->
    <div id="screen-dashboard" class="screen">
      <div class="grid-2">
        <div>
          <div class="card" style="background: #032427; border: 1px solid #00A896; color: #E2E8F0; margin-bottom: 16px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #02C39A; margin-bottom: 8px;">Mirrored VR Session Thumbnail</div>
            <div class="svg-frame" style="margin-bottom: 10px; max-height: 160px;">
              <svg viewBox="0 0 800 360" style="width: 100%; display: block;">
                <rect width="800" height="280" fill="#04383E"/>
                <circle cx="400" cy="110" r="32" fill="#CBD5E1"/>
                <path d="M 355 220 C 355 160, 370 148, 400 148 C 430 148, 445 160, 445 220 Z" fill="#334155"/>
                <polygon points="120,230 680,230 720,340 80,340" fill="#0F766E"/>
              </svg>
            </div>
            <div style="font-size: 0.85rem; color: #99F6E4;">Live Status: <span style="color: #02C39A; font-weight: 700;">Active Synced VR Stream</span></div>
          </div>

          <div class="card" style="margin-bottom: 16px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #028090; margin-bottom: 8px;">Live Transcript</div>
            <p style="font-size: 0.95rem; color: #334155; margin-bottom: 6px;"><strong>Interviewer:</strong> Tell me about a time you faced a difficult problem...</p>
            <p id="transcript-user" style="font-size: 0.95rem; color: #0F766E; margin-bottom: 6px;"><strong>Participant:</strong> [Selected response registered]</p>
            <p id="transcript-npc" style="font-size: 0.95rem; color: #028090;"><strong>NPC Reply:</strong> [Feedback provided]</p>
          </div>
        </div>

        <div>
          <div class="card" style="background: #032427; border: 1px solid #00A896; color: #E2E8F0; margin-bottom: 16px;">
            <div style="font-size: 0.85rem; font-weight: 700; color: #02C39A; margin-bottom: 10px;">Clinician In-Headset Controls</div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <button class="nav-tab" onclick="alert('Session Paused for Co-Regulation')">Pause</button>
              <button class="nav-tab" onclick="alert('Visual Hint Cued in Headset')">Cue Hint</button>
              <button class="nav-tab" onclick="alert('Sensory Intensity Eased Off')">Ease Off</button>
              <button class="nav-tab" onclick="alert('Session Ended and Logged')">End Session</button>
            </div>
          </div>

          <div class="card">
            <div style="font-size: 0.85rem; font-weight: 700; color: #028090; margin-bottom: 8px;">Appropriate Responses Per Session (5 Mock Runs)</div>
            <canvas id="offlineChart" height="160"></canvas>
          </div>
        </div>
      </div>
    </div>
  </main>

  <script>
    const scenarios = {
      easy: {
        dot: '#02C39A',
        label: 'Easy (Warm & Supportive)',
        tone: 'Warm & Encouraging',
        question: 'Hi there! It is wonderful to meet you today. Please take all the time you need—there are no trick questions here. Could you share a time you encountered a challenging problem at work or school, and how you worked through it step by step?',
        options: [
          {
            label: 'Option A: Step-by-Step Problem Solving (Supportive)',
            text: 'During a collaborative project, our dataset had several missing entries. I felt a bit uncertain at first, but I took a calm breath, created a supportive shared checklist with my partner, and we gently worked through each item together step-by-step to finish comfortably ahead of the deadline.',
            npcReply: 'That is wonderful to hear! Taking a calm breath and supporting your teammate with an organized checklist shows such thoughtful collaboration and methodical problem-solving.'
          },
          {
            label: 'Option B: Proactive & Self-Aware Help Seeking (Longer)',
            text: 'When I was learning our new software tool, I ran into an unexpected error. Instead of feeling overwhelmed, I took a moment to write down exactly what I had tried so far, and then reached out to a senior peer who kindly guided me through the troubleshooting steps.',
            npcReply: 'I really appreciate your self-awareness! Documenting your steps before asking for guidance is so helpful and creates a supportive environment for everyone.'
          },
          {
            label: 'Option C: Gentle Early Clarification (Supportive)',
            text: 'I received initial project guidelines that felt a bit ambiguous. To ensure our whole group felt confident and avoid any last-minute stress, I drafted three gentle clarifying questions and scheduled a quick 5-minute check-in with our supervisor.',
            npcReply: 'That is fantastic! Asking clarifying questions early is one of the best ways to keep projects low-stress and make sure everyone is aligned.'
          }
        ]
      },
      moderate: {
        dot: '#028090',
        label: 'Moderate (Neutral / Shorter)',
        tone: 'Neutral & Professional',
        question: 'Please describe a challenging problem you encountered in a work or academic setting, and the specific approach you used to resolve it.',
        options: [
          {
            label: 'Option A: Objective Criteria Testing',
            text: 'Two teammates disagreed on the deck format. I tested both options on a sample slide to decide using objective criteria.',
            npcReply: 'Understood. Using objective criteria to resolve team indecision is an effective and standard workplace practice.'
          },
          {
            label: 'Option B: Priority Triage Under Scope Shift',
            text: 'When our deadline moved up three days, I reprioritized core deliverables, communicated trade-offs, and shipped on time.',
            npcReply: 'Setting clear expectation boundaries under shifting deadlines is essential for predictable project delivery.'
          },
          {
            label: 'Option C: Structured Hybrid Communication',
            text: 'A colleague preferred verbal syncs while I preferred written briefs. We agreed to a 5-minute kickoff followed by bulleted notes.',
            npcReply: 'A balanced synchronous and asynchronous agreement effectively accommodates different operational preferences.'
          }
        ]
      },
      hard: {
        dot: '#F4A261',
        label: 'Hard (Rapid Follow-Up)',
        tone: 'Rapid Follow-Up & Interruption',
        question: 'We are on a tight schedule, so let me jump straight to it: during a critical project breakdown where deadlines slipped, why did the failure happen on your watch, and what immediate action did you take on the spot?',
        options: [
          {
            label: 'Option A: Ask for a Moment to Think (Self-Regulation)',
            text: 'May I take a brief moment to collect my thoughts? I want to ensure I give you an accurate and structured breakdown of what happened.',
            npcReply: '[Interviewer pauses and nods] Of course. Take your time. Being able to pause and regulate before answering under rapid pressure demonstrates strong executive maturity.'
          },
          {
            label: 'Option B: Direct Error Ownership & Rapid Fix',
            text: 'When a budget anomaly was flagged two hours before submission, I immediately informed the lead, isolated the spreadsheet formula flaw, and provided a corrected sheet.',
            npcReply: 'Good. Taking immediate ownership without deflection is what isolates and resolves critical path roadblocks quickly.'
          },
          {
            label: 'Option C: Rapid Data-Backed Boundary Defense',
            text: 'When sprint scope surged beyond team capacity, I rapidly pulled velocity metrics to illustrate risk and negotiated a phased release.',
            npcReply: 'Clear data cuts through ambiguity fast. Let us proceed to the next item.'
          }
        ]
      }
    };

    let currentDiff = 'easy';

    function showScreen(name) {
      document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
      document.getElementById('screen-' + name).classList.add('active');
      if (name === 'dashboard') { initChart(); }
    }

    function renderOptions(diff) {
      const data = scenarios[diff];
      document.getElementById('npc-speech').innerHTML = '"' + data.question + '"';
      document.getElementById('prompt-title').innerText = 'Interviewer Prompt (' + diff.toUpperCase() + ')';
      document.getElementById('prompt-dot').style.background = data.dot;
      document.getElementById('interviewer-bubble-card').style.borderColor = data.dot;
      document.getElementById('tone-badge').innerText = 'Tone: ' + data.tone;
      document.getElementById('tone-badge').style.color = data.dot;
      
      const pill = document.getElementById('active-diff-pill');
      pill.style.borderColor = data.dot;
      pill.style.color = data.dot;
      pill.querySelector('span').style.background = data.dot;
      document.getElementById('active-diff-text').innerText = 'Active: ' + data.label;

      const container = document.getElementById('options-container');
      container.innerHTML = '';
      data.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn-outline';
        btn.innerHTML = '<strong>' + opt.label + ':</strong><br/>"' + opt.text + '"';
        btn.onclick = () => selectAnswer(opt.label, opt.npcReply);
        container.appendChild(btn);
      });
    }

    function setDiff(diff) {
      currentDiff = diff;
      document.getElementById('diff-easy').classList.remove('active');
      document.getElementById('diff-mod').classList.remove('active');
      document.getElementById('diff-hard').classList.remove('active');
      document.getElementById('diff-' + (diff === 'easy' ? 'easy' : diff === 'moderate' ? 'mod' : 'hard')).classList.add('active');
      renderOptions(diff);
      document.getElementById('continue-section').style.display = 'none';
    }

    function selectAnswer(label, npcReply) {
      document.getElementById('npc-speech').innerHTML = '<strong>NPC Follow-up:</strong> ' + npcReply;
      document.getElementById('transcript-user').innerHTML = '<strong>Participant:</strong> ' + label;
      document.getElementById('transcript-npc').innerHTML = '<strong>NPC Reply:</strong> ' + npcReply;
      document.getElementById('continue-section').style.display = 'block';
    }

    renderOptions('easy');

    let chartInitialized = false;
    function initChart() {
      if (chartInitialized) return;
      chartInitialized = true;
      const ctx = document.getElementById('offlineChart');
      if (!ctx || typeof Chart === 'undefined') return;
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Session 5'],
          datasets: [{
            label: 'Appropriate Responses',
            data: [3, 5, 6, 8, 9],
            backgroundColor: '#028090',
            borderColor: '#00A896',
            borderWidth: 1.5,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          scales: { y: { beginAtZero: true, max: 10 } }
        }
      });
    }
  </script>
</body>
</html>`;

  const blob = new Blob([offlineHtmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'NeuroPractice-VR-SinglePage-Demo.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
