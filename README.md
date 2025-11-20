# Stoic.af — Mobile-First Stoic Journaling App  
Build habits across Money • Ego • Relationships • Discipline

Stoic.af is a mobile-first journaling and coaching platform designed to help users build resilience and self-mastery through the four Stoic pillars. Inspired by *Meditations*, it provides a daily “living notebook,” adaptive prompts, low-cost AI summaries, and 30-day tracks that help users improve consistently without overwhelm.

---

## 🚀 Features

### Four Pillars (30-Day Tracks)
Each track includes:
- Daily theme  
- Stoic quote  
- Bro-translation  
- Daily challenge  
- Intention  
- Evening reflection prompts  

Tracks are sourced from JSON:
- `ego-track.json`
- `discipline-track.json`
- `relationships-track.json`
- `money-track.json`

### Living Notebook
Users get *one daily entry* that evolves during the day:
- Morning Intent  
- Dichotomy of Control  
- Evening Audit  
- Custom templates  

### Adaptive Prompt Engine
Prompts are chosen from:
1. Pillar track  
2. Quick audit (tags + patterns from past entries)  
3. Prompt library  
4. Optional AI remix (Gemini Flash)

### Weekly AI Reflection
A single Cloud Function summarises:
- Themes  
- Wins  
- Struggles  
- Suggested next steps  

AI usage cost is capped to ~\$0.20/user/month.

### ChadGPT AI Coach
Tone options:
- Gentle  
- Reality Check  
- Drill Sergeant  
- ChadGPT  

---

## 🧱 Architecture

### Mobile (Primary Platform)
- Flutter 3.x  
- Riverpod / Bloc  
- Firebase Auth + Firestore  
- Firestore offline persistence  
- Hive for local drafts  
- Genkit + Gemini Flash  
- Stripe In-App Purchases  

### Web/Desktop (Phase 2)
- Next.js 14 App Router  
- Firebase Auth SSR  
- IndexedDB for offline  

---

## 📦 Data Model Overview

### Collections
- `users` — focus, tone, streak, subscription, token bucket  
- `entries` — encrypted content, mood, tags, pillar scores  
- `tracks` — 30-day program structure  
- `prompts` — reusable journaling prompts  
- `promptEvents` — AI usage logging  
- `weeklySummaries` — generated summaries  
- `subscriptions` — Stripe sync  
- `adminSettings` — flags & versions  

---

## 🎨 Design System

### Colors
```text
stoic.blue  #4B90C8  
stoic.dark  #1E293B  
stoic.light #F8FAFC  
stoic.gray  #64748B  
```

### Typography  
- Inter (UI)  
- Playfair Display (Quotes)

### Components  
- Rounded cards (10–16px)  
- Pill buttons  
- Bottom nav (mobile)  
- Sidebar (desktop)  
- Search & inputs w/ 10px radius  

All tokens are shared across Flutter & Next.js.

---

## 🛡 Privacy & Security
- Client-side encryption  
- Firestore row-level security  
- No admin can access journals  
- AI receives only summaries or prompts  
- App Check enabled  
- GDPR/CCPA compliant  

---

## 🗺 Roadmap

### Phase 1 — Mobile App  
- Foundations  
- Prompt engine  
- Tracks  
- Summaries  
- ChadGPT  

### Phase 2 — Desktop/Web  
- Next.js app  
- Admin console  
- Payments  

### Phase 3 — Launch  
- QA / Security  
- Accessibility  
- Beta  
- Production  

---

## 👥 Contributors

Built by SwgSzn LLC.  
Design direction by Stoic.af brand.  
AI assistance by ChadGPT.

---

## 📄 License
Proprietary — All rights reserved.
