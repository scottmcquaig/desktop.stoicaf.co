# **Stoic.af – Product Requirements & Design (Revised 2025)**

*(Markdown Version)*


## **1. Introduction**

### **1.1 Purpose & Vision**

Stoic.af is a mobile-first journaling and coaching platform designed to help people build the four virtues of **Money, Ego, Relationships, and Discipline** through daily reflection. Inspired by the Stoic tradition of *Meditations*, it gives users a structured *“living notebook”* where they add one entry per day, combine multiple templates, and receive adaptive suggestions tied to their focus.

Modern research on journaling shows that writing about one’s experiences improves mental clarity, emotional stability and personal growth. Stoic philosophers like Marcus Aurelius used journals to think more clearly and live more virtuously. Stoic.af brings this practice into a friendly digital app that works offline, uses simple AI to remix prompts and summarise weekly themes, and encourages users to take ownership of their behaviour and choices.

### **1.2 Scope**

This PRD covers Stoic.af 2.0 with the four-pillar focus, including:

* target users
* program design
* features
* data model
* style guide
* architecture
* AI strategy
* roadmap
* privacy & security

The primary platform will be **Flutter + Firebase**, with a desktop/web version using **Next.js** released later.

---

## **2. Target Users & Personas**

Stoic.af is designed for people who want structured improvement across Money, Ego, Relationships, and Discipline.

### **2.1 The Rebuilder (30–55)**

Professionals or parents going through a reset (burnout, divorce, career transition). They want structure and rely on consistent journaling to regain clarity.

### **2.2 The Stoic-in-Training (20–50)**

Users intrigued by Stoicism but bored by academic explanations. They want blunt, practical, humorous guidance.

### **2.3 The High-Performer on the Edge (28–45)**

Ambitious professionals/founders with internal chaos behind their success. They seek emotional balance, ego management, and disciplined routines.

Each persona chooses one of the four pillars and progresses through a **30-day structured track**.

---

## **3. Programs & Content: The Four Pillars**

Each pillar has a **30-day JSON track**:

* Money Track 
* Ego Track 
* Relationships Track 
* Discipline Track 

Each track contains:

* **Daily Theme**
* **Stoic Quote**
* **Bro Translation** (on-brand tone)
* **Daily Challenge**
* **Daily Intention**
* **Evening Prompts**

### **3.1 Daily Entry System**

Users write **one living entry per day**, adding multiple templates such as:

* Morning Intent
* Dichotomy of Control
* Evening Audit

Templates define the structure/questions for each section.

### **3.2 Prompt Engine**

Prompts come from:

1. **Pillar Track** – the user’s selected focus
2. **Quick Audit** – based on tagged patterns in previous entries
3. **Prompt Library** – curated evergreen prompts, optionally AI-remixed

AI is used minimally.

### **3.3 Modes & Streaks**

* Streak tracking
* Virtue Progress Wheel
* Pillar scoring
* Compassionate resets

---

## **4. Unique Selling Points**

### **4.1 Living Notebook**

One daily entry that evolves across the day with stacked templates.

### **4.2 Four-Pillar Programs**

30-day guided programs targeting:

* Money
* Ego
* Relationships
* Discipline

### **4.3 Adaptive Prompt Engine**

Local logic + low-cost AI for remixing.

### **4.4 Weekly AI Reflections**

Summaries highlighting:

* themes
* progress
* suggestions

### **4.5 Privacy-First**

Client-side encryption, Firestore row-level security, App Check.

### **4.6 Cross-Platform**

* Mobile: Flutter
* Desktop: Next.js

---

## **5. Platform & Technology**

### **5.1 Flutter + Firebase**

* Framework: Flutter 3.x
* State: Riverpod / Bloc
* Backend: Firestore, Functions, Storage, Auth
* Offline: Firestore caching + Hive
* AI: Gemini 1.5 Flash via Genkit
* Payments: Stripe extension + in-app purchases
* CI/CD: GitHub Actions + Firebase App Distribution

### **5.2 Next.js Web**

* Next.js 14+ App Router
* Firebase Auth + SSR
* IndexedDB for offline
* Shared design tokens

