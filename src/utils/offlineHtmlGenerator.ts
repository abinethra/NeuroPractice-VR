// Helper to generate and download a self-contained offline single HTML backup
export function downloadOfflineHtml() {
  const offlineHtmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>NeuroPractice VR - Standalone Offline Pitch Prototype</title>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Calibri, Roboto, sans-serif; }
    body { background-color: #022F33; color: #F8FAFC; min-height: 100vh; display: flex; flex-direction: column; }
    header { background: #032427; border-bottom: 1px solid #028090; padding: 12px 24px; display: flex; justify-content: space-between; align-items: center; }
    .brand { display: flex; align-items: center; gap: 10px; font-weight: 700; font-size: 1.2rem; color: #02C39A; }
    .nav-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
    .nav-tab { background: #04383D; border: 1px solid #00A896; color: #CCFBF1; padding: 5px 12px; border-radius: 9999px; cursor: pointer; font-size: 0.8rem; font-weight: 600; }
    .nav-tab.active { background: #02C39A; color: #022F33; font-weight: 700; }
    main { flex: 1; padding: 20px; max-width: 1100px; margin: 0 auto; width: 100%; display: flex; flex-direction: column; justify-content: center; }
    .screen { display: none; }
    .screen.active { display: block; }
    .card { background: #FFFFFF; color: #0F172A; border-radius: 20px; padding: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.3); }
    .btn-primary { background: #02C39A; color: #022F33; font-weight: 700; padding: 10px 24px; border-radius: 9999px; border: none; cursor: pointer; font-size: 0.95rem; transition: transform 0.15s, background 0.15s; }
    .btn-primary:hover { background: #00A896; color: #FFFFFF; transform: translateY(-1px); }
    .btn-outline { background: #04383E; color: #99F6E4; border: 1.5px solid #028090; padding: 10px 16px; border-radius: 12px; cursor: pointer; font-weight: 600; margin: 6px 0; text-align: left; width: 100%; font-size: 0.9rem; }
    .btn-outline:hover { background: #028090; color: #FFFFFF; }
    .slider-container { display: flex; align-items: center; gap: 12px; margin-top: 10px; }
    input[type=range] { accent-color: #02C39A; flex: 1; }
    .svg-frame { border-radius: 16px; overflow: hidden; background: #011E21; box-shadow: 0 8px 24px rgba(0,0,0,0.4); margin-bottom: 16px; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .grid-3 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .grid-4 { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
    .scenario-card { background: #011C1E; border: 2px solid #028090; border-radius: 16px; padding: 16px; cursor: pointer; transition: all 0.2s; position: relative; }
    .scenario-card:hover { transform: translateY(-2px); border-color: #02C39A; }
    .scenario-card.selected { border-color: #02C39A; background: #022F33; box-shadow: 0 0 16px rgba(2,195,154,0.3); }
    .scenario-card.disabled { opacity: 0.65; cursor: not-allowed; }
    .badge { font-size: 0.7rem; font-weight: 700; padding: 3px 8px; border-radius: 9999px; text-transform: uppercase; }
    .badge-playable { background: rgba(2,195,154,0.2); color: #5EEAD4; border: 1px solid #02C39A; }
    .badge-soon { background: #032A2E; color: #94A3B8; border: 1px solid #475569; }
    #toast { position: fixed; bottom: 24px; right: 24px; background: #011C1E; border: 2px solid #028090; color: #CCFBF1; padding: 12px 20px; border-radius: 12px; display: none; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 9999; }
    @media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div id="toast"></div>
  <header>
    <div class="brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#02C39A" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      NeuroPractice VR
    </div>
    <div class="nav-tabs">
      <button class="nav-tab active" id="tab-intake" onclick="showScreen('intake')">1. Intake</button>
      <button class="nav-tab" id="tab-scenarios" onclick="showScreen('scenarios')">2. Scenarios</button>
      <button class="nav-tab" id="tab-waiting" onclick="showScreen('waiting')">3. Waiting Room</button>
      <button class="nav-tab" id="tab-interview" onclick="showScreen('interview')">4. VR Rehearsal</button>
      <button class="nav-tab" id="tab-dashboard" onclick="showScreen('dashboard')">5. Clinician Hub</button>
      <button class="nav-tab" id="tab-debrief" onclick="showScreen('debrief')">6. Debrief</button>
    </div>
  </header>

  <main>
    <!-- SCREEN 1: INTAKE SETUP -->
    <div id="screen-intake" class="screen active">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 20px auto;">
        <div style="background: rgba(2,195,154,0.1); border: 1px solid #00A896; display: inline-block; padding: 4px 14px; border-radius: 9999px; color: #5EEAD4; font-size: 0.8rem; font-weight: 700; margin-bottom: 12px;">
          Screen 1 of 6 &bull; Clinical Calibration
        </div>
        <h1 style="font-size: 2.2rem; color: #CCFBF1; margin-bottom: 8px; font-weight: 800;">Therapist Intake Setup</h1>
        <p style="font-size: 1rem; color: #99F6E4; line-height: 1.5;">
          Set participant behavioral goals and starting difficulty before choosing a scenario.
        </p>
      </div>

      <div class="card" style="background: #011C1E; border: 2px solid #028090; color: #E2E8F0; max-width: 680px; margin: 0 auto;">
        <div style="margin-bottom: 16px;">
          <label style="font-size: 0.8rem; font-weight: 700; color: #5EEAD4; text-transform: uppercase;">Participant ID</label>
          <input type="text" id="intake-name" value="Rahul K." style="width: 100%; padding: 10px; margin-top: 4px; border-radius: 10px; background: #032A2E; border: 1px solid #028090; color: white;">
        </div>

        <div style="margin-bottom: 16px;">
          <label style="font-size: 0.8rem; font-weight: 700; color: #5EEAD4; text-transform: uppercase;">Primary Session Goal</label>
          <select id="intake-goal" style="width: 100%; padding: 10px; margin-top: 4px; border-radius: 10px; background: #032A2E; border: 1px solid #028090; color: white;">
            <option value="Build confidence answering behavioral questions">Build confidence answering behavioral questions</option>
            <option value="Practice asking for a moment to think under pressure">Practice asking for a moment to think under pressure</option>
            <option value="Master structured communication syntax">Master structured communication syntax</option>
            <option value="Navigate unexpected interruptions with composure">Navigate unexpected interruptions with composure</option>
          </select>
        </div>

        <div style="margin-bottom: 20px;">
          <label style="font-size: 0.8rem; font-weight: 700; color: #5EEAD4; text-transform: uppercase;">Starting Difficulty Tier</label>
          <div style="display: flex; gap: 8px; margin-top: 8px;">
            <button type="button" class="nav-tab active" id="intake-diff-easy" onclick="setIntakeDiff('easy')">● Easy</button>
            <button type="button" class="nav-tab" id="intake-diff-mod" onclick="setIntakeDiff('moderate')">● Moderate</button>
            <button type="button" class="nav-tab" id="intake-diff-hard" onclick="setIntakeDiff('hard')">● Hard</button>
          </div>
        </div>

        <div style="text-align: right; border-top: 1px solid #028090; padding-top: 16px;">
          <button class="btn-primary" onclick="showScreen('scenarios')">Next: Choose Scenario &rarr;</button>
        </div>
      </div>
    </div>

    <!-- SCREEN 2: SCENARIO SELECT -->
    <div id="screen-scenarios" class="screen">
      <div style="text-align: center; max-width: 750px; margin: 0 auto 20px auto;">
        <div style="background: rgba(2,195,154,0.1); border: 1px solid #00A896; display: inline-block; padding: 4px 14px; border-radius: 9999px; color: #5EEAD4; font-size: 0.8rem; font-weight: 700; margin-bottom: 8px;">
          Screen 2 of 6 &bull; Scenario Catalog
        </div>
        <h1 style="font-size: 2rem; color: #CCFBF1; margin-bottom: 6px; font-weight: 800;">Choose a Rehearsal Scenario</h1>
        <p style="font-size: 0.95rem; color: #99F6E4;">Select a simulation module tailored to your session goal.</p>
      </div>

      <div class="grid-3" id="scenarios-grid">
        <!-- 1. Job Interview (Playable) -->
        <div class="scenario-card selected" id="sc-card-job" onclick="selectScenario('job-interview')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.5rem;">💼</span>
            <span class="badge badge-playable">● Playable</span>
          </div>
          <h3 style="color:white; font-size:1.1rem; margin-bottom:4px;">1. Job Interview</h3>
          <p style="color:#99F6E4; font-size:0.85rem; line-height:1.4;">Answer unexpected questions, read tone, recover from mistakes.</p>
        </div>

        <!-- 2. Restaurant Ordering (Playable) -->
        <div class="scenario-card" id="sc-card-rest" onclick="selectScenario('restaurant-ordering')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.5rem;">🍽️</span>
            <span class="badge badge-playable">● Playable</span>
          </div>
          <h3 style="color:white; font-size:1.1rem; margin-bottom:4px;">2. Restaurant Ordering</h3>
          <p style="color:#99F6E4; font-size:0.85rem; line-height:1.4;">Navigate a menu, make small talk, handle a mix-up, and pay.</p>
        </div>

        <!-- 3. Conflict Conversation (Coming Soon) -->
        <div class="scenario-card disabled" onclick="showToast('Conflict Conversation is in clinical development. Available in v2.5!')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.5rem;">🤝</span>
            <span class="badge badge-soon">Coming Soon</span>
          </div>
          <h3 style="color:#94A3B8; font-size:1.1rem; margin-bottom:4px;">3. Conflict Conversation</h3>
          <p style="color:#64748B; font-size:0.85rem; line-height:1.4;">Disagree with a friend or coworker while staying regulated.</p>
        </div>

        <!-- 4. Doctor's Appointment (Coming Soon) -->
        <div class="scenario-card disabled" onclick="showToast('Doctor Appointment is in clinical development. Available in v2.5!')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.5rem;">🩺</span>
            <span class="badge badge-soon">Coming Soon</span>
          </div>
          <h3 style="color:#94A3B8; font-size:1.1rem; margin-bottom:4px;">4. Doctor's Appointment</h3>
          <p style="color:#64748B; font-size:0.85rem; line-height:1.4;">Describe symptoms and ask questions in a medical setting.</p>
        </div>

        <!-- 5. Making a Phone Call (Coming Soon) -->
        <div class="scenario-card disabled" onclick="showToast('Making a Phone Call is in clinical development. Available in v2.5!')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.5rem;">📞</span>
            <span class="badge badge-soon">Coming Soon</span>
          </div>
          <h3 style="color:#94A3B8; font-size:1.1rem; margin-bottom:4px;">5. Making a Phone Call</h3>
          <p style="color:#64748B; font-size:0.85rem; line-height:1.4;">Schedule or reschedule something over the phone without visual cues.</p>
        </div>

        <!-- 6. Asking for Help in a Store (Coming Soon) -->
        <div class="scenario-card disabled" onclick="showToast('Asking for Help in a Store is in clinical development. Available in v2.5!')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.5rem;">🛒</span>
            <span class="badge badge-soon">Coming Soon</span>
          </div>
          <h3 style="color:#94A3B8; font-size:1.1rem; margin-bottom:4px;">6. Asking for Help in a Store</h3>
          <p style="color:#64748B; font-size:0.85rem; line-height:1.4;">Find an item and ask a stranger for assistance.</p>
        </div>

        <!-- 7. Small Talk / Break Room (Coming Soon) -->
        <div class="scenario-card disabled" onclick="showToast('Small Talk / Break Room is in clinical development. Available in v2.5!')">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span style="font-size:1.5rem;">☕</span>
            <span class="badge badge-soon">Coming Soon</span>
          </div>
          <h3 style="color:#94A3B8; font-size:1.1rem; margin-bottom:4px;">7. Small Talk / Break Room</h3>
          <p style="color:#64748B; font-size:0.85rem; line-height:1.4;">Navigate casual conversation with coworkers during a break.</p>
        </div>
      </div>

      <div style="margin-top:20px; text-align:right;">
        <button class="btn-primary" onclick="showScreen('waiting')">Proceed to Waiting Room &rarr;</button>
      </div>
    </div>

    <!-- SCREEN 3: WAITING ROOM -->
    <div id="screen-waiting" class="screen">
      <div class="svg-frame" id="lobby-viewport" style="max-height: 360px; transition: filter 0.2s;">
        <svg viewBox="0 0 800 450" style="width: 100%; display: block;">
          <rect width="800" height="340" fill="#033F45"/>
          <polygon points="0,340 800,340 800,450 0,450" fill="#0A4C52"/>
          <rect x="80" y="60" width="200" height="220" rx="16" fill="#93C5FD" stroke="#028090" stroke-width="4"/>
          <ellipse cx="140" cy="245" rx="70" ry="35" fill="#10B981"/>
          <circle cx="180" cy="115" r="22" fill="#FEF08A"/>
          <polygon points="310,380 345,380 340,420 315,420" fill="#D97706"/>
          <circle cx="330" cy="320" r="30" fill="#10B981"/>
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

    <!-- SCREEN 4: REHEARSAL SCENARIO -->
    <div id="screen-interview" class="screen">
      <div class="svg-frame" id="scenario-svg-frame" style="max-height: 250px;">
        <svg viewBox="0 0 800 360" style="width: 100%; display: block;" id="scenario-svg">
          <rect width="800" height="280" fill="#04383E"/>
          <polygon points="0,280 800,280 800,360 0,360" fill="#021C1E"/>
          <circle cx="400" cy="110" r="32" fill="#CBD5E1"/>
          <path d="M 355 220 C 355 160, 370 148, 400 148 C 430 148, 445 160, 445 220 Z" fill="#334155"/>
          <polygon points="120,230 680,230 720,340 80,340" fill="#0F766E"/>
        </svg>
      </div>

      <div class="card" style="margin-bottom: 14px; border: 2px solid #02C39A;" id="interviewer-bubble-card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; border-bottom: 1px solid #E2E8F0; padding-bottom: 6px;">
          <div style="font-size: 0.8rem; font-weight: 800; color: #028090; text-transform: uppercase;" id="prompt-header-label">
            <span id="prompt-dot" style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #02C39A; margin-right: 6px;"></span>
            <span id="prompt-title">Interviewer Prompt (EASY)</span>
          </div>
          <div id="tone-badge" style="font-size: 0.75rem; background: #F1F5F9; padding: 2px 8px; border-radius: 9999px; font-weight: 700; color: #02C39A;">
            Tone: Warm & Encouraging
          </div>
        </div>
        <div id="npc-speech" style="font-size: 1.05rem; font-weight: 600; color: #0F172A; line-height: 1.5;">
          "Hi there! It is wonderful to meet you today. Please take all the time you need..."
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;">
        <div id="active-diff-pill" style="display: flex; align-items: center; gap: 6px; background: rgba(2,195,154,0.15); border: 1px solid #02C39A; padding: 4px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 700; color: #02C39A;">
          <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #02C39A;"></span>
          <span id="active-diff-text">Active: Easy (Warm & Supportive)</span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button class="nav-tab active" id="diff-easy" onclick="setDiff('easy')">● Easy</button>
          <button class="nav-tab" id="diff-mod" onclick="setDiff('moderate')">● Moderate</button>
          <button class="nav-tab" id="diff-hard" onclick="setDiff('hard')">● Hard</button>
        </div>
      </div>

      <div id="options-container" style="display: flex; flex-direction: column; gap: 8px;"></div>

      <div id="continue-section" style="display: none; margin-top: 14px; text-align: right;">
        <button class="btn-primary" onclick="showScreen('dashboard')">View Therapist Telemetry &rarr;</button>
      </div>
    </div>

    <!-- SCREEN 5: THERAPIST DASHBOARD -->
    <div id="screen-dashboard" class="screen">
      <div class="card" style="background: #011C1E; border: 3px solid #03343A; color: #F8FAFC; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #028090; padding-bottom: 10px; margin-bottom: 16px;">
          <div style="font-weight: 700; color: #5EEAD4; font-size: 0.95rem;">NeuroPractice Clinician Console v2.4</div>
          <div id="dashboard-live-session-pill" style="font-size: 0.75rem; background: rgba(2,195,154,0.2); border: 1px solid #02C39A; color: #5EEAD4; padding: 4px 10px; border-radius: 9999px; font-weight: 700;">
            ● LIVE SESSION: Job Interview &bull; Rahul K.
          </div>
        </div>

        <div class="grid-2">
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #5EEAD4; text-transform: uppercase; margin-bottom: 8px;">Live Rehearsal Transcript</div>
            <div class="card" style="font-size: 0.85rem; line-height: 1.5; background: #FFFFFF; color: #1E293B;">
              <div id="transcript-npc" style="margin-bottom: 8px; color: #475569;"><strong>NPC Question:</strong> "Tell me about a time you faced a difficult problem..."</div>
              
              <!-- Long pause orange warning banner -->
              <div style="margin: 8px 0; padding: 6px 10px; background: #FFFBEB; border: 1px solid #F4A261; border-radius: 8px; color: #9A3412; font-size: 0.75rem; font-weight: 700;">
                ⚠ Flag: long pause detected (+4.2s delay before response formulation)
              </div>

              <div id="transcript-user" style="background: #E6FFFA; padding: 8px; border-radius: 8px; border: 1px solid #99F6E4; color: #065F46;"><strong>Participant:</strong> Option A Selected</div>
            </div>
          </div>

          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #5EEAD4; text-transform: uppercase; margin-bottom: 8px;">Appropriateness Trajectory</div>
            <div style="background: #032A2E; padding: 12px; border-radius: 16px; border: 1px solid #028090;">
              <canvas id="offlineChart" style="max-height: 160px;"></canvas>
            </div>
          </div>
        </div>

        <div style="margin-top: 20px; text-align: right; border-top: 1px solid #028090; padding-top: 14px;">
          <button class="btn-primary" onclick="showScreen('debrief')">Proceed to Session Debrief &rarr;</button>
        </div>
      </div>
    </div>

    <!-- SCREEN 6: DEBRIEF -->
    <div id="screen-debrief" class="screen">
      <div style="text-align: center; max-width: 680px; margin: 0 auto 20px auto;">
        <div style="background: rgba(2,195,154,0.1); border: 1px solid #00A896; display: inline-block; padding: 4px 14px; border-radius: 9999px; color: #5EEAD4; font-size: 0.8rem; font-weight: 700; margin-bottom: 12px;">
          Screen 6 of 6 &bull; Post-Session Debrief
        </div>
        <h1 style="font-size: 2.2rem; color: #CCFBF1; margin-bottom: 8px; font-weight: 800;">Session Debrief &amp; Summary</h1>
      </div>

      <div class="card" style="background: #011C1E; border: 2px solid #028090; color: #E2E8F0; max-width: 720px; margin: 0 auto;">
        <div class="grid-4" style="margin-bottom: 20px;">
          <div style="background: #032A2E; padding: 12px; border-radius: 12px; border: 1px solid #028090;">
            <div style="font-size: 0.75rem; color: #5EEAD4; text-transform: uppercase; font-weight: 700;">Session Goal</div>
            <div id="debrief-goal-text" style="font-size: 0.85rem; font-weight: 700; color: white; margin-top: 4px;">Build confidence answering behavioral questions</div>
          </div>
          <div style="background: #032A2E; padding: 12px; border-radius: 12px; border: 1px solid #028090;">
            <div style="font-size: 0.75rem; color: #5EEAD4; text-transform: uppercase; font-weight: 700;">Scenario</div>
            <div id="debrief-scenario-text" style="font-size: 0.85rem; font-weight: 700; color: white; margin-top: 4px;">Job Interview</div>
          </div>
          <div style="background: #032A2E; padding: 12px; border-radius: 12px; border: 1px solid #F4A261;">
            <div style="font-size: 0.75rem; color: #F4A261; text-transform: uppercase; font-weight: 700;">Flagged Moments</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: white; margin-top: 4px;">1 <span style="font-size: 0.75rem; color: #F4A261;">pause</span></div>
          </div>
          <div style="background: #032A2E; padding: 12px; border-radius: 12px; border: 1px solid #02C39A;">
            <div style="font-size: 0.75rem; color: #02C39A; text-transform: uppercase; font-weight: 700;">Score</div>
            <div style="font-size: 1.2rem; font-weight: 800; color: white; margin-top: 4px;">9 / 10</div>
          </div>
        </div>

        <div style="background: #022427; padding: 16px; border-radius: 14px; border: 1px solid #028090; margin-bottom: 20px;">
          <div style="font-size: 0.8rem; font-weight: 700; color: #5EEAD4; text-transform: uppercase; margin-bottom: 8px;">Auto-Generated Clinical Notes</div>
          <ul id="debrief-notes-list" style="font-size: 0.85rem; color: #CCFBF1; line-height: 1.6; padding-left: 18px;">
            <li>Handled conversational phrasing calmly with high structured clarity.</li>
            <li>Took extra time on question 1 (+4.2s pause) — discuss pacing and self-advocacy pause techniques.</li>
            <li>Maintained steady composure and zero distress indicators under pressure.</li>
          </ul>
        </div>

        <div style="text-align: center; border-top: 1px solid #028090; padding-top: 16px;">
          <button class="btn-primary" onclick="restartDemo()">Restart Demo Flow ↺</button>
        </div>
      </div>
    </div>
  </main>

  <script>
    const ALL_SCENARIOS = {
      'job-interview': {
        title: 'Job Interview',
        npcRole: 'Alex (Interviewer)',
        easy: {
          dot: '#02C39A',
          label: 'Easy (Warm & Supportive)',
          tone: 'Warm & Encouraging',
          question: 'Hi there! It is wonderful to meet you today. Please take all the time you need—there are no trick questions here. Could you share a time you encountered a challenging problem at work or school, and how you worked through it step by step?',
          options: [
            { label: 'Option A: Step-by-Step Problem Solving (Longer)', text: 'During a collaborative project, our dataset had several missing entries. I felt a bit uncertain at first, but I took a calm breath, created a supportive shared checklist with my partner, and we gently worked through each item together step-by-step to finish comfortably ahead of the deadline.', npcReply: 'That is wonderful to hear! Taking a calm breath and supporting your teammate with an organized checklist shows such thoughtful collaboration and methodical problem-solving.' },
            { label: 'Option B: Proactive & Self-Aware Help Seeking (Longer)', text: 'When I was learning our new software tool, I ran into an unexpected error. Instead of feeling overwhelmed, I took a moment to write down exactly what I had tried so far, and then reached out to a senior peer who kindly guided me through the troubleshooting steps.', npcReply: 'I really appreciate your self-awareness! Documenting your steps before asking for guidance is so helpful and creates a supportive environment for everyone.' },
            { label: 'Option C: Gentle Early Clarification (Supportive)', text: 'I received initial project guidelines that felt a bit ambiguous. To ensure our whole group felt confident and avoid any last-minute stress, I drafted three gentle clarifying questions and scheduled a quick 5-minute check-in with our supervisor.', npcReply: 'That is fantastic! Asking clarifying questions early is one of the best ways to keep projects low-stress and make sure everyone is aligned.' }
          ]
        },
        moderate: {
          dot: '#028090',
          label: 'Moderate (Neutral / Shorter)',
          tone: 'Neutral & Professional',
          question: 'Please describe a challenging problem you encountered in a work or academic setting, and the specific approach you used to resolve it.',
          options: [
            { label: 'Option A: Objective Criteria Testing', text: 'Two teammates disagreed on the deck format. I tested both options on a sample slide to decide using objective criteria.', npcReply: 'Understood. Using objective criteria to resolve team indecision is an effective and standard workplace practice.' },
            { label: 'Option B: Priority Triage Under Scope Shift', text: 'When our deadline moved up three days, I reprioritized core deliverables, communicated trade-offs, and shipped on time.', npcReply: 'Setting clear expectation boundaries under shifting deadlines is essential for predictable project delivery.' },
            { label: 'Option C: Structured Hybrid Communication', text: 'A colleague preferred verbal syncs while I preferred written briefs. We agreed to a 5-minute kickoff followed by bulleted notes.', npcReply: 'A balanced synchronous and asynchronous agreement effectively accommodates different operational preferences.' }
          ]
        },
        hard: {
          dot: '#F4A261',
          label: 'Hard (Rapid Follow-Up)',
          tone: 'Rapid Follow-Up & Interruption',
          question: 'We are on a tight schedule, so let me jump straight to it: during a critical project breakdown where deadlines slipped, why did the failure happen on your watch, and what immediate action did you take on the spot?',
          options: [
            { label: 'Option A: Ask for a Moment to Think (Self-Regulation)', text: 'May I take a brief moment to collect my thoughts? I want to ensure I give you an accurate and structured breakdown of what happened.', npcReply: '[Interviewer pauses and nods] Of course. Take your time. Being able to pause and regulate before answering under rapid pressure demonstrates strong executive maturity.' },
            { label: 'Option B: Direct Error Ownership & Rapid Fix', text: 'When a budget anomaly was flagged two hours before submission, I immediately informed the lead, isolated the spreadsheet formula flaw, and provided a corrected sheet.', npcReply: 'Good. Taking immediate ownership without deflection is what isolates and resolves critical path roadblocks quickly.' },
            { label: 'Option C: Rapid Data-Backed Boundary Defense', text: 'When sprint scope surged beyond team capacity, I rapidly pulled velocity metrics to illustrate risk and negotiated a phased release.', npcReply: 'Clear data cuts through ambiguity fast. Let us proceed to the next item.' }
          ]
        }
      },
      'restaurant-ordering': {
        title: 'Restaurant Ordering',
        npcRole: 'Taylor (Server)',
        easy: {
          dot: '#02C39A',
          label: 'Easy (Warm & Patient)',
          tone: 'Warm & Patient',
          question: 'Welcome in! Take all the time you need to look over the menu. Can I get you a beverage to start, or would you like a few extra minutes to read through the entrees?',
          options: [
            { label: 'Option A: Polite Drink Order + Request Extra Time (Longer)', text: 'Thank you so much. Could I please start with a sparkling water with lemon? And I would appreciate about two more minutes to look over the dinner menu before ordering my entree.', npcReply: 'You got it! One sparkling water with lemon coming right up. Take all the time you need.' },
            { label: 'Option B: Friendly Ingredient Inquiry (Detailed)', text: 'Hi! Could you tell me a little bit about the ingredients in the garden grain bowl? I have a slight sensitivity to nuts and want to make sure it is safe.', npcReply: 'I am so glad you asked! Our kitchen is completely peanut-free, and we can easily omit the toasted almonds on top.' },
            { label: 'Option C: Ready with Meal & Drink Order (Structured)', text: 'Hello! I am ready to order: I will have the roasted tomato soup with sourdough toast, and a glass of unsweetened iced tea, please.', npcReply: 'Delicious choice! Tomato soup with sourdough and iced tea. I will have that right out for you.' }
          ]
        },
        moderate: {
          dot: '#028090',
          label: 'Moderate (Standard Noise & Pace)',
          tone: 'Standard Server Tone',
          question: 'Hi there, welcome to Bistro 42. Are you ready to order food or do you need another minute?',
          options: [
            { label: 'Option A: Direct Order with Dressing on Side', text: 'I will have the grilled chicken salad with balsamic vinaigrette on the side and a water.', npcReply: 'Grilled chicken salad with balsamic on the side. Got it.' },
            { label: 'Option B: Concise One-Minute Request', text: 'I just need one more minute to decide between the pasta and the fish, thank you.', npcReply: 'No problem, I will check back in sixty seconds.' },
            { label: 'Option C: Fast Side Substitution', text: 'I will do the veggie burger, but could I swap the fries for steamed greens?', npcReply: 'Sure thing, veggie burger with greens.' }
          ]
        },
        hard: {
          dot: '#F4A261',
          label: 'Hard (Order Mix-Up & Rapid Kitchen Rush)',
          tone: 'Fast-Paced & Urgent',
          question: 'Sorry for the rush—the kitchen just informed us we ran out of the salmon special you asked about, and the chef needs your replacement entree right away. What would you like instead?',
          options: [
            { label: 'Option A: Ask for a Moment to Review Menu (Regulation)', text: 'May I take thirty seconds to look over the alternative entrees so I can make a good choice?', npcReply: '[Server takes a breath] Absolutely, take thirty seconds. Let me know as soon as you are ready.' },
            { label: 'Option B: Decisive Backup Selection', text: 'No problem. I will switch to the mushroom risotto instead.', npcReply: 'Perfect, putting in mushroom risotto now.' },
            { label: 'Option C: Quick Chef Recommendation Request', text: 'Understood. What is the fastest comparable protein dish the chef can prepare?', npcReply: 'The herb chicken breast can be ready in under ten minutes.' }
          ]
        }
      }
    };

    let selectedScenarioId = 'job-interview';
    let currentDiff = 'easy';
    let participantName = 'Rahul K.';

    function showToast(msg) {
      const toast = document.getElementById('toast');
      toast.innerText = msg;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 3000);
    }

    function showScreen(name) {
      document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('active'));
      const screenEl = document.getElementById('screen-' + name);
      if (screenEl) screenEl.classList.add('active');
      const tabEl = document.getElementById('tab-' + name);
      if (tabEl) tabEl.classList.add('active');
      if (name === 'dashboard') { initChart(); }
    }

    function setIntakeDiff(diff) {
      currentDiff = diff;
      document.getElementById('intake-diff-easy').classList.toggle('active', diff === 'easy');
      document.getElementById('intake-diff-mod').classList.toggle('active', diff === 'moderate');
      document.getElementById('intake-diff-hard').classList.toggle('active', diff === 'hard');
    }

    function selectScenario(id) {
      selectedScenarioId = id;
      document.getElementById('sc-card-job').classList.toggle('selected', id === 'job-interview');
      document.getElementById('sc-card-rest').classList.toggle('selected', id === 'restaurant-ordering');
      
      const scMeta = ALL_SCENARIOS[id];
      document.getElementById('debrief-scenario-text').innerText = scMeta.title;
      document.getElementById('dashboard-live-session-pill').innerText = '● LIVE SESSION: ' + scMeta.title + ' • ' + participantName;
      renderOptions(currentDiff);
    }

    function renderOptions(diff) {
      const scData = ALL_SCENARIOS[selectedScenarioId];
      const data = scData[diff];
      document.getElementById('npc-speech').innerHTML = '"' + data.question + '"';
      document.getElementById('prompt-title').innerText = scData.npcRole + ' Prompt (' + diff.toUpperCase() + ')';
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
      data.options.forEach((opt) => {
        const btn = document.createElement('button');
        btn.className = 'btn-outline';
        btn.innerHTML = '<strong>' + opt.label + ':</strong><br/>"' + opt.text + '"';
        btn.onclick = () => selectAnswer(opt.label, opt.npcReply, data.question);
        container.appendChild(btn);
      });
    }

    function setDiff(diff) {
      currentDiff = diff;
      document.getElementById('diff-easy').classList.remove('active');
      document.getElementById('diff-mod').classList.remove('active');
      document.getElementById('diff-hard').classList.remove('active');
      if (diff === 'easy') document.getElementById('diff-easy').classList.add('active');
      if (diff === 'moderate') document.getElementById('diff-mod').classList.add('active');
      if (diff === 'hard') document.getElementById('diff-hard').classList.add('active');
      renderOptions(diff);
      document.getElementById('continue-section').style.display = 'none';
    }

    function selectAnswer(label, npcReply, question) {
      document.getElementById('npc-speech').innerHTML = '<strong>NPC Follow-up:</strong> ' + npcReply;
      document.getElementById('transcript-npc').innerHTML = '<strong>NPC:</strong> "' + question + '"';
      document.getElementById('transcript-user').innerHTML = '<strong>Participant:</strong> ' + label;
      document.getElementById('continue-section').style.display = 'block';
    }

    function restartDemo() {
      showScreen('intake');
      setDiff('easy');
      selectScenario('job-interview');
    }

    renderOptions('easy');

    let chartInitialized = false;
    function initChart() {
      if (chartInitialized) return;
      chartInitialized = true;
      const ctx = document.getElementById('offlineChart');
      if (!ctx) return;
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Session 1', 'Session 2', 'Session 3', 'Session 4', 'Today'],
          datasets: [{
            label: 'Appropriate Responses',
            data: [3, 5, 6, 8, 9],
            borderColor: '#02C39A',
            backgroundColor: 'rgba(2, 195, 154, 0.2)',
            tension: 0.3,
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, max: 10 }
          }
        }
      });
    }
  </script>
</body>
</html>`;

  const blob = new Blob([offlineHtmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = 'NeuroPractice_VR_Prototype_Backup.html';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
