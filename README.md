# Pa Alieu Njie — portfolio

My portfolio, live at **https://pa-alieu-njie.vercel.app**: case studies of what I’ve built, with
architecture diagrams and honest status labels, an About page, and a printable web CV at `/cv`
with a downloadable PDF.

![Home page](docs/portfolio-screenshot.png)

## Pages

| Route | What it is |
|---|---|
| `/` | Who I am, what I can help with, FleetOps as experience, projects with status, skills with evidence |
| `/work/fleetops`, `/work/classmate`, `/work/reportit`, `/work/taksigambia` | Case studies: problem, role, architecture, data and flows, decisions, hardest problem, status |
| `/about` | Background, basketball, leadership, education, security learning |
| `/cv` | Web CV; the PDF is in `public/` |

## Tech stack

- **Next.js 16** (App Router, every page statically rendered) and **React 19**, **TypeScript**
- Plain CSS with design tokens (`src/app/globals.css`); Newsreader and Inter served locally through Fontsource
- **Diagrams as static inline SVG**, drawn at build time from typed data (`src/data/diagrams.ts`), each with a phone layout; no diagram scripts
- Production Content Security Policy with hashed inline scripts, plus X-Frame-Options, Referrer-Policy and Permissions-Policy headers

## Run locally

Use Node.js 22 and npm. In PowerShell:

```powershell
git clone https://github.com/Pa-Alieu25/portfolio.git
cd portfolio
npm install
npm run dev
```

Open **http://127.0.0.1:3000**. Production preview: `npm run build`, then `npm start`.

Always build with `npm run build`, not `next build`: the build script checks public content first,
builds Next.js, then adds hashes of the generated inline scripts to the production CSP.

## Editing content

All text lives in typed files under **`src/data/`**; components only handle layout.

| File | What it controls |
|---|---|
| `site.ts` | Home page, navigation, skills and the projects they link to, labels |
| `case-studies.ts` | The four case studies, section by section, including screenshot slots |
| `diagrams.ts` | Every diagram: boxes, arrows, captions, phone layouts |
| `about.ts` | The About page |
| `profile.ts` | Shared facts (contact, education, leadership) and the CV wording |

**Screenshots** go in `public/work/<project>/<name>.webp` (or `.png`); the names are listed in
`case-studies.ts`. A slot stays hidden until its file exists.

Changes to the CV wording need a new, re-verified PDF export; `scripts/check-public.mjs` only
accepts the approved `public/Pa_Alieu_Njie_CV.pdf`, pinned by its SHA-256 hash.

## Checks

```powershell
npm run typecheck
npm run check:public
npm run build
```

`check:public` blocks phone numbers, credentials, `.env`/key files, GitHub links outside an
allowlist, empty `#` links and any PDF other than the approved public CV.

## Privacy

- The website and the public CV contain no phone number. The application CV with private contact
  details is kept outside this repository.
- No company code. FleetOps is shown with diagrams and screenshots approved by my supervisor, with
  personal data removed.