---

## **6. Data Model**

### **Collections**

#### **users**

* focus
* tone
* timezone
* streakCount
* subscriptionStatus
* tokenBucket
* onboardingCompleted

#### **entries**

* userId
* date
* templates[]
* encrypted content
* mood
* tags
* pillarScore
* aiUsed
* timestamps

#### **tracks**

* pillar
* dayNumber
* theme
* stoicQuote
* translation
* challenge
* intention
* reflectionPrompts

#### **prompts**

* category
* intensity
* templateType
* text
* cooldownDays

#### **promptEvents**

* log of prompt usage, remix requests, token consumption

#### **weeklySummaries**

* summaryMarkdown
* themes
* suggestedNextSteps
* tokenUsage

---

## **7. Functional Requirements**

### **7.1 Onboarding**

* Create account
* Select pillar focus
* Choose coaching tone (Gentle, Reality Check, Drill Sergeant, ChadGPT)
* Configure reminders
* Privacy consent

### **7.2 Journaling Loop**

* Daily entry stub
* Add templates
* Prompt engine selects questions
* Remix (AI optional)
* Autosave + offline
* Mood & tags
* QuickCapture + voice input
* Daily intentions & challenges
* Evening reflection

### **7.3 Dashboard**

* Streak
* Mood trend
* Quick entry & coach
* Daily Stoic quote
* Journal list
* Insights (heatmaps, virtue wheel, tag frequency)
* Weekly summaries

### **7.4 Coaching & AI**

* ChadGPT chat
* Program recommendations
* Token budget enforcement
* Deterministic fallback

### **7.5 Admin**

* Manage tracks, templates, prompt library
* No access to journals
* Monitor usage, AI costs, subscriptions
* Feature flags

---

## **8. Style Guide**

### **8.1 Colors**

Primary palette:

| Token       | Hex         | Usage             |
| ----------- | ----------- | ----------------- |
| stoic.blue  | **#4B90C8** | Primary           |
| stoic.dark  | **#1E293B** | Dark cards / text |
| stoic.light | **#F8FAFC** | Background        |
| stoic.gray  | **#64748B** | Secondary text    |

### **8.2 Typography**

* Sans: **Inter**
* Serif quotes: **Playfair Display**
* Display: 32px
* Section: 24px
* Card titles: 18px
* Body: 15–16px
* Overlines: 12px

### **8.3 Components**

* 16px padding
* Rounded cards (10–16px)
* Subtle shadows
* Pill buttons (primary blue)
* Bottom nav (mobile)
* Sidebar (desktop)
* Search bars + inputs with 10px radius
* Minimal animations
* Fully supported dark mode

### **8.4 Tokens**

Shared JSON tokens consumed by Flutter and Next.js.

---

## **9. AI Strategy**

* Remix prompts via Gemini Flash
* Weekly summaries generated server-side
* Guardrailed ChadGPT
* Cost control through token buckets
* Offline deterministic fallback

---

## **10. Roadmap**

### **Phase 1 – Mobile (3 Sprints)**

* Sprint 1: Setup, onboarding, templates
* Sprint 2: Prompt engine, tracks, moods/tags
* Sprint 3: AI, summaries, cost tracking

### **Phase 2 – Web/Desktop (2 Sprints)**

* Sprint 4: Next.js client
* Sprint 5: Admin + payments

### **Phase 3 – Launch**

* Sprint 6: QA, security, a11y
* Sprint 7: Beta → public launch

---

## **11. Privacy & Security**

* Client-side encryption
* Firestore row-level rules
* AI receives only what’s necessary
* GDPR/CCPA-ready
* App Check enabled

---

## **12. Monitoring**

* Firebase Emulator Suite
* Unit + widget tests
* React Testing Library
* Performance Monitoring
* Accessibility testing
* Genkit AI usage monitoring

---

## **13. Conclusion**

Stoic.af blends timeless Stoic practice with modern digital structure to help users develop Money, Ego, Relationships, and Discipline. With adaptive prompts, a living notebook, weekly AI reflections, and a privacy-first design, it delivers a meaningful self-improvement experience grounded in virtue and daily action.

---
