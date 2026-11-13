# HRMS Gap Analysis, Missing Features & Architectural Recommendations

**Document Reference:** HRMS-GAP-REC-2026  
**System Name:** PeopleCore Multi-Tenant HRMS SaaS  
**Evaluation Scope:** Codebase Audit, Operational Usability, Legal/Statutory Readiness, and Advanced Architectural Roadmap.

---

## 1. Audit Findings: Existing Codebase vs Production Enterprise Standards

| Domain | Current Repository State | Identified Deficit / Vulnerability | Production Requirement | Priority |
|---|---|---|---|---|
| **Tenant Onboarding & Activation Gate** | Demo login routes directly to `/dashboard`. | Missing self-service tenant registration. No automatic setting of `status = 'inactive'` and `expiry_date = yesterday`. Missing middleware URL blocking. | Dedicated `/signup` page, inactive defaulting, URL-level proxy gate redirecting to `/onboarding/activation-pending`. | **Must Have (P0)** |
| **Database Persistence (Neon)** | UI connects to `mockFetch.ts` and `mockData.ts` with Supabase SSR stub. | Mutations do not persist to live Neon PostgreSQL tables (`DATABASE_URL_POOLED`). | Full migration of DDL scripts to Neon, ORM / query runner connection, atomic transactions. | **Must Have (P0)** |
| **India Statutory Payroll Engine** | Static UI payroll run simulation. | Missing automated EPF (12%), ESIC (0.75%/3.25%), state PT tables, Section 192 TDS, and Gratuity formulas. | Configurable, effective-dated statutory deduction engine with ECR text export. | **Must Have (P0)** |
| **Unified Approval Engine** | Static approval lists without state machine. | Approvals are fragmented across separate client files without unified audit history or multi-level escalation. | Shared polymorphic approval engine (`approval_requests`, `approval_actions`). | **Must Have (P0)** |
| **Sensitive Data Protection** | Mock data exposes full bank accounts and mock PANs. | No encryption on Aadhaar, no server-side role stripping for employee CTC data. | AES-256 encryption on Aadhaar, last-4-digits masking, RLS data stripping. | **Must Have (P0)** |

---

## 2. Evaluation of Advanced Industry Features

### 2.1 AI-Powered Resume Parser (PDF to Candidate Profile)
- **Business Value:** Cuts candidate screening time by 75%. Automatically extracts Name, Email, Phone, Skills, Education, and Work History from uploaded PDF resumes into `candidates` table.
- **Implementation Approach:** Server-side extraction using OCR + Gemini 1.5 Flash API structured JSON output mode.
- **Privacy & Compliance Impact:** Requires candidate consent checkbox for automated resume profiling under Digital Personal Data Protection Act (DPDPA 2023).
- **Priority:** **Should Have (P1)** | Complexity: Medium.

### 2.2 AI Payroll Anomaly & Variance Detector
- **Business Value:** Prevents costly disbursal mistakes (e.g., unintended duplicate bonuses or sudden 500% salary spikes).
- **Implementation Approach:** Compares Month $M$ payroll run against Month $M-1$ historical baseline. Automatically flags any employee whose net pay deviates by $> 20\%$ for mandatory senior finance approval.
- **Priority:** **Must Have (P0)** | Complexity: Low.

### 2.3 Facial Recognition Biometric Punch (Subject to Legal Safeguards)
- **Business Value:** Touchless attendance capture for physical offices and factory gates; prevents proxy punching ("buddy punching").
- **Privacy & Legal Considerations:** Under Indian DPDPA and global biometric regulations, biometric face vectors cannot be stored without explicit written consent, and employees must be offered an alternative punch mode (e.g., RFID badge or PIN).
- **Recommendation:** Do not mandate face capture. Provide RFID card or QR code dynamic attendance as standard; provide face verification only as an opt-in enterprise add-on.
- **Priority:** **Could Have (P2)** | Complexity: High.

### 2.4 WhatsApp Business API Notifications
- **Business Value:** 95% open rate within 5 minutes. Managers approve urgent leaves or expense claims directly from WhatsApp interactive buttons without having to open a laptop.
- **Cost / Licensing:** Meta WhatsApp Cloud API per-conversation utility messaging charges (approx ₹0.35 per conversation in India).
- **Priority:** **Should Have (P1)** | Complexity: Medium.

