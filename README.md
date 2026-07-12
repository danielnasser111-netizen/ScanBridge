# ScanBridge

**Understand. Prepare. Follow up.**

ScanBridge is a youth-led, safety-first navigation project for medical imaging in Lebanon. It helps patients and families prepare for scans, find imaging services, organise practical emergency information, and navigate the platform with Milo, its bilingual chat assistant.

> ScanBridge provides general education and navigation only. It does not diagnose conditions, interpret images or reports, recommend treatment, or replace doctors or emergency services.

## What is live in the pilot

- 6 patient-friendly ScanPrep guides, including contrast-material guidance
- 58 source-linked imaging facilities across Lebanon
- English and Arabic support, with light and dark modes
- Emergency preparation card, generated privately in the browser
- Milo, a safety-bounded Gemini-powered navigation assistant
- Public Impact & Pilot page with transparent baseline metrics

## Why it exists

ScanBridge began after a frightening drive in which a family could not quickly work out where to go for help. The project is built to make the next step clearer during confusing or urgent moments, without making medical decisions for people.

## First pilot

The first pilot is recruiting 10–15 testers. Each tester tries one practical task, such as finding an MRI center or preparing for an ultrasound, then shares anonymous usability feedback.

The project does not collect names, reports, symptoms, or private health information for the pilot. Results will be published only as anonymous, aggregate findings after collection is complete.

## Run locally

```powershell
cd C:\Users\danie\Documents\Scanbridge
npm start
```

Open `http://localhost:3000`.

To enable live Milo locally, set a private `GEMINI_API_KEY` environment variable. Never place the key in browser code, a committed `.env` file, or GitHub.

## Deploy

The project is configured for Netlify:

1. Import this repository into Netlify from GitHub.
2. Set `GEMINI_API_KEY` as a secret environment variable for the Production Functions context.
3. Deploy from the `main` branch.

Netlify hosts the static site and the private `/api/milo` function. GitHub Pages is not used for the live app because it cannot securely run the server-side Milo function.

## Research and outreach

- [Pre-pilot research poster](output/pdf/scanbridge-pre-pilot-poster.pdf)
- [Impact & Pilot page](impact.html)

Current poster status: **pre-pilot**. It documents the project, the planned evaluation, and verified baseline counts. It does not claim participant outcomes.

## Next steps

1. Recruit 10–15 pilot testers.
2. Collect anonymous usability feedback.
3. Publish aggregate pilot findings and approved anonymised comments.
4. Ask a school, clinic, or medical reviewer to review one guide or support a small pilot.

## License

Released under the [MIT License](LICENSE).
