<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Recharts-2.x-FF6384?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Zustand-5.x-764ABC?style=for-the-badge" />
</p>

# 🛡️ SafeVoice — AI-Powered Harassment Reporting & Escalation Platform

> **Confidential. Anonymous. Accountable.**
>
> SafeVoice is an AI-powered harassment reporting and escalation platform built for **VNR VJIET** (Vignana Jyothi Institute of Engineering and Technology). It enables students, faculty, and staff to file confidential reports without revealing their identity while providing institutional oversight through SLA-enforced workflows, AI classification, and an immutable audit trail.

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Screen Overview](#-screen-overview-12-screens)
- [User Flows](#-user-flows)
- [Getting Started](#-getting-started)
- [Demo Credentials](#-demo-credentials)
- [Color System & Design Tokens](#-color-system--design-tokens)
- [AI Classification Schema](#-ai-classification-schema)
- [User Roles & Permissions](#-user-roles--permissions)
- [Route Map](#-route-map)
- [Team](#-team)

---

## 🔴 Problem Statement

Harassment on college campuses is **vastly underreported**. Survivors face:

- **Fear of retaliation** — reporting to authority figures who may be involved
- **Lack of anonymity** — existing systems require login with institutional IDs
- **No accountability** — complaints disappear into opaque processes with no tracking
- **No transparency** — institutions can suppress or delay investigations without oversight

**Result:** Only **1 in 10** incidents of campus harassment are formally reported (AISHE 2024).

---

## 💡 Our Solution

SafeVoice creates a **zero-identity reporting system** where:

1. **No login required** — reporters never share their name, email, or student ID
2. **AI-powered triage** — every report is automatically classified by severity, category, and criminal flags
3. **SLA-enforced workflows** — investigators have strict deadlines with automatic escalation
4. **Immutable audit trail** — every action is cryptographically hashed; no record can be altered or deleted
5. **Anonymous communication** — reporters and investigators can exchange messages via token-based access

---

## ✨ Key Features

### For Reporters (Public — No Login)
| Feature | Description |
|---------|-------------|
| 🔒 **Anonymous Reporting** | File reports without any personal identification |
| 📝 **Multi-Step Form** | Guided 6-step process: Category → Details → Context → Review → Submit |
| 🔑 **Secure Case Token** | Unique token (e.g., `SVX-1842-KQZM-8371`) — the only way to access your case |
| 📊 **Status Tracking** | Check SLA progress, timeline updates, and investigator messages anytime |
| 💬 **Anonymous Messaging** | Communicate with investigators without revealing identity |
| 📎 **Evidence Upload** | Attach screenshots, documents, audio — encrypted on upload |

### For Staff (Authenticated)
| Feature | Description |
|---------|-------------|
| 🤖 **AI Classification** | Automatic severity assessment (S1-S4), category detection, criminal flag check |
| ⏱️ **SLA Enforcement** | Color-coded progress bars (green/amber/red) with auto-escalation on breach |
| ✅ **Prima Facie Checklist** | Must-complete checklist before officer can proceed with investigation |
| ⚖️ **Conflict Declaration** | Officers must declare no conflict of interest before accessing case |
| 📈 **Admin Analytics** | Platform-wide metrics, charts, anomaly detection alerts |
| 🔗 **Immutable Audit Log** | Hash-chained records — tampering is immediately detectable |

---

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | Server-side rendering, file-based routing |
| **Language** | TypeScript | Type safety across the codebase |
| **Styling** | Tailwind CSS 4 | Utility-first responsive design |
| **State Management** | Zustand | Lightweight store for multi-step report form |
| **Charts** | Recharts | Bar charts, data visualizations on admin dashboard |
| **Icons** | Material Symbols (Google) | Consistent icon system throughout UI |
| **Fonts** | Public Sans + Roboto Mono | Sans-serif for UI, monospace for tokens/hashes |

### Planned Integrations (Phase 2)
| Technology | Purpose |
|-----------|---------|
| NextAuth.js | Role-based authentication |
| PostgreSQL + Prisma | Persistent database with ORM |
| Groq API | AI report classification engine |
| bcrypt + AES-256 | Token hashing and report encryption |

---

## 🏗️ Project Architecture

```
safevoice/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout (fonts, metadata)
│   │   ├── globals.css               # Design tokens & global styles
│   │   ├── login/page.tsx            # Staff authentication
│   │   ├── dashboard/page.tsx        # HR Officer dashboard
│   │   ├── admin/page.tsx            # Admin platform overview
│   │   ├── audit/page.tsx            # Immutable audit log
│   │   ├── cases/[id]/page.tsx       # Case detail view
│   │   ├── status/
│   │   │   ├── page.tsx              # Token input page
│   │   │   └── [token]/page.tsx      # Case status + timeline
│   │   └── report/
│   │       ├── category/page.tsx     # Step 1: Select incident type
│   │       ├── incidents/page.tsx    # Step 2: Date, location, details
│   │       ├── context/page.tsx      # Step 3: Witnesses, evidence, outcome
│   │       ├── review/page.tsx       # Step 4: Review before submit
│   │       ├── processing/page.tsx   # Step 5: Animated processing
│   │       └── submitted/page.tsx    # Step 6: Token confirmation
│   ├── components/
│   │   ├── Navbar.tsx                # Public navigation bar
│   │   ├── Footer.tsx                # Institutional footer
│   │   ├── SidebarNav.tsx            # Staff sidebar with user card
│   │   ├── ui/
│   │   │   ├── SeverityBadge.tsx     # S1(red) S2(amber) S3(blue) S4(gray)
│   │   │   ├── SLAProgressBar.tsx    # Color-coded deadline tracker
│   │   │   └── CaseStatusBadge.tsx   # Status dot indicators
│   │   └── report/
│   │       ├── ProgressBar.tsx       # Step X of 6 indicator
│   │       └── PrivacyBanner.tsx     # Encryption notice banner
│   └── store/
│       └── reportStore.ts            # Zustand store for form state
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## 📱 Screen Overview (12 Screens)

### Public Reporter Flow (7 Screens)

| # | Screen | Route | Description |
|---|--------|-------|-------------|
| 1 | **Landing Page** | `/` | Hero section, trust pillars, how-it-works, report categories |
| 2 | **Category Selection** | `/report/category` | 6 incident type cards with selection state |
| 3 | **Incident Details** | `/report/incidents` | Date pickers, location, description, pattern, respondent role |
| 4 | **Context & Evidence** | `/report/context` | Witnesses, drag-and-drop upload, desired outcome checkboxes |
| 5 | **Review Summary** | `/report/review` | All entries displayed in summary cards with edit links |
| 6 | **Processing** | `/report/processing` | Animated steps: Encrypt → AI Assess → Assign (auto-advances) |
| 7 | **Token Confirmation** | `/report/submitted` | Large monospace token, copy button, AI assessment, next steps |

### Status Check Flow (2 Screens)

| # | Screen | Route | Description |
|---|--------|-------|-------------|
| 8 | **Token Input** | `/status` | Enter case token to check status |
| 9 | **Case Status** | `/status/[token]` | SLA progress bar, event timeline, investigator messages |

### Staff Dashboard Flow (4 Screens)

| # | Screen | Route | Description |
|---|--------|-------|-------------|
| 10 | **Staff Login** | `/login` | Email/password with demo account quick-fill |
| 11 | **HR Dashboard** | `/dashboard` | 4 metric cards, SLA alert banner, assigned case table |
| 12 | **Case Detail** | `/cases/[id]` | AI classification, incident details, prima facie checklist, timeline, conflict declaration |
| 13 | **Admin Dashboard** | `/admin` | 5 metrics, bar chart, donut chart, anomaly alerts, filterable case table |
| 14 | **Audit Log** | `/audit` | Hash chain integrity badge, filter bar, anomaly-highlighted log table |

---

## 🔄 User Flows

### Reporter Flow
```
Landing Page → Select Category → Enter Details → Add Context/Evidence
    → Review & Submit → Processing Animation → Token Confirmation
    → (Later) Check Status with Token → View Timeline & Messages
```

### HR Officer Flow
```
Login → Dashboard (see assigned cases, SLA alerts)
    → Click Case → View AI Classification → Complete Prima Facie Checklist
    → Declare No Conflict → Investigate → Add Notes → Resolve/Escalate
```

### Admin Flow
```
Login → Platform Overview (metrics, charts, anomaly alerts)
    → Filter/Search All Cases → View Case Details
    → Audit Log (verify hash chain integrity, review anomalies)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ (LTS recommended)
- **npm** 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/saikoushikpallapolu/Designathon_2026.git

# Navigate to project directory
cd Designathon_2026

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🔑 Demo Credentials

The login page (`/login`) includes quick-fill buttons for all demo accounts:

| Name | Email | Password | Role | Landing Page |
|------|-------|----------|------|-------------|
| Sarah Jenkins | `sarah@vnrvjiet.edu` | `demo123` | HR Officer | `/dashboard` |
| Dr. Priya Shah | `legal@vnrvjiet.edu` | `demo123` | Legal Counsel | `/audit` |
| Prof. Kumar | `ombudsman@vnrvjiet.edu` | `demo123` | Ombudsman | `/dashboard` |
| V. Kumar | `admin@vnrvjiet.edu` | `demo123` | Admin | `/admin` |

---

## 🎨 Color System & Design Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `primary` | `#2C5F8A` | Buttons, links, headers, sidebar |
| `primary-dark` | `#1A2744` | Dark panels, hero backgrounds |
| `emerald` | `#1A7F5A` | Success states, resolved badges |
| `danger` | `#C0392B` | Errors, SLA breaches, S1 severity |
| `amber` | `#EF9F27` | Warnings, S2 severity, anomaly flags |
| `background` | `#F8F9FA` | Page background |
| `surface` | `#FFFFFF` | Card backgrounds |

### Severity Color Coding
| Level | Color | Badge | Meaning |
|-------|-------|-------|---------|
| S1 | 🔴 Red | `bg-red-100 text-red-700` | Critical — potential criminal act |
| S2 | 🟡 Amber | `bg-amber-100 text-amber-700` | High — requires immediate HR action |
| S3 | 🔵 Blue | `bg-blue-100 text-blue-700` | Medium — standard investigation |
| S4 | ⚪ Gray | `bg-slate-100 text-slate-600` | Low — monitoring/record only |

### SLA Progress Color Coding
| Range | Color | Meaning |
|-------|-------|---------|
| 0-49% | 🟢 Green | On track |
| 50-79% | 🟡 Amber | Approaching deadline |
| 80-100%+ | 🔴 Red | Critical / Breached |

---

## 🤖 AI Classification Schema

When a report is submitted, the AI engine returns this classification:

```json
{
  "severity": 2,
  "category": "workplace_harassment",
  "criminal_flag": false,
  "confidence": 0.87,
  "credibility_score": 3,
  "routing": "hr_officer",
  "sla_hours": 168,
  "recommendation": "Route to HR + mediation recommended"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `severity` | 1-4 | S1 (Critical) to S4 (Low) |
| `category` | string | Detected harassment category |
| `criminal_flag` | boolean | Whether potential criminal activity is detected |
| `confidence` | 0.0-1.0 | AI confidence in classification |
| `credibility_score` | 1-5 | Corroboration/evidence strength |
| `routing` | string | Recommended department for assignment |
| `sla_hours` | number | Deadline in hours based on severity |
| `recommendation` | string | Action recommendation for investigator |

---

## 👥 User Roles & Permissions

| Role | Cases Visible | Can Investigate | Can Escalate | Can View Audit | Can Close |
|------|--------------|----------------|-------------|---------------|-----------|
| **HR Officer** | Assigned only | ✅ | ✅ | ❌ | ✅ |
| **Legal Counsel** | All | ✅ | ✅ | ✅ | ✅ |
| **Ombudsman** | All | ❌ (read-only) | ✅ (override) | ✅ | ❌ |
| **Admin** | All | ❌ | ❌ | ✅ | ❌ |

---

## 🗺️ Route Map

### Public Routes (No Authentication)
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, CTA, how-it-works |
| `/report/category` | Step 1 | Incident category selection |
| `/report/incidents` | Step 2 | When, where, what happened |
| `/report/context` | Step 3 | Witnesses, evidence, desired outcome |
| `/report/review` | Step 4 | Review before submission |
| `/report/processing` | Step 5 | Encryption + AI processing animation |
| `/report/submitted` | Step 6 | Token + AI assessment confirmation |
| `/status` | Status Input | Enter token to check case |
| `/status/[token]` | Status Detail | SLA, timeline, messages |

### Staff Routes (Authenticated)
| Route | Page | Access |
|-------|------|--------|
| `/login` | Staff Login | All staff |
| `/dashboard` | HR Dashboard | HR Officer, Ombudsman |
| `/cases/[id]` | Case Detail | HR Officer, Legal Counsel |
| `/admin` | Admin Dashboard | Admin, Legal Counsel |
| `/audit` | Audit Log | Legal Counsel, Ombudsman, Admin |

---

## 🏫 Institution

**VNR Vignana Jyothi Institute of Engineering and Technology (VNR VJIET)**
Department of Computer Science and Business Systems (CSBS)

---

## 👥 Team

| Name | Role |
|------|------|
| Sai Koushik Pallapolu | Developer |
| Veerabhadra Yerram | Developer |
| Praharshita Gayatri Tata | Developer |

---

## 📄 License

This project was built for the **Designathon 2026** hackathon. All rights reserved.

---

<p align="center">
  <b>SafeVoice</b> — Because every voice deserves to be heard. Every case deserves accountability.
</p>
