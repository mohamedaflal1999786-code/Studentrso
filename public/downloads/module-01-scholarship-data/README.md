# Module 01: Scholarship Hub – Master Data Package
**Platform**: Student RSO 2.0 (Student Rights, Services & Opportunities)
**Generated**: Sat, 07 Nov 2026 10:24:04 GMT
**Total Verified Schemes**: 52
**Official Sources**: 18

---

## 📁 Package Contents

| File Name | Format | Description |
| :--- | :--- | :--- |
| `scholarships-master.json` | JSON | Full hierarchical dataset with complete eligibility rules, renewal conditions, application timelines, and trusted portal URLs. |
| `scholarships-master.csv` | CSV | Tabular format optimized for Excel, Google Sheets, Pandas, or database bulk-import. |
| `scholarships-data.ts` | TypeScript | Complete TypeScript definitions (`ComprehensiveScholarship`, `StructuredEligibilityRule`, `EducationStage`) and dataset. |
| `scholarship-matcher.ts` | TypeScript | The intelligent matching algorithm that matches student profiles against schemes. |
| `scholarship-renewals.ts` | TypeScript | The renewal tracking and verification logic. |
| `scholarships-database-schema.sql` | PostgreSQL | Consolidated SQL schema, tables, indexes, row-level security policies, and seed data. |
| `scholarship-url-audit.csv` | CSV | Full 52-record URL audit with separate Information URL and Application URL statuses, notes, and evidence references. |
| `scholarship-url-audit-summary.md` | Markdown | Complete executive summary of the URL audit findings, status tallies, and manual check guidelines. |
| `scholarship-link-monitor.mjs` | Node.js | Automated link monitoring script to verify HTTP reachability, status codes, and redirects across unique destinations. |
| `.github/workflows/scholarship-link-audit.yml` | YAML | Weekly GitHub Actions automated workflow running audits every Monday at 02:17 UTC. |

---

## 📊 Summary of Schemes & URL Audit Addendum (7 Nov 2026)

- **Total Schemes**: 52
- **Distinct Updated URLs**: 27
- **Application Destinations Requiring Manual Verification**: 14
- **Institutional / Department Processes**: 6
- **Government Portals Covered**:
  - National Scholarship Portal (NSP): `https://scholarships.gov.in/`
  - Tamil Nadu Special Assistance & BC/MBC Welfare Portals: `https://bcmbcmw.tn.gov.in/`
  - AICTE Portal: `https://www.aicte.gov.in/`
  - UGC / CSIR / DBT / DST Research Portals: `https://www.ugc.gov.in/`
  - Higher Education Department Portals

### Confirmed Mandatory Corrections:
1. **Kotak Kanya Scholarship**: Direct portal on Kotak Education Foundation: `https://www.kotakeducationfoundation.org/kotak-kanya-scholarship`
2. **HDFC Bank Parivartan's ECSS**: Direct portal at `https://www.parivartanecss.com/`
3. **AICTE Student Development Schemes**: Direct official portal at `https://www.aicte.gov.in/schemes/students-development-schemes`
4. **Tata Capital Pankh Scholarship**: Official programme page at `https://www.tatacapital.com/sustainability/education.html`
5. **Reliance Foundation Scholarships**: Updated to 2026–27 official release at `https://www.reliancefoundation.org/media/media-release/Reliance_Foundation_Scholarships_2026-27`

---

## 🔒 Verification & Compliance
All schemes in this package use verified HTTPS URLs from official government domains (`.gov.in`, `.nic.in`, `.ac.in`) and direct foundation portals. No commercial, third-party intermediary, or fee-charging links are included.
