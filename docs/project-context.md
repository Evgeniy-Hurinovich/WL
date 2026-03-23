# Project context

## Source basis used in this starter

- WL_INTERVIEW_DOC_01_ProcurementTeam.docx
- INTERVIEW_DOC_00_PricingTeam.docx
- WL_INTERVIEW_DOC_03_accountantTeam.docx
- INTERVIEW_DOC_04_salesDepartment.docx
- MASTER_PROMPT.md

## Narrative principle encoded in UI

WestLine already operates through a cross-functional chain of forecasting, procurement, finance, logistics, costing and pricing.
The main design message is:

> процесс уже сложнее текущего инструментального слоя

This means the website is intentionally positioned as an architecture and management maturity story, not as a list of staff mistakes.

## Content model choice

The app is intentionally data-driven:

- sections are centralized in `lib/audit-content.ts`
- each scene can be expanded by drilldown cards
- the app can be refined quickly after the final AS-IS report is uploaded
