# 📂 Code Guide — Harmain Portfolio

Yeh ek **Next.js 16 + React 19 + Tailwind CSS v4 + Framer Motion** ka portfolio website hai (Direct Response Video Editor ke liye).

Niche har woh file likhi hai jisme **asli code** hai — kya kaam karti hai, aur **kya change karna ho to kahan jaana hai**.

---

## 🟢 Sabse zaroori files (yahan aksar changes hote hain)

### 1. [app/page.tsx](app/page.tsx) — ⭐ MAIN PAGE (sab kuch yahan hai)
Pura homepage isi ek file mein hai. Saari sections, text, aur video links yahin hain.

| Kya cheez | Line ke aas-paas | Detail |
|-----------|------------------|--------|
| Section ki images | ~13–22 | `heroImage`, `aboutImage`, etc. |
| Skills list | ~24 | `skills` array |
| Interests list | ~30 | `interests` array |
| Workflow steps | ~36 | `workflowSteps` array (4 steps) |
| **Featured videos (15)** | ~64 | `featuredVideos` — yahan Cloudinary links `file: ""` mein paste karo |
| **More videos (15)** | ~86 | `moreVideos` — dusra video section |
| Experience cards | ~104 | `experienceCards` array |
| Animations | ~120–154 | `containerVariants`, `itemVariants`, `scaleIn` |
| **`VideoCard` component** | ~236 | Click-to-play video card — thumbnail + play button (niche dekho) |
| Hero ka naam / heading | ~358 | "Harmain Ali" aur tagline |
| Hero ka intro paragraph | ~370 | About text |
| **Email** | ~834 | `harmainali1503@gmail.com` |
| **WhatsApp / phone** | ~847 | `+93 312 212 9751` |

> 💡 **Video link add karna ho** → `featuredVideos` / `moreVideos` mein `file: ""` ke andar link daalo.
> 💡 **Text / naam / email / phone change** → upar table ke hisaab se line dhoondo.

#### 🎬 Videos kaise kaam karti hain — `VideoCard` (~line 236)
- Videos **click-to-play** hain (bandwidth bachane ke liye). Page khulte hi video download **nahi** hoti.
- Pehle ek **thumbnail + play button (▶)** dikhta hai. Click karne par video **awaaz ke saath** chalti hai.
- Thumbnail Cloudinary se auto-banta hai: video URL ki `.mp4` ko `.jpg` se badal kar (`poster` variable).
- `file: ""` khaali ho to "Add Cloudinary link" placeholder dikhta hai.
- Iski styling [app/globals.css](app/globals.css) mein `.video-thumb` aur `.video-play-btn` classes mein hai.

---

### 2. [app/layout.tsx](app/layout.tsx) — Root layout
- Pura site ka wrapper. Header aur Footer yahin lagte hain.
- **Fonts** (Manrope + Space Grotesk) yahan set hain.
- **Page title aur SEO description** (`metadata`, line ~17) yahan change hoti hai — browser tab ka naam.
- `<body>` par `suppressHydrationWarning` laga hai — yeh browser extensions (jaise Grammarly) ki wajah se aane wali hydration warning ko rokta hai. Ise hatana mat.

---

### 3. [app/components/Header.tsx](app/components/Header.tsx) — Upar wala navbar
- Top par sticky navigation bar.
- Logo naam ("Harmain Ali"), nav links (Work, Workflow, Experience, Contact), aur "Let's Connect" button.
- **Menu ke links change karne ho** → yahan.

---

### 4. [app/components/Footer.tsx](app/components/Footer.tsx) — Niche wala footer
- Site ka footer: naam, tagline, aur copyright year (apne aap update hota hai).

---

### 5. [app/globals.css](app/globals.css) — ⭐ Saari styling / design
- Pura look-and-feel yahan hai (colors, cards, animations).
- **Colors / theme** → `:root` mein (line ~3): background, accent (`#5bd4ff`), etc.
- **Card design, video frame, scroll-progress bar, glowing orbs** → custom classes.
- **Video thumbnail + play button** → `.video-thumb` aur `.video-play-btn` classes.
- **Video grid** (3 columns desktop par) → `.video-reel`.
- **Animations** (`fade-up`, `float`, `glow`) → niche `@keyframes`.

> 💡 **Rang / design badalna ho** → yahin aao.

---

## 🟡 Config files (sirf zaroorat par chedo)

| File | Kya karti hai |
|------|---------------|
| [package.json](package.json) | Dependencies aur scripts (`dev`, `build`, `start`, `lint`). Next 16, React 19, Framer Motion, Tailwind 4. |
| [next.config.ts](next.config.ts) | Next.js ki settings. |
| [tsconfig.json](tsconfig.json) | TypeScript settings. |
| [eslint.config.mjs](eslint.config.mjs) | Code linting rules. |
| [postcss.config.mjs](postcss.config.mjs) | Tailwind/PostCSS setup. |

---

## ⚪ Doosri files (code nahi — aam taur par chedne ki zaroorat nahi)

- **[public/images/](public/images/)** — section ki tasveerein (hero, about, workflow, etc.).
- **[public/](public/)** ke SVG icons (`file.svg`, `globe.svg`, etc.) — Next.js ke default, mostly unused.
- **app/favicon.ico** — browser tab ka icon.
- **README.md** — Next.js ka default readme.
- **.gitignore / .node-version / package-lock.json** — tooling files.

---

## ⚡ Quick reference — "Mujhe ___ change karna hai, kahan jaaun?"

| Kaam | File | Jagah |
|------|------|-------|
| Video links daalna | [app/page.tsx](app/page.tsx) | `featuredVideos` (~64), `moreVideos` (~86) |
| Video chalne ka tareeqa (play button/thumbnail) | [app/page.tsx](app/page.tsx) | `VideoCard` (~236) |
| Naam / heading / intro text | [app/page.tsx](app/page.tsx) | Hero section (~358) |
| Email ya phone number | [app/page.tsx](app/page.tsx) | Contact section (~834, ~847) |
| Skills / Interests | [app/page.tsx](app/page.tsx) | `skills` (~24), `interests` (~30) |
| Workflow steps | [app/page.tsx](app/page.tsx) | `workflowSteps` (~36) |
| Menu / navbar links | [app/components/Header.tsx](app/components/Header.tsx) | poori file |
| Footer text | [app/components/Footer.tsx](app/components/Footer.tsx) | poori file |
| Browser tab title / SEO | [app/layout.tsx](app/layout.tsx) | `metadata` (~17) |
| Colors / design / animations | [app/globals.css](app/globals.css) | poori file |
| Images | [public/images/](public/images/) | + page.tsx ke top par naam (~13) |

---

*Build/run karne ke liye:* `npm run dev` (development) ya `npm run build` (production).
