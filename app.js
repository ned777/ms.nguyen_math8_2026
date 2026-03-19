// =============================================
//  MATH 8 GRADE CALCULATOR — app.js
//  Ms. Nguyen · Room 209 · 2025-2026
// =============================================

// --- Grade weights from the syllabus ---
const CATEGORIES = [
  { id: 'test', name: 'Tests',              weight: 0.35, color: '#6366f1' },
  { id: 'hw',   name: 'Homework',           weight: 0.30, color: '#ec4899' },
  { id: 'cq',   name: 'Classwork/Quizzes',  weight: 0.25, color: '#0ea5e9' },
  { id: 'proj', name: 'Projects',           weight: 0.10, color: '#10b981' },
];

// --- Grade scale ---
const GRADES = [
  { letter: 'A', min: 90, max: 100, color: '#10b981', cssClass: 'grade-a', label: '90–100%' },
  { letter: 'B', min: 80, max: 89,  color: '#0ea5e9', cssClass: 'grade-b', label: '80–89%' },
  { letter: 'C', min: 70, max: 79,  color: '#f59e0b', cssClass: 'grade-c', label: '70–79%' },
  { letter: 'D', min: 60, max: 69,  color: '#f97316', cssClass: 'grade-d', label: '60–69%' },
  { letter: 'F', min: 0,  max: 59,  color: '#ef4444', cssClass: 'grade-f', label: 'Below 60%' },
];

// --- Tips per category ---
const TIPS = {
  test:  '💡 Tip: Study your old tests and redo the problems you missed. Come to tutoring on Tues & Thurs (2:30–3:00 PM) for extra help!',
  hw:    '💡 Tip: Turn in ALL your homework — even late work gets half credit! Every point adds up.',
  cq:    '💡 Tip: Pay attention in class, take notes, and join in group discussions. Those classwork points are easy wins!',
  proj:  '💡 Tip: Make sure every part of your project is complete and turned in on time. Check Canvas for the rubric!',
};

// =============================================
//  HELPERS
// =============================================

// Returns the percentage (0–100) for a category, or null if not entered
function getCategoryPercent(catId) {
  const earned = parseFloat(document.getElementById(catId + '-earned').value);
  const total  = parseFloat(document.getElementById(catId + '-total').value);
  if (isNaN(earned) || isNaN(total) || total <= 0) return null;
  return Math.min(100, (earned / total) * 100);
}

// Returns the grade object for a given percentage
function getGrade(pct) {
  for (const g of GRADES) {
    if (pct >= g.min) return g;
  }
  return GRADES[GRADES.length - 1]; // F
}

// =============================================
//  MAIN CALCULATION
// =============================================

function calculate() {
  const percents = {};
  let weightedSum  = 0;
  let totalWeight  = 0;
  let anyEntered   = false;

  // ---- Step 1: Update each input card ----
  for (const cat of CATEGORIES) {
    const pct = getCategoryPercent(cat.id);
    percents[cat.id] = pct;

    const pctEl = document.getElementById(cat.id + '-pct');
    const barEl = document.getElementById(cat.id + '-bar');

    if (pct !== null) {
      pctEl.textContent  = pct.toFixed(1) + '%';
      barEl.style.width  = pct + '%';
      weightedSum       += pct * cat.weight;
      totalWeight       += cat.weight;
      anyEntered         = true;
    } else {
      pctEl.textContent = '—';
      barEl.style.width = '0%';
    }
  }

  // ---- Step 2: Show grade bubble ----
  const bubble    = document.getElementById('grade-bubble');
  const letterEl  = document.getElementById('bubble-letter');
  const pctEl     = document.getElementById('bubble-pct');
  const labelEl   = document.getElementById('grade-label');

  if (!anyEntered) {
    // Reset to default
    bubble.className     = 'grade-bubble';
    letterEl.textContent = '?';
    pctEl.textContent    = '—%';
    labelEl.textContent  = 'Enter scores above to see your grade!';
    hideResults();
    return;
  }

  // Overall grade is calculated only from entered categories (scaled to full weight)
  const overall    = totalWeight > 0 ? weightedSum / totalWeight : 0;
  const gradeInfo  = getGrade(overall);

  bubble.className     = 'grade-bubble ' + gradeInfo.cssClass;
  letterEl.textContent = gradeInfo.letter;
  pctEl.textContent    = overall.toFixed(1) + '%';
  labelEl.textContent  = gradeLabel(gradeInfo, overall);

  // ---- Step 3: Show weakness ----
  showWeakness(percents);

  // ---- Step 4: Show goals ----
  showGoals(percents, overall, gradeInfo);

  // ---- Step 5: Show breakdown ----
  showBreakdown(percents);
}

