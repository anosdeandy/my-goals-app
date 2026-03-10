import { useState, useEffect } from "react";

const initialGoals = [
  {
    id: 1, title: "Get an Apartment", category: "personal", color: "#C96442",
    steps: [
      { id: 1, text: "Research neighborhoods in New York", done: false },
      { id: 2, text: "Research neighborhoods in Barcelona", done: false },
      { id: 3, text: "Set budget and savings target", done: false },
      { id: 4, text: "Connect with local real estate agents", done: false },
      { id: 5, text: "Plan scouting trip to shortlisted city", done: false },
    ],
  },
  {
    id: 2, title: "Buy Land", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Define target location and acreage", done: false },
      { id: 2, text: "Research zoning laws and land use", done: false },
      { id: 3, text: "Get pre-approved for land loan", done: false },
      { id: 4, text: "Engage a land broker", done: false },
    ],
  },
  {
    id: 3, title: "Buy or Build a House", category: "personal", color: "#C96442",
    steps: [
      { id: 1, text: "Decide: buy existing vs. build new", done: false },
      { id: 2, text: "Secure financing / mortgage pre-approval", done: false },
      { id: 3, text: "Find architect or contractor if building", done: false },
      { id: 4, text: "Identify target location", done: false },
    ],
  },
  {
    id: 4, title: "Get an Art Space + Music Studio", category: "personal", color: "#C96442",
    steps: [
      { id: 1, text: "List requirements for the space", done: false },
      { id: 2, text: "Research spaces in target city", done: false },
      { id: 3, text: "Set monthly budget for rent/lease", done: false },
      { id: 4, text: "Tour candidate spaces", done: false },
    ],
  },
  {
    id: 5, title: "Open the Depot for Business", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Define business model and revenue streams", done: false },
      { id: 2, text: "Complete any required permits/licenses", done: false },
      { id: 3, text: "Set opening timeline and milestones", done: false },
      { id: 4, text: "Soft launch / test event", done: false },
    ],
  },
  {
    id: 6, title: "Refinance Depot Mortgage", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Pull current mortgage terms", done: false },
      { id: 2, text: "Shop at least 3 lenders for rates", done: false },
      { id: 3, text: "Gather financial documents", done: false },
      { id: 4, text: "Submit refinance application", done: false },
      { id: 5, text: "Close on new loan", done: false },
    ],
  },
  {
    id: 7, title: "Transfer Depot to Property LLC", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Form property holding LLC", done: false },
      { id: 2, text: "Consult attorney on deed transfer process", done: false },
      { id: 3, text: "Check mortgage due-on-sale clause", done: false },
      { id: 4, text: "Execute deed transfer", done: false },
      { id: 5, text: "Update insurance to LLC", done: false },
    ],
  },
  {
    id: 8, title: "Open Hookah Lounge at Depot", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Research hookah lounge licensing requirements", done: false },
      { id: 2, text: "Design lounge layout within depot space", done: false },
      { id: 3, text: "Source furniture and hookah equipment", done: false },
      { id: 4, text: "Hire staff", done: false },
      { id: 5, text: "Set menu and pricing", done: false },
    ],
  },
  {
    id: 9, title: "Set Up Music Studio at Depot", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Choose room and measure acoustics", done: false },
      { id: 2, text: "Plan acoustic treatment", done: false },
      { id: 3, text: "Source gear: interface, monitors, mics", done: false },
      { id: 4, text: "Install and test setup", done: false },
    ],
  },
  {
    id: 10, title: "Set Up Live-Streaming at Depot", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Define streaming use case (music, events, etc.)", done: false },
      { id: 2, text: "Source cameras, capture cards, and lighting", done: false },
      { id: 3, text: "Set up streaming software (OBS, etc.)", done: false },
      { id: 4, text: "Run a test stream", done: false },
    ],
  },
  {
    id: 11, title: "Fix Up Apartment at Depot", category: "business", color: "#8B6914",
    steps: [
      { id: 1, text: "Walk through and document needed repairs", done: false },
      { id: 2, text: "Get contractor quotes", done: false },
      { id: 3, text: "Prioritize and schedule work", done: false },
      { id: 4, text: "Complete renovations", done: false },
    ],
  },
  {
    id: 12, title: "Develop a VST with Aaron S.", category: "creative", color: "#9E6B3F",
    steps: [
      { id: 1, text: "Align on VST concept and sound design goals", done: false },
      { id: 2, text: "Choose dev framework (JUCE, etc.)", done: false },
      { id: 3, text: "Build initial prototype", done: false },
      { id: 4, text: "Beta test and iterate", done: false },
      { id: 5, text: "Plan release / distribution", done: false },
    ],
  },
  {
    id: 13, title: "Collaborate with Kurtis on Music", category: "creative", color: "#9E6B3F",
    steps: [
      { id: 1, text: "Schedule first session", done: false },
      { id: 2, text: "Define project scope (EP, singles, etc.)", done: false },
      { id: 3, text: "Record initial ideas", done: false },
      { id: 4, text: "Mix and master final tracks", done: false },
      { id: 5, text: "Plan release", done: false },
    ],
  },
  {
    id: 14, title: "Invest in Symmetry Music Festival", category: "creative", color: "#9E6B3F",
    steps: [
      { id: 1, text: "Review festival business plan / pitch deck", done: false },
      { id: 2, text: "Determine investment amount", done: false },
      { id: 3, text: "Consult attorney on investment agreement", done: false },
      { id: 4, text: "Sign and fund", done: false },
    ],
  },
  {
    id: 15, title: "Make a Fairfield Zine", category: "creative", color: "#9E6B3F",
    steps: [
      { id: 1, text: "Define theme and editorial angle", done: false },
      { id: 2, text: "Gather contributors / photographers", done: false },
      { id: 3, text: "Collect content and layout design", done: false },
      { id: 4, text: "Print first run", done: false },
      { id: 5, text: "Distribute locally", done: false },
    ],
  },
  {
    id: 16, title: "Practice Piano", category: "learning", color: "#5B7FA6",
    steps: [
      { id: 1, text: "Set a consistent daily practice time", done: false },
      { id: 2, text: "Pick 2–3 pieces to learn", done: false },
      { id: 3, text: "Work on scales and theory fundamentals", done: false },
    ],
  },
  {
    id: 17, title: "Learn Max/MSP", category: "learning", color: "#5B7FA6",
    steps: [
      { id: 1, text: "Complete intro tutorials on Cycling '74 site", done: false },
      { id: 2, text: "Build a simple generative patch", done: false },
      { id: 3, text: "Explore audio processing with MSP", done: false },
      { id: 4, text: "Apply to a real project or performance", done: false },
    ],
  },
  {
    id: 18, title: "Learn Modular on VCV Rack", category: "learning", color: "#5B7FA6",
    steps: [
      { id: 1, text: "Install VCV Rack and explore core modules", done: false },
      { id: 2, text: "Learn signal flow: VCO, VCF, VCA, envelope", done: false },
      { id: 3, text: "Build first full patch from scratch", done: false },
      { id: 4, text: "Study modulation and sequencing", done: false },
    ],
  },
  {
    id: 19, title: "Run a 5K", category: "health", color: "#7A6E9E",
    steps: [
      { id: 1, text: "Start Couch to 5K program", done: false },
      { id: 2, text: "Run 3x per week consistently", done: false },
      { id: 3, text: "Register for a local 5K race", done: false },
      { id: 4, text: "Complete the race", done: false },
    ],
  },
  {
    id: 20, title: "Do More Weight Training", category: "health", color: "#7A6E9E",
    steps: [
      { id: 1, text: "Choose a program (Starting Strength, etc.)", done: false },
      { id: 2, text: "Set up gym access or home gym", done: false },
      { id: 3, text: "Train 3x per week for 4 weeks", done: false },
      { id: 4, text: "Track lifts and progress monthly", done: false },
    ],
  },
  {
    id: 21, title: "Do More Calisthenics", category: "health", color: "#7A6E9E",
    steps: [
      { id: 1, text: "Define routine: push, pull, legs, core", done: false },
      { id: 2, text: "Set baseline reps for each movement", done: false },
      { id: 3, text: "Train 4x per week", done: false },
      { id: 4, text: "Work toward a pull-up and dip milestone", done: false },
    ],
  },
];

