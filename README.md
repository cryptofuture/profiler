# Profiler

Profiler is a research-informed career exploration application built with Preact and Vite. It turns a multilingual assessment into a deterministic profile, ranks 12 broad career families, estimates skill readiness, and creates a persistent starter plan. AI interpretation is optional and cannot change the calculated ranking.

## Experimental project

Profiler was created as a rapid experiment in less than two hours to explore how quickly a useful career-discovery experience could be designed and built. It is presented for students, educators, career counselors, and organizations in the education industry as a prototype, learning resource, and conversation starter.

The application is not a validated psychological test, professional diagnosis, hiring instrument, or guarantee of career success. Its questions, translations, family mappings, and scoring model need formal review and validation before they are used for consequential educational or employment decisions.

Created by Eugene Gusev. Project contact: [admin@profiler.top](mailto:admin@profiler.top).

The interface loads Golos Text 5.3.0 from cdnjs for headings, body copy, and controls, including Cyrillic Extended coverage for English, Russian, and Kazakh. The four pinned stylesheets use SHA-256 Subresource Integrity attributes. Their hexadecimal checksums live in `SHA256SUMS`; verify the remote files with `npm run verify:fonts`.

The product name is **Profiler** and the production domain is `profiler.top`.

The header uses `public/profiler-logo.webp`, cropped and resized from the original `public/image.png`. The same artwork supplies the browser and app icons. Preserve the original image as the source asset.

## Run locally

Requires Node.js 20 or newer.

```sh
npm install
npm run dev
```

Quality checks:

```sh
npm run lint
npm test
npm run build
npm run test:browser
npm run verify:fonts
```

Browser checks use Chrome at `/usr/bin/google-chrome`; set `CHROME_PATH` to use another installed Chrome executable.

Interest questions appear three per page. Complete groups of related activities come first, followed by remaining activities. Existing answer IDs and scores are preserved. Progress saves as answers change, including the current page. Separate accessible dialogs handle leaving the assessment, clearing results, mobile navigation, and AI confirmation or errors. Navigation only includes implemented pages.

Completing each assessment page reveals a rotating, translated discovery note. These notes explain the model and encourage reflection without introducing scores, fabricated statistics, or claims about intelligence.

The results page can request interpretation through the configured authenticated API or copy the same constrained prompt for use in ChatGPT. Copying does not send assessment data. Selected assessment options use the logo blue while unselected choices become visually muted.

## Configuration

Copy `.env.example` to `.env` when a different API host is needed.

```text
VITE_API_BASE=https://btcwid.com/api
```

The frontend sends an authenticated MessagePack `POST` request to `${VITE_API_BASE}/v1/ask` with the exact body `{ message }`. The default is `https://btcwid.com/api/v1/ask`. Cross-origin deployments must allow the `https://profiler.top` origin, credentials, MessagePack request headers, and the host session cookie. No AI provider key belongs in the browser.

The source brief documents an existing sign-in requirement but does not provide a callable sign-in contract. A 401 therefore produces a truthful integration message while preserving all local assessment data. Connect the real host sign-in flow before considering authenticated AI production-ready.

## How matching works

The assessment contains seven sections. Career ranking currently uses only interests, reasoning exercises, and work values. Work style, AI working preferences, current skills, and practical preferences remain descriptive until their mapping has been reviewed. This is deliberate: the app does not reward “AI-friendly” answers or pretend that short exercises are professional ability tests.

The provisional personal-alignment weights are:

- Interests: 55%
- Reasoning exercise snapshot: 20%
- Work values: 25%

Each career defines normalized dimension importance within those components. Missing answers are excluded and reduce evidence coverage; they never become zeros. A user must answer at least three of five items in every RIASEC area before rankings appear. Scores are whole-number exploration indices, not probabilities, percentiles, or predictions of success.

Skill readiness uses explicit 0–4 self-ratings. Unknown skills remain unknown and reduce readiness coverage. Plans come from curated family skill requirements and weekly time; checkbox progress stays in local storage.

## Project map

- `src/domain/careers.js`: career coefficients, role examples, and skill requirements
- `src/domain/questions.js`: stable multilingual assessment definitions
- `src/domain/assessmentPages.js`: related interest triplets and resume behavior
- `src/domain/scoring.js`: pure profile, matching, and readiness functions
- `src/domain/plan.js`: deterministic plan construction
- `src/i18n/translations.js`: English, Russian, and Kazakh interface content
- `src/lib/api.js`: MessagePack API contract, prompt builder, and bounded response parser
- `src/lib/storage.js`: versioned local persistence
- `src/App.jsx`: application pages and routing
- `src/components/Assessment.jsx`: grouped questions and accessible rating controls
- `src/components/Dialog.jsx`: modal focus, dismissal, and restoration
- `src/styles.css` and `src/experience.css`: responsive layouts, logo-aligned visual theme, and print styles

## Data and privacy limits

Assessment answers, skill estimates, selected plan, and cached AI summary are stored in the current browser under `profiler-top-state-v1`. Removing that browser-storage record clears the saved data. Authentication tokens are not stored by this app.

The current career-family content is editorial and broad. It does not include localized salary forecasts, live vacancies, licensing rules, or market-growth claims. Any future labor-market record should include occupation code, geography, period, publisher, source URL, retrieval date, metric, and aggregation limits.

English is the first-visit default. Russian and Kazakh content is included, but both should receive native-language and assessment-equivalence review before a public launch. Translation alone does not establish that an exercise performs identically across languages.

## Deployment

Build output is written to `dist/`. Configure the host to serve `index.html` for application routes such as `/careers/data-decision`; `vercel.json` contains that rewrite for Vercel. Point the custom domain and TLS configuration at the chosen hosting provider separately.

## License

Profiler is available under the [MIT License](LICENSE).

Copyright © 2026 Eugene Gusev — [admin@profiler.top](mailto:admin@profiler.top).
