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

This site is deployed via **GitHub → Netlify**. Netlify is linked to the GitHub repository and redeploys automatically on every push.

### First-time setup
1. Push the project files to a GitHub repository
2. Go to [netlify.com](https://netlify.com) and log in
3. Click **Add new site → Import an existing project** and choose **GitHub**
4. Select your repository to link it to Netlify
5. Leave build settings blank (no build command needed — it's plain HTML/CSS/JS)
6. Click **Deploy site** — Netlify gives you a URL like `2026-math8.netlify.app`
7. Share the link with students!

### To update the site
1. Edit your files locally
2. Push to GitHub (`git add`, `git commit`, `git push`)
3. Netlify automatically detects the push and redeploys — no manual steps needed

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

## Author

Built by **Ned Nguyen** for Ms. Shiline Nguyen's Math 8 class at Room 209.

---

## License

MIT License

Copyright (c) 2025 Ned Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