const categoryMeta = {
  personal: { label: "Personal", icon: "◉", color: "#C96442" },
  business: { label: "Business", icon: "◈", color: "#8B6914" },
  creative: { label: "Creative", icon: "◆", color: "#9E6B3F" },
  learning: { label: "Learning", icon: "◎", color: "#5B7FA6" },
  health:   { label: "Health",   icon: "◐", color: "#7A6E9E" },
};

export default function GoalTracker() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("my-goals");
    return saved ? JSON.parse(saved) : initialGoals;
  });
  const [selected, setSelected] = useState(null);
  const [newGoalTitle, setNewGoalTitle] = useState("");
  const [newGoalCategory, setNewGoalCategory] = useState("personal");
  const [newStepText, setNewStepText] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("my-goals", JSON.stringify(goals));
  }, [goals]);

  const selectedGoal = goals.find((g) => g.id === selected);

  const toggleStep = (goalId, stepId) => {
    setGoals(prev => prev.map(g =>
      g.id === goalId ? { ...g, steps: g.steps.map(s => s.id === stepId ? { ...s, done: !s.done } : s) } : g
    ));
  };

  const addStep = (goalId) => {
    if (!newStepText.trim()) return;
    setGoals(prev => prev.map(g =>
      g.id === goalId ? { ...g, steps: [...g.steps, { id: Date.now(), text: newStepText.trim(), done: false }] } : g
    ));
    setNewStepText("");
  };

  const deleteStep = (goalId, stepId) => {
    setGoals(prev => prev.map(g =>
      g.id === goalId ? { ...g, steps: g.steps.filter(s => s.id !== stepId) } : g
    ));
  };

  const addGoal = () => {
    if (!newGoalTitle.trim()) return;
    setGoals(prev => [...prev, {
      id: Date.now(), title: newGoalTitle.trim(), category: newGoalCategory,
      color: categoryMeta[newGoalCategory].color, steps: [],
    }]);
    setNewGoalTitle("");
    setShowAddGoal(false);
  };

  const deleteGoal = (goalId) => {
    setGoals(prev => prev.filter(g => g.id !== goalId));
    if (selected === goalId) setSelected(null);
  };

  const progress = (goal) => {
    if (!goal.steps.length) return 0;
    return Math.round((goal.steps.filter(s => s.done).length / goal.steps.length) * 100);
  };

  const totalSteps = goals.reduce((a, g) => a + g.steps.length, 0);
  const doneSteps = goals.reduce((a, g) => a + g.steps.filter(s => s.done).length, 0);
  const visibleGoals = filter === "all" ? goals : goals.filter(g => g.category === filter);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F0E8", color: "#2C2316", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F5F0E8; }
        .goal-card { cursor: pointer; border: 1px solid #DDD5C4; border-radius: 6px; background: #FBF7F0; padding: 14px 14px 14px 18px; transition: all 0.15s ease; position: relative; overflow: hidden; }
        .goal-card:hover { background: #FFF9F3; border-color: #C9B99A; box-shadow: 0 2px 12px rgba(180,130,80,0.08); }
        .goal-card.active { background: #FFF9F3; border-color: var(--accent) !important; box-shadow: 0 2px 16px rgba(180,130,80,0.13); }
        .step-row { display: flex; align-items: center; gap: 10px; padding: 9px 0; border-bottom: 1px solid #EDE5D8; }
        .step-row:last-child { border-bottom: none; }
        .check-btn { width: 18px; height: 18px; border-radius: 4px; border: 1.5px solid #C9B99A; background: white; cursor: pointer; flex-shrink: 0; display: flex; align-items: center; justify-content: center; transition: all 0.15s; font-size: 10px; color: white; }
        .check-btn.done { background: var(--accent); border-color: var(--accent); }
        .check-btn:hover:not(.done) { border-color: var(--accent); background: #FFF5EE; }
        .del-btn { background: none; border: none; cursor: pointer; color: #C9B99A; font-size: 16px; padding: 0 2px; transition: color 0.15s; line-height: 1; }
        .del-btn:hover { color: #C96442; }
        .add-input { border: 1px solid #DDD5C4; border-radius: 6px; padding: 8px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; background: white; outline: none; width: 100%; color: #2C2316; transition: border-color 0.15s; }
        .add-input:focus { border-color: #C9B99A; box-shadow: 0 0 0 3px rgba(201,180,154,0.15); }
        .add-input::placeholder { color: #B8A88A; }
        .filter-btn { background: none; border: 1px solid #DDD5C4; border-radius: 20px; padding: 5px 14px; font-family: 'DM Sans', sans-serif; font-size: 11px; color: #9A8878; cursor: pointer; transition: all 0.15s; font-weight: 500; }
        .filter-btn:hover { border-color: #C9B99A; color: #5A4030; background: #FFF5EE; }
        .filter-btn.active-filter { color: white; border-color: transparent; background: var(--fc); }
        select { border: 1px solid #DDD5C4; border-radius: 6px; padding: 8px 12px; font-size: 13px; font-family: 'DM Sans', sans-serif; background: white; outline: none; cursor: pointer; color: #2C2316; }
        select:focus { border-color: #C9B99A; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F5F0E8; }
        ::-webkit-scrollbar-thumb { background: #DDD5C4; border-radius: 2px; }
      `}</style>

      {/* Header */}
      <div style={{ padding: "28px 36px 18px", borderBottom: "1px solid #DDD5C4", background: "linear-gradient(135deg, #FBF7F0 0%, #F5EFE3 100%)", position: "sticky", top: 0, zIndex: 10, boxShadow: "0 1px 12px rgba(180,130,80,0.07)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.12em", color: "#B8A88A", textTransform: "uppercase", marginBottom: 4 }}>
                {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 38, fontWeight: 700, color: "#2C2316", letterSpacing: "-0.5px", lineHeight: 1 }}>
                My Goals
              </h1>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#9A8878", marginTop: 5 }}>
                {doneSteps} of {totalSteps} steps complete · {goals.length} goals
              </div>
            </div>
            <button onClick={() => setShowAddGoal(!showAddGoal)} style={{ background: showAddGoal ? "#EDE5D8" : "linear-gradient(135deg, #C96442, #A8502F)", color: showAddGoal ? "#7A5A40" : "white", border: "none", borderRadius: 8, padding: "10px 20px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, cursor: "pointer", boxShadow: showAddGoal ? "none" : "0 2px 10px rgba(180,80,40,0.25)", transition: "all 0.15s" }}>
              {showAddGoal ? "Cancel" : "+ New Goal"}
            </button>
          </div>

          <div style={{ height: 3, background: "#EDE5D8", borderRadius: 2, marginBottom: 14, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${totalSteps ? Math.round(doneSteps / totalSteps * 100) : 0}%`, background: "linear-gradient(90deg, #C96442, #7A6E9E)", borderRadius: 2, transition: "width 0.5s ease" }} />
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <button className={`filter-btn ${filter === "all" ? "active-filter" : ""}`} style={{ "--fc": "#7A5A40" }} onClick={() => setFilter("all")}>All</button>
            {Object.entries(categoryMeta).map(([cat, meta]) => (
              <button key={cat} className={`filter-btn ${filter === cat ? "active-filter" : ""}`} style={{ "--fc": meta.color }} onClick={() => setFilter(cat)}>
                {meta.icon} {meta.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Add Goal */}
      {showAddGoal && (
        <div style={{ background: "#FFF8F0", borderBottom: "1px solid #DDD5C4", padding: "16px 36px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 10, alignItems: "center" }}>
            <input className="add-input" placeholder="Goal title..." value={newGoalTitle} onChange={e => setNewGoalTitle(e.target.value)} onKeyDown={e => e.key === "Enter" && addGoal()} style={{ flex: 1, maxWidth: 400 }} />
            <select value={newGoalCategory} onChange={e => setNewGoalCategory(e.target.value)}>
              {Object.entries(categoryMeta).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </select>
            <button onClick={addGoal} style={{ padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, background: "linear-gradient(135deg, #C96442, #A8502F)", color: "white", boxShadow: "0 2px 8px rgba(180,80,40,0.2)" }}>
              Add Goal
            </button>
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex: 1, display: "flex", maxWidth: 1100, width: "100%", margin: "0 auto", padding: "28px 36px", gap: 24, alignItems: "flex-start" }}>
        <div style={{ flex: selectedGoal ? "0 0 400px" : "1", display: "flex", flexDirection: "column", gap: 20 }}>
          {Object.keys(categoryMeta).map(cat => {
            const catGoals = visibleGoals.filter(g => g.category === cat);
            if (!catGoals.length) return null;
            const meta = categoryMeta[cat];
            return (
              <div key={cat}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ color: meta.color, fontSize: 11 }}>{meta.icon}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.12em", color: meta.color, textTransform: "uppercase", fontWeight: 500 }}>{meta.label}</span>
                  <div style={{ flex: 1, height: 1, background: "#DDD5C4" }} />
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#B8A88A" }}>{catGoals.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {catGoals.map(goal => {
                    const pct = progress(goal);
                    const isActive = selected === goal.id;
                    return (
                      <div key={goal.id} className={`goal-card ${isActive ? "active" : ""}`}
                        style={{ "--accent": goal.color }}
                        onClick={() => setSelected(isActive ? null : goal.id)}>
                        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: goal.color, borderRadius: "6px 0 0 6px" }} />
                        <div style={{ paddingLeft: 6 }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, fontWeight: 600, color: "#2C2316", lineHeight: 1.3, flex: 1 }}>
                              {goal.title}
                            </div>
                            <button className="del-btn" onClick={e => { e.stopPropagation(); deleteGoal(goal.id); }}>×</button>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                            <div style={{ flex: 1, height: 2, background: "#EDE5D8", borderRadius: 1, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${pct}%`, background: goal.color, transition: "width 0.4s", borderRadius: 1 }} />
                            </div>
                            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "#B8A88A", flexShrink: 0 }}>
                              {goal.steps.filter(s => s.done).length}/{goal.steps.length}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail panel */}
        {selectedGoal && (
          <div style={{ flex: 1, background: "#FBF7F0", border: "1px solid #DDD5C4", borderRadius: 10, padding: 28, position: "sticky", top: 150, maxHeight: "calc(100vh - 170px)", overflowY: "auto", boxShadow: "0 4px 24px rgba(180,130,80,0.08)", "--accent": selectedGoal.color }}>
            <div style={{ borderBottom: "1px solid #EDE5D8", paddingBottom: 16, marginBottom: 20 }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: "0.14em", color: selectedGoal.color, marginBottom: 6, textTransform: "uppercase", fontWeight: 500 }}>
                {categoryMeta[selectedGoal.category].icon} {categoryMeta[selectedGoal.category].label}
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#2C2316", lineHeight: 1.2 }}>
                {selectedGoal.title}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 12 }}>
                <div style={{ flex: 1, height: 3, background: "#EDE5D8", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${progress(selectedGoal)}%`, background: selectedGoal.color, borderRadius: 2, transition: "width 0.4s" }} />
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "#9A8878" }}>{progress(selectedGoal)}%</span>
              </div>
            </div>

            <div style={{ marginBottom: 20 }}>
              {selectedGoal.steps.length === 0 && (
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#C9B99A", fontStyle: "italic", padding: "12px 0" }}>No steps yet — add one below.</div>
              )}
              {selectedGoal.steps.map(step => (
                <div key={step.id} className="step-row">
                  <button className={`check-btn ${step.done ? "done" : ""}`} style={{ "--accent": selectedGoal.color }} onClick={() => toggleStep(selectedGoal.id, step.id)}>
                    {step.done ? "✓" : ""}
                  </button>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, flex: 1, color: step.done ? "#C9B99A" : "#4A3828", textDecoration: step.done ? "line-through" : "none", transition: "all 0.2s", lineHeight: 1.5 }}>
                    {step.text}
                  </span>
                  <button className="del-btn" onClick={() => deleteStep(selectedGoal.id, step.id)}>×</button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <input className="add-input" placeholder="Add a step..." value={newStepText} onChange={e => setNewStepText(e.target.value)} onKeyDown={e => e.key === "Enter" && addStep(selectedGoal.id)} style={{ flex: 1 }} />
              <button onClick={() => addStep(selectedGoal.id)} style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, background: selectedGoal.color, color: "white", transition: "opacity 0.15s" }}>
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}