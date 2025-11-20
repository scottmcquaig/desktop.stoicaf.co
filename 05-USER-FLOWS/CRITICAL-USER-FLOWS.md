# Critical User Flows

## 1. First-Time User Onboarding

### Flow Diagram
```
Landing → Sign Up → Choose Virtue → Select Tone → Enable Notifications → First Entry
```

### Detailed Steps

1. **Landing Screen**
   - User sees value proposition
   - Swipes through 3 benefit cards
   - Taps "Start Your Journey"

2. **Authentication**
   - Choose sign-up method (Email/Google/Apple)
   - Enter credentials
   - Verify email (if email signup)

3. **Virtue Selection**
   - Presented with 4 pillars
   - Reads description of each
   - Selects primary focus
   - System assigns 30-day track

4. **Tone Preference**
   - ChadGPT personality options shown
   - Preview each tone with sample
   - Selects preferred coaching style
   - Can change later in settings

5. **Notification Setup**
   - System requests permission
   - User accepts/declines
   - If accepted, choose time
   - Skip option available

6. **First Entry**
   - Guided first prompt appears
   - Tutorial tooltips explain features
   - User writes first entry
   - Celebrates completion (animation)

### Success Metrics
- Completion rate > 70%
- Time to complete < 3 minutes
- Drop-off points identified

---

## 2. Daily Journaling Routine

### Morning Flow
```
Notification → Open App → Today View → Morning Prompt → Write → Save
```

### Detailed Steps

1. **Morning Trigger**
   - Push notification at chosen time
   - Or user opens app directly
   - App opens to Today view

2. **Today View**
   - Shows today's theme (from track)
   - Stoic quote of the day
   - Morning intention prompt
   - Progress indicators (streak, mood)

3. **Start Writing**
   - Taps "Start Morning Entry"
   - Prompt expands to full screen
   - Keyboard appears automatically
   - Timer shows (optional)

4. **Writing Experience**
   - Auto-save every 10 seconds
   - Word count updates live
   - Markdown formatting available
   - Can minimize to think

5. **Completion**
   - Taps "Done" or swipes down
   - Chooses mood (1-5 scale)
   - Adds optional tags
   - Sees streak update animation

### Evening Flow
```
Evening Notification → Open Entry → Evening Prompt → Reflect → Complete Day
```

1. **Evening Trigger**
   - Push notification
   - Opens to existing entry
   - Shows evening reflection prompt

2. **Reflection Writing**
   - Adds to morning entry
   - Dichotomy of control exercise
   - Three good things
   - Tomorrow's intention

3. **Day Completion**
   - Entry marked complete
   - Streak updates
   - Optional share quote
   - Tomorrow preview

---

## 3. AI Coach Interaction

### Flow
```
Entry Screen → Tap CHAD → Choose Context → Chat → Get Insights → Return to Journal
```

### Detailed Steps

1. **Initiation**
   - User taps floating CHAD button
   - Or selects from menu
   - Or triggered by mood/content

2. **Context Setting**
   - System suggests relevant topic
   - Or user describes situation
   - Choose urgency level

3. **Conversation**
   - Chad responds in chosen tone
   - User can ask follow-ups
   - Max 5 exchanges per session
   - Can save insights to journal

4. **Conclusion**
   - Chad provides summary
   - Suggests action items
   - User rates helpfulness
   - Returns to journal

---

## 4. Weekly AI Summary

### Flow
```
Sunday Notification → View Summary → Read Insights → Set Next Week Focus → Share/Save
```

### Detailed Steps

1. **Summary Generation**
   - Automated Sunday morning
   - Processes week's entries
   - Generates insights

2. **Viewing Summary**
   - Push notification appears
   - Opens to summary screen
   - Formatted in sections

3. **Summary Contents**
   - Week's themes
   - Emotional patterns
   - Progress on virtue
   - Suggested focus areas
   - Recommended practices

4. **User Actions**
   - Save to journal
   - Share externally (text only)
   - Set reminder for practice
   - Adjust next week's focus

---

## 5. Subscription Upgrade

### Flow
```
Hit Limit → Paywall → View Benefits → Choose Plan → Payment → Unlock Features
```

### Detailed Steps

1. **Trigger Points**
   - Attempts AI remix (3rd time)
   - Views old entries (>7 days)
   - Requests weekly summary
   - Exceeds prompt limit

2. **Paywall Presentation**
   - Soft block (can dismiss)
   - Shows what they're missing
   - Benefit comparison chart
   - Social proof (testimonials)

3. **Plan Selection**
   - Monthly vs Annual choice
   - Savings highlighted
   - Free trial option shown
   - Student discount mention

4. **Payment Process**
   - Apple/Google Pay preferred
   - Stripe fallback
   - Process payment
   - Instant activation

5. **Post-Purchase**
   - Thank you message
   - Feature tour
   - First Pro prompt
   - Refund policy noted

---

## 6. Quick Capture

### Flow
```
Any Screen → Long Press FAB → Speak/Type → Save → Continue
```

### Detailed Steps

1. **Activation**
   - Long press FAB
   - Or shake device
   - Or widget tap
   - Or ⌘+K on web

2. **Capture Mode**
   - Modal overlay appears
   - Voice or text option
   - No prompts, just capture
   - <280 character limit

3. **Processing**
   - Auto-saves to today's entry
   - Tagged as "quick thought"
   - Timestamp added
   - Returns to previous screen

---

## 7. Search and Insights

### Flow
```
Tab to Insights → View Charts → Filter/Search → Read Entry → Find Patterns
```

### Detailed Steps

1. **Insights Access**
   - Tap insights tab
   - Dashboard loads
   - Shows last 30 days default

2. **Data Visualization**
   - Mood trend line
   - Word cloud
   - Virtue progress wheel
   - Streak calendar

3. **Search Function**
   - Tap search bar
   - Enter keywords/tags
   - Filter by date/mood
   - Results appear below

4. **Entry Review**
   - Tap entry to expand
   - Read in modal
   - Navigate prev/next
   - Can edit if today's

---

## 8. Error Recovery Flows

### Lost Connection
```
Writing → Connection Lost → Notification → Local Save → Auto-sync When Restored
```

### Payment Failure
```
Payment Attempt → Failure → Error Message → Retry Options → Alternative Payment → Success
```

### Forgot Password
```
Login Screen → Forgot Password → Enter Email → Check Email → Reset Link → New Password → Login
```

---

## Critical Path Analysis

### Must Never Fail
1. Local save of entries
2. Offline journaling
3. Streak preservation
4. Data encryption

### Can Degrade Gracefully
1. AI features → fallback prompts
2. Sync → queue for later
3. Images → text only
4. Analytics → sample data

### Recovery Priorities
1. Restore user data first
2. Maintain streak count
3. Sync when possible
4. Notify of issues clearly

---

## Flow Optimization Targets

### Speed Metrics
- App launch to writing: < 3 taps
- Quick capture: < 5 seconds
- AI response: < 2 seconds
- Save confirmation: < 500ms

### Completion Metrics
- Onboarding: > 70% complete
- Daily entry: > 50% daily active
- Weekly summary: > 80% read rate
- Upgrade: > 10% convert

### Drop-off Points to Monitor
1. Email verification
2. Notification permission
3. First entry completion
4. Day 7 retention
5. Payment form

---

## A/B Testing Opportunities

### Onboarding
- Skip vs mandatory setup
- 3 vs 5 onboarding screens
- Virtue selection first vs last

### Daily Use
- Morning vs evening prompts
- Push vs pull notifications
- Guided vs free writing

### Monetization
- Soft vs hard paywall
- Trial vs freemium
- Price points testing