// =============================================
//  GRADE LABEL TEXT
// =============================================

function gradeLabel(gradeInfo, overall) {
  const msgs = {
    A: `You're crushing it! 🎉 Keep it up!`,
    B: `Great job! You're almost at an A! 💪`,
    C: `You passed! But there's room to grow 🙂`,
    D: `Hang in there — you can turn this around! 📖`,
    F: `Don't give up! Every assignment helps. Let's fix this! 🔥`,
  };
  return msgs[gradeInfo.letter] || '';
}

// =============================================
//  WEAKNESS ANALYSIS
// =============================================

function showWeakness(percents) {
  const card       = document.getElementById('weakness-card');
  const textEl     = document.getElementById('weakness-text');
  const tipEl      = document.getElementById('tip-box');

  const entered = CATEGORIES.filter(c => percents[c.id] !== null);
  if (entered.length === 0) { card.hidden = true; return; }

  card.hidden = false;

  // Sort by percentage (lowest first)
  const sorted  = entered.slice().sort((a, b) => percents[a.id] - percents[b.id]);
  const weakest = sorted[0];
  const weakPct = percents[weakest.id];

  // How much could raising this category help?
  const potentialGain = (100 - weakPct) * weakest.weight;

  let msg = '';

  if (weakPct < 60) {
    msg = `Your <strong>${weakest.name}</strong> score is at ${weakPct.toFixed(0)}% — that's the biggest thing hurting your grade right now. `;
    msg += `Since it counts for ${(weakest.weight * 100).toFixed(0)}% of your total grade, fixing this could add up to <strong>${potentialGain.toFixed(1)} points</strong> to your overall grade. `;
    msg += `This should be your #1 focus!`;
  } else if (weakPct < 70) {
    msg = `Your <strong>${weakest.name}</strong> is your weakest area at ${weakPct.toFixed(0)}%. `;
    msg += `You need at least 70% to pass the class (a C). Bringing this up could add up to <strong>${potentialGain.toFixed(1)} points</strong> to your overall.`;
  } else if (weakPct < 80) {
    msg = `Your <strong>${weakest.name}</strong> is the lowest at ${weakPct.toFixed(0)}%, but you're passing! `;
    msg += `Pushing it to 80% could add <strong>${((80 - weakPct) * weakest.weight).toFixed(1)} points</strong> to your grade.`;
  } else {
    msg = `All your categories look solid! Your lowest is <strong>${weakest.name}</strong> at ${weakPct.toFixed(0)}% — not bad at all! Keep pushing.`;
  }

  textEl.innerHTML = msg;
  tipEl.textContent = TIPS[weakest.id];
}

// =============================================
//  GOALS — WHAT YOU NEED
// =============================================

function showGoals(percents, overall, currentGrade) {
  const section = document.getElementById('goals-section');
  const row     = document.getElementById('goals-row');
  row.innerHTML = '';

  // Show grades from A down to the one just below current grade
  const currentIdx  = GRADES.findIndex(g => g.letter === currentGrade.letter);
  const showGrades  = GRADES.slice(0, Math.min(currentIdx + 2, GRADES.length));

  section.hidden = false;

  for (const target of showGrades) {
    const achieved    = overall >= target.min;
    const ptsNeeded   = Math.max(0, target.min - overall);

    const pill = document.createElement('div');
    pill.className = 'goal-pill' + (achieved ? ' achieved' : '');
    pill.style.borderColor      = target.color;
    pill.style.backgroundColor  = target.color + '12';

    let bodyHTML = '';

    if (achieved) {
      bodyHTML = `<span class="goal-achieved-badge">✓ You've got this!</span>
                  <div class="goal-body" style="color:var(--muted);margin-top:6px">
                    ${(overall - target.min).toFixed(1)} overall pts above minimum
                  </div>`;
    } else {
      const advice = getGoalAdvice(percents, overall, target, ptsNeeded);
      bodyHTML = `<div class="goal-body" style="color:#374151;margin-top:4px">${advice}</div>`;
    }

    pill.innerHTML = `
      <div class="goal-letter" style="color:${target.color}">${target.letter}</div>
      <div class="goal-range">${target.label}</div>
      ${bodyHTML}
    `;

    row.appendChild(pill);
  }
}