### 2.5 Automated E-Signatures for Offer Letters & Non-Disclosure Agreements
- **Business Value:** Accelerates candidate offer acceptance from days to hours. Eliminates paper printing, physical scanning, and manual emailing.
- **Technical Dependencies:** Integration with Aadhaar eSign (NSDL / eMudhra) for legally enforceable signatures under Section 3A of Information Technology Act 2000, or DocuSign / SignEasy API.
- **Priority:** **Should Have (P1)** | Complexity: Medium.

---

## 3. Comprehensive Feature Prioritization Matrix

```mermaid
quadrantChart
    title Feature Roadmap: Business Impact vs Implementation Complexity
    x-axis Low Complexity --> High Complexity
    y-axis Low Business Value --> High Business Value
    quadrant-1 High Value, High Complexity (Strategic Bets)
    quadrant-2 High Value, Low Complexity (Immediate Wins)
    quadrant-3 Low Value, Low Complexity (Quick Fillers)
    quadrant-4 Low Value, High Complexity (Deprioritize)
    
    "Neon DB Integration & Tenant Gate": [0.25, 0.95]
    "India Statutory Payroll Engine": [0.45, 0.92]
    "Unified Multi-Level Approval Engine": [0.35, 0.88]
    "AI Payroll Anomaly Detector": [0.28, 0.82]
    "WhatsApp Notification Gateway": [0.40, 0.78]
    "Automated E-Signatures": [0.60, 0.85]
    "Resume Parser (Gemini API)": [0.50, 0.80]
    "Biometric Hardware Sync (ADMS)": [0.70, 0.75]
    "Mobile PWA & Geofencing": [0.55, 0.76]
    "Facial Recognition Punch": [0.85, 0.60]
    "Internal Employee Chat": [0.75, 0.40]
    "Visitor Management Kiosk": [0.80, 0.35]
```

---

## 4. Categorized Feature Recommendations

### Category A: Must Have (P0 - Immediate Implementation Blockers)
1. **Tenant Registration & Inactive Defaulting:** Implement `/signup` capturing organization details, phone, city, address; default `status = 'inactive'` and `expiry_date = yesterday`.
2. **URL-Level Gatekeeper Middleware:** Redirect all unactivated or expired tenant traffic to `/onboarding/activation-pending`.
3. **Neon PostgreSQL Live Connection:** Configure serverless pooled connection (`DATABASE_URL_POOLED`) with SSL mode required; execute database schema migrations.
4. **Statutory India Compliance Engine:** Implement real calculations for EPF, ESIC, Professional Tax, and Section 192 TDS.
5. **Aadhaar Encryption & Sensitive Data Masking:** Encrypt 12-digit Aadhaar values with AES-256; mask bank details on non-payroll views.

### Category B: Should Have (P1 - Core Enterprise Enhancements)
1. **WhatsApp Cloud Notification Gateway:** Instant alerts for leave requests and payslip links.
2. **Automated E-Signatures on Letters:** Embedded digital signing for offer letters and confirmation notices.
3. **EPFO ECR Text File Generator:** One-click download of ECR text file matching EPFO portal specifications.
4. **Corporate Banking Disbursal File Generator:** Direct CMS Excel generator for ICICI, HDFC, and Kotak banks.
5. **AI Payroll Variance Detector:** Outlier alerts for salary anomalies before lock.

### Category C: Could Have (P2 - Value-Add Capabilities)
1. **AI Resume Parser:** Automatic PDF resume extraction via Gemini Flash.
2. **Mobile Progressive Web App (PWA):** Offline punch caching with background sync.
3. **Biometric Push Gateway (ADMS Webhook):** Automatic hardware fingerprint sync.
4. **Department Bell Curve Calibration Tool:** Drag-and-drop appraisal rating normalizer.

### Category D: Future Enhancements (P3 - Long-Term Horizon)
1. **Facial Recognition Kiosk Attendance:** Tablet-mounted front-desk punch station.
2. **Internal Organization Peer-to-Peer Chat & Recognition Badges.**
3. **Visitor Management & Security Gatepass Module.**
4. **Comprehensive Multi-Currency & International Statutory Packs (UAE, UK, US, Singapore).**

