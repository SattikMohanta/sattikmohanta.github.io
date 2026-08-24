# 🤖 AI Prompt Engineering - Analytics & Exam Suite Hub

> A free, ad-free learning platform for professional development — powered by prompt engineering and open web technologies.

---

<!-- Badges: software & tools covered -->

![Python](https://img.shields.io/badge/Python-3.x-blue)
![SQL](https://img.shields.io/badge/SQL-ANSI%20%2F%20Postgres-orange)
![Power%20BI](https://img.shields.io/badge/Power%20BI-PL300-yellow)
![Excel](https://img.shields.io/badge/Excel-Advanced-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-HTML%20%2B%20CSS-teal)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Hosting-black)
![AI Prompting](https://img.shields.io/badge/AI-Prompt%20Engineering-purple)
![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellowgreen)

---

## Table of contents

- Project overview
- Live applications
- Technology stack
- How it works (AI & prompt engineering)
- Python (BA / DA) notes
- Financial Analyst notes
- Sources, accuracy & limitations
- How to use
- Contributing & permissions
- License
- Contact & acknowledgements

---

## 📋 Project overview

This repository hosts a unified, open-source "Analytics & Exam Suite": a set of lightweight web apps and study engines built using HTML, Tailwind CSS, and vanilla JavaScript. The platform demonstrates how careful AI prompt engineering can be used to generate, validate, and present structured learning content, mock exams, and practice scenarios covering business analysis, SQL, Power BI, and additional analyst tracks.

Mission: make high-quality, ad-free educational resources available to learners worldwide — removing paywalls and marketing friction from professional development.

---

## 🌐 Live applications

Visit the unified hub: https://sattikmohanta.github.io

Individual project sites:

- IIBA® ECBA™ Prep Engine — https://sattikmohanta.github.io/ecba/
  - Certified Business Analyst preparation, BABOK®-aligned content, interactive mock exams

- SQL Mastery Suite — https://sattikmohanta.github.io/sql/
  - Hands-on SQL practice, query patterns, optimization examples, real-world scenarios

- Power BI PL-300 Exam Engine — https://sattikmohanta.github.io/powerbi/
  - Power BI exam prep, visualization best practices, dashboard design

---

## 💡 Technology stack

- Frontend: HTML5, Tailwind CSS, Vanilla JavaScript
- Hosting: GitHub Pages
- Icons: Lucide Icons
- Content generation: Prompt-engineered AI workflows (local/authoring) — see Sources & Accuracy
- Responsive design and accessibility-minded UI

Note: repository is primarily HTML (visual/interactive static apps) with a small amount of JavaScript.

---

## 🧠 How it works — AI & prompt engineering

Content in this project is produced and refined through an iterative prompt-engineering process:

1. Research official exam guides, frameworks, and reference documentation for the target certification.
2. Create focused, context-rich prompts to generate structured learning content (concepts, examples, question banks).
3. Iterate and refine prompts to improve clarity, accuracy, and pedagogical flow.
4. Validate generated outputs against official sources and sample materials.
5. Publish verified content to static web pages and interactive exam engines.

This process helps scale content creation while keeping a human-in-the-loop for validation and quality control.

---

## 🐍 Python (Business Analyst / Data Analyst) — Notes

Purpose: provide a practical Python primer and study notes oriented to BA/DA tasks: data ingestion, cleaning, EDA, basic modeling, and reporting.

Key topics covered & recommended tools:

- Core libraries: pandas (dataframes, joins, groupby), numpy (numerical ops), matplotlib / seaborn (visualization), plotly (interactive charts)
- Data ingestion & integration: CSV, Excel, JSON, SQL connectors (psycopg2/sqlalchemy), APIs
- Data cleaning & validation: missing data strategies, type-casting, outlier handling, normalization
- Exploratory Data Analysis (EDA): summary statistics, pivot tables, correlation analysis, visual patterns
- Feature engineering: date/time features, categorical encoding, aggregation, text tokenization for simple NLP
- Basic modeling: scikit-learn workflows (train/test split, pipelines), simple regression/classification models, evaluation metrics
- Time series basics: resampling, rolling aggregates, trend/seasonality decomposition
- Reproducible notebooks: Jupyter / JupyterLab, VS Code interactive windows
- Versioning & deployment: lightweight packaging, reproducible environments (venv/pip/conda), Docker for portability

Suggested study flow:
1. Master pandas and EDA on sample datasets
2. Practice SQL <> pandas integration for real-world joins and aggregate queries
3. Build small end-to-end projects (data ingestion → cleaning → EDA → simple model → dashboard)

Notes & cautions:
- Focus on robust data validation and reproducibility for analyst work.
- When using AI-assisted content, always cross-check code snippets for API changes and library versions.

---

## 📊 Financial Analyst — Notes

Purpose: concise study notes to orient learners to core financial analysis skills, tools, and practical workflows.

Core competencies & tools:

- Spreadsheet mastery: Excel (pivot tables, advanced formulas, Power Query), financial functions
- Financial modeling: building income statement, balance sheet, cash flow projections, scenario analysis
- Valuation techniques: DCF (discounted cash flow), comparable company analysis, precedent transactions
- Reporting & visualization: Power BI for dashboards, Excel + Power Query for ETL
- Python for finance: pandas for time series, yfinance / pandas-datareader for market data, statsmodels for econometrics
- KPI & ratio analysis: liquidity, profitability, leverage, efficiency ratios, trend analysis
- Forecasting basics: ARIMA, exponential smoothing — understand assumptions and diagnostics
- Risk & sensitivity: monte-carlo basics, sensitivity tables, scenario stress-testing

Suggested study flow:
1. Solidify accounting fundamentals (reading financial statements)
2. Build simple models in Excel and re-implement core workflows in Python
3. Create interactive dashboards (Power BI) that combine model outputs and visual KPIs

Notes & cautions:
- Financial calculations are sensitive to assumptions — document them clearly and include sensitivity checks.
- Regulatory or exam-specific guidance (e.g., CFA) should be consulted when preparing for formal credentials.

---

## 📚 Sources, accuracy & limitations

- Primary references include: IIBA BABOK® v3, Microsoft Learn PL-300 learning paths, ANSI SQL documentation, and vendor-specific docs. Financial topics reference common financial modelling best practices and public resources.
- While AI-assisted authoring accelerates content production, it is NOT an official exam provider. Learners should cross-check with official certification resources before relying on this material for exam decisions.
- If you find factual errors or outdated guidance, please open an issue so maintainers can review and correct the content.

---

## 📖 How to use

Hub interface: open https://sattikmohanta.github.io for a dashboard-style navigation between the apps. Each app can also be opened directly:

```
https://sattikmohanta.github.io/ecba/
https://sattikmohanta.github.io/sql/
https://sattikmohanta.github.io/powerbi/
```

Tips:
- Use the "Open in New Tab" option for focused study.
- For best results, use a modern browser (Chrome, Firefox, Edge, Safari).

Local testing:
- Because these are static pages, you can preview locally by serving the directory with a simple static server. Example (Python):

  python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

---

## 🔐 Access & permissions

- This repository is public and read-only for the community.
- Write access is limited to authorized maintainers: Sattik Mohanta and listed project maintainers.
- Community contributions are welcome via issues and pull requests; maintainers will review and merge based on quality and alignment with the project's goals.

---

## 🤝 Contributing

Contributions that improve accuracy, accessibility, or pedagogy are highly valued. Recommended contribution flow:

1. Open an issue describing the change or bug.
2. Submit a focused pull request with a clear description and why it improves the content.
3. Include references for factual changes (links to official docs, learning paths, or vendor guidance).

Contributor tips:
- Keep changes atomic and well-documented.
- For content updates, include the source or reasoning for edits.

---

## 📈 Project impact & roadmap

Why this matters: learners get access to ad-free study materials and practice engines without subscription barriers. The platform is designed to scale with additional certification topics.

Planned enhancements:
- Additional certification tracks (AWS, Azure, GCP)
- Interactive quizzes with performance tracking
- Flashcards and spaced-repetition features
- Collaboration/study groups and multilingual content
- Offline export of study materials

---

## 📝 License

This project is provided for educational purposes. See [LICENSE](./LICENSE) for full terms.

---

## 💬 Support & contact

Have feedback or found an issue? Please open an issue or discussion in this repository.

Maintained by: Sattik Mohanta — https://github.com/SattikMohanta

---

## Acknowledgements

Built with care using prompt engineering techniques and open web tooling. Special thanks to community reviewers and contributors who help keep the content accurate and useful.

---

Last updated: 2026-08-24