// Figures out which category to focus on — gives concrete point advice
function getGoalAdvice(percents, overall, target, ptsNeeded) {
  const entered = CATEGORIES.filter(c => percents[c.id] !== null);
  if (entered.length === 0) return 'Enter more scores for advice!';

  // Rank by how much improvement is still possible (impact = room × weight)
  const ranked = entered.slice().sort((a, b) => {
    const impactA = (100 - percents[a.id]) * a.weight;
    const impactB = (100 - percents[b.id]) * b.weight;
    return impactB - impactA;
  });

  const best    = ranked[0];
  const maxGain = (100 - percents[best.id]) * best.weight;

  if (maxGain < ptsNeeded) {
    // Need multiple categories — show the top two
    const second = ranked[1];
    if (second) {
      return `Focus on <strong>${best.name}</strong> and <strong>${second.name}</strong> — those have the biggest impact on your grade.`;
    }
    return `You'll need to improve across <em>all categories</em>. Focus on <strong>${best.name}</strong> first.`;
  }

  // How many percentage points does this category need to go up?
  const pctIncreaseNeeded = ptsNeeded / best.weight;
  const newPct            = Math.min(100, percents[best.id] + pctIncreaseNeeded);

  // Convert to real points using the total the student entered
  const totalInput = parseFloat(document.getElementById(best.id + '-total').value);
  const earnedInput = parseFloat(document.getElementById(best.id + '-earned').value);

  if (!isNaN(totalInput) && totalInput > 0) {
    const currentPoints  = earnedInput;
    const neededPoints   = Math.ceil((newPct / 100) * totalInput);
    const extraPoints    = Math.ceil(neededPoints - currentPoints);
    return `Earn <strong style="font-size:15px">${extraPoints} more point${extraPoints === 1 ? '' : 's'} on ${best.name}</strong>
            <span style="color:var(--muted);font-size:12px;display:block;margin-top:3px">
              (${currentPoints} → ${neededPoints} out of ${totalInput})
            </span>`;
  }

  // Fallback if total not available
  return `Raise your <strong>${best.name}</strong> score from <strong>${percents[best.id].toFixed(0)}%</strong> to <strong>${newPct.toFixed(0)}%</strong>`;
}

// =============================================
//  CATEGORY BREAKDOWN BARS
// =============================================

function showBreakdown(percents) {
  const section = document.getElementById('breakdown-section');
  const list    = document.getElementById('breakdown-list');
  list.innerHTML = '';

  const entered = CATEGORIES.filter(c => percents[c.id] !== null);
  if (entered.length === 0) { section.hidden = true; return; }

  section.hidden = false;

  for (const cat of CATEGORIES) {
    const pct = percents[cat.id];
    const row = document.createElement('div');
    row.className = 'breakdown-row';

    row.innerHTML = `
      <span class="breakdown-label">${cat.name}</span>
      <div class="breakdown-bar-bg">
        <div class="breakdown-bar-fill"
             style="background:${cat.color}; width:${pct !== null ? pct : 0}%">
        </div>
      </div>
      <span class="breakdown-val">
        ${pct !== null ? pct.toFixed(1) + '%' : '<span style="color:#9ca3af">—</span>'}
      </span>
    `;
    list.appendChild(row);
  }
}

// =============================================
//  HIDE ALL RESULTS
// =============================================

function hideResults() {
  document.getElementById('weakness-card').hidden    = true;
  document.getElementById('goals-section').hidden    = true;
  document.getElementById('breakdown-section').hidden = true;
}

// =============================================
//  WIRE UP ALL INPUTS
// =============================================

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => input.addEventListener('input', calculate));
});
