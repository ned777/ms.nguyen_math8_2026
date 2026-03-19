# Ms. Nguyen's Grade Check — Math 8
**Room 209 · 2025–2026**

A student-facing grade calculator for **Math 8**. Students enter their scores and instantly see their current grade, their weakest category, and exactly what they need to reach the next grade level.

---

## File Structure

```
Math 8/
├── index.html       ← Main webpage (open this in a browser)
├── app.js           ← All grade logic
├── style.css        ← All styling
├── a.jpg            ← Ms. Nguyen image (A grade)
├── b.jpg            ← Ms. Nguyen image (B grade)
├── c.jpg            ← Ms. Nguyen image (C grade)
├── d.jpg            ← Ms. Nguyen image (D grade)
└── f.jpg            ← Ms. Nguyen image (F grade)
```

> Note: All image files (`a.jpg` through `f.jpg`) **must be in the same folder** as `index.html` or the images will not load.

---

## Grading Weights

| Category | Weight |
|---|---|
| Tests | 35% |
| Homework | 30% |
| Classwork/Quizzes | 25% |
| Projects | 10% |

---

## Grade Scale

| Grade | Range |
|---|---|
| A | 90–100% |
| B | 80–89% |
| C | 70–79% |
| D | 60–69% |
| F | Below 60% |

---

## Features

- **Live grade calculation** — updates instantly as you type
- **Over 100% support** — extra credit scores (e.g. 19/10 = 190%) count correctly
- **Ms. Nguyen reaction images** — her expression changes based on your grade
- **Weakness detector** — highlights your lowest category (hidden automatically when all scores are 90%+)
- **Goal advisor** — tells you exactly what % you need on a specific category to reach the next grade
  - Example: *"Keeping your Tests and Homework the same, you need at least 78.5% on Classwork/Quizzes to get a B"*
- **Category breakdown bars** — visual progress bars for each category
- **Mobile-friendly** — works on phones and tablets, all 4 images show on mobile
- **Tutoring reminder** in the footer: Tues & Thurs 2:30–3:00 PM

---

## How to Deploy (Netlify)

1. Go to [netlify.com](https://netlify.com) and log in
2. Drag and drop your **Math 8** folder onto the Netlify dashboard
3. Netlify gives you a URL like `room209-grades.netlify.app`
4. Share the link with students!

> To update the site, just drag and drop the updated files again.

---

## How to Edit

### Change grading weights
Open `app.js` and find the `CATEGORIES` array at the top:
```js
const CATEGORIES = [
  { id: 'test', name: 'Tests',              weight: 0.35, ... },
  { id: 'hw',   name: 'Homework',           weight: 0.30, ... },
  { id: 'cq',   name: 'Classwork/Quizzes',  weight: 0.25, ... },
  { id: 'proj', name: 'Projects',           weight: 0.10, ... },
];
```
Change the `weight` values — they must always add up to `1.0`.

### Change the grade scale
In `app.js`, find the `GRADES` array:
```js
const GRADES = [
  { letter: 'A', min: 90, ... },
  { letter: 'B', min: 80, ... },
  ...
];
```

### Change tip messages
In `app.js`, find the `TIPS` object and edit the text for any category:
```js
const TIPS = {
  test: 'Tip: ...',
  hw:   'Tip: ...',
  cq:   'Tip: ...',
  proj: 'Tip: ...',
};
```

### Change image size or border
In `style.css`, find `.teacher-img` and adjust `width`, `height`, or `border`.

### Change colors
In `style.css`, find the `:root` block at the top and edit the CSS variables:
```css
:root {
  --test:    #6366f1;  /* purple  */
  --hw:      #ec4899;  /* pink    */
  --cq:      #0ea5e9;  /* blue    */
  --proj:    #10b981;  /* green   */
  --grade-a: #10b981;
  --grade-b: #0ea5e9;
  --grade-c: #f59e0b;
  --grade-d: #f97316;
  --grade-f: #ef4444;
}
```

---

## Mobile Notes

- Cards display in a **2-column grid** on small screens
- **All 4 Ms. Nguyen images** show on mobile (2 left, 2 right of the grade bubble)
- The grade bubble and images scale down automatically
- Page is locked to screen width — no horizontal scrolling

---

## Tech Stack

| Tool | Purpose |
|---|---|
| HTML | Page structure |
| CSS | Styling and responsive layout |
| Vanilla JavaScript | Grade calculations and DOM updates |
| Google Fonts | Fredoka One (headings) + Nunito (body) |

No frameworks, no build tools, no dependencies — just open `index.html` in any browser.
Or visit the published link: https://2026-math8.netlify.app.

---


