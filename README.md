# ⚡ Rahul E — Interactive Backend Developer Portfolio

A fully responsive, premium 3D animated, software command-center developer portfolio showcasing backend development competencies, database systems knowledge, and academic credentials.

The site is built with a black-white-blue high-tech aesthetic, resembling a terminal dashboard.

---

## 🛠️ Tech Stack & Key Integrations

* **Core Framework**: React.js (v19) & Vite (v8)
* **Styling System**: Tailwind CSS (v4) with native Vite integration
* **3D Visualizer**: Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
* **Motion Graphics**: Framer Motion for scroll-visibility, layouts, and page entrance animations
* **Social Icons**: React Icons

---

## 📂 Project Directory Structure

```text
src/
  ├── components/
  │     ├── CodeRunnerLoader.jsx      # Full-width 7-second Code Runner vehicle loader
  │     ├── SideDock.jsx              # Fixed vertical side dock (desktop) & compact bottom bar (mobile)
  │     ├── CursorGlow.jsx            # Smooth spring-following cursor background parallax
  │     ├── HeroCommandCenter.jsx     # Header workspace with roles typewriter, console logs, and R3F mount
  │     ├── BackendThreeScene.jsx     # Interactive 3D layout (Server, Database, API, IDE) with sways & platters
  │     ├── ProfileSystem.jsx         # Bio data formatted as JS objects and interactive counters
  │     ├── SkillMatrix.jsx           # Competency progress bars grouped by development category
  │     ├── ProjectArchitecture.jsx   # Flow diagram simulations & GitHub repositories showcasing
  │     ├── EducationTimeline.jsx     # Academic timeline timeline showing MCA & BCA milestones
  │     ├── AchievementVault.jsx      # Digital badge wall showcasing certifications with 3D hover/tap flips
  │     ├── ContactTerminal.jsx       # Validation console input contact form
  │     └── Footer.jsx                # Quick anchors & branding footer
  ├── data/
  │     ├── certifications.js         # Certification descriptions and code records
  │     ├── skills.js                 # Skill proficiency ratings, categories, and colors
  │     └── projects.js               # Projects content, architectures, and demo details
  ├── App.jsx                         # Main layout wrapper coordinating loading state
  ├── main.jsx                        # React root setup
  └── index.css                       # Global styles, typography, scrollbars, and neon keyframes
```

---

## ✨ Key Features

1. **Code Runner Loading Sequence**: A visual loading bar featuring a compiled tech-vehicle moving from left to right as the compiling percentage updates from 0% to 100%.
2. **Command-Center Hero**: Typing roles, simulated compilation logging, ping latency gauges, and developer cards.
3. **Interactive 3D Backend Scene**: Interactive nodes (IDE Console, API Router, Server Blade, Database cylinders) featuring dynamic mouse parallax, floating sways, blinking LEDs, and platters spinning in opposite directions.
4. **Adaptive Left Side Dock**: A sticky vertical bar with slide-out tooltips that collapses to a touch-friendly bottom dock on mobile.
5. **Achievement Vault**: Digital badges highlighting OCI, SAP, Java, and NPTEL achievements, supporting full 3D flip card animations (hover on desktop, click/tap on mobile).
6. **Responsive Diagnostics Form**: Formatted like a coding terminal with client-side regex validations and sending logs.

---

## ⚙️ Local Installation & Development

To run this project locally, ensure you have [Node.js](https://nodejs.org) installed on your system (v18+ recommended).

### 1. Navigate to Project Directory
```bash
cd c:/Users/rahul/OneDrive/Desktop/portfolio
```

### 2. Install Project Dependencies
Run `npm install` with `--legacy-peer-deps` to ensure dependency resolutions between React 19 and `@react-three/fiber` matching package specifications:
```bash
npm install --legacy-peer-deps
```

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Create Production Build
To create a minified, production-ready bundle inside the `dist` folder:
```bash
npm run build
```

---

## 🚀 Hosting & Deployment

### Deploying to Vercel
1. Sign up/log in at [Vercel](https://vercel.com).
2. Connect your GitHub repository to Vercel.
3. Select standard config:
   * **Framework Preset**: `Vite`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
4. Click **Deploy**.

### Deploying to Netlify
1. Sign up/log in at [Netlify](https://netlify.com).
2. Connect your GitHub repository.
3. Set the build parameters:
   * **Build Command**: `npm run build`
   * **Publish Directory**: `dist`
4. Click **Deploy Site**.

---

## 👤 Contact & System Log
* **Developer**: Rahul E (Bengaluru, Karnataka)
* **Email**: rahul01032005@gmail.com
* **Phone**: +91 7619533115
* **GitHub**: [github.com/Rahul01032005](https://github.com/Rahul01032005)
* **LinkedIn**: [linkedin.com/in/rahul-e-5624b5287](https://linkedin.com/in/rahul-e-5624b5287)